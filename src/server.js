express = require('express');
const cors = require('cors');
const router = require('./routes/router.js');
require('./database/connection');
app = express();
const PORT  = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(router);



app.listen(PORT,()=>{
    console.log("My App is running on port "+PORT);
})