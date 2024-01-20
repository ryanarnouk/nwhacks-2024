void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial.setTimeout(1);
}

void loop() {
  // put your main code here, to run repeatedly:
  int simulatedAnalogValue = random(0, 1023);
  Serial.print("Simulated analog value: ");
  Serial.print(simulatedAnalogValue);
  delay(1000);
}