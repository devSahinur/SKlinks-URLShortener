const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-url');

const urlSchema = new Schema({
    url : {
        type : String,
        required: true 
    },
    slug : {
        type: String,
        min: 5,
        max: 8
    },
}, {
    timestamps: true
});

urlSchema.path('url').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%#!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

var Urls = mongoose.model('Url', urlSchema);

module.exports = Urls;