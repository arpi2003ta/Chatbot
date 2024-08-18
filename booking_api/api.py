import requests

# Replace with your actual API key and base URL
API_KEY = 'your_api_key_here'
BASE_URL = 'https://api.example.com/v1/'

def get_hotel_availability(city, check_in, check_out):
    url = f'{BASE_URL}hotels/search'
    params = {
        'city': city,
        'check_in': check_in,
        'check_out': check_out,
        'api_key': API_KEY
    }
    response = requests.get(url, params=params)
    return response.json()
