express = require('express');
const cors = require('cors');
const router = require('./routes/router.js');
const emailJob  = require('./jobs/emailJob')
require('./database/connection');
app = express();
const PORT  = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(router);

emailJob.start()




app.listen(PORT,()=>{
    console.log("My App is running on port "+PORT);
})