import app from './app'
import variables from '../config/variables'

app.listen(variables.PORT, async () => {

  console.log("My App is running on port " + variables.default.PORT);
})