const getMongoUrl = () =>{
  let mongoConnection = ''

switch(process.env.ENVIRONMENT){
    case 'development':
        mongoConnection = "put your development mongo url here"
        return mongoConnection
    case 'test':
        mongoConnection = "put your tests mongo url here"
        return mongoConnection
    default :
      return ''
}

}