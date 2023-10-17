const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title:{
        type: String,
        default: "",
    },
    venue:{
        type: String,
        default: "",
    },
    date:{
        type: String,
        default: "",
    },
    teacher: {
        type: String,
        default: "",
    },
    from: {
        type: String,
        default: "",
    },
    to: {
        type: String,
        default: "",
    },
})

module.exports = mongoose.model('Assignment',assignmentSchema);
