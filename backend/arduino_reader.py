import serial
import time
from dotenv import load_dotenv
import os

# Pulls data from the Serial logs of the Arduino (code of which is written in an Arduino IDE)

load_dotenv()  # take environment variables from .env.

ser = serial.Serial(os.environ.get('ARDUINO_PORT'), 115200, timeout=0.1)

def retrieve_from_arduino(): 
    time.sleep(0.05)
    data = ser.readline()
    return data

# this code is commented out because the web socket handles looping and calling `write_read` now. To prototype uncomment
# while True:
#     value = retrieve_from_arduino()
#     print(value)

