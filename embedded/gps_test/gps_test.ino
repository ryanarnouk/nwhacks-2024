#include <Wire.h> //Needed for I2C to GPS

#include "SparkFun_u-blox_GNSS_v3.h" //Click here to get the library: http://librarymanager/All#SparkFun_u-blox_GNSS_v3
SFE_UBLOX_GNSS myGNSS;

void setup()
{
  Serial.begin(115200);
  Serial.println("SparkFun u-blox Example");

  Wire.begin();

  if (myGNSS.begin() == false)
  {
    Serial.println(F("u-blox GNSS module not detected at default I2C address. Please check wiring. Freezing."));
    while (1);
  }

  //This will pipe all NMEA sentences to the serial port so we can see them
  myGNSS.setNMEAOutputPort(Serial);
  
}

void loop()
{
  myGNSS.checkUblox(); //See if new data is available. Process bytes as they come in.

  if (myGNSS.getGnssFixOk()) // Check if the GNSS has a valid fix
    {
      // Get the current longitude and latitude
      int32_t longitude = myGNSS.getLongitude();
      int32_t latitude = myGNSS.getLatitude();

      // Convert the longitude and latitude to a human-readable format
      double longitudeFormatted = longitude / 10000000.0; // Scale down from 10^-7 to degrees
      double latitudeFormatted = latitude / 10000000.0; // Scale down from 10^-7 to degrees

      // Print the formatted longitude and latitude to the Serial Monitor
      Serial.print("Longitude: ");
      Serial.println(longitudeFormatted, 7); // Print with 7 decimal places
      Serial.print("Latitude: ");
      Serial.println(latitudeFormatted, 7); // Print with 7 decimal places
    }
  else
    {
      Serial.println("Waiting for a valid GNSS fix...");
    }


  delay(250); //Don't pound too hard on the I2C bus
}






