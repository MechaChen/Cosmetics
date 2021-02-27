const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(
    'mongodb+srv://Benson:YueGp60208@cluster0.zjfsh.mongodb.net/cosmetics?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
mongoose.connection.once('open', () => console.log('Connected to MongoDB'))

app.listen(4000, () =>
    console.log('Server is running on http://localhost:4000')
)
