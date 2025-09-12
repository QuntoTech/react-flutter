import 'package:flutter/material.dart';
import 'examples/demo_app.dart';

void main() {
  runApp(const ReactFlutterApp());
}

class ReactFlutterApp extends StatelessWidget {
  const ReactFlutterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'React+Flutter架构演示',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const DemoApp(),
      debugShowCheckedModeBanner: false,
    );
  }
}
