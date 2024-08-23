from flask import Flask, render_template, request, jsonify
from booking_api.api import get_hotel_availability
from payment.process import process_payment, handle_payment_error
from voice.stt import convert_speech_to_text

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message')
    
    # You can include logic here to handle different intents
    response = {'reply': f'You said: {message}'}
    return jsonify(response)

@app.route('/voice', methods=['POST'])
def voice():
    audio_file = request.files['audio']
    text = convert_speech_to_text(audio_file.read())

    if text:
        response = {'message': text}
    else:
        response = {'message': 'Sorry, I could not understand that.'}

    return jsonify(response)

# Hotel booking and payment processing routes
@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    city = data.get('city')
    check_in = data.get('check_in')
    check_out = data.get('check_out')
    response = get_hotel_availability(city, check_in, check_out)
    return jsonify(response)

@app.route('/pay', methods=['POST'])
def pay():
    payment_data = request.get_json()
    try:
        payment_response = process_payment(payment_data)
        return jsonify(payment_response)
    except Exception as e:
        error_response = handle_payment_error(e)
        return jsonify(error_response), 400

if __name__ == '__main__':
    app.run(debug=True)
