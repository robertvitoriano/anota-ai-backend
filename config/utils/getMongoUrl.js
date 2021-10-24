const getMongoUrl = () =>{
  let mongoConnection = ''

switch(process.env.ENVIRONMENT){
    case 'development':
        mongoConnection = "mongodb+srv://robertvitoriano:80spCVu8Ik8KzSRg@cluster0.btwq6.mongodb.net/anota-ai-development?retryWrites=true&w=majority"
        return mongoConnection
    case 'test':
        mongoConnection = "mongodb+srv://robertvitoriano:80spCVu8Ik8KzSRg@cluster0.btwq6.mongodb.net/anota-ai-test?retryWrites=true&w=majority"
        return mongoConnection
    default :
      return ''
}

}

module.exports = getMongoUrl();