const express = require('express');
const app = express();

const PORT  = process.env.PORT || 5000;

app.use(express.static("app"));
app.use(express.static("app/assets/styles/"));

// app.get('/', (req, res) => {
//     res.sendFile('app/index.html')
// });

app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
});