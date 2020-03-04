const functions = require("./node_modules/firebase-functions"),
    admin = require("./node_modules/firebase-admin"),
    express = require("./node_modules/express"),
    app = express(),
    bodyParser = require("./node_modules/body-parser"),
    path = require('path');
    

/*=============================================>>>>>

                = init and config =

===============================================>>>>>*/

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

/*=============================================>>>>>

            = authentication routes =

===============================================>>>>>*/

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/register",(req,res)=> {
    res.render("registerform");
});
// app.post("/register",(req,res)=>{
//     res.render("7_regform");
// });
app.get("/login",(req,res)=> {
    res.render("login");
});




/*=============================================>>>>>

                = errors =

===============================================>>>>>*/

app.use((req, res, next) => {
    res.status(404).render("errors/404");
});