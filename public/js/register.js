// Your web app's Firebase configuration
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

const signupForm=document.querySelector("#Register");

signupForm.addEventListener('submit',(e) =>{
  e.preventDefault();

  const name=signupForm['name'].value;
  const Dob=signupForm['Dob'].value;
  const email=signupForm['email'].value;
  const phno=signupForm['phno'].value;
  const password=signupForm['password'].value;
  const dno=signupForm['dno'].value;
  const strtname=signupForm['strtname'].value;
  const City=signupForm['City'].value;
  const pcode=signupForm['pcode'].value;
  const p1=signupForm['p1'].value;
  const p2=signupForm['p2'].value;
  const p3=signupForm['p3'].value;
  const KYCtype=signupForm['KYCtype'].value;
  const Kycid=signupForm['Kycid'].value;
  // const Kycimg=signupForm['Kycimg'].value;
  
  auth.createUserWithEmailAndPassword(email, password).then(cred =>{
    //signing user in
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
      if(user){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            const userId=user.uid;
            db.collection('Users').doc(userId).set({
              name: name,
              Dob: Dob,
              email: email,
              phno: phno,
              password: password,
              dno: dno,
              strtname: strtname,
              City: City,
              pcode: pcode,
              p1: p1,
              p2: p2,
              p3: p3,
              KYCtype: KYCtype,
              Kycid: Kycid
            });
          }
          else{
            //no user signed in
          }
        });
        
      }
    })
    .catch(function(error){
      console.log(error.message);
    });
  })
  .catch(function(error){
    console.log(error.message);
  });
});