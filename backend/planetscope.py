import os
# Setup the API Key from the `PL_API_KEY` environment variable
# PLANET_API_KEY = os.getenv('PL_API_KEY')

# If you're following along with this notebook, you can enter your API Key on the following line, and uncomment it:
PLANET_API_KEY = 'PLAK17193e41f5ec4f23bb80f371ecb3d965'
assert PLANET_API_KEY, 'not set'

# Import helper modules
import json
import mercantile
import requests


# Setup Planet Data API base URL
API_URL = "https://api.planet.com/data/v1"
# Setup the session
session = requests.Session()
# Authenticate
session.auth = (PLANET_API_KEY, "")
# Make a GET request to the Planet Data API
resp = session.get(API_URL)
if not resp.ok:
    print("Something is wrong:", resp.content)



from datetime import datetime

def get_item_ids(geometry, item_type='PSScene', start_date=None, end_date=None, limit=100):
    """Get Planet Data API item_id values for matching filters.
    Args:
        geometry: geojson geometry dict
        item_type: item_type (see https://developers.planet.com/docs/api/items-assets/#item-types)
        start_date: inclusive lower bound ISO 8601 datetime string (include items captured on or after this date)
        end_date: exclusive lower bound ISO 8601 datetime string (include items captured before this date)
        limit: max number of ids to return
    Returns:
        item_ids: list of id strings
    """
    # Data API Geometry Filter
    geometry_filter = {
        "type": "GeometryFilter",
        "field_name": "geometry",
        "config": geometry
    }
    # use a default end_date of the current time
    if not end_date:
        end_date = datetime.utcnow().isoformat() + 'Z'
    date_filter = {
        "type": "DateRangeFilter", # Type of filter -> Date Range
        "field_name": "acquired", # The field to filter on: "acquired" -> Date on which the "image was taken"
        "config": {
            "lt": end_date, # "lt" -> Less than
        }
    }
    # start_date is optional
    if start_date:
        # greater than or equal to start date
        date_filter["config"]["gte"] = start_date

    # combine geometry and date filters with an AndFilter
    and_filter = {
        "type": "AndFilter",
        "config": [geometry_filter, date_filter]
    }

    quick_url = "{}/quick-search".format(API_URL)
    # Setup the request
    filter_request = {
        "item_types" : [item_type],
        "filter" : and_filter
    }
    # get ids from search results
    resp = session.post(quick_url, json=filter_request)
    results = resp.json()
    ids = [f['id'] for f in results['features']]
    # follow pagination links until we hit the limit
    while len(ids) < limit and results['_links'].get('next'):
        results = requests.get(results['_links'].get('next')).json()
        more_ids = [f['id'] for f in results['features']]
        ids += more_ids
    return ids[:limit]



def coords_to_geometry(lat, lon):
    """Given latitude and longitude floats, construct a geojson geometry dict"""
    return {
        "type": "Point",
        "coordinates": [lon, lat]
    }



geom = coords_to_geometry(37.77493, -122.41942)
print(geom)

get_item_ids(geom, start_date="2019-01-01T00:00:00.000Z", end_date="2019-10-01T00:00:00.000Z", limit=5)


def get_tile_urls(lat, lon, zoom=15, item_type='PSScene', start_date='2019-01-01T00:00:00.000Z', end_date='2019-10-01T00:00:00.000Z', limit=5):
    """Get webtile urls for given coordinates, zoom, and matching filters.
    Args:
        lat: latitude float
        lon: longitude float
        zoom: zoom level int (usually between 1 and 15)
        item_type: item_type (see https://developers.planet.com/docs/api/items-assets/#item-types)
        start_date: inclusive lower bound ISO 8601 datetime string (include items captured on or after this date)
        end_date: exclusive lower bound ISO 8601 datetime string (include items captured before this date)
        limit: max number of ids to return
    Returns:
        item_ids: list of id strings
    """
    geom = coords_to_geometry(lat, lon)
    item_ids = get_item_ids(geom, item_type=item_type, start_date=start_date, end_date=end_date, limit=limit)
    tile = mercantile.tile(lon, lat, zoom)
    tile_url_template = 'https://tiles.planet.com/data/v1/{item_type}/{item_id}/{z}/{x}/{y}.png?api_key={api_key}'
    return [tile_url_template.format(item_type=item_type, item_id=i, x=tile.x, y=tile.y, z=zoom, api_key=PLANET_API_KEY) for i in item_ids]


tile_urls = get_tile_urls(37.77493, -122.41942, limit=5)
for url in tile_urls:
    print(url)
    print()



from  IPython.display import display
from IPython.display import Image

resp = requests.get(tile_urls[0])
Image(resp.content)

import matplotlib

from IPython.display import HTML
import random
import time
def animate(urls, delay=1.0, loops=1):
    """Display an animated loop of images
    Args:
        urls: list of image url strings
        delay: how long in seconds to display each image
        loops: how many times to repeat the image sequence
    """
    disp_id = str(random.random())
    display("placeholder", display_id=disp_id)
    for loop in range(loops):
        for frame_url in urls:
            htmlDisplay = f'<img src="{frame_url}" class="mySlides">'
            display(HTML(htmlDisplay), display_id=disp_id, update=True)
            time.sleep(delay)
animate(tile_urls, delay=0.5, loops=3)
tile_urls = get_tile_urls(37.77493, -122.41942, limit=100)
animate(tile_urls, delay=1, loops=3)