import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:pfa/manager.dart';
import 'package:pfa/user.dart';
import 'register.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool _isObscure3 = true;
  bool isLoading = false;
  final _formKey = GlobalKey<FormState>();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  final _auth = FirebaseAuth.instance;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: <Widget>[
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [Colors.yellow!, const Color.fromARGB(255, 91, 51, 37)],
              ),
            ),
          ),
          SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(height: 80),
                  Text(
                    "Login",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                      fontSize: 40,
                    ),
                  ),
                  SizedBox(height: 20),
                  _buildForm(),
                  SizedBox(height: 20),
                  _buildLoginButton(),
                  SizedBox(height: 10),
                  _buildLoadingIndicator(),
                  SizedBox(height: 20),
                  _buildRegisterButton(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildForm() {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: emailController,
            decoration: InputDecoration(
              filled: true,
              fillColor: Colors.white,
              hintText: 'Email',
              contentPadding: const EdgeInsets.all(15),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            validator: (value) {
              if (value!.isEmpty) {
                return "Email cannot be empty";
              }
              if (!RegExp(
                      "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]")
                  .hasMatch(value)) {
                return "Please enter a valid email";
              } else {
                return null;
              }
            },
            keyboardType: TextInputType.emailAddress,
          ),
          SizedBox(height: 20),
          TextFormField(
            controller: passwordController,
            obscureText: _isObscure3,
            decoration: InputDecoration(
              filled: true,
              fillColor: Colors.white,
              hintText: 'Password',
              contentPadding: const EdgeInsets.all(15),
              suffixIcon: IconButton(
                icon: Icon(_isObscure3
                    ? Icons.visibility
                    : Icons.visibility_off),
                onPressed: () {
                  setState(() {
                    _isObscure3 = !_isObscure3;
                  });
                },
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            validator: (value) {
              RegExp regex = RegExp(r'^.{6,}$');
              if (value!.isEmpty) {
                return "Password cannot be empty";
              }
              if (!regex.hasMatch(value)) {
                return "Please enter a valid password (min. 6 characters)";
              } else {
                return null;
              }
            },
            keyboardType: TextInputType.visiblePassword,
          ),
        ],
      ),
    );
  }

  Widget _buildLoginButton() {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        primary: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
      onPressed: () {
        _login();
      },
      child: Padding(
        padding: const EdgeInsets.all(15.0),
        child: Text(
          "Login",
          style: TextStyle(
            fontSize: 20,
            color: Colors.deepOrange,
          ),
        ),
      ),
    );
  }

  Widget _buildLoadingIndicator() {
    return Visibility(
      visible: isLoading,
      child: CircularProgressIndicator(
        color: Colors.white,
      ),
    );
  }

  Widget _buildRegisterButton() {
    return TextButton(
      onPressed: () {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => Register(),
          ),
        );
      },
      child: Text(
        "Register Now",
        style: TextStyle(
          color: Colors.white,
          fontSize: 18,
        ),
      ),
    );
  }

  void _login() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        isLoading = true;
      });

      try {
        UserCredential userCredential =
            await _auth.signInWithEmailAndPassword(
          email: emailController.text,
          password: passwordController.text,
        );
        _route();
      } on FirebaseAuthException catch (e) {
        if (e.code == 'user-not-found') {
          print('No user found for that email.');
        } else if (e.code == 'wrong-password') {
          print('Wrong password provided for that user.');
        }
      } finally {
        setState(() {
          isLoading = false;
        });
      }
    }
  }

  void _route() {
    User? user = _auth.currentUser;
    FirebaseFirestore.instance
        .collection('users')
        .doc(user!.uid)
        .get()
        .then((DocumentSnapshot documentSnapshot) {
      if (documentSnapshot.exists) {
        if (documentSnapshot.get('rool') == "Teacher") {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(
              builder: (context) => AdminPage(),
            ),
          );
        } else {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(
              builder: (context) => UserPage(),
            ),
          );
        }
      } else {
        print('Document does not exist on the database');
      }
    });
  }
}
