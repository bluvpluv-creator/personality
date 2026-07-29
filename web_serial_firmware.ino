/*
 * 범용 웹 시리얼 아두이노 펌웨어 (web_serial_firmware.ino)
 * 
 * 통신 속도: 115200 bps (또는 9600 bps)
 * 명령어 포맷: <COMMAND>:<PARAM1>:<PARAM2>...
 * 
 * 지원 명령어 목록:
 *  1. PING                            -> 응답: "PONG"
 *  2. DIGITAL:WRITE:<PIN>:<VAL>        -> 응답: "OK:DIGITAL:WRITE:<PIN>:<VAL>" (VAL: 1 또는 0)
 *  3. DIGITAL:READ:<PIN>              -> 응답: "READ:DIGITAL:<PIN>:<VAL>"     (VAL: 1 또는 0)
 *  4. ANALOG:WRITE:<PIN>:<VAL>         -> 응답: "OK:ANALOG:WRITE:<PIN>:<VAL>"  (VAL: 0 ~ 255 PWM)
 *  5. ANALOG:READ:<PIN>               -> 응답: "READ:ANALOG:<PIN>:<VAL>"     (VAL: 0 ~ 1023)
 *  6. SERVO:WRITE:<PIN>:<ANGLE>       -> 응답: "OK:SERVO:WRITE:<PIN>:<ANGLE>" (ANGLE: 0 ~ 180)
 *  7. BUZZER:<PIN>:<FREQ>:<DURATION>  -> 응답: "OK:BUZZER:<PIN>:<FREQ>:<DURATION>"
 */

#include <Servo.h>

Servo myServo;

void setup() {
  Serial.begin(115200);
  while (!Serial) {
    ; // 시리얼 포트 연결 대기
  }
  Serial.println("READY:WEB_SERIAL_FIRMWARE_V1.0");
}

void loop() {
  if (Serial.available() > 0) {
    String input = Serial.readStringUntil('\n');
    input.trim();
    if (input.length() > 0) {
      processCommand(input);
    }
  }
}

void processCommand(String cmd) {
  cmd.toUpperCase();

  // 1. PING
  if (cmd == "PING") {
    Serial.println("PONG");
    return;
  }

  // Split Command by ':'
  int firstIndex = cmd.indexOf(':');
  if (firstIndex == -1) {
    Serial.println("ERROR:INVALID_FORMAT");
    return;
  }

  String mainCmd = cmd.substring(0, firstIndex);
  String subCmd = cmd.substring(firstIndex + 1);

  // 2. DIGITAL Commands (DIGITAL:WRITE:<PIN>:<VAL> or DIGITAL:READ:<PIN>)
  if (mainCmd == "DIGITAL") {
    int secondIndex = subCmd.indexOf(':');
    if (secondIndex == -1) {
      Serial.println("ERROR:INVALID_DIGITAL_FORMAT");
      return;
    }

    String action = subCmd.substring(0, secondIndex);
    String params = subCmd.substring(secondIndex + 1);

    if (action == "WRITE") {
      int thirdIndex = params.indexOf(':');
      if (thirdIndex != -1) {
        int pin = params.substring(0, thirdIndex).toInt();
        int val = params.substring(thirdIndex + 1).toInt();
        pinMode(pin, OUTPUT);
        digitalWrite(pin, val == 1 ? HIGH : LOW);
        Serial.print("OK:DIGITAL:WRITE:");
        Serial.print(pin);
        Serial.print(":");
        Serial.println(val);
      }
    } else if (action == "READ") {
      int pin = params.toInt();
      pinMode(pin, INPUT);
      int val = digitalRead(pin);
      Serial.print("READ:DIGITAL:");
      Serial.print(pin);
      Serial.print(":");
      Serial.println(val);
    }
  }

  // 3. ANALOG Commands (ANALOG:WRITE:<PIN>:<VAL> or ANALOG:READ:<PIN>)
  else if (mainCmd == "ANALOG") {
    int secondIndex = subCmd.indexOf(':');
    if (secondIndex == -1) {
      Serial.println("ERROR:INVALID_ANALOG_FORMAT");
      return;
    }

    String action = subCmd.substring(0, secondIndex);
    String params = subCmd.substring(secondIndex + 1);

    if (action == "WRITE") {
      int thirdIndex = params.indexOf(':');
      if (thirdIndex != -1) {
        int pin = params.substring(0, thirdIndex).toInt();
        int val = params.substring(thirdIndex + 1).toInt();
        pinMode(pin, OUTPUT);
        analogWrite(pin, constrain(val, 0, 255));
        Serial.print("OK:ANALOG:WRITE:");
        Serial.print(pin);
        Serial.print(":");
        Serial.println(val);
      }
    } else if (action == "READ") {
      int pin = params.toInt();
      int val = analogRead(pin);
      Serial.print("READ:ANALOG:");
      Serial.print(pin);
      Serial.print(":");
      Serial.println(val);
    }
  }

  // 4. SERVO Commands (SERVO:WRITE:<PIN>:<ANGLE>)
  else if (mainCmd == "SERVO") {
    int secondIndex = subCmd.indexOf(':');
    if (secondIndex != -1) {
      String action = subCmd.substring(0, secondIndex);
      String params = subCmd.substring(secondIndex + 1);
      if (action == "WRITE") {
        int thirdIndex = params.indexOf(':');
        if (thirdIndex != -1) {
          int pin = params.substring(0, thirdIndex).toInt();
          int angle = params.substring(thirdIndex + 1).toInt();
          myServo.attach(pin);
          myServo.write(constrain(angle, 0, 180));
          Serial.print("OK:SERVO:WRITE:");
          Serial.print(pin);
          Serial.print(":");
          Serial.println(angle);
        }
      }
    }
  }

  // 5. BUZZER Commands (BUZZER:<PIN>:<FREQ>:<DURATION>)
  else if (mainCmd == "BUZZER") {
    int firstColon = subCmd.indexOf(':');
    int secondColon = subCmd.indexOf(':', firstColon + 1);
    if (firstColon != -1 && secondColon != -1) {
      int pin = subCmd.substring(0, firstColon).toInt();
      int freq = subCmd.substring(firstColon + 1, secondColon).toInt();
      int duration = subCmd.substring(secondColon + 1).toInt();
      tone(pin, freq, duration);
      Serial.print("OK:BUZZER:");
      Serial.print(pin);
      Serial.print(":");
      Serial.print(freq);
      Serial.spacing();
      Serial.println(duration);
    }
  }

  else {
    Serial.println("ERROR:UNKNOWN_COMMAND");
  }
}
