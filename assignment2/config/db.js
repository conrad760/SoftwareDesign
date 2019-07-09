const mongoose = require('mongoose');
const confid = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected!')
    } catch (error) {
       console.error(error.message);
       // Exit process with failure 
        process.exit(1);
    }
}