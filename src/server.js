const {PORT} =  require('../config/variables')

express = require('express');

const cors = require('cors');

const router = require('./routes/router.js');

const emailJob  = require('./jobs/emailJob')

require('./database/connection');

app = express();

app.use(cors());

app.get('/',(request, response)=>{

    response.json({
        message:'API is running !'
    })

})
app.use(express.json());
app.use(router);


emailJob.start()




app.listen(PORT,()=>{
    console.log("My App is running on port "+PORT);
})