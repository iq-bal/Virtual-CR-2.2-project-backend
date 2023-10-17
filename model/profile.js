const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name:{
        
    },
    roll:{
        
    },
    mobile:{
        
    },
    dob:{
        
    },
    blood:{

    },
    gender:{

    },
    nickname:{
        type: String,
        default:"",
    },
    favPersonality:{
        type: String,
        default:""
    },
    pov:{
        type: String,
        default:""
    },
    candle:{
        type: String,
        default:""
    },
    favMoment:{
        type:String,
        default:""
    },
    favQoute:{
        type:String,
        default:""
    },
    loveCount:{
        type:Number,
        default:0,
    },
    bio:{
        type:String,
        default:"Bio"
    },
    facebook:{
        type:String,
        default:""
    },
    instagram:{
        type:String,
        default:""
    },
    github:{
        type:String,
        default:""
    },
    attendance:{
        type: Map, // Use Map data type
        of: Number, // Values should be numbers
        default: {} // Default is an empty object
    },
    profilePicture:{
        default:'uploads/default/avatar_male.jpg',
        type: String
    }
})

module.exports = mongoose.model('Profile',profileSchema);