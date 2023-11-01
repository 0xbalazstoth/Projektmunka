import 'dart:async';

import 'package:authenticator_app/components/c_input.dart';
import 'package:authenticator_app/components/qr_scanner.dart';
import 'package:authenticator_app/helpers/helpers.dart';
import 'package:authenticator_app/styles/styles.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:otp_util/otp_util.dart';
import "package:lottie/lottie.dart";
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MainView extends StatefulWidget {
  const MainView({Key? key}) : super(key: key);

  @override
  State<MainView> createState() => _MainViewState();
}

class _MainViewState extends State<MainView> {
  List<TOTP> totpList = [];
  List<String> totpIssuerList = [];

  final TextEditingController searchController = TextEditingController();

  late Timer timer;
  bool isScanning = false;

  @override
  void initState() {
    super.initState();
    loadData();
    if (totpList.isNotEmpty) {
      startTimer();
    }
  }

  @override
  void dispose() {
    timer.cancel();
    super.dispose();
  }

  void saveData() async {
    // Save (List<String>) totpIssuerList
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setStringList("totpIssuerList", totpIssuerList);
  }

  void loadData() async {
    // Load (List<String>) totpIssuerList
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    List<String>? savedIssuerList = prefs.getStringList('totpIssuerList');

    if (savedIssuerList != null) {
      setState(() {
        totpIssuerList = savedIssuerList;

        // Loop through totpIssuerList to push data to totpList
        totpIssuerList.forEach((x) {
          final parsedData = parseTotpUrl(x);
          final secret = parsedData["secret"]!;
          totpList.add(TOTP(secret: secret));
          startTimer();
        });
      });
    }
  }

  void clearData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.clear();
  }

  void deleteItem(int index) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text("Delete Item"),
          content: Text("Are you sure you want to delete this item?"),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text("Cancel"),
            ),
            TextButton(
              onPressed: () {
                setState(() {
                  totpList.removeAt(index);
                  totpIssuerList.removeAt(index);
                  saveData();
                });
                Navigator.pop(context);
              },
              child: Text("Delete"),
            ),
          ],
        );
      },
    );
  }

  void startTimer() {
    timer = Timer.periodic(Duration(seconds: 1), (timer) {
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    int timeLeft = totpList.isNotEmpty
        ? totpList[0].interval - (DateTime.now().second % totpList[0].interval)
        : 0;

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
                  "OEAuth.",
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
                        placeholder: "Search",
                        icon: Icon(Icons.search),
                        isInputPassword: false,
                        changed: (text) {
                          print(text);
                        },
                        controller: searchController,
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
                            Icons.qr_code,
                            color: Colors.white,
                            size: 40,
                          ),
                        ),
                        onPressed: () {
                          if (!isScanning) {
                            isScanning = true;
                            showModalBottomSheet(
                              context: context,
                              builder: (BuildContext context) {
                                return QrScanner(
                                  onScanned: (value) {
                                    if (!isScanning) return;

                                    final parsedData =
                                        parseTotpUrl(value.code!);
                                    final secret = parsedData["secret"]!;
                                    setState(() {
                                      // Initializing TOTP
                                      totpList.add(TOTP(secret: secret));

                                      // totpIssuerList.add(parsedData["issuer"]!);
                                      totpIssuerList.add(value.code!);

                                      saveData();

                                      startTimer();
                                    });
                                  },
                                );
                              },
                            ).whenComplete(() {
                              isScanning = false;
                            });
                          }
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
                SizedBox(height: 30),
                if (totpList.isNotEmpty)
                  for (int i = 0; i < totpList.length; i++)
                    Column(
                      children: [
                        Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                            parseTotpUrl(totpIssuerList[i])["issuer"]!,
                            style: TextStyle(
                              color: Colors.grey[700],
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        SizedBox(height: 10),
                        Row(
                          children: [
                            Container(
                              width: 50,
                              height: 50,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: COLOR_POSITIVE, // Background color
                              ),
                              child: Center(
                                child: Text(
                                  parseTotpUrl(totpIssuerList[i])["issuer"]![0]
                                          .toUpperCase() +
                                      parseTotpUrl(
                                              totpIssuerList[i])["issuer"]![1]
                                          .toUpperCase(),
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 20,
                                    color: Colors.grey[200],
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(width: 20),
                            Expanded(
                              child: Text(
                                totpList[i].secret != null &&
                                        totpList[i].secret!.isNotEmpty
                                    ? totpList[i].now().toString()
                                    : 'No scanned value',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            GestureDetector(
                              onTap: () => deleteItem(i),
                              child: Container(
                                width: 50,
                                height: 50,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: COLOR_NEGATIVE, // Background color
                                ),
                                child: Center(
                                  child: Icon(
                                    Icons.delete,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(width: 20),
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
                                  value: (totpList[i].interval - timeLeft) /
                                      totpList[i].interval,
                                  color: indicatorColor, // Indicator color
                                ),
                                Text(
                                  '$timeLeft',
                                  style: TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    color:
                                        secondsTextColor, // Seconds text color
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                        SizedBox(height: 10),
                        Divider(
                          color: Colors.grey[200],
                          thickness: 0.5,
                        ),
                      ],
                    ),
                if (totpList
                    .isEmpty) // Show Lottie animation only if not scanned
                  Lottie.asset('assets/illustrations/animation_s1.json'),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
