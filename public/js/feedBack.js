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

var fbid;
var num;

const support = document.querySelector("#support");

support.addEventListener('submit',(e) => {
    e.preventDefault();

    db.collection('Feedback').doc('Count').get().then(function(doc) {
        fbid="Feedback"+Number(Number(doc.data().count)+Number(1))
        num=Number(doc.data().count)
    })
    .then(function() {
       const fld1 = document.querySelector("#fld1");     
       const fld2 = document.querySelector("#fld2"); 
       const fld3 = document.querySelector("#fld3"); 
       const fld4 = document.querySelector("#fld4"); 
       
       db.collection('Feedback').doc(fbid).set({
            name: fld1.value,
            email: fld2.value,
            subject: fld3.value,
            message: fld4.value
       })
       .then(function() {
           db.collection('Feedback').doc('Count').update({
               count: Number(Number(num)+Number(1))
           })
           .then(function() {
               alert('Recorded your message!!')
               window.location="cs.html";
           })
       })

    })
})