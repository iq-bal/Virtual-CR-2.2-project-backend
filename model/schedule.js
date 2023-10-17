const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    title:String,
    venue:String,
    deadline:String,
    teacher: String, 
    type: String, 
    completed:Boolean
})

module.exports = mongoose.model('Schedule',scheduleSchema);

