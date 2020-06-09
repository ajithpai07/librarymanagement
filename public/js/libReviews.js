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

      const mainhead = document.querySelector("#mainhead");

      function render(doc){
          if(doc.id != "Count"){
            const fld1 = document.createElement('div');
            const fld2 = document.createElement('pre');
            const fld3 = document.createElement('pre');
            const fld4 = document.createElement('div');
            const fld5 = document.createElement('img');
            const fld6 = document.createElement('pre');
            const fld7 = document.createElement('button');

            fld1.setAttribute('class','query');
            fld4.setAttribute('class','rating');
            fld2.textContent = "Review ID      : "+doc.id;
            fld3.textContent = "Rating         : ";
            if(doc.data().star==5){
                fld5.src="rating/5s.png";
            }
            else{
                if(doc.data().star==4){
                    fld5.src="rating/4s.png";
                }
                else{
                    if(doc.data().star==3){
                        fld5.src="rating/3s.png";
                    }
                    else{
                        if(doc.data().star==2){
                            fld5.src="rating/2s.png";
                        }
                        else{
                            if(doc.data().star==1){
                                fld5.src="rating/1s.png";
                            }
                        }
                    }
                }                
            }
            fld6.textContent = "Review         : "+doc.data().review;
            fld7.setAttribute('class','delete');
            fld7.textContent = "Delete";

            mainhead.appendChild(fld1);
            fld1.appendChild(fld2);
            fld1.appendChild(fld3);
            fld1.appendChild(fld4);
            fld4.appendChild(fld5);
            fld1.appendChild(fld6);
            fld1.appendChild(fld7);

            fld7.addEventListener('click',(e) => {
                e.stopPropagation();

                db.collection('Review').doc(doc.id).delete()
                .then(function() {
                    alert('deleted succeessfully');
                    window.location="1lib_reviews.html"
                })
            })
          }
      }
      
      db.collection('Review').get().then((snapshot) => {
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