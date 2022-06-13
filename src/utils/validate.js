const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const Validate = {};

Validate.body  = (data,schema) => {
    const validate = ajv.compile(schema)
    const valid = validate(data)
    if( valid ){
        console.log('body validate success')
    }else{
        console.log('body validate fail')
        return validate.errors;
    }
}

module.exports = { Validate }
