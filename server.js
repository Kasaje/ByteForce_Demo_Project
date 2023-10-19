const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 8000;
const cors = require('cors');
const dbconfig = mysql.createConnection({
    'host' : 'localhost',
    'user' : 'root',
    'password' : '',
    'database' : 'byteforce'
});
dbconfig.connect();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
   }));

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null , 'src/image')
    },
    filename : (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage : storage})

app.use(cors());

app.get('/',(req,res) => {
    return res.send("");
});

app.get('/users' , (req,res) => {
    dbconfig.query("SELECT username , password , user_id FROM user" , [] ,(error , results) =>{
        return res.json(results);
    })
})

app.get('/location_review/:location_id' , (req,res) => {
    const location_id = req.params.location_id;
    dbconfig.query("SELECT * FROM review JOIN user ON user.user_id = review.user_id WHERE location_id = ? ", [location_id] , (error , results) => {
        return res.json(results);
    });
});

app.get('/location/:location_id' , (req,res) => {
    const location_id = req.params.location_id;
    dbconfig.query("SELECT * FROM location WHERE location_id = ?" , [location_id] , (error , results) => {
        return res.json(results);
    });
});

app.get('/profile/:profile_id' , (req,res) => {
    const profile_id = req.params.profile_id;
    dbconfig.query("SELECT * FROM user WHERE user_id = ?" , [profile_id] , (error,results) => {
        return res.json(results);
    });
});


app.get('/location_like/:profile_id' , (req,res) => {
    const profile_id = req.params.profile_id;
    dbconfig.query("SELECT * FROM location_like LEFT JOIN location ON location_like.location_id = location.location_id WHERE user_id = ?" , [profile_id] , (error,results) => {
        return res.json(results);
    });
});

app.post('/delete_location_like/:location_id/:user_id', (req,res) => {
    const location_id = req.params.location_id;
    const user_id = req.params.user_id;
    const datetime_like = req.params.datetime_like;
    dbconfig.query("DELETE FROM location_like WHERE user_id = ? AND location_id = ?", [user_id , location_id ] , (error,results) => {
        return res.redirect('http://127.0.0.1:5500/location_like.html');
    });
})

app.post('/edit/user/:user_id' , upload.single('image') , (req,res) => {
    const user_id = req.params.user_id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const image = req.file;
    dbconfig.query("UPDATE user SET firstname = ? , lastname = ? , email = ? , U_Picture = ?  WHERE user_id = ? " , [firstname,lastname,email, image.path, user_id] , (error,results) => {
    })
});

app.post('/delete/user/:user_id' , (req,res) => {
    const user_id = req.params.user_id;
    dbconfig.query("DELETE FROM user WHERE user_id = ? " , [user_id] , (error,results) => {
        return res.redirect('http://127.0.0.1:5500/Main.html')
    })
});  

app.post('/add_location_like/:user_id/:location_id', (req,res) => {
    const user_id = req.params.user_id;
    const location_id = req.params.location_id;
    dbconfig.query("INSERT INTO location_like(user_id , location_id) VALUES(? , ? )", [user_id , location_id] , (error,results) => {
        return res.redirect(`http://127.0.0.1:5500/location.html?id=${location_id}`);
    })
})

app.post('/Register' ,(req,res) =>{
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    dbconfig.query("INSERT INTO user(username , firstname , lastname , email , password) VALUES(? , ? , ? , ? , ?)" ,[username , firstname , lastname ,email , password] , (error , results) =>{
        return res.redirect("http://127.0.0.1:5500/Login.html")
 }) 
});


app.post('/comment/:location_id/:user_id' , (req,res) => {
    const location_id = req.params.location_id;
    const user_id = req.params.user_id;
    const message = req.body.message;
    dbconfig.query("INSERT INTO review(user_id , location_id , review_message) VALUES(? , ? , ? )" , [user_id , location_id , message ] , (error,results) =>{
        return res.redirect(`http://127.0.0.1:5500/location.html?id=${location_id}`)
    })
});




app.listen(port , () => {
    console.log(`Server running on port ${port}`)
});

