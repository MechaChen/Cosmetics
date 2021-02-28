import { Schema, model } from 'mongoose'

const brandSchema = new Schema({
    name: String,
    country: String,
    founders: [String],
})

export default model('Brand', brandSchema)
