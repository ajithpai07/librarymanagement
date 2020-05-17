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
const storage=firebase.storage();

auth.onAuthStateChanged(function(user) {
    if (user) { 
      console.log(user.uid);



      const fld1=document.querySelector("#fld1");
      const fld2=document.querySelector("#fld2");
      const fld3=document.querySelector("#fld3");
      const fld4=document.querySelector("#fld4");
      const fld5=document.querySelector("#fld5");
      const fld6=document.querySelector("#fld6");
      const fld7=document.querySelector("#fld7");
      const fld8=document.querySelector("#fld8");

      function render(doc){
        const fd1= document.createElement('span');
        const fd2= document.createElement('span');
        const fd3= document.createElement('span');
        const fd4= document.createElement('span');
        const fd5= document.createElement('span');
        const fd6= document.createElement('span');
        const fd7= document.createElement('span');
        const fd8= document.createElement('span');
        const image=document.querySelector('#image');
        const staus=document.querySelector('#Kycstatus');
        
        fd1.textContent=doc.data().name;
        fd2.textContent=doc.data().Dob;
        fd3.textContent=doc.data().dno;
        fd4.textContent=doc.data().strtname;
        fd5.textContent=doc.data().City;
        fd6.textContent=doc.data().pcode;
        fd7.textContent=doc.data().KYCtype;
        fd8.textContent=doc.data().Kycid;
        status.textContent=doc.data().Kycstatus;

        fld1.appendChild(fd1);
        fld2.appendChild(fd2);
        fld3.appendChild(fd3);
        fld4.appendChild(fd4);
        fld5.appendChild(fd5);
        fld6.appendChild(fd6);
        fld7.appendChild(fd7);
        fld8.appendChild(fd8);
        image.src=doc.data().proimg;
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

    }


    else {
      // No user is signed in.
      console.log("not present");
      window.location="3_login.html";
    }
  });