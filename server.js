const express = require('express');
const app = express();
const {pool} = require("./dbConfig");
const bcrypt = require("bcrypt");

const PORT  = process.env.PORT || 5000;

app.use('/app', express.static('app'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile('app/index.html', {root: __dirname })
});
app.get('/map', (req, res) => {
    res.sendFile('app/map.html', {root: __dirname })
});
app.get('/services', (req, res) => {
    res.sendFile('app/services.html', {root: __dirname })
});
app.get('/login', (req, res) => {
    res.sendFile('app/signIn.html', {root: __dirname })
});
app.get('/profile', (req, res) => {
    res.sendFile('app/profile.html', {root: __dirname })
});
app.get('/register', (req, res) => {
    res.sendFile('app/signUp.html', {root: __dirname })
});


app.post('/register', async (req, res) => {
    let { email, name, password, confirm_password } = req.body;
    
    console.log({
        name,
        email,
        password,
        confirm_password
    });

        let hashed = await bcrypt.hash(password, 10);
        console.log(hashed);
        pool.query(
            `SELECT * FROM users 
            WHERE email = $1`, 
            [email],
            (err, results) => {
                if (err){
                    throw err;
                }
                console.log("reaches here");
                console.log(results.rows);
            }
        );
});


app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
});
