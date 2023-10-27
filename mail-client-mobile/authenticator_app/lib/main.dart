import "package:authenticator_app/views/main_view.dart";
import "package:flutter/material.dart";
import "package:flutter/services.dart";

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(
        SystemUiOverlayStyle(statusBarColor: Colors.transparent));

    return MaterialApp(
      title: 'OEAuth',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: "Quicksand",
      ),
      home: SafeArea(
        child: Scaffold(
          body: const MainView(),
        ),
      ),
    );
  }
}
