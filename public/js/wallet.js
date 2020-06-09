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

      const fld8=document.querySelector("#fld8");
      const fld2=document.querySelector("#fld2");
      const fld3=document.querySelector("#fld3");
      const fld4=document.querySelector("#fld4");
      const fld5=document.querySelector("#fld5");
      const fld6=document.querySelector("#fld6"); 
      
      var today=new Date();
      var mm=today.getMonth()+1;
      var yy=today.getFullYear();

      function render(doc){

          fld2.value=doc.data().cardno;
          fld3.value=doc.data().cardholder;            
          fld4.value=doc.data().expire_m;
          fld5.value=doc.data().expire_y;            
          fld6.value=doc.data().cvc;
      }

      db.collection('Users').doc(user.uid).get().then(function(doc) {
          if(doc.exists) {
            console.log("data is ", doc.data());
            const fd8= document.createElement('span'); 
            fld8.appendChild(fd8);           
            fd8.textContent=doc.data().wallet;
            if(doc.data().saved==1){
              render(doc);
            }
          }
          else {
            console.log("no document");
          }
        })
        .catch(function(error) {
            console.log("error"+error);
      });

      const card=document.querySelector("#card");

      card.addEventListener('submit',(e) => {
          e.preventDefault();

          const fd1=parseInt(card['fld1'].value);
          const fd2=card['fld2'].value;
          const fd3=card['fld3'].value;
          const fd4=card['fld4'].value;
          const fd5=card['fld5'].value;
          const fd6=card['fld6'].value;
        if(fd5>yy){
          db.collection('Users').doc(user.uid).get().then(function(doc) {
              if(doc.exists) {
                  const bal=parseInt(doc.data().wallet);
                  const cbal=(fd1+bal);
                  db.collection("Users").doc(user.uid).update({
                      wallet: cbal
                  })
                  .then(function() {
                    window.location="5_wallet.html";
                  });
              }
          });

          if(card['fld7'].checked){
              db.collection("Users").doc(user.uid).update({
                  cardno: fd2,
                  cardholder: fd3,
                  expire_m: fd4,
                  expire_y: fd5,
                  cvc: fd6,
                  saved: 1
              })
              .then(function() {
                window.location="5_wallet.html";
              });
           }
         }
         else{
           if(fd5==yy && fd4>=mm){
            db.collection('Users').doc(user.uid).get().then(function(doc) {
              if(doc.exists) {
                  const bal=parseInt(doc.data().wallet);
                  const cbal=(fd1+bal);
                  db.collection("Users").doc(user.uid).update({
                      wallet: cbal
                  })
                  .then(function() {
                    window.location="5_wallet.html";
                  });
              }
          });

          if(card['fld7'].checked){
              db.collection("Users").doc(user.uid).update({
                  cardno: fd2,
                  cardholder: fd3,
                  expire_m: fd4,
                  expire_y: fd5,
                  cvc: fd6,
                  saved: 1
              })
              .then(function() {
                window.location="5_wallet.html";
              });
           }
           }
           else{
             console.log(yy);
             alert('Please enter a not expired card');
             window.location="5_wallet.html";
           }
         }
        });


  } else {
    // No user is signed in.
    console.log("not present");
    window.location="3_login.html";
  }
});