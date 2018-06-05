const express = require('express'),
router = express.Router(),
client = require('../controllers/client');
admin = require('../controllers/admin');

function allowed(req,res,next){
  
  if(req.user){
    next()
  }else{
    res.redirect('/');
  }

  
}

module.exports = app =>{

  //SUPER ADMIN
  router.get('/007-super-admin-007', admin.superAdmin); 


//Api
router.get('/api/get-emissions', admin.apiGetEmissions);

router.get('/', client.index);
router.get('/inscription', client.inscription);
router.post('/inscription', client._inscription);
router.get('/connexion', client.connexion);
router.post('/connexion', client._connexion);
router.get('/deconnexion', client.deconnexion);

//Editorial
router.get('/editorial/:page', client.editorial);

//Culture
router.get('/culture/:page', client.culture);

//blog
router.get('/radio', client.radio);


//blog
router.get('/categorie/:titre', client.showArticles);

//Commercial
router.get('/maket-pam/:page', client.tiAnons);
router.get('/commercial/:page', client.commercial);
router.get('/annonces', allowed, admin.annonce);
router.post('/annonces', allowed, admin._annonce);
router.get('/mes-annonces/:page', allowed, admin.mesAnnonces);
router.get('/delete/annonce/:id', allowed, admin.deleteAnnonces);

//Donnations
router.get('/donnation', client.donnation);
router.post('/donnation', client._donnation);
router.get('/show/donnations/:page', allowed, admin.showDonnations);


//Cours
router.get('/cours', client.cours);
router.post('/cours', allowed, admin._addCours);
router.get('/delete/cours/:id', allowed, admin.deleteCours);
router.get('/add-cours/:page', allowed, admin.addCours);
router.get('/voir-cour/:id', allowed, admin.voirCours);
router.post('/add-video/:id',  allowed,admin._voirCours);
router.get('/delete-video/:id', allowed, admin.deletevideo);
router.get('/detail-cours/:id', client.detailCours);
router.get('/lire-video/:id', client.lireVideo);


//Gallerie
router.get('/gallerie/:page',  allowed, admin.gallerie);

//Profil
router.get('/profil', allowed, client.profil);
router.get('/modifier-profil', client.modifierProfil);
router.post('/changer/email', client.changerMail);
router.post('/changer/bio', client.changerBio);
router.post('/changer/password', client.changerPassword);
router.get('/become-admin/007007', client.becomeAdmin);
router.get('/make-user-admin', admin.makeAdmin);
router.get('/accept-admin/:id_user/:id', admin.acceptAdmin);
router.get('/delete-demand/:id', admin.deleteDemand);
router.get('/show-admin', admin.showAdmin);
router.get('/delete-admin/:id', admin.deleteAdmin);






//Emissions
router.get('/emissions/:page', client.emissions);
router.get('/add/emission/:page',  allowed, admin.addEmission);
router.post('/add-emission',  allowed, admin._addEmission);

//Categorie
router.get('/add/categorie', allowed, admin.addCategorie);
router.post('/add/categorie', allowed, admin._addCategorie);
router.get('/delete/categorie/:id', allowed, admin.deleteCategorie);

//Article
router.get('/editeur', allowed, admin.addArticle);
router.post('/editeur',  allowed,admin._addArticle);
router.get('/articles/:page',  allowed,admin.sesArticles);
router.get('/delete/article/:id', allowed, admin.deleteArticle);
router.get('/modifier/article/:id', allowed, admin.modifierArticle);
router.post('/modifier/article/:id',  allowed,admin._modifierArticle);
router.get('/lire/:id', client.lire);

//Annonce
router.get('/annonce',  allowed, admin.annonce);



router.get('*', (req,res)=>{
  res.send('404 - page not found');
});

app.use(router);
};