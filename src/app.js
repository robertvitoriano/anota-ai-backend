const path = require('path') 
const morgan = require('morgan')


express = require('express');

const cors = require('cors');

const router = require('./routes/router.js');

const emailJob  = require('./jobs/emailJob')

require('./database/connection');

const app = express();

app.use(morgan(":method :url :response-time  :status"))

app.use(cors());

app.get('/',(request, response)=>{

    response.json({
        message:'API is running !'
    })

})

app.set('views',path.join(__dirname+'/views/'));

app.set('view engine', 'ejs');

app.use(express.json());

app.use(router);

emailJob.start()


module.exports = app