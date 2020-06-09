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
      
      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];

      const bid = document.querySelector("#bid");
      const name = document.querySelector("#name");
      const genre = document.querySelector("#genre");
      const author = document.querySelector("#author")
      const publisher = document.querySelector("#publisher");
      const price = document.querySelector("#price");

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
        const fld9 = document.createElement('td');

        fld2.setAttribute('id','myBtn')
        fld2.textContent=doc.data().bookid;
        fld3.textContent=doc.data().issuedon.toDate().getDate()+"/"+Number(Number(doc.data().issuedon.toDate().getMonth())+Number(1))+"/"+doc.data().issuedon.toDate(). getFullYear();
        fld9.textContent = doc.data().duedate.toDate().getDate()+"/"+Number(Number(doc.data().duedate.toDate().getMonth())+Number(1))+"/"+doc.data().duedate.toDate(). getFullYear();
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
        fld1.appendChild(fld9);
        fld1.appendChild(fld4);
        fld1.appendChild(fld5);
        fld5.appendChild(fld6);
        fld1.appendChild(fld7);
        fld7.appendChild(fld8);

        fld2.addEventListener('click', (e)=> {
          e.stopPropagation();

          modal.style.display = "block";
          
          bid.textContent="Book ID        : "+doc.data().bookid;
          
          db.collection('Books').doc(doc.data().bookid).get().then(function(docu) {
            name.textContent = "Book name      : "+docu.data().bname;
            genre.textContent = "Genre          : "+docu.data().booktype;
            author.textContent = "Author         : "+docu.data().bauthor;
            publisher.textContent = "Publisher      : "+docu.data().publisher;
            price.textContent = "Price          : "+docu.data().bprice;
          })

          span.onclick = function() {
            modal.style.display = "none";
          }

          window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
          }
        }

        })
        
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
                          window.location="product_review.html";
                        })
                      }
                      else{
                        db.collection('Users').doc(user.uid).update({
                          wallet: balance
                        })
                        .then(function() {
                          alert("Clear balance for future bookings")
                          window.location="5_wallet.html";
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
          newdate.setDate(doc.data().duedate.toDate().getDate()+15);
            db.collection('Bookings').doc(doc.id).update({
               duedate: newdate,
               bprice: Number(doc.data().bprice+20)
             })
             .then(function() {
               alert('Extended successfully');
               window.location="6_prevbooking.html";
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