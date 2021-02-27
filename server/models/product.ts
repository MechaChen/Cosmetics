import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    name: String,
    type: String,
    rating: Number,
    brand: String,
})

export default model('Product', productSchema)
