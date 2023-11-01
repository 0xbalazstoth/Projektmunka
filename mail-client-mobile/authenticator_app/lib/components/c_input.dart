// ignore_for_file: prefer_const_constructors

import 'package:authenticator_app/styles/styles.dart';
import 'package:flutter/material.dart';

class CInput extends StatefulWidget {
  const CInput({
    Key? key,
    required this.height,
    required this.width,
    required this.placeholder,
    required this.changed,
    required this.icon,
    required this.isInputPassword,
    required this.controller,
  }) : super(key: key);

  final double height;
  final double width;
  final String placeholder;
  final Function(String text) changed;
  final Icon icon;
  final bool isInputPassword;
  final TextEditingController controller;

  @override
  _CInputState createState() => _CInputState();
}

class _CInputState extends State<CInput> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: widget.height,
      decoration: BoxDecoration(
        color: COLOR_BG,
        border: Border.all(
          color: COLOR_PRIMARY,
          width: 2,
        ),
        borderRadius: BorderRadius.circular(15),
      ),
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.all(10),
            height: double.infinity,
            decoration: BoxDecoration(
              border: Border(
                right: BorderSide(
                  color: COLOR_PRIMARY,
                  width: 2,
                ),
              ),
            ),
            child: widget.icon,
          ),
          // TextField here
          Expanded(
            child: TextField(
              controller: widget.controller, // Use the provided controller
              onChanged: widget.changed,
              obscureText: widget.isInputPassword ? true : false,
              enableSuggestions: widget.isInputPassword ? true : false,
              autocorrect: widget.isInputPassword ? true : false,
              decoration: InputDecoration(
                hintText: widget.placeholder,
                border: InputBorder.none,
                contentPadding: EdgeInsets.all(10),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
