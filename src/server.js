express = require('express');
const cors = require('cors');
const router = require('./routes/router.js');

app = express();
 require('./database/connection');
app.use(express.json());
app.use(cors());
app.use(router);


app.listen(4000,()=>{
    console.log("My App is running on port 4000");
})