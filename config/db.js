const mongoose = require('mongoose');

const connect = () => { mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(con=>{
    console.log('MongoDB Database connected')
})};

module.exports = connect;