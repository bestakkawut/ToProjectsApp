var controller = require('./controller.js');
// var cl_games = ;


module.exports.views = function(app){

    app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
    });

    app.get('/games',function(req,res){
        
        res.render('games/games_1',{test:controller.cl_games(null)});
    });
    // 
    app.get('/games/:id',function(req,res){
        // res.render('games/games_1');
    });
    // Express route for incoming requests for a customer name
    app.get('/inputs/:id', function(req, res) {
        res.status(200).send(inputs[req.params.id]);
    }); 

    // Express route for any other unrecognised incoming requests
    app.get('*', function(req, res) {
        res.status(404).send('Unrecognised API call');
    });
}

