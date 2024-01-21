# Breathe | NW Hacks Project

This is our project for nw hacks 2024 taking place at the University of British Columbia

View the video demo link [here on YouTube](https://youtu.be/YEevDblyLsI?feature=shared)

# About

## Inspiration

We were inspired by the growing need for environmental awareness and the impact of air quality on daily health. Recognizing the gap in real-time, location-specific air quality monitoring, we aimed to empower individuals with data to make informed decisions for their health and well-being.

## What it does

Breathe is an innovative solution combining environmental sensing and geolocation to monitor air quality parameters. It provides real-time data to users, along with AI-driven insights on how air quality affects aspects such as general breathability, sleep quality, vegetation potential, and more.

## How we built it

We integrated an Arduino Mega with an environmental sensor and a MAX-M10S GPS module which ran code gathering environmental data written in C++. A Python backend reads output from the Arduino serial monitor, and through a web socket connection using Socket.IO, it relays data to our React.js frontend. The frontend then interprets this data and further utilizes the Python backend with the OpenAI API to generate contextual feedback for the user.

## Challenges we ran into

Our primary challenge was bridging the gap between the low-level data output from the hardware sensors and the high-level user interface of our website. This involved several complex layers of integration:

Data Consistency and Integrity: The environmental sensor outputs data in raw, unfiltered form. We needed to ensure that the data was parsed and remained consistent as well as accurate as it was processed and transmitted through various layers of software. Any corruption or loss of data integrity could lead to misleading air quality readings.

Real-Time Data Processing: Implementing a real-time system required a robust backend capable of handling continuous data streams without latency issues. The Python backend had to be meticulously optimized for performance to parse and push data effectively through a web socket connection and read data through a serial output monitor from an Arduino port.

## Accomplishments that we're proud of

We're proud of creating a seamless integration of hardware and software that provides actionable environmental insights. Our platform not only informs but also educates users about the importance of air quality.

## What we learned

Our journey with Breathe was as much about technical development as it was about collaboration and mutual learning. Each team member brought unique expertise in different areas, which was instrumental in our holistic learning experience.

Low-Level Coding: Working with Arduino, an environmental sensor, C++, and a GPS module taught us about the nuances of embedded systems programming. We gained a deeper understanding of how low-level code directly interacts with hardware components, manages memory, and processes input/output operations in real-time.

Backend Development: As we interfaced the backend with the hardware, we learned about the challenges of setting up a robust server capable of handling real-time data streams. Delving into Python, we explored advanced concepts like asynchronous programming, threading, and web sockets, which are crucial for a responsive data relay system. We also learned the technologies needed to bridge a serial output from a hardware device to a different programming language. 

Frontend Technologies: The frontend team members shared their knowledge of React.js and modern web development practices. We learned how to create dynamic, real-time user interfaces that are both performant and aesthetically pleasing. We also understood the importance of presenting data in an accessible and engaging way for end-users. We also implemented light and dark themes and interactive graphs for further detail. 

## What's next for Breathe

Custom PCB Design: We plan to transition from the Arduino Mega to a custom-designed Printed Circuit Board (PCB). This will allow us to streamline the design, reduce the size, and improve the durability and energy efficiency of our device. A custom PCB will also enable us to integrate additional sensors and components more seamlessly.

Wireless Capabilities: Adding wireless functionality is a key next step. By incorporating Wi-Fi or Bluetooth technology, or even exploring low-power wide-area networks (LPWAN) for longer range, we can enhance the portability and ease of deployment of our devices, ensuring that air quality data can be accessed from virtually anywhere.

Data Analysis and Machine Learning: With a growing dataset of air quality measurements, we aim to implement machine learning algorithms to predict air quality trends and provide proactive recommendations to our users.

Mobile Application Development: To increase accessibility, we're considering the development of a mobile app. This would allow users to check the air quality in real-time from their smartphones and receive notifications when the air quality drops below a certain level.


# Technical / Setup

## Backend

1. Install the required packages
```
pip install -r requirements.txt
```

2. Add the port of the Arduino module you are running to the .env file. 

For example:
```.env
ARDUINO_PORT=/dev/cu.usbmodem112401
```


## Frontend


## Embedded

Use the Arduino IDE