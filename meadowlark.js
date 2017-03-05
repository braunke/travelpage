var express = require('express');
var app = express();
//set up handlebars view engine
var handlebars = require('express-handlebars')
    //changed from book to use hbs since thats what I named my files
    .create({ defaultLayout: 'main', extname: '.hbs'});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);
//static middleware
app.use(express.static(__dirname + '/public'));
//defines array of fortune cookies
var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you do not know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];
app.get('/', function(req, res){
    res.render('home');
});
//has the aboit page display the random fortune
app.get('/about', function(req, res){
    var randomFortune =
        fortunes[Math.floor(Math.random()* fortunes.length)];
    res.render('about', { fortune: randomFortune});
});

//custom 404 page
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
//custom 500 page
app.use(function(err, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
    app.get('port')+ '; press Ctrl-C to terminate.');
});
