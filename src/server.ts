import app from './app'
import { PORT } from '../config/variables'

app.listen(PORT, async () => {

  console.log("My App is running on port " + PORT);
})