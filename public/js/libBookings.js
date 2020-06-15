var firebaseConfig = {
    apiKey: "AIzaSyD785HpCFg_dudUjcuTy66k3mQ-zNXQgA4",
    authDomain: "takshashila-lib.firebaseapp.com",
    databaseURL: "https://takshashila-lib.firebaseio.com",
    projectId: "takshashila-lib",
    storageBucket: "takshashila-lib.appspot.com",
    messagingSenderId: "100677328500",
    appId: "1:100677328500:web:b9c9a4bb54f7af77463b21",
    measurementId: "G-PW6GQEYMM9"
};

firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();
const auth=firebase.auth();

auth.onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in. 
        console.log(user.uid);

        var type;
    
        db.collection('Users').doc(user.uid).get().then((doc) => {
          type = doc.data().role;
        })
        .then(function() {
          if(type=="admin"){
            const tabbody = document.querySelector("#tabbody");
            var kycf=document.querySelector("#kycf");
            var kycb=document.querySelector("#kycb");
            var propic=document.querySelector("#propic");
            var docid="";
      
            function render(doc){
              if(doc.data().return == 0){
                const fld1 = document.createElement('tr');      
                const fld2 = document.createElement('td');
                const fld3 = document.createElement('td');
                const fld4 = document.createElement('td');
                const fld5 = document.createElement('td');
                const fld6 = document.createElement('td');
                const fld7 = document.createElement('td');
                const fld8 = document.createElement('br');
    
                var d = new Date();
                var date = d.getDate();
                var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12.
                var year = d.getFullYear();
                var dateStr = date + "/" + month + "/" + year;
      
                fld2.textContent = doc.id;
                fld3.textContent = doc.data().issuedon.toDate().getDate()+"/"+Number(Number(doc.data().issuedon.toDate().getMonth())+Number(1))+"/"+doc.data().issuedon.toDate(). getFullYear();
                fld4.textContent = doc.data().duedate.toDate().getDate()+"/"+Number(Number(doc.data().duedate.toDate().getMonth())+Number(1))+"/"+doc.data().duedate.toDate(). getFullYear();
                db.collection('Users').doc(doc.data().usrid).get().then(function(docu) {
                    fld5.textContent = docu.data().name;
                    fld6.textContent = docu.data().email;
                })
                fld7.textContent = dateStr;
    
                tabbody.appendChild(fld1);
                fld1.appendChild(fld2);
                fld1.appendChild(fld3);
                fld1.appendChild(fld4);
                fld1.appendChild(fld7);
                fld1.appendChild(fld5);
                fld1.appendChild(fld6);
                tabbody.appendChild(fld8);
              }
            }
      
            db.collection('Bookings').get().then((snapshot) => {
              snapshot.docs.forEach(doc => {
                  render(doc);
                })
            })
    
          }
          else{
            window.location="3_login.html"
          }
        })
      } else {
      // No user is signed in.
      console.log("not signed-in");
      window.location="3_login.html";
    }
  });