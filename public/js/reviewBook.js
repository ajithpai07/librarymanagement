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

        const review = document.querySelector('#review');

        review.addEventListener('submit',(e) => {
          e.preventDefault();
            
          const star1 = document.querySelector('#star1');          
          const star2 = document.querySelector('#star2');
          const star3 = document.querySelector('#star3');
          const star4 = document.querySelector('#star4');
          const star5 = document.querySelector('#star5');
          var star;          
          const message = review['message'].value;
          if (star5.checked) {
            star = star5.value;
          }
          else{
            if (star4.checked) {
              star = star4.value;
            }
            else{
              if (star3.checked) {
                star = star3.value;
              }
              else{
                if (star2.checked) {
                  star = star2.value;
                }
                else{
                  if (star1.checked) {
                    star = star1.value;
                  }
                }
              }
            }
          }
          var count;
          var rid;

          db.collection('Review').doc('Count').get().then((doc) => {
            count = doc.data().count;
            rid = "Review"+Number(Number(doc.data().count)+Number(1));
          })
          .then(function() {
            db.collection('Review').doc(rid).set({
              star: star,
              review: message
            })
            .then(function() {
              db.collection('Review').doc('Count').update({
                count: count+1
              })
              .then(function() {
                alert('Thanks for the review!! Hope you enjoyed the service');
                window.parent.location="2_home.html";
              })
            })
          })

        })
    } else {
      // No user is signed in.
      console.log("not signed-in");
      window.location="3_login.html";
    }
  });