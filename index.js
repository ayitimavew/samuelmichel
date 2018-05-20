const express = require('express'),
config = require('./server/configure'),
path = require('path'),
fs = require('fs'),
Gallerie = require('./models/gallerie'),
User = require('./models/user'),
formidable = require('formidable');
let app = express(); 

app.set('port', process.env.PORT || 3000);
app.set('views', `${__dirname}/views`);

app.enable('strict routing');
app.all('/lire-video/', function(req, res) { res.redirect('/lire-video/'); });
app.use('/lire-video/',express.static(__dirname+'/public'));
app.all('/detail-cours/', function(req, res) { res.redirect('/detail-cours/'); });
app.use('/detail-cours/',express.static(__dirname+'/public'));
app.all('/voir-cour/', function(req, res) { res.redirect('/voir-cour/'); });
app.use('/voir-cour/',express.static(__dirname+'/public'));
app.all('/categorie', function(req, res) { res.redirect('/categorie/'); });
app.use('/categorie/',express.static(__dirname+'/public'));
app.all('/changer', function(req, res) { res.redirect('/changer/'); });
app.use('/changer/',express.static(__dirname+'/public'));
app.all('/add-cours', function(req, res) { res.redirect('/add-cours/'); });
app.use('/add-cours/',express.static(__dirname+'/public'));
app.all('/emissions', function(req, res) { res.redirect('/emissions/'); });
app.use('/emissions/',express.static(__dirname+'/public'));
app.all('/lire', function(req, res) { res.redirect('/gallerie/'); });
app.use('/lire/',express.static(__dirname+'/public'));
app.all('/add/emission', function(req, res) { res.redirect('/add/emission/'); });
app.use('/add/emission/',express.static(__dirname+'/public'));
app.all('/editorial', function(req, res) { res.redirect('/gallerie/'); });
app.use('/editorial/',express.static(__dirname+'/public'));
app.all('/culture', function(req, res) { res.redirect('/gallerie/'); });
app.use('/culture/',express.static(__dirname+'/public'));
app.all('/gallerie', function(req, res) { res.redirect('/gallerie/'); });
app.use('/gallerie/',express.static(__dirname+'/public'));
app.all('/mes-annonces', function(req, res) { res.redirect('/mes-annonces/'); });
app.use('/mes-annonces/',express.static(__dirname+'/public'));
app.all('/commercial', function(req, res) { res.redirect('/commercials/'); });
app.use('/commercial/',express.static(__dirname+'/public'));
app.all('/add', function(req, res) { res.redirect('/gallerie/'); });
app.use('/add/',express.static(__dirname+'/public'));
app.all('/articles', function(req, res) { res.redirect('/gallerie/'); });
app.use('/articles/',express.static(__dirname+'/public'));
app.all('/modifier/article', function(req, res) { res.redirect('/gallerie/'); });
app.use('/modifier/article/',express.static(__dirname+'/public'));
app.all('/show/donnations', function(req, res) { res.redirect('/show/donnations/'); });
app.use('/show/donnations/',express.static(__dirname+'/public'));



app.use( express.static(path.join(__dirname,'/public')));
app = config(app);



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    return next();
    res.redirect('/');
 }

app.post('/upload/profil', isLoggedIn, (req,res) => {
    // create an incoming form object
  var form = new formidable.IncomingForm();
  
    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;
  
    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname,'/public/img/profil');
  
    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name));
      let photo = req.user.photo;
      if(photo!=='default.png')
      {
          fs.unlinkSync(path.join(__dirname,'/public/img/profil/'+photo));
      }

      User.findByIdAndUpdate(req.user.id, {photo:file.name}, (err, user)=>{
          if(err){
              console.log(err)
          }
      })

     
      
    });
  
    // log any errors that occur
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });
  
    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
       res.redirect('/modifier-profil')
    });
  
    // parse the incoming request containing the form data
    form.parse(req);

    
})



app.post('/gallerie/1', (req,res) => {
    // create an incoming form object
  var form = new formidable.IncomingForm();
  
    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;
  
    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname,'/public/img/gallerie');
  
    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name));
      Gallerie({
          nom : file.name
      }).save((err)=>{
          if(err){
              console.log(err)
          }
      })
    });
  
    // log any errors that occur
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });
  
    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.render('gallerie');
    });
  
    // parse the incoming request containing the form data
    form.parse(req);

    
})


app.listen(app.get('port'), ()=>{
    console.log(`App set up at : http://localhost:${app.get('port')}`);
});