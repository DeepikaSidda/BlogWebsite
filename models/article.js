const mongoose = require('mongoose');
const{ marked} = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM}= require
const articleschema = new mongoose.Schema({
    title:{
        type: String,
        required: true

    },
    description:{
        type: String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now

    },
    slug:{
        type: String,
        required: true,
        unique: true,
    },
    sanitizedHTML:{
        type:String,
        required:true
    }
})

articleschema.pre('validate', function(next){
    if(this,title){
        this.slug = slugify(this.title,{lower:true,strict:true})
    }
    if(this.markdown){
        this.sanitizedHTML = DOMPurify.sanitize(marked(this.markdown))
    }
    next()


})

module.exports=mongoose.model('Article',articleschema)