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
      const fd1=document.querySelector("#fd1");
      const fd2=document.querySelector("#fd2");
      const fd3=document.querySelector("#fd3");
      const fd4=document.querySelector("#fd4");
      const fd5=document.querySelector("#fd5");
      const fd6=document.querySelector("#fd6");    

      function render(doc){

        fd1.value=doc.data().name;
        fd2.value=doc.data().Dob;
        fd3.value=doc.data().dno;
        fd4.value=doc.data().strtname;
        fd5.value=doc.data().City;
        fd6.value=doc.data().pcode;
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

        const update=document.querySelector("#update");
        
        update.addEventListener('submit',(e) => {
            e.preventDefault();

            const fd1=update['fd1'].value;
            const fd2=update['fd2'].value;
            const fd4=update['fd4'].value;
            const fd5=update['fd5'].value;
            const fd6=update['fd6'].value;
            const fd3=update['fd3'].value;
            
            

            db.collection("Users").doc(user.uid).update({
                name: fd1,
                Dob: fd2,
                dno:fd3,
                strtname:fd4,
                City:fd5,
                pcode:fd6
              })
              
              const fd7=document.querySelector("#fd7");
              fd7.textContent="Updated Successfully";
              setTimeout(function() {
                fd7.textContent="";
              }, 3000);

        })
        

          // Move to a new location or you can do something else
   
    } 
    else {
      // No user is signed in.
      console.log("not present");
      window.location="3_login.html";
    }
  });