const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
//var mongodb = require ('mongodb');
const url = 'mongodb://DiogoMartins:diogo2019@ds231589.mlab.com:31589/musicas'
const MongoClient = require('mongodb').MongoClient;
const $ = require ('jquery');
var ejs = require('ejs');
const ObjectId = require('mongodb').ObjectID;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());

app.listen(3000, function(){
    console.log('server running on port 3000')
});


//render paginas

//inicial(insert)
app.get('/', (req, res) => {
    res.render('index.ejs')
});


//edit
app.get('/edit', (req, res) => {
    res.render('edit.ejs')
});

//delete
app.get('/delete', (req, res) => {
    res.render('delete.ejs')
});



//conectar a bd
var db;

MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err)
    db = client.db('musicas')
    
});

//insert
app.post('/', (req, res) => {

    db.collection('musicas').insertOne(req.body, (err, result)=> {
        if (err) return console.log(err)

        console.log('guardado na base de dados')
        res.redirect('/show')
        db.collection('musicas').find().toArray(function(err, results) {
        console.log(results)
        // send HTML file populated with quotes here

            res.render('/show',results)
        });
    });
});


//cursor para ir buscar dados a bd
app.get('/', (req,res) =>{
    let cursor = db.collection('musicas').find()
})


//mostrar dados
app.get('/show',(req,res) =>{
    db.collection('musicas').find().toArray((err,results) =>{
        if (err) return console.log(err)

        res.render('show.ejs', { musicas: results })
    })
})

//fazer um update
app.route('/edit/:id').get((req,res) =>{
    var id = req.params.id

    db.collection('musicas').find(ObjectId(id)).toArray((err,result) =>{
        if(err) return res.send(err)
        res.render('edit.ejs',{musicas:result})
    })
})


.post((req,res) =>{
    var id = req.params.id
    var name2 = req.body.name
    var type2 = req.body.type
    var price2 = req.body.price
    db.collection('musicas').updateOne({_id:ObjectId(id)}, {
        $set: {
            name: name2,
            type: type2,
            price: price2
        }
    },(err,result) =>{
        if(err) return res.send(err)
        res.redirect('/show')
        console.log('base de dados atualizada')
    })
})


//fazer um delete 


app.route('/delete/:id').get((req,res) =>{
    var id = req.params.id

    db.collection('musicas').find(ObjectId(id)).toArray((err,result) =>{
        if(err) return res.send(err)
        res.render('delete.ejs',{musicas:result})
    })
})

.post((req,res)=>{
    var id = req.params.id
    var name2 = req.body.name
    var type2 = req.body.type
    var price2 = req.body.price
    db.collection('musicas').deleteOne({_id:ObjectId(id)}, {
        $set: {
            name: name2,
            type: type2,
            price: price2
        }
    },(err,result)=>{
        if(err) return res.send(err)
        res.redirect('/show')
        console.log('item apagado')
    })
})
