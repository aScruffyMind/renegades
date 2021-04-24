require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
const Schema = mongoose.Schema;
app.set('view engine', 'ejs');

const mongoUrl = process.env.HOST; // use dotenv

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

function mongo(state) {
    if (state === 'connect') {
        mongoose.connect(mongoUrl, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            })
            .then(() => {
                console.log('connected to db!');
            })
            .catch((err) => {
                console.log('something is wrong with db connection');
            });
    } else if (state === 'close') {
        mongoose.connection.close();
    }
}

const trainerSchema = new Schema({
    trainer: String,
    team: String,
    friendCode: String
});

const Trainer = mongoose.model('Trainer', trainerSchema);

app.get('/', function (req, res) {
       mongo('connect')
       Trainer.find({}, function (err, foundTrainers) {
            mongo('close');
            res.render('index', {
                trainerData: foundTrainers,
            });
       });
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 6969;
}

app.listen(port, function () {
    console.log("Server started on port " + port);
});