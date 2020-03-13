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
      const fld1=document.querySelector("#fld1");
      
      function render(doc){
        const fd1= document.createElement('span');

        fd1.textContent=doc.data().name;

        fld1.appendChild(fd1);
      }
      db.collection('Users').doc(user.uid).get().then(function(doc) {
        if(doc.exists) {
          console.log("data is ", doc.data());
          render(doc);
        }
        else {
          console.log("no document");
        }
      })
        .catch(function(error) {
          console.log("error"+error);
        });
    } else {
      // No user is signed in.
      console.log("not present");
      window.location="3_login.html";
    }
  });