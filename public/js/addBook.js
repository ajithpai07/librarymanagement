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
const ref = firebase.storage().ref();

auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.uid)
    
        const addbook = document.querySelector("#addbook");

        addbook.addEventListener('submit',(e) =>{
            e.preventDefault();

            const fld1=addbook['fld1'].value;
            const fld2=addbook['fld2'].value;
            const fld3=addbook['fld3'].value;
            const fld4=addbook['fld4'].value;
            const fld5=addbook['fld5'].value;
            let url1;
            const file=document.querySelector("#bookimg").files[0];
            const p_name=new Date()+'-'+file.name;
            const metadata ={
                contentType:file.type
            }
            let count;
            const task=ref.child(p_name).put(file,metadata);
            task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => { url1 = url; remverr();});
            
            function remverr2(){
                db.collection("Books").doc("APeHpv6rzI8vRTeF8gPj").update({
                    count: count
                }).then(function() {window.location="book_add.html";});
            }
            function remverr(){
            db.collection('Books').doc("APeHpv6rzI8vRTeF8gPj").get().then(function(doc) {
                if(doc.exists) {
                    console.log("data is ", doc.data());
                    count = doc.data().count; 
                    count = count+1
                    const str1="TLB"
                    const str2=count
                    const bookId = str1.concat(str2);
                    console.log(bookId);
                    
                    const fd12=document.querySelector("#fld12");
                    fd12.textContent="Added Successfully";

                    db.collection('Books').doc(bookId).set({
                        booktype: fld1,
                        bname: fld2,
                        bauthor: fld3,
                        publisher: fld4,
                        bprice: fld5,
                        bavial: 1,
                        bimg: url1
                    });
        
                }
                else {
                    console.log("no document");
                }
            })
            .then(function() {remverr2()})
            .catch(function(error) {
                console.log("error"+error);
            });
            
        }
        })
    } else {
      // No user is signed in.
      console.log("not present");
      window.location="3_login.html";
    }
  });