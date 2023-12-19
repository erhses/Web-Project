const express = require('express');
const app = express();

const PORT  = process.env.PORT || 5000;

app.use('/app', express.static('app'));

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
    res.sendFile('app/account.html', {root: __dirname })
});
app.get('/register', (req, res) => {
    res.sendFile('app/signUp.html', {root: __dirname })
});


app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
});
