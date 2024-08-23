import requests

API_KEY = 'your_speech_to_text_api_key'
BASE_URL = 'https://api.speechtotext.com/recognize'  # Replace with the actual API URL

def convert_speech_to_text(audio_file):
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'audio/wav'
    }

    response = requests.post(BASE_URL, headers=headers, data=audio_file)

    if response.status_code == 200:
        return response.json()['text']
    else:
        return None
