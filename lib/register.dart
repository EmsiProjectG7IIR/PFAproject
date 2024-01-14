import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'login.dart';

class Register extends StatefulWidget {
  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  bool showProgress = false;
  final _formKey = GlobalKey<FormState>();
  final _auth = FirebaseAuth.instance;

  TextEditingController passwordController = TextEditingController();
  TextEditingController confirmpassController = TextEditingController();
  TextEditingController emailController = TextEditingController();

  var options = ['User', 'Manager'];
  var _currentItemSelected = "User";
  var rool = "User";

  bool _isObscure = true;
  bool _isObscure2 = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.brown[900],
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Container(
              color: Colors.brown,
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height,
              child: SingleChildScrollView(
                child: Container(
                  margin: EdgeInsets.all(12),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        SizedBox(height: 80),
                        Text(
                          "Register Now",
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                            fontSize: 40,
                          ),
                        ),
                        SizedBox(height: 10),
                        SizedBox(height: 50),
                        TextFormField(
                          controller: emailController,
                          decoration: InputDecoration(
                            filled: true,
                            fillColor: Colors.white,
                            hintText: 'Email',
                            contentPadding: const EdgeInsets.all(15),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(20),
                            ),
                          ),
                          validator: (value) {
                            if (value!.length == 0) {
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
                          onChanged: (value) {},
                          keyboardType: TextInputType.emailAddress,
                        ),
                        SizedBox(height: 20),
                        _buildPasswordTextField(
                            "Password", passwordController, _isObscure),
                        SizedBox(height: 20),
                        _buildPasswordTextField(
                            "Confirm Password",
                            confirmpassController,
                            _isObscure2),
                        SizedBox(height: 20),
                        _buildRoolDropdown(),
                        SizedBox(height: 20),
                        _buildButtons(),
                        SizedBox(height: 20),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPasswordTextField(
      String hintText, TextEditingController controller, bool isObscure) {
    return TextFormField(
      controller: controller,
      obscureText: isObscure,
      decoration: InputDecoration(
        suffixIcon: IconButton(
          icon: Icon(isObscure ? Icons.visibility_off : Icons.visibility),
          onPressed: () {
            setState(() {
              if (hintText == "Password") {
                _isObscure = !_isObscure;
              } else if (hintText == "Confirm Password") {
                _isObscure2 = !_isObscure2;
              }
            });
          },
        ),
        filled: true,
        fillColor: Colors.white,
        hintText: hintText,
        contentPadding: const EdgeInsets.all(15),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
      validator: (value) {
        RegExp regex = RegExp(r'^.{6,}$');
        if (value!.isEmpty) {
          return "$hintText cannot be empty";
        }
        if (!regex.hasMatch(value)) {
          return "Please enter a valid $hintText (min. 6 characters)";
        } else {
          return null;
        }
      },
      onChanged: (value) {},
    );
  }

  Widget _buildRoolDropdown() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          "Role : ",
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        DropdownButton<String>(
          dropdownColor: Colors.blue[900],
          isDense: true,
          isExpanded: false,
          iconEnabledColor: Colors.white,
          focusColor: Colors.white,
          items: options.map((String dropDownStringItem) {
            return DropdownMenuItem<String>(
              value: dropDownStringItem,
              child: Text(
                dropDownStringItem,
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
                ),
              ),
            );
          }).toList(),
          onChanged: (newValueSelected) {
            setState(() {
              _currentItemSelected = newValueSelected!;
              rool = newValueSelected;
            });
          },
          value: _currentItemSelected,
        ),
      ],
    );
  }

  Widget _buildButtons() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        _buildMaterialButton("Login", () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => LoginPage(),
            ),
          );
        }),
        _buildMaterialButton("Register", () {
          setState(() {
            showProgress = true;
          });
          signUp(emailController.text, passwordController.text, rool);
        }),
      ],
    );
  }

  Widget _buildMaterialButton(String text, VoidCallback onPressed) {
    return MaterialButton(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(20.0)),
      ),
      elevation: 5.0,
      height: 40,
      onPressed: onPressed,
      child: Text(
        text,
        style: TextStyle(
          fontSize: 20,
        ),
      ),
      color: Colors.white,
    );
  }

  void signUp(String email, String password, String rool) async {
    CircularProgressIndicator();
    if (_formKey.currentState!.validate()) {
      await _auth
          .createUserWithEmailAndPassword(email: email, password: password)
          .then((value) => {postDetailsToFirestore(email, rool)})
          .catchError((e) {});
    }
  }

  void postDetailsToFirestore(String email, String rool) async {
    FirebaseFirestore firebaseFirestore = FirebaseFirestore.instance;
    var user = _auth.currentUser;
    CollectionReference ref = FirebaseFirestore.instance.collection('users');
    ref.doc(user!.uid).set({'email': emailController.text, 'rool': rool});
    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (context) => LoginPage()));
  }
}
