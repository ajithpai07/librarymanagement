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
      let walletamt;
      const tamt = document.querySelector("#totall");

      function render(doc){
        if(doc.id!="Count" && doc.data().usrid==user.uid){
        const fld1 = document.createElement('tr');      
        const fld2 = document.createElement('td');
        const fld3 = document.createElement('td');
        const fld4 = document.createElement('td');
        const fld5 = document.createElement('td');
        const fld6 = document.createElement('button');
        const fld7 = document.createElement('td');
        const fld8 = document.createElement('button');

        
        fld2.textContent=doc.data().bookid;
        fld3.textContent=doc.data().issuedon.toDate();
        if(doc.data().return==0){
          fld4.textContent="NOT RETURNED";
          fld6.textContent="Return";
          fld8.textContent="Extend"
          sum=sum+Number(doc.data().bprice);
          fld6.style.cursor="pointer";
          fld8.style.cursor="pointer";
          const str1=" Total due = ₹ ";
          const str2=sum;
          const xD = str1.concat(str2);
          tamt.textContent = xD;
        }
        else{
          fld4.textContent="RETURNED";
        }

        tabbody.appendChild(fld1);
        fld1.appendChild(fld2);
        fld1.appendChild(fld3);
        fld1.appendChild(fld4);
        fld1.appendChild(fld5);
        fld5.appendChild(fld6);
        fld1.appendChild(fld7);
        fld7.appendChild(fld8);
        
        fld6.addEventListener('click',(e) => {
            db.collection('Books').doc(doc.data().bookid).update({
                bavial: 1
            })
            .then(function() {
                db.collection('Bookings').doc(doc.id).update({
                  return: 1
                })
                .then(function() {
                    db.collection('Users').doc(user.uid).get().then(function(docu) {
                      walletamt=docu.data().wallet;
                    })
                    .then(function() {
                      let balance=parseInt(walletamt)-parseInt(doc.data().bprice);
                      console.log(parseInt(walletamt));
                      console.log(parseInt(doc.data().bprice));
                      console.log(balance);
                      if(parseInt(walletamt)-parseInt(doc.data().bprice)>=0){
                        db.collection('Users').doc(user.uid).update({
                          wallet: balance 
                        })
                        .then(function() {
                          alert("Returned Successfully!!");
                          window.location="6_prevbooking.html"
                        })
                      }
                      else{
                        db.collection('Users').doc(user.uid).update({
                          wallet: balance
                        })
                        .then(function() {
                          // alert("Clear balance for future bookings")
                          // window.location="6_prevbooking.html";
                        })
                      }
                    })
                })
            })
        })
        
        fld8.addEventListener('click', (e) => {
          e.stopPropagation();
          const today = new Date();
          const newdate = new Date();
          newdate.setDate(today.getDate()+15);
            db.collection('Bookings').doc(doc.id).update({
               duedate: newdate,
               bprice: Number(doc.data().bprice+20)
             })
          })

        }
      }
  
      db.collection('Bookings').get().then((snapshot) => {
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