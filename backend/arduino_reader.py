import serial
import time
from dotenv import load_dotenv
import os

load_dotenv()  # take environment variables from .env.

ser = serial.Serial(os.environ.get('ARDUINO_PORT'), 9600, timeout=0.1)

def write_read(): 
    time.sleep(0.05)
    data = ser.readline()
    return data

while True:
    value = write_read()
    print(value)