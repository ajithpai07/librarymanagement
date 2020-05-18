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
    
    const ulmain=document.querySelector("#ulmain");

    function render(doc){
      if(doc.id != "APeHpv6rzI8vRTeF8gPj" && doc.data().bavial==1){
      const fld1 = document.createElement('li');      
      const fld2 = document.createElement('div');
      const fld3 = document.createElement('a');
      const fld4 = document.createElement('img');
      const fld5 = document.createElement('div');
      const fld6 = document.createElement('div');
      const fld7 = document.createElement('h4');
      // const fld8 = document.createElement('p');
      const fld9 = document.createElement('p');
      const fld10 = document.createElement('p');
      const fld11 = document.createElement('p');
      const fld12 = document.createElement('hr');
      const fld13 = document.createElement('div');      
      const fld16 = document.createElement('a');
      const fld17 = document.createElement('b');
      const fld14 = document.createElement('div');
      const fld15 = document.createElement('a');
      const fld18 = document.createElement('br');
      fld2.setAttribute('class'," overlay-image _bp ");
      fld3.href = "book2.png";
      fld4.setAttribute('class'," image _bq ");
      fld4.src = doc.data().bimg;
      fld4.alt = "Alt text";
      fld5.setAttribute('class'," hover _br ");
      fld6.setAttribute('class'," text _q ");
      fld7.textContent=doc.data().bname;
      // fld8.textContent="Edition :1";
      fld9.textContent="Genre : "+doc.data().booktype;
      fld10.textContent="Author : "+doc.data().bauthor;
      fld11.textContent="Publisher : "+doc.data().publisher;
      fld13.setAttribute('class','ppd');
      fld16.textContent="₹ ";
      fld17.textContent= doc.data().bprice;
      fld14.setAttribute('class','addtoc');
      fld15.href="";
      fld15.textContent="Add to cart";

      console.log("Hi");

      ulmain.appendChild(fld1);
      fld1.appendChild(fld18);
      fld1.appendChild(fld2);
      fld2.appendChild(fld3);
      fld3.appendChild(fld4);
      fld3.appendChild(fld5);
      fld5.appendChild(fld6);
      fld6.appendChild(fld7);
      // fld6.appendChild(fld8);
      fld6.appendChild(fld9);
      fld6.appendChild(fld10);
      fld6.appendChild(fld11);
      fld1.appendChild(fld12);
      fld1.appendChild(fld13);
      fld13.appendChild(fld16);
      fld16.appendChild(fld17);
      fld1.appendChild(fld14);
      fld14.appendChild(fld15);

      }
    }

    db.collection('Books').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        render(doc);
      })
    })
  } 
  else {
    // No user is signed in.
    console.log("not present");
    window.location="3_login.html";
    }
  });