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
            if(doc.data().Kycstatus == "Pending"){
              const fld1 = document.createElement('tr');      
              const fld2 = document.createElement('td');
              const fld3 = document.createElement('td');
              const fld4 = document.createElement('td');
              const fld5 = document.createElement('td');
              const fld6 = document.createElement('button');
              const fld7 = document.createElement('td');
              const fld8 = document.createElement('br');
    
              fld2.textContent = doc.data().name;
              fld3.textContent = doc.data().Dob;
              fld4.textContent=doc.data().dno+", "+doc.data().strtname+", "+doc.data().City+", "+doc.data().pcode;
              fld5.textContent=doc.data().Kycid;
              fld6.textContent="START";
              
              tabbody.appendChild(fld1);
              fld1.appendChild(fld2);
              fld1.appendChild(fld3);
              fld1.appendChild(fld4);
              fld1.appendChild(fld5);
              fld1.appendChild(fld7);
              fld7.appendChild(fld6);
              fld1.appendChild(fld8);
    
              fld6.addEventListener('click', (e) =>{
                e.stopPropagation();
    
                kycf.src=doc.data().KYCfront;
                kycb.src=doc.data().KYCback;
                propic.src=doc.data().proimg;
                docid=doc.id
              })
    
            }
          }
    
          const upstatus = document.querySelector("#status");
          const sbmt = document.querySelector("#sbmt");
          sbmt.addEventListener('submit', (e) =>{
            e.preventDefault();
    
            db.collection('Users').doc(docid).update({
               Kycstatus: upstatus.value
            })
            .then(function() {
              alert('Status updated successfully');
              window.location="1lib_kyc_verify.html";
            })
          })
          
    
          db.collection('Users').get().then((snapshot) => {
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