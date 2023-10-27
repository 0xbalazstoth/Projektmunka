import 'package:authenticator_app/styles/styles.dart';
import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';

class QrScanner extends StatefulWidget {
  final void Function(Barcode) onScanned;

  const QrScanner({required this.onScanned});

  @override
  _QrScannerState createState() => _QrScannerState();
}

class _QrScannerState extends State<QrScanner> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  late QRViewController controller;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Scan your QR code.'),
        backgroundColor: COLOR_PRIMARY,
      ),
      body: Column(
        children: [
          Expanded(
            child: QRView(
              key: qrKey,
              onQRViewCreated: _onQRViewCreated,
            ),
          ),
        ],
      ),
    );
  }

  void _onQRViewCreated(QRViewController controller) {
    this.controller = controller;

    controller.scannedDataStream.listen((scanData) {
      // Handle the scanned data here
      widget.onScanned(scanData);

      if (Navigator.of(context).canPop()) {
        // Close the scanner screen
        Navigator.pop(context);
      } else {
        // If there are no pages in the stack, you might want to navigate to a different screen or handle it accordingly.
        print("Nowhere to pop!");
      }
    });
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}
