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

        var countv=0;
        var countt=0;
        var cavail=0;
        var totalb=0;
        var a=0;
        var m=0;
        var p=0;
        var h=0;
        var f=0;
        var bu=0;
        var bi=0;
        var c=0;
        var e=0;
        var y=0;

        db.collection('Users').get().then((snapshot) => {
          snapshot.docs.forEach(doc => {
            countt = countt+1
            if(doc.data().role=="customer" && doc.data().Kycstatus=="Approved"){
                countv = countv+1;
            }
          })
        })
        .then(function() {
            db.collection('Books').get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    totalb = totalb+1;
                    if(doc.id != "APeHpv6rzI8vRTeF8gPj" && doc.data().bavial==1){
                        cavail = cavail+1;
                    }
                }) 
            })
            .then(function() {
                db.collection('Books').doc("APeHpv6rzI8vRTeF8gPj").get().then((doc) =>{
                    a=doc.data().Art;
                    m=doc.data().Music;
                    p=doc.data().Poetry;
                    h=doc.data().Humour;
                    f=doc.data().Fantasy;
                    bu=doc.data().Business;
                    bi=doc.data().Biography;
                    c=doc.data().Cookbooks;
                    e=doc.data().Engineering;
                    y=doc.data().Youngadult;
                })
                .then(function() {
                    // Load google charts
                    google.charts.load('current', {'packages':['corechart']});
                    google.charts.setOnLoadCallback(drawChart);

                    // Draw the chart and set the chart values
                    function drawChart() {
                    var user_data1 = google.visualization.arrayToDataTable([
                    ['Task', 'Collect users data'],
                    ['KYC verified users', countv],
                    ['KYC pending users', countt-countv-1]
                    ]);

                    var book_data = google.visualization.arrayToDataTable([
                    ['Task', 'Count'],
                    ['Books available', cavail],
                    ['Books Total', totalb]
                    ]);

                    var genre_data = google.visualization.arrayToDataTable([
                    ['Task', 'Count of books with their categories'],
                    ['Art', a],
                    ['Music', m],
                    ['Poetry', p],
                    ['Humour', h],
                    ['Fantasy', f],
                    ['Business', bu],
                    ['Biography', bi],
                    ['Cookbooks', c],
                    ['Engineering', e],
                    ['Young adult', y]
                    ]);


                    // Optional; add a title and set the width and height of the chart
                    var user1 = {'title':'User Details - KYC', 'width':550, 'height':400};
                    var book = {'title':'Book Details', 'width':550, 'height':400};
                    var genre = {'title':'Book Genres', 'width':550, 'height':400};

                    // Display the chart inside the <div> element with id="piechart"
                    var chart = new google.visualization.PieChart(document.getElementById('user-details1'));
                    chart.draw(user_data1, user1);
                    var chart = new google.visualization.BarChart(document.getElementById('book-details'));
                    chart.draw(book_data, book);
                    var chart = new google.visualization.PieChart(document.getElementById('book-genres'));
                    chart.draw(genre_data, genre);
                    }
                })
            })
          })
    } else {
      // No user is signed in.
      console.log("not signed-in");
      window.location="3_login.html";
    }
  });