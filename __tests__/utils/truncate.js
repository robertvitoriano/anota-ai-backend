const  models  = require('./../../src/models')


module.exports = async()=>{

  for ( let model of Object.keys(models) ) {
    try {
      await models[String(model)].collection.drop();
    } catch (e) {
      if (e.code === 26) {
        console.log('namespace %s not found',models[String(model)].collection.name)
      } else {
        throw e;
      }
    }
}

}
  
 


