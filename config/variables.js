const variables = process.env.PORT ? require('./production_variables') : require('./local_variables')

console.log(variables)

module.exports =  variables