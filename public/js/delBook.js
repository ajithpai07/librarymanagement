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
const storage=firebase.storage();
auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.uid);

        const submit = document.querySelector("#Submit");
        const update = document.querySelector("#Delete");

        let a0=0;
        let a1=0;
        let a2=0;
        let a3=0;
        let a4=0;
        let a5=0;
        let a6=0;
        let a7=0;
        let a8=0;
        let a9=0;
        let bId;

        function func2(doc,bookId){
            const fld2 = document.querySelector('#fld2');     
            const fld3 = document.querySelector('#fld3'); 
            const fld4 = document.querySelector('#fld4'); 
            const fld5 = document.querySelector('#fld5'); 
            const fld6 = document.querySelector('#fld6');      
            const fld7 = document.querySelector('#fld7');     
            
            fld2.textContent = "Genre            :     "+doc.data().booktype;
            fld3.textContent = "Title            :     "+doc.data().bname;
            fld4.textContent = "Author           :     "+doc.data().bauthor;
            fld5.textContent = "Publisher        :     "+doc.data().publisher;
            fld6.textContent = "Price            :     ₹ "+doc.data().bprice;
            fld7.textContent = "Book ID          :     "+bookId;

            const type = doc.data().booktype;
            bId = bookId;
            
            a0=0;
            a1=0;
            a2=0;
            a3=0;
            a4=0;
            a5=0;
            a6=0;
            a7=0;
            a8=0;
            a9=0;

            if(type == "Art"){
                a0=-1;
            }
            else{
                if(type == "Music"){
                    a1=-1;
                }
                else{
                    if(type == "Poetry"){
                        a2=-1;
                    }
                    else{
                        if(type == "Humour"){
                            a3=-1;
                        }
                        else{
                            if(type == "Fantasy"){
                                a4=-1;
                            }
                            else{
                                if(type == "Business"){
                                    a5=-1;
                                }
                                else{
                                    if(type == "Biography"){
                                        a6=-1;
                                    }
                                    else{
                                        if(type == "Cookbooks"){
                                            a7=-1;
                                        }
                                        else{
                                            if(type == "Engineering"){
                                                a8=-1;
                                            }
                                            else{
                                                a9=-1;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        
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

                db.collection('Books').doc("APeHpv6rzI8vRTeF8gPj").get().then(function(doc) {
                    if(doc.exists) {
                        a0 = a0+doc.data().Art;
                        a1 = a1+doc.data().Music;                    
                        a2 = a2+doc.data().Poetry;                    
                        a3 = a3+doc.data().Humour;                    
                        a4 = a4+doc.data().Fantasy;                    
                        a5 = a5+doc.data().Business;                    
                        a6 = a6+doc.data().Biography;                    
                        a7 = a7+doc.data().Cookbooks;                    
                        a8 = a8+doc.data().Engineering;                    
                        a9 = a9+doc.data().Youngadult;
                        console.log(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9);
                    }
                    else{
                        console.log("No doc");
                    }
                })
                .then(function() {
                    db.collection("Books").doc("APeHpv6rzI8vRTeF8gPj").update({
                        Art: a0,
                        Music: a1,
                        Poetry: a2,
                        Humour: a3,
                        Fantasy: a4,
                        Business: a5,
                        Biography: a6,
                        Cookbooks: a7,
                        Engineering: a8,
                        Youngadult: a9
                    })
                    .then(function() {
                        db.collection("Books").doc(bId).get()
                        .then(function() {
                                db.collection("Books").doc(bId).delete()
                                .then(function() {
                                    const fd12=document.querySelector("#fld12");
                                    fd12.textContent="Deleted Successfully";
                                    window.location="book_delete.html";
                                })
                            })
                        })
                })
            })
            

    } else {
      // No user is signed in.
      console.log("not present");
      window.location="3_login.html";
    }
  });