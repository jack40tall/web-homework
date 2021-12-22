const { model, Schema, SchemaTypes } = require('mongoose')

const MerchantSchema = new Schema({
  id: { type: SchemaTypes.ObjectId },
  name: { type: String, default: null }
})

const MerchantModel = model('merchant', MerchantSchema)

module.exports = {
  MerchantModel,
  MerchantSchema,
  default: MerchantSchema
}
