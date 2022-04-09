import app from './app'

app.listen(process.env.PORT, async () => {

  console.log("My App is running on port " + process.env.PORT);
})