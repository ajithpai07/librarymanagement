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
      let bkingcnt;
      const tamt = document.querySelector("#totall");
      const chckout1 = document.querySelector("#chckout1");
      const chckout2 = document.querySelector("#chckout2");

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

      function render2(doc){
        if(doc.data().usrid==user.uid){
            
            db.collection('Bookings').doc('Count').get().then(function(docu) {
                bkingcnt=docu.data().count+1;
            })
            .then(function() {
                const str1="Booking";
                const str2=bkingcnt;
                const xD = str1.concat(str2);
                const today = new Date();
                const newdate = new Date();
                newdate.setDate(today.getDate()+15);

                db.collection('Bookings').doc(xD).set({
                    usrid: user.uid,
                    bookid: doc.data().bookid,
                    issuedon: today,
                    duedate: newdate
                })
                .then(function() {
                    db.collection('Cart').doc(doc.id).delete()
                    .then(function() {
                        db.collection('Bookings').doc('Count').update({
                            count: bkingcnt
                        })
                    })
                })
                
            }) 
        }
      }
      
      chckout1.addEventListener('click',(e) => {
        e.stopPropagation();

        db.collection('Cart').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
              render2(doc);
            })
        })
          
      })

      chckout2.addEventListener('click',(e) => {
        e.stopPropagation();

        db.collection('Cart').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
              render2(doc);
            })
        })
          
      })

    } else {
      // No user is signed in.
      console.log("not signed-in");
      window.location="3_login.html";
    }
});