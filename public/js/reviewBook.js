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
        const rating = document.querySelector('#star')

        review.addEventListener('submit',(e) => {
          e.preventDefault();
            
          const star = rating.value;
          const message = review['message'].value;
          
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