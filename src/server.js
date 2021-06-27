const app = require('./app')
const truncate = require('./../__tests__/utils/truncate.js')
const { PORT } = require('../config/variables')


app.listen(PORT, async () => {

  console.log("My App is running on port " + PORT);
  try {

  } catch (error) {

    console.error('already truncated')

  }

})
