const bodySchema = {
    type: "object",
    properties: {
        longUrl: { type: "string" },
    },
    required: ["longUrl"],
    additionalProperties: false
  }
  
  module.exports = bodySchema;
  