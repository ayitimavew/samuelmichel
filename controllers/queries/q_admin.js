let Categorie = require('../../models/categorie'),
    Article = require('../../models/article'),
    Donnation = require('../../models/donnation'),
    Annonce = require('../../models/annonces'),
    BecomeAdmin = require('../../models/becomeAdmin'),
    User = require('../../models/user'),
    Cours = require('../../models/cours'),
    bcrypt = require('bcrypt-nodejs'),
    Emission = require('../../models/emission');
    

    //CATEGORIE
exports.addCategorie = (categorie, cb)=>{
    var newCategorie = Categorie({
        titre:categorie
    });

    newCategorie.save(function(err) {
        if (err)
            console.log(err);
        else
            cb('Categorie ajoute avec succes!');
      });
};

exports.showCategorie = (cb)=>{
    Categorie.find({}, (err,r)=>{
        if(err)
            console.log(err);      
        return cb(r);
    })
};

exports.deleteCategorie = (id, cb)=>{
    Categorie.findByIdAndRemove(id, (err)=>{
        if(err)
            console.log(err);
        cb('Supression categorie avec succes!');
    });
};

exports.deleteCategorie = (id, cb)=>{
    Categorie.findByIdAndRemove(id, (err)=>{
        if(err)
            console.log(err);
        cb('Supression categorie avec succes!');
    });
};
//END CATEGORIE

//ARTICLE

exports.publierArticle = (article, cb)=>{
    let newArticle = Article(article);
    newArticle.save(function(err) {
        if (err)
            console.log(err);
        else
            cb('Article publie !');
      });
};

exports.deleteArticle = (id, cb)=>{
    Article.findByIdAndRemove(id, (err)=>{
        if(err)
            console.log(err);
        cb('Supression categorie avec succes!');
    });
};

exports.showArticle = (id,cb)=>{
    Article.findById({_id:id}, (err,r)=>{
        if(err)
            console.log(err);      
        return cb(r);
    })
};



exports.modifierArticle = (id, article ,cd)=>{
    Article.findByIdAndUpdate(id, article, (err, user)=>{
        if(err)
            console.log(err);
        cb('Changement de prenom avec succes!');
    })
}

exports.modifierArticle = (id, titre, categorie, contenu, cb) => {
    Article.findByIdAndUpdate(id, {titre:titre, categorie:categorie, contenu:contenu}, (err, r) => {
        if(err){
            console.log(err)
        }

        cb('Article modifie avec success!')
    })
}  

//END ARTICLE


//DONATION
exports.addDonnation = (donnation, cb)=>{
    let newDonnation = Donnation(donnation);
    newDonnation.save(function(err) {
        if (err)
            console.log(err);
        else
            cb('Donnation enregistrer !');
      });
};
//END DONNATION

//Annonce
exports.addAnnonce = (annonce, cb)=>{
    let newAnnonce = Annonce(annonce);
    newAnnonce.save(function(err) {
        if (err)
            console.log(err);
        else
            cb('Annonces enregistrer !');
      });
};
//END Annonce

//Emission
exports.addEmission = (emission, cb)=>{
    let newEmission = Emission(emission);
    newEmission.save(function(err) {
        if (err)
            console.log(err);
        else
            cb('Emission enregistrer !');
      });
};
//END Emission

 //MODIFIER PROFIL

 exports.changerMail = (id,mail, cb)=>{
    User.findByIdAndUpdate(id, {email:mail}, (err, user)=>{
        if(err)
            console.log(err);
        cb('Changement de mail avec succes!');
    })
};


exports.changerBio = (id,bio, cb)=>{
    User.findByIdAndUpdate(id, {bio:bio}, (err, user)=>{
        if(err)
            console.log(err);
        cb('Changement de biographie avec succes!');
    })
};

let crypter = function(val){
    return bcrypt.hashSync(val, bcrypt.genSaltSync(8), null);
 };
let compare = function(val,val2){
     return bcrypt.compareSync(val, val2);
 };

 exports.changerPass = (id,oldpass, newpass, cb)=>{
    
    User.findById(id,(err, user)=>{
        if(err)
            console.log(err);
        if(compare(oldpass,user.password)){
            newpass = crypter(newpass);
            User.findByIdAndUpdate(id,{password:newpass},(err, user)=>{
                if(err)
                    console.log(err);
                cb('success');
            })
            
        }else{

            cb(false);
        }
    })
};


exports.deleteAnnonce = (id, cb)=>{
    Annonce.findByIdAndRemove(id, (err)=>{
        if(err)
            console.log(err);
        cb('Supression Annonce avec succes!');
    });
};

//END MODIFIER PROFIL


//COURS
exports.addCours = (cours, cb)=>{
    let newCours = Cours(cours);
    newCours.save(function(err) {
        if (err)
            console.log(err);
        else
            cb('Cours enregistrer !');
      });
};

exports.deleteCours = (id, cb)=>{
    Cours.findByIdAndRemove(id, (err)=>{
        if(err)
            console.log(err);
        cb('Supression cours avec succes!');
    });
};
//END COURS


//BECOME ADMIN

exports.becomeAdmin = (user, cb)=>{
    let newAdm = BecomeAdmin(user);
    newAdm.save(function(err) {
        if (err)
            console.log(err);
        else
            cb('demand sent!');
      });
};


exports.showAdminDemands = (cb)=>{
    BecomeAdmin.find({}, (err,r)=>{
        if(err)
            console.log(err);      
        return cb(r);
    })
};

exports.acceptDemand = (idUser,idDemande,cb)=>{
    User.findByIdAndUpdate(idUser,{admin:true},(err, user)=>{
        if(err)
            console.log(err);

            BecomeAdmin.findByIdAndRemove(idDemande, (err)=>{
                if(err)
                    console.log(err);
                
            });   
        cb('success');
    });
};

exports.showAdmin = (cb)=>{
    User.find({admin:true},(err, user)=>{
        if(err)
            console.log(err);

            cb(user);
    });
};

exports.deleteAdmin = (id, cb)=>{
    User.findByIdAndRemove(id, (err)=>{
        if(err)
            console.log(err);
        cb('Supression admin avec succes!');
    });
};

exports.deleteDemand = (idDemande,cb)=>{
    BecomeAdmin.findByIdAndRemove(idDemande, (err)=>{
    if(err)
        console.log(err);
    cb('deleted');
 });   
};


//END BECOME ADMIN

//BLOG
exports.showArticleWithCat = (titre,cb) => {
    Article.find({categorie:titre}, (err, articles)=>{
        cb(articles);
    })
}
//END BLOG