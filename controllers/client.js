let passport = require('passport'),
    Articles = require('../models/article'),
    Annonce = require('../models/annonces'),
    Cours = require('../models/cours'),
    Videos = require('../models/videoCours'),
    Emission = require('../models/emission'),
    q = require('./queries/q_admin');


    function ValidateEmail(mail)   
    {  
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
      {  
        return (true)  
      }  
        
        return (false)  
    } 


module.exports = {

    index : (req,res) => {
        q.showCategorie((r)=>{
            res.render("index",{
                title : "Accueil",
                user: req.user,
                cat : r
            });
        })
      
    },

    radio : (req,res) => {
        q.showCategorie((r)=>{
            res.render("radio",{
                title : "Radio",
                user: req.user,
                cat : r
            });
        })
      
    },

    tiAnons : (req,res) => {
        q.showCategorie((rr)=>{
            Annonce.paginate({}, { page:req.params.page, limit: 5, sort: { date: -1 } }, function(err,result) {
                if(result.docs.length==0){
                 let message = " Poko gen atik pou kunia.";
                 res.render("tiAnons",{message:message, user: req.user});
                }else{
                 let pages = [];
                 for(i=1; i<=result.pages; i++)
                     pages.push(i)
                 pages.sort()
                 
                 res.render('tiAnon',{
                     annonces : result.docs,
                     user: req.user,
                     cat:rr,
                     showPagination : pages.length >= 1,
                     pages : pages,
                     next :  req.params.page < result.pages ? parseInt(result.page)+1 : 1,
                     previous : result.page > 1 ? parseInt(result.page)-1 : 1,
                 })
                }
             });
           })
      
    },

    showArticles :  (req,res) => {
        q.showCategorie((rr)=>{
            q.showArticleWithCat(req.params.titre, (a)=>{
                Articles.paginate({categorie:req.params.titre}, { page:req.params.page, limit: 5, sort: { date: -1 } }, function(err,result) {
                    if(result.docs.length==0){
                     let message = " Poko gen atik pou kounya.";
                     res.render("articles",{message:message, user: req.user, categorie : req.params.titre, cat:rr});
                    }else{
                     let pages = [];
                     for(i=1; i<=result.pages; i++)
                         pages.push(i)
                     pages.sort()
                     
                     res.render('articles',{
                         articles : result.docs,
                         categorie : req.params.titre,
                         cat:rr,
                         user: req.user,
                         showPagination : pages.length >= 1,
                         pages : pages,
                         next :  req.params.page < result.pages ? parseInt(result.page)+1 : 1,
                         previous : result.page > 1 ? parseInt(result.page)-1 : 1,
                     })
                    }
                 });
            })
        })
 
    },


    inscription : (req,res) => {
       q.showCategorie((r)=>{
        res.render("inscription",{
            title : "Inscription",
            cat : r,
            signup: req.flash('signupMessage'),
            login: req.flash('loginMessage')
        });
       })
    },   

    connexion : (req,res) => {
        q.showCategorie((r)=>{
            res.render("connexion",{
                title : "Connexion",
                cat : r,
                signup: req.flash('signupMessage'),
                login: req.flash('loginMessage')
            });
        })
    },

    deconnexion : (req,res) => {
        req.logout();
        res.redirect('/');
    },


    _inscription:  passport.authenticate('local-signup', {
        //Success go to Profile Page / Fail go to Signup page
        successRedirect : '/connexion',
        failureRedirect : '/inscription',
        failureFlash : true
       }),

       _connexion: passport.authenticate('local-login', {
        //Success go to Profile Page / Fail go to login page
        successRedirect : '/profil',
        failureRedirect : '/connexion',
        failureFlash : true
       }),

     profil : (req,res) => {
         let isAdmin = req.user.admin;
        
       q.showCategorie((r)=>{
        res.render("profil",{
            title : "Profil",
            cat: r,
            user: req.user,
            isAdmin : isAdmin
        });
       })
    },

    becomeAdmin : (req,res) => {
        let newAdm = {
            id_user : req.user.id,
            nom:req.user.nom,
            prenom:req.user.prenom,    
        }
        q.becomeAdmin(newAdm,(txt)=>{
            console.log(txt);
            res.redirect('/profil');
        })
    },

    editorial : (req,res) => {

        Articles.paginate({categorie:'Editorial'}, { page:req.params.page, limit: 1, sort: { date: -1 } }, function(err,result) {
            if(result.docs.length==0){
             let message = " Aucun article  publié .";
             res.render("editorial",{message:message, user: req.user});
            }else{
             let pages = [];
             for(i=1; i<=result.pages; i++)
                 pages.push(i)
             pages.sort()
             
             res.render('editorial',{
                 articles : result.docs,
                 user: req.user,
                 showPagination : pages.length >= 1,
                 pages : pages,
                 next :  req.params.page < result.pages ? parseInt(result.page)+1 : 1,
                 previous : result.page > 1 ? parseInt(result.page)-1 : 1,
             })
            }
         });

    },

    culture : (req,res) => {
        Articles.paginate({categorie:'Culture'}, { page:req.params.page, limit: 1, sort: { date: -1 } }, function(err,result) {
            if(result.docs.length==0){
             let message = " Aucun article  publié .";
             res.render("culture",{message:message, user: req.user});
            }else{
             let pages = [];
             for(i=1; i<=result.pages; i++)
                 pages.push(i)
             pages.sort()
             
             res.render('culture',{
                 articles : result.docs,
                 user: req.user,
                 showPagination : pages.length >= 1,
                 pages : pages,
                 next :  req.params.page < result.pages ? parseInt(result.page)+1 : 1,
                 previous : result.page > 1 ? parseInt(result.page)-1 : 1,
             })
            }
         });
    },

    commercial : (req,res) => {

        q.showCategorie((rr)=>{
            Annonce.paginate({}, { page:req.params.page, limit: 5, sort: { date: -1 } }, function(err,result) {
                if(result.docs.length==0){
                 let message = " Poko gen atik pou kunia.";
                 res.render("sesArticles",{message:message, user: req.user});
                }else{
                 let pages = [];
                 for(i=1; i<=result.pages; i++)
                     pages.push(i)
                 pages.sort()
                 
                 res.render('commercial',{
                     annonces : result.docs,
                     user: req.user,
                     cat:rr,
                     showPagination : pages.length >= 1,
                     pages : pages,
                     next :  req.params.page < result.pages ? parseInt(result.page)+1 : 1,
                     previous : result.page > 1 ? parseInt(result.page)-1 : 1,
                 })
                }
             });
           })
    }, 

    cours : (req,res) => {
      q.showCategorie((r)=>{
        Cours.find({}, null,{sort:'-date'},(err,cours)=>{
                
            res.render('cours', {
                cat:r,
               cours : cours,
               
            })         
   
           
        })
    })
},

detailCours : (req,res) => {
    q.showCategorie((r)=>{
      Cours.findById({_id:req.params.id},(err,cours)=>{
         
        Videos.find({idVideo:req.params.id}, null, {sort:'-date'},(err,videos)=>{
            
            if(!req.user){
                res.render('needToSubscribe', {
                    cat:r,
                   cours : cours,
                   videos : videos
                })
            }else{
                res.render('detailCours', {
                    cat:r,
                   cours : cours,
                   videos : videos
                })
            }
            
          
         })
    })
         
      })
},

lireVideo : (req,res) => {
    q.showCategorie((r)=>{
        Videos.findById(req.params.id, (err, video)=>{
            console.log(video)
            res.render('playVideo', {
                cat:r,
                video:video
            })
        })
  })
},

    lire: (req,res)=>{
       q.showCategorie((rr)=>{
        q.showArticle(req.params.id,(r)=>{
            res.render('lire', {
                title: 'Lire',
                cat : rr,
                user: req.user,
                article: r
            })
        });
       })
    },


    donnation : (req,res) => {
        q.showCategorie((r)=>{
            res.render("donnation",{
                title : "Donnation",
                cat:r,
                user: req.user
            });
        })
    },
    
    _donnation: (req,res)=>{
       //console.log(req.body.nom+"  "+req.body.prenom+"  "+req.body.phone+"  "+req.body.description);
       let donnation = {
           nom : req.body.nom,
           prenom : req.body.prenom,
           phone :req.body.phone,
           description : req.body.description
       }
       q.addDonnation(donnation, (txt)=>{
           res.render('donnation',{
            title : "Donnation",
            user: req.user,
               message: "Merci pour votre don!"
           })
       })
    },

    emissions : (req,res) => {
        Emission.paginate({}, { page:req.params.page, limit: 5, sort: { date: -1 } }, function(err,result) {
           
            if(result.docs.length==0){
                let message = " Aucun article  publié .";
                res.render("sesArticles",{message:message, user: req.user});
               }else{
                let pages = [];
                for(i=1; i<=result.pages; i++)
                    pages.push(i)
                pages.sort()
    
               q.showCategorie((r)=>{
                   console.log(result.docs)
                res.render('emissions',{
                    title : "add Emission",
                    user: req.user,
                    showPagination : pages.length > 1,
                    emissions : result.docs,
                    pages : pages,
                    cat:r,
                    next :  req.params.page < result.pages ? parseInt(result.page)+1 : 1,
                    previous : result.page > 1 ? parseInt(result.page)-1 : 1,
                })
               })
            }
        });
    },


     modifierProfil : (req,res) => {
       q.showCategorie((r)=>{
        res.render("modifierProfil",{
            title : "Modifier profil",
            user: req.user,
            cat:r
        });
       })
    },

    changerMail : (req,res) => {
      //  console.log(req.body.mail);
        var isValid = ValidateEmail(req.body.mail);
        if(isValid){
                q.changerMail(req.user.id, req.body.mail,(txt)=>{
                    res.redirect('/modifier-profil');
                })
        }else{
            res.redirect('/modifier-profil');
        }
    },

    changerBio : (req,res) => {
       
          var bio =req.body.bio;

          if(bio!=""){
            q.changerBio(req.user.id,bio,(txt)=>{
                res.redirect('/modifier-profil');
            })
          }else{
            res.redirect('/modifier-profil');
          }
      },


      changerPassword : (req,res) => {
        
        var mypassword = req.body.mypassword;
        var newpassword1 = req.body.newpassword1;
        var newpassword2 = req.body.newpassword2;
        if(newpassword1!=newpassword2){
            res.render("modifierProfil",{
                title : "Modifier profil",
                user: req.user,
                message: 'Les mots de passe ne sont pas identique'
            });
        }else{
             q.changerPass(req.user.id,mypassword,newpassword1,(text)=>{
                res.redirect('/deconnexion');
            });
        }

       // console.log(mypassword,' ',newpassword1, ' ', newpassword2);

            // q.changerPass(req.user.id,mypassword,newpassword1,(text)=>{
            //     res.json(text);
            // });

       },
 
   
}

