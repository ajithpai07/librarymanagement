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

      const tabbody = document.querySelector("#tabbody");
      let sum=0;
      const tamt = document.querySelector("#totall");

      function render(doc){
        if(doc.data().usrid==user.uid){
        const fld1 = document.createElement('tr');      
        const fld2 = document.createElement('td');
        const fld3 = document.createElement('td');
        const fld4 = document.createElement('td');
        const fld5 = document.createElement('td');
        const fld6 = document.createElement('button');

        db.collection('Books').doc(doc.data().bookid).get().then(function(docu) {
            fld2.textContent=docu.id;
            fld3.textContent=docu.data().bname;
            fld4.textContent=docu.data().bprice;
            fld6.textContent="Delete";
            sum=sum+Number(docu.data().bprice);
        })
        .then(function() {
            tabbody.appendChild(fld1);
            fld1.appendChild(fld2);
            fld1.appendChild(fld3);
            fld1.appendChild(fld4);
            fld1.appendChild(fld5);
            fld5.appendChild(fld6);
            const str1=" Total price = ₹ ";
            const str2=sum;
            const xD = str1.concat(str2);
            tamt.textContent = xD;
        })
        
        fld6.addEventListener('click',(e) => {
            db.collection('Books').doc(doc.data().bookid).update({
                bavial: 1
            })
            .then(function() {
                db.collection('Cart').doc(doc.id).delete().then(function() {
                    window.location="6_cart.html";
                })
            })
        })
  
        }
      }
  
      db.collection('Cart').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          render(doc);
        })
      })

    } else {
      // No user is signed in.
      console.log("not signed-in");
      window.location="3_login.html";
    }
});