const express = require('express');
const app = express();

const PORT  = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('HEllo adasd sad ')
});

app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
});