#include <Wire.h> //Needed for I2C to GNSS

#include <SparkFun_u-blox_GNSS_v3.h> //http://librarymanager/All#SparkFun_u-blox_GNSS_v3

SFE_UBLOX_GNSS myGNSS; // SFE_UBLOX_GNSS uses I2C. For Serial or SPI, see Example2 and Example3

void setup()
{
  Serial.begin(115200);
  delay(1000); 
  Serial.println("SparkFun u-blox Example");

  Wire.begin(); // Start I2C

  //myGNSS.enableDebugging(); // Uncomment this line to enable helpful debug messages on Serial

  while (myGNSS.begin() == false) //Connect to the u-blox module using Wire port
  {
    Serial.println(F("u-blox GNSS not detected at default I2C address. Retrying..."));
    delay (1000);
  }

  myGNSS.setI2COutput(COM_TYPE_UBX); //Set the I2C port to output UBX only (turn off NMEA noise)
  
}

void loop()
{
  // Request (poll) the position, velocity and time (PVT) information.
  // The module only responds when a new position is available. Default is once per second.
  // getPVT() returns true when new data is received.
  if (myGNSS.getPVT() == true)
  {

    // int32_t latitude = myGNSS.getLatitude();
    // Serial.print(F("Latitude: "));
    // Serial.println(latitude);

    // int32_t longitude = myGNSS.getLongitude();
    // Serial.print(F("Longitude: "));
    // Serial.println(longitude);

    // int32_t altitude = myGNSS.getAltitude();
    // Serial.print(F("Altitude: "));
    // Serial.println(altitude);

    int32_t latitude = myGNSS.getLatitude();
    float latitudeScaled = latitude * 1e-7; // Multiplying by 10^(-7)
    Serial.print(F("Latitude: "));
    Serial.println(latitudeScaled, 7); // Printing with 7 decimal places

    int32_t longitude = myGNSS.getLongitude();
    float longitudeScaled = longitude * 1e-7; // Multiplying by 10^(-7)
    Serial.print(F("Longitude: "));
    Serial.println(longitudeScaled, 7); // Printing with 7 decimal places

    int32_t altitude = myGNSS.getAltitude();
    float altitudeScaled = altitude * 1e-7; // Multiplying by 10^(-7)
    Serial.print(F("Altitude: "));
    Serial.println(altitudeScaled, 7); // Assuming you want to scale altitude similarly


  }
}
