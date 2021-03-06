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