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
//const storage=firebase.storage();
auth.onAuthStateChanged(function(user) {
    if (user) { 
  /*
  var selectedFile; 
	function getfile() 
	{ 
		var pic = document.getElementById("photo"); 

		// selected file is that file which user chosen by html form 
		selectedFile = pic.files[0]; 

		// make save button disabled for few seconds that has id='submit_link' 
		document.getElementById('submit_link').setAttribute('disabled', 'true'); 
		myfunction(); // call below written function 
	} 
	function myfunction() 
	{ 
		// select unique name for everytime when image uploaded 
		// Date.now() is function that give current timestamp 
		var name="123"+Date.now(); 

		// make ref to your firebase storage and select images folder 
		var storageRef = firebase.storage().ref('/images/'+ name); 

		// put file to firebase 
		var uploadTask = storageRef.put(selectedFile); 

		// all working for progress bar that in html 
		// to indicate image uploading... report 
		uploadTask.on('state_changed', function(snapshot){ 
			var progress = 
			(snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
			var uploader = document.getElementById('uploader'); 
			uploader.value=progress; 
			switch (snapshot.state) { 
				case firebase.storage.TaskState.PAUSED: 
				console.log('Upload is paused'); 
				break; 
				case firebase.storage.TaskState.RUNNING: 
				console.log('Upload is running'); 
				break; 
			} 
		}, function(error) {console.log(error); 
		}, function() { 

			// get the uploaded image url back 
			uploadTask.snapshot.ref.getDownloadURL().then( 
				function(downloadURL) { 

			// You get your url from here 
				console.log('File available at', downloadURL); 

			// print the image url 
			console.log(downloadURL); 
			document.getElementById('submit_link').removeAttribute('disabled'); 
			}); 
		}); 
	}; */
      console.log(user.uid);
    } else {
      // No user is signed in.
      console.log("not present");
      window.location="3_login.html";
    }
  });