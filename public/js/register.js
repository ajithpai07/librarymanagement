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
  const KYCtype=signupForm['KYCtype'].value;
  const Kycid=signupForm['Kycid'].value;
  const Kycimg=signupForm['Kycimg'].value;

  db.collection('Users').add({
    
    name: name,
    Dob: Dob,
    email: email,
    phno: phno,
    password: password,
    KYCtype: KYCtype,
    Kycid: Kycid
  });
  
  auth.createUserWithEmailAndPassword(email, password).then(cred =>{
    console.log(cred.user.uid);
  });
  
  window.location="8_clogin.html"
});