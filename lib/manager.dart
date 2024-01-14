import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class AdminPage extends StatefulWidget {
  @override
  _AdminPageState createState() => _AdminPageState();
}

class _AdminPageState extends State<AdminPage> {
  TextEditingController searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Gestion des Demandes (Manager)'),
      ),
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.all(16),
            child: TextField(
              controller: searchController,
              decoration: InputDecoration(
                labelText: 'Rechercher une demande',
                suffixIcon: IconButton(
                  icon: Icon(Icons.search),
                  onPressed: () {
                    searchRequests(searchController.text);
                  },
                ),
              ),
            ),
          ),
          Expanded(
            child: StreamBuilder(
              stream: FirebaseFirestore.instance.collection('requests').snapshots(),
              builder: (context, AsyncSnapshot<QuerySnapshot> snapshot) {
                if (!snapshot.hasData) {
                  return CircularProgressIndicator();
                }
                var requests = snapshot.data!.docs;
                return ListView.builder(
                  itemCount: requests.length,
                  itemBuilder: (context, index) {
                    var request = requests[index];
                    var data = request.data() as Map<String, dynamic>;
                    return ListTile(
                      title: Text('ID: ${request.id}'),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Description: ${data['description']}'),
                          Text('Type: ${data['type']}'),
                          Text('Date: ${data['date']}'),
                          Text('État: ${data['status']}'),
                        ],
                      ),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: Icon(Icons.check),
                            onPressed: () {
                              acceptRequest(request.id);
                            },
                          ),
                          IconButton(
                            icon: Icon(Icons.close),
                            onPressed: () {
                              rejectRequest(request.id);
                            },
                          ),
                        ],
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  void acceptRequest(String requestId) {
    FirebaseFirestore.instance.collection('requests').doc(requestId).update({
      'status': 'Accepté',
    });
  }

  void rejectRequest(String requestId) {
    FirebaseFirestore.instance.collection('requests').doc(requestId).update({
      'status': 'Rejeté',
    });
  }

  

void searchRequests(String query) {
  FirebaseFirestore.instance
      .collection('requests')
      .where('id', isEqualTo: query) 
      .where('description', isGreaterThanOrEqualTo: query) 
      .where('type', isGreaterThanOrEqualTo: query) 
      .snapshots()
      .listen((QuerySnapshot<Map<String, dynamic>> snapshot) {
    for (QueryDocumentSnapshot<Map<String, dynamic>> document in snapshot.docs) {
      print(document.data());
    }
  });
}

}
