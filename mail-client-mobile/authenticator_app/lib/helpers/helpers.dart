import 'dart:math';

import 'package:flutter/material.dart';

Map<String, String> parseTotpUrl(String url) {
  Uri uri = Uri.parse(url);
  Map<String, String> params = {};

  params['secret'] = uri.queryParameters['secret'] ?? '';
  params['issuer'] = Uri.decodeFull(uri.queryParameters['issuer'] ?? '');

  return params;
}

Color getRandomColor() {
  Random random = Random();
  return Color.fromRGBO(
    random.nextInt(256),
    random.nextInt(256),
    random.nextInt(256),
    1.0,
  );
}
