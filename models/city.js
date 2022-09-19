const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique : true
    },    
    regionId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'Region'
    } ,
    popularity : {
        type : Number,
        required : true
    }  

});

module.exports = mongoose.model('City', citySchema);
