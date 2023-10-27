Map<String, String> parseTotpUrl(String url) {
  Uri uri = Uri.parse(url);
  Map<String, String> params = {};

  params['secret'] = uri.queryParameters['secret'] ?? '';
  params['issuer'] = Uri.decodeFull(uri.queryParameters['issuer'] ?? '');

  return params;
}
