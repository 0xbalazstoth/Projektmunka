import 'dart:async';

import 'package:authenticator_app/components/c_input.dart';
import 'package:authenticator_app/components/qr_scanner.dart';
import 'package:authenticator_app/helpers/helpers.dart';
import 'package:authenticator_app/styles/styles.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:otp_util/otp_util.dart';

class MainView extends StatefulWidget {
  const MainView({Key? key}) : super(key: key);

  @override
  State<MainView> createState() => _MainViewState();
}

class _MainViewState extends State<MainView> {
  late TOTP totp = TOTP();
  late Timer timer;
  bool isScanned = false;

  @override
  void initState() {
    super.initState();
    // Initialize the timer immediately if a value is already scanned
    if (isScanned) {
      startTimer();
    }
  }

  @override
  void dispose() {
    timer.cancel();
    super.dispose();
  }

  void startTimer() {
    timer = Timer.periodic(Duration(seconds: 1), (timer) {
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    int timeLeft = totp.interval - (DateTime.now().second % totp.interval);

    bool isLessThan10Seconds = timeLeft <= 10;
    Color indicatorColor = isLessThan10Seconds ? Colors.red : COLOR_PRIMARY;
    Color secondsTextColor = isLessThan10Seconds ? Colors.red : Colors.black;

    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Container(
          padding: EdgeInsets.only(
            top: 30,
          ),
          child: Center(
            child: Column(
              children: [
                Text(
                  "OEAuth",
                  style: TextStyle(
                    fontSize: 25,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                Row(
                  children: [
                    Expanded(
                      child: CInput(
                        height: 50,
                        width: double.infinity,
                        placeholder: "Keresés...",
                        icon: Icon(Icons.search),
                        isInputPassword: false,
                        changed: (text) {
                          print(text);
                        },
                      ),
                    ),
                    SizedBox(width: 10),
                    Align(
                      alignment: Alignment.centerRight,
                      child: CupertinoButton(
                        padding: EdgeInsets.all(0),
                        child: Container(
                          height: 55,
                          width: 55,
                          decoration: BoxDecoration(
                            color: COLOR_PRIMARY,
                            borderRadius: BorderRadius.circular(15),
                          ),
                          child: Icon(
                            Icons.add,
                            color: Colors.white,
                            size: 40,
                          ),
                        ),
                        onPressed: () {
                          showModalBottomSheet(
                            context: context,
                            builder: (BuildContext context) {
                              return QrScanner(
                                onScanned: (value) {
                                  print(value.code);

                                  final parsedData = parseTotpUrl(value.code!);
                                  final secret = parsedData["secret"]!;
                                  setState(() {
                                    totp = TOTP(secret: secret);
                                    isScanned = true;
                                    startTimer(); // Start the timer when scanned
                                  });
                                },
                              );
                            },
                          );
                        },
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 15),
                Divider(
                  height: 2,
                  thickness: 0.5,
                  color: Colors.grey[300],
                ),
                if (isScanned)
                  Column(
                    children: [
                      Text(
                        totp.secret != null && totp.secret!.isNotEmpty
                            ? totp.now().toString()
                            : 'No scanned value',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 10),
                      Stack(
                        alignment: Alignment.center,
                        children: [
                          Container(
                            width: 50, // Adjust the width as needed
                            height: 50, // Adjust the height as needed
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: Colors.grey[300], // Background color
                            ),
                          ),
                          CircularProgressIndicator(
                            value: (totp.interval - timeLeft) / totp.interval,
                            color: indicatorColor, // Indicator color
                          ),
                          Text(
                            '$timeLeft',
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: secondsTextColor, // Seconds text color
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
