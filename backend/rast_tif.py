


import rasterio
from rasterio.plot import show
from matplotlib import pyplot as plt

image='bathymetry.tif'
img = rasterio.open(image)
show(img)
#X and Y are supposed to be latitude and longitude if you have the right metadata

full_img = img.read()  #Note the 3 bands and shape of image