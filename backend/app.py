from flask import Flask, request,jsonify,render_template
import pickle
import numpy as np
#from  Flask_pymongo import pyMongo, ObjectId
from flask_cors import CORS
import matplotlib as plt
import pickle as pk
from sklearn.cluster import KMeans
import pandas as pd
import seaborn as sns
import os
from werkzeug.utils import secure_filename
from functions import times
import whitebox_workflows as wbw

app=Flask(__name__)
#app.config['MONGO_URI']='mongodb://202.1.39.189/mlearning'
#mongo=PyMongo(app)
CORS(app)




books=[{'id':0,'name':'Bron to die'},{'id':1,'name':'born to suffer'}]


UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
 
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
 

products = [
  {
    'name': 'Airpods Wireless Bluetooth Headphones',
    'image': '/images/airpods.jpg',
    'description':
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    'brand': 'Apple',
    'category': 'Electronics',
    'price': 89.99,
    'countInStock': 3,
    'rating': 0,
    'numReviews': 0,
  },
  {
    'name': 'iPhone 11 Pro 256GB Memory',
    'image': '/images/phone.jpg',
    'description':
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    'brand': 'Apple',
    'category': 'Electronics',
    'price': 599.99,
    'countInStock': 10,
    'rating': 0,
    'numReviews': 0,
  }
   
]




model = pickle.load(open('models/model.pkl', 'rb'))



@app.route('/api/products',methods=['GET'])
def hello():
    return jsonify(products)

@app.route('/api/times',methods=['GET'])
def calcualte():
    
    return jsonify({"result":times()})

##dynamic routing 
@app.route('/<name>')
def print_name(name):
    return 'hello ,{}'.format(name)



#Machine Learning
@app.route('/api/predict',methods=['POST'])
def predict():
    df=pd.read_excel('other_files/K_Means.xlsx')
    print(df.head())

    sns.regplot(x=df['X'], y=df['Y'], fit_reg=False)
    
    #https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html
    kmeans = KMeans(n_clusters=3, init='k-means++', max_iter=300, n_init=10, random_state=0)

    load_model=pk.load(open('kmeans_model','rb'))

    ##changed from model to load_model
    load_model = kmeans.fit(df)

    predicted_values = kmeans.predict(df)

    ##saved model using pickle
    #pk.dump(model,open('kmeans_model','wb'))


    plt.scatter(df['X'], df['Y'], c=predicted_values, s=50, cmap='viridis')
    plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], s=200, c='black', alpha=0.5)
    plt.show()


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
 
# @app.route('/')
# def main():
#     return 'Homepage'
 
@app.route('/api/upload', methods=['POST'])
def upload_file():

    imagefile=request.files['image']
    print('request.files')
    image_path="./images/" + imagefile.filename
    imagefile.save(image_path)
    return jsonify({'message':'file uploaded'})
    

app.run(debug=True,port=5001)

#start flask using an 
# 1)environment variabe
#2)programmatically
##export FLASK_APP=web_flask.py
##flask run

##2)
if __name__== '__main__':
    app.run(debug=True) ##debug=True for debugging