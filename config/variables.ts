const variables = process.env.PORT ? require('./production_variables') : require('./local_variables')

export default variables