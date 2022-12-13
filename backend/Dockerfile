FROM python:3.8

WORKDIR /app
COPY ./requirements.txt .
RUN pip3 install -r requirements.txt
COPY  . .
CMD [ "python3", "./app.py" ]

EXPOSE 5001
CMD ['gunicorn','-b','0.0.0.0:5001','app:app']