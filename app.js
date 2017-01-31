const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const randtoken = require('rand-token');


const app = express();
var accessLogs = fs.createWriteStream('./data/' + '/access.log', {flags: 'a'});
var token = randtoken.generate(16);
var uid = require('rand-token').uid;
var token = uid(16);

function(auth(req, res, next) {
    if(true) {
        // logged in
        next();
    } else {
        res.status(401);
        res.send('not logged in lol');
    }
};


// function killit(req, res, next){
//     console.log('no mmore');
// }
//
app.use(morgan('combined', {stream: accessLogs}));



app.post('api/login', auth, function(req, res) {
    res.send("I got a request");
});


app.get('/', function(req, res) {
    res.send("I got a request");
});


app.get("login", function(req,res) {
    res.send("login on this page");
});




app.put('/documents/:filename', function(req, res) {
    let filepath = './data/' + req.params.filename;
    var contents = req.body.contents;
    fs.writeFile(filepath, contents, function(err) {
        if (err) {
            res.status(500);
            res.json({
                message: 'Couldn\'t save file because: ' + err.message
            });
        } else {
            res.json({
                message: 'File ' + filepath + ' saved.'
            });
        }
    });
});

app.get('/documents/:filename', function(req, res) {
    let filename = req.params.filename;
    fs.readFile("./data/" + filename, function(err, contents) {
        if (err) {
            res.status(500);
            res.json({
                message: 'Couldn\'t read file because: ' + err.message
            });
        } else {
            res.json({
                filename: filename,
                contents: contents.toString()
            });
        }
    });
});

app.delete('/documents/:filename', function(req, res) {
    let filename = req.params.filename;
    fs.unlink("./data/" + filename, function(err) {
        if (err) {
            res.status(500);
            res.json({
                message: 'Couldn\'t read file because: ' + err.message
            });
        } else {
            res.render("layout.hbs")
        }
    });
});


app.get('/documents/:filename/display', function(req, res) {
    let filename = req.params.filename;
    fs.readFile("./data/" + filename, function(err, contents) {
        if (err) {
            res.status(500);
            res.json({
                message: 'Couldn\'t read file because: ' + err.message
            });
        } else {
            filecontent = contents.toString();
            res.render("hello.hbs", {
                filename: filename,
                contents: filecontent
            });
        }
    });

});

app.get('/documents', function(req, res) {
    let filepath = "./data";
    fs.readdir(filepath, function(err, files) {
        if (err) {
            res.status(500);
            res.json({
                message: 'Couldn\'t read file because: ' + err.message
            });
        } else {
            res.json({
                files: files
            });
        }
    });
});






app.listen(3000,function(){


});
