const app = require('./app')
const { PORT } = require('../config/variables')

app.listen(PORT, async () => {

  console.log("My App is running on port " + PORT);
})