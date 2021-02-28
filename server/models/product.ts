import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    name: String,
    type: String,
    rating: Number,
    brandId: String,
})

export default model('Product', productSchema)
