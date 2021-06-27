const  models  = require('./../../src/models')


module.exports = ()=>{
  
  return Promise.all(Object.keys(models).map((model)=>{
    return models[model].collection.drop();
  }))

}