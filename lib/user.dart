import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:pfa/login.dart';

class UserPage extends StatefulWidget {
  @override
  _UserPageState createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController descriptionController = TextEditingController();
  String selectedType = "Matériel";
  DateTime selectedDate = DateTime.now();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Gestion des Demandes'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () async {
              await FirebaseAuth.instance.signOut();
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(
                  builder: (context) => LoginPage(), 
                ),
              );
            },
          ),
        ],
        automaticallyImplyLeading: false, 
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 20),
              Text(
                'Nouvelle Demande',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              Form(
                key: _formKey,
                child: Column(
                  children: [
                    TextFormField(
                      controller: descriptionController,
                      decoration: InputDecoration(labelText: 'Description de besoin'),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Veuillez saisir une description valide.';
                        }
                        return null;
                      },
                    ),
                    SizedBox(height: 10),
                    DropdownButtonFormField<String>(
                      value: selectedType,
                      onChanged: (value) {
                        setState(() {
                          selectedType = value!;
                        });
                      },
                      items: ['Matériel', 'Consommable', 'Aide Humain']
                          .map<DropdownMenuItem<String>>((String value) {
                        return DropdownMenuItem<String>(
                          value: value,
                          child: Text(value),
                        );
                      }).toList(),
                      decoration: InputDecoration(labelText: 'Type de demande'),
                    ),
                    SizedBox(height: 10),
                    Text('Date de la demande: ${selectedDate.toLocal()}'),
                    ElevatedButton(
                      onPressed: () async {
                        final DateTime? picked = await showDatePicker(
                          context: context,
                          initialDate: selectedDate,
                          firstDate: DateTime(2000),
                          lastDate: DateTime(2101),
                        );
                        if (picked != null && picked != selectedDate) {
                          setState(() {
                            selectedDate = picked;
                          });
                        }
                      },
                      child: Text('Choisir une date'),
                    ),
                    SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: () {
                        if (_formKey.currentState!.validate()) {
                          createRequest();
                        }
                      },
                      child: Text('Créer la Demande'),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 20),
              Text(
                'Mes Demandes',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              StreamBuilder(
                stream: FirebaseFirestore.instance
                    .collection('requests')
                    .where('userId', isEqualTo: FirebaseAuth.instance.currentUser?.uid)
                    .snapshots(),
                builder: (context, AsyncSnapshot<QuerySnapshot> snapshot) {
                  if (!snapshot.hasData) {
                    return CircularProgressIndicator();
                  }
                  var requests = snapshot.data!.docs;
                  return Column(
                    children: requests.map((request) {
                      var data = request.data() as Map<String, dynamic>;
                      return Card(
                        margin: EdgeInsets.symmetric(vertical: 10),
                        child: Padding(
                          padding: EdgeInsets.all(10),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text('ID: ${request.id}', style: TextStyle(fontWeight: FontWeight.bold)),
                                  Text('État: ${data['status']}', style: TextStyle(color: getStatusColor(data['status'])))
                                ],
                              ),
                              SizedBox(height: 5),
                              Text('Description: ${data['description']}'),
                              Text('Type: ${data['type']}'),
                              Text('Date: ${data['date']}'),
                            ],
                          ),
                        ),
                      );
                    }).toList(),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  void createRequest() async {
    var userId = FirebaseAuth.instance.currentUser?.uid;
    await FirebaseFirestore.instance.collection('requests').add({
      'userId': userId,
      'description': descriptionController.text,
      'type': selectedType,
      'date': selectedDate.toLocal().toString(),
      'status': 'En cours de traitement',
    });

    ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text('Demande ajoutée avec succès'),
      duration: Duration(seconds: 2),
    ),
  );

  }

  Color getStatusColor(String status) {
    // You can customize the colors based on different states
    switch (status) {
      case 'En cours de traitement':
        return Colors.orange;
      case 'Accepté':
        return Colors.green;
      case 'Rejeté':
        return Colors.red;
      default:
        return Colors.black;
    }
  }
}
