const app = require('./app')

const { PORT }=  require('../config/variables')


app.listen(PORT,()=>{
  console.log("My App is running on port "+  PORT );
})
