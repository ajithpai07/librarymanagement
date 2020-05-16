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
  
  const loginForm=document.querySelector("#login"); 

loginForm.addEventListener('submit',(e) =>{
  e.preventDefault();
    const email=loginForm['email'].value;
    const password=loginForm['password'].value;

    auth.signInWithEmailAndPassword(email,password).then(function(user){
      if(user){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in. 
            db.collection('Users').doc(user.uid).get().then(function(doc) {
              if(doc.exists) {
                console.log("data is ", doc.data());
                if(doc.data().role=="customer"){
                  alert("Login successful");
                  window.location="2_home.html";
                }
                else{
                  if(doc.data().role=="admin"){
                    alert("Login successful");
                    window.location="1lib_home.html";
                  }
                  else{
                    alert("Your account is not secure please contact us in help");
                  }
                }
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
            console.log("no user is signed in");
          }
        });
       
    }
    })
    .catch(function(error) {
      const fd12=document.querySelector("#fld12");
      fd12.textContent="*Invalid username or password";
    });
});
