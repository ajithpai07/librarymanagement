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
        console.log(user.uid);

        const submit = document.querySelector("#Submit");
        const update = document.querySelector("#Update");

        function func2(doc,bookId){
            const fld2 = document.querySelector('#fld2');     
            const fld3 = document.querySelector('#fld3'); 
            const fld4 = document.querySelector('#fld4'); 
            const fld5 = document.querySelector('#fld5'); 
            const fld6 = document.querySelector('#fld6');      
            const fld7 = document.querySelector('#fld7');     
            
            fld2.value = doc.data().booktype;
            fld3.value = doc.data().bname;
            fld4.value = doc.data().bauthor;
            fld5.value = doc.data().publisher;
            fld6.value = doc.data().bprice;
            fld7.value = bookId;
        
        }
        
        submit.addEventListener('submit',(e) => {
            e.preventDefault();
            
            const bookId = submit['fld1'].value;
            db.collection('Books').doc(bookId).get().then(function(doc) {
                if(doc.exists) {
                  console.log("data is ", doc.data());
                  func2(doc,bookId);
                }
                else {
                  console.log("no document");
                }
            })
            .catch(function(error) {
                const fd13=document.querySelector("#fld13");
                fd13.textContent="No books with that id";
                window.location="book_update.html";
            });
        })

        update.addEventListener('submit',(e) => {
            e.preventDefault();

            const fd2=update['fld2'].value;
            const fd3=update['fld3'].value;
            const fd4=update['fld4'].value;
            const fd5=update['fld5'].value;
            const fd6=update['fld6'].value;
            const bId=update['fld7'].value;

            db.collection('Books').doc(bId).update({
                booktype: fd2,
                bname: fd3,
                bauthor: fd4,
                publisher: fd5,
                bprice: fd6
            })
            .then(function() {
                const fd12=document.querySelector("#fld12");
                fd12.textContent="Updated Successfully";
                window.location="book_update.html";
            })
        })

    } else {
      // No user is signed in.
      console.log("not present");
      window.location="3_login.html";
    }
  });