from arduino_reader import retrieve_from_arduino
from flask import Flask
from flask import request
from flask_socketio import SocketIO, emit
from flask_cors import CORS, cross_origin

# This is the main API/socket.io interface 

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

socketio = SocketIO(app, cors_allowed_origins='*')

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
def send_data(test):
    while loop:  # Replace this with a condition to stop sending data
        data = retrieve_from_arduino()
        print(data)
        socketio.emit('data_response', {'data': data})
        socketio.sleep(1)  # Adjust the interval as needed

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=105)
