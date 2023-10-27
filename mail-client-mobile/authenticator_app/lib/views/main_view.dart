import 'package:authenticator_app/components/c_input.dart';
import 'package:authenticator_app/styles/styles.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:otp_util/otp_util.dart'; // https://pub.dev/packages/otp_util

class MainView extends StatefulWidget {
  const MainView({super.key});

  @override
  State<MainView> createState() => _MainViewState();
}

class _MainViewState extends State<MainView> {
  @override
  Widget build(BuildContext context) {
    TOTP totp =
        TOTP(secret: "IY5HKWRKONXVGM3BFZGWGW3YMVIUGJJWMQXT4YLQO5JFKW22ENXQ");

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
                        padding: EdgeInsets.all(0), // Set padding to zero
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
                        onPressed: () {},
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
                Text(totp.now())
              ],
            ),
          ),
        ),
      ),
    );
  }
}
