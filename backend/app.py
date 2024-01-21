from arduino_reader import retrieve_from_arduino
from flask import Flask
from flask import request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS, cross_origin
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()  # take environment variables from .env.

# This is the main API/socket.io interface 
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Create socket.io instance
socketio = SocketIO(app, cors_allowed_origins='*')

# Create OpenAI instance
client = OpenAI()


loop = True

# Socket.io connection logic
@socketio.on('connect')
def handle_connect():
    global loop
    loop = True
    print('connected')

@socketio.on('disconnect')
def handle_disconnect():
    global loop
    print('disconnected')
    loop = False

@socketio.on('message')
def handle_message(message):
    print(f'Received message: {message}')
    emit('message', message)

@socketio.on('get_data')
def send_data(test = None):
    while loop:  # Replace this with a condition to stop sending data
        data = retrieve_from_arduino()
        print(data)
        socketio.emit('data_response', {'data': data})
        socketio.sleep(1)  # Adjust the interval as needed


@app.route('/generate_feedback', methods=['POST'])
def generate_feedback():
    impact_type = request.form.get("impactType")
    temperature = request.form.get("temperature")
    humidity = request.form.get("humidity")
    air_pressure = request.form.get("airPressure")
    co2 = request.form.get("co2")
    breath_voc = request.form.get("breathVOC")
    indoor_air_quality = request.form.get("iaq")
    
    if not os.environ.get('OPENAI_API_KEY'):
        return jsonify({"error": "Open AI API key not found"}), 400

    # Make a request to the OpenAI API to generate a response
    try:
        
        model = "gpt-4-1106-preview"
        model_context = f"""You are a helpful assistant designed to give concise health advice/feedback for {impact_type} impact given values for temperature (in degrees Celsius),
                                     humidity, air pressure (in hPa), CO2 (in PPM), breath VOC (in PPM), and indoor air quality (in PPM). You are concerned about the health impacts of {impact_type}
                                     in the setting of being present with these variables. Be concise and specific in your feedback."""
                                     
        user_content = f"""What is the impact on {impact_type}, if it is in a room/area where the temperature is {temperature} C, the humidity is {humidity}%, 
                                    the air pressure is {air_pressure} hPa, the CO2 is {co2} PPM, the breath VOC is {breath_voc} PPM, and the indoor air quality is {indoor_air_quality}?
                                    Tell me about potential harms for {impact_type} in the presence of these specific values and how to mitigate them. 
                                    If there are no harms, tell me that there are no harms. Be concise and specific in your feedback."""
        
        response = client.chat.completions.create(
            model="gpt-4-1106-preview",
            messages=[
                {
                    "role": "system", 
                    "content": model_context
                },
                {
                    "role": "user", 
                    "content": user_content
                }
            ]
        )
        
        generated_response = response.choices[0].message.content
        print(generated_response)
        
        return jsonify({"response": generated_response})

    except Exception as e:
        return jsonify({"error": f"Error communicating with OpenAI API: {str(e)}"}), 500


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=105)
