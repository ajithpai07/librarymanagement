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
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db=firebase.firestore();
  const auth=firebase.auth();
  
  const loinForm=document.querySelector("#login")

loginForm.addEventListener('submit',(e) =>{

    const email=loinForm['email'].value;
    const password=loinForm['password'].value;

    auth.signInWithEmailAndPassword(email,password).then(function(user){
      if(user){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            userId=user.uid;
            console.log(userId);
          } else {
            // No user is signed in.
          }
        });
        alert("login successful");
        window.location="2_home.html";
    }
    })
    .catch(function(error) {
      console.log(error.message);
    });
});
