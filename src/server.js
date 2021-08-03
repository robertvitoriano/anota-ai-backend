const app = require('./app')
const { PORT } = require('../config/variables')
const truncate = require('./../__tests__/utils/truncate')

app.listen(PORT, async () => {

  console.log("My App is running on port " + PORT);
})
