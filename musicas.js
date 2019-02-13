'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 //contrução de tabelas

const musicas = new Schema ({
    name :{
        type: String,
        require: this

    } ,                                                                              
    type :{
        type: String,
        require: true

    },
    price :{

        type: Double,
        require:true
    }
    
});

module.exports  = mongoose.model('musicas',musicas);