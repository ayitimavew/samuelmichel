let passport = require('passport'),
    q = require('./queries/q_admin'),
     Gallerie = require('../models/gallerie'),
     Articles = require('../models/article'),
     Donnation = require('../models/donnation'),
     Annonce = require('../models/annonces'),
     Cours = require('../models/cours'),
     Video = require('../models/videoCours'),
     Emission = require('../models/emission');

module.exports = {

    //Gallerie
    gallerie : (req,res) => {

        
        Gallerie.paginate({}, { page:req.params.page, limit: 1, sort: { date: -1 } }, function(err,result) {
            let pages = [];
            for(i=1; i<=result.pages; i++)
                pages.push(i)
            pages.sort()

            res.render('gallerie',{
                title : "Gallerie",
                user: req.user,
                showPagination : pages.length > 1,
                images : result.docs,
                pages : pages,
                next :  req.params.page < result.pages ? parseInt(result.page)+1 : 1,
                previous : result.page > 1 ? parseInt(result.page)-1 : 1,
            })
        });

    },
    //End gallerie


    //Categorie
    addCategorie : (req,res) => {
        q.showCategorie((r)=>{
            res.render('categorie',{
                title:"categorie",
                categories: r,
                user: req.user
            });
        });
      
    },

    _addCategorie:(req,res)=>{
        q.addCategorie(req.body.categorie, (text)=>{
            res.redirect('/add/categorie');
        });
    },

    deleteCategorie:(req,res)=>{
        q.deleteCategorie(req.params.id, (text)=>{
            res.redirect('/add/categorie');
        });
    },
    //End Categorie


    //Editeur
    addArticle:(req,res)=>{
        q.showCategorie((r)=>{
            res.render('editeur',{
                title: "Editeur",
                user: req.user,
                tinymce:true,
                categories: r,
                message: '' 
             });
        });
    },

    _addArticle:(req,res)=>{
        let idAuteur = req.user.id,
        nomAuteur = req.user.nom,
        prenomAuteur = req.user.prenom,
        bioAuteur = req.user.bio,
        photoAuteur = req.user.photo,
        titre = req.body.titre,
        categorie = req.body.categorie,
        contenu = req.body.contenu,
        image = req.body.image,
        message = "";

        if(titre=="")
            message = "Entrez un titre!";
        
        if (categorie=="")
            message = "Selectionez une categorie!";

        if(contenu=="")
            message = "Veuillez inserer un contenu pour l'article!";

        if(image=="")
            message = "Veuillez inserer une image pour l'article!";

        
        if(message!=""){
                
            q.showCategorie((r)=>{
                res.render('editeur',{
                    title: "Editeur",
                    user: req.user,
                    categories: r,
                    message:message,
                    contenu:contenu,
                    image:image,
                    titre:titre 
                 });
            });
               
        }else{


            let article = {        
            idAuteur: idAuteur,
            nomAuteur : nomAuteur,
            prenomAuteur : prenomAuteur,
            bioAuteur : bioAuteur,
            photoAuteur : photoAuteur,
            titre:titre,
            categorie:categorie,
            contenu:contenu,
            image : image,       
           }

           q.publierArticle(article, (text)=>{
               res.redirect('/profil');
           })
           
        }
    },

    sesArticles:(req,res)=>{
        
                Articles.paginate({idAuteur:req.user.id}, { page:req.params.page, limit: 1, sort: { date: -1 } }, function(err,result) {
                   if(result.docs.length==0){
                    let message = " Aucun article  publié .";
                    res.render("sesArticles",{message:message, user: req.user});
                   }else{
                    let pages = [];
                    for(i=1; i<=result.pages; i++)
                        pages.push(i)
                    pages.sort()
                    
                    res.render('sesArticles',{
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

    deleteArticle : (req,res)=>{
        q.deleteArticle(req.params.id, (txt)=>{
            res.redirect('/articles/1');
        })
    },

    modifierArticle : (req,res)=>{
        
        q.showArticle(req.params.id, (r)=>{
            q.showCategorie((c)=>{
                res.render('modifierArticle',{
                    title: "Editeur",
                    user: req.user,
                    tinymce: false,
                    categories: c,
                    article : r
                 });
                 
                 console.log(r)
            });
        })

},

_modifierArticle : (req,res)=>{
    q.modifierArticle(req.params.id, req.body.titre, req.body.categorie, req.body.contenu, (r)=>{
        res.redirect('/articles/1')
    });
},


    //End Editeur



    //ANNONCE

    annonce : (req,res)=>{
        res.render('annonce',{
            title:"Annonce",
            user: req.user
        })
    },

    //END ANNONCE

    //DONNATION

    showDonnations : (req,res)=>{
        Donnation.paginate({}, { page:req.params.page, limit: 1, sort: { date: -1 } }, function(err,result) {
            if(result.docs.length==0){
             let message = " Aucun article  publié .";
             res.render("sesArticles",{message:message, user: req.user});
            }else{
             let pages = [];
             for(i=1; i<=result.pages; i++)
                 pages.push(i)
             pages.sort()
             
             res.render('donnationList',{
                 donnations : result.docs,
                 user: req.user,
                 showPagination : pages.length >= 1,
                 pages : pages,
                 next :  req.params.page < result.pages ? parseInt(result.page)+1 : 1,
                 previous : result.page > 1 ? parseInt(result.page)-1 : 1,
             })
            }
         });
    },

    //END DONNATION

    //ANNONCE

    annonce : (req,res) => {
        res.render("addAnnonce",{
            title : "Cours",
            user: req.user
        });
    },

    _annonce : (req,res) => {
      // console.log(req.body.image+" "+req.body.description);
      let annonce = {
          idAuteur : req.user.id,
          image : req.body.image,
          description :req.body.description
      }
      q.addAnnonce(annonce,(txt)=>{
            res.render('commercial',{
                title : "Commercial",
                user: req.user
            });
      });
    },

    //END ANNONCE


    //EMISSIONS
    addEmission : (req,res)=>{
        
        Emission.paginate({}, { page:req.params.page, limit: 1, sort: { date: -1 } }, function(err,result) {
            let pages = [];
            for(i=1; i<=result.pages; i++)
                pages.push(i)
            pages.sort()

            res.render('addEmissions',{
                title : "add Emission",
                user: req.user,
                showPagination : pages.length > 1,
                emissions : result.docs,
                pages : pages,
                next :  req.params.page < result.pages ? parseInt(result.page)+1 : 1,
                previous : result.page > 1 ? parseInt(result.page)-1 : 1,
            })
        });
    },

    _addEmission : (req,res)=>{
        
        let link = req.body.link;
        if(link!=""){
            q.addEmission({link},(txt)=>{
                res.redirect('/add/emission/1');
            });

        }else{
           res.redirect('/add/emission/1');
        }
    },
    //END EMISSION


   //Mes Annonces
        mesAnnonces : (req,res)=>{
            
            Annonce.paginate({}, { page:req.params.page, limit: 1, sort: { date: -1 } }, function(err,result) {
                if(result.docs.length==0){
                 let message = " Aucun article  publié .";
                 res.render("sesArticles",{message:message, user: req.user});
                }else{
                 let pages = [];
                 for(i=1; i<=result.pages; i++)
                     pages.push(i)
                 pages.sort()
                 
                 res.render('mesAnnonces',{
                     annonces : result.docs,
                     user: req.user,
                     showPagination : pages.length >= 1,
                     pages : pages,
                     next :  req.params.page < result.pages ? parseInt(result.page)+1 : 1,
                     previous : result.page > 1 ? parseInt(result.page)-1 : 1,
                 })
                }
             });
        },


        deleteAnnonces : (req,res)=>{
            q.deleteAnnonce(req.params.id,(txt)=>{
                res.redirect('/mes-annonces/1');
            })

        },
   //End Mes annonces

   //COURS

   voirCours : (req,res)=>{
            Cours.findById({_id:req.params.id},(err,cour)=>{
                Video.find({idVideo:req.params.id}, null, {sort:'-date'}, (err, videos)=>{
                    res.render('voircour', {
                        id: cour._id,
                        videos : videos,
                        titre: cour.titre,
                        image : cour.image,
                        description : cour.description
                    })
                })
               
            })
   },

   deletevideo : (req,res)=>{

    Video.remove({_id:req.params.id}, (err)=>{
        res.redirect('/add-cours/1');
    })
    
 },

   _voirCours : (req,res)=>{

    if(req.body.titre!="" && req.body.lien!=""){
        let video = Video({
            idVideo:req.params.id,
            titre : req.body.titre,
            lien : req.body.lien
        });
        video.save(function(err) {
            if (err)
                console.log(err);
            else
                res.redirect('/cours')
          });

         

    }else{
        res.redirect('/cours')
    }
    
 },

   addCours : (req,res) => {

    Cours.paginate({}, { page:req.params.page, limit: 1, sort: { date: -1 } }, function(err,result) {
        if(result.docs.length==0){
        
         res.render("addCours",{user: req.user});
        }else{
         let pages = [];
         for(i=1; i<=result.pages; i++)
             pages.push(i)
         pages.sort()
         
         res.render('addCours',{
             cours : result.docs,
             user: req.user,
             showPagination : pages.length >= 1,
             pages : pages,
             next :  req.params.page < result.pages ? parseInt(result.page)+1 : 1,
             previous : result.page > 1 ? parseInt(result.page)-1 : 1,
         })
        }
     });
   
},

    _addCours : (req,res) => {
            if(req.body.image!="" && req.body.titre!="" && req.body.description!=""){
                let cours  = {image:req.body.image, titre :req.body.titre, description : req.body.description, video: []};
                q.addCours(cours, (txt)=>{
                    res.redirect('/cours')
                })
            }else{
                res.redirect('/add-cours');
            }
    },

    deleteCours : (req,res)=>{
        q.deleteCours(req.params.id, (txt)=>{
            res.redirect('/add-cours/1');
        })
    },
   //END COURS




   //MAKE ADMIN

   makeAdmin : (req,res)=>{
    q.showAdminDemands((r)=>{
        res.render('adminDemands',{ demandes : r });
    });
  },

 acceptAdmin : (req,res)=>{
   q.acceptDemand(req.params.id_user,req.params.id,(txt)=>{
       console.log(txt);
       res.redirect('/profil')
   })
  },

  deleteDemand : (req,res)=>{
    q.deleteDemand(req.params.id,(txt)=>{
        console.log(txt);
        res.redirect('/profil');
    })
   },
   //End MAKE ADMIN


   //SUPERADMIN
    superAdmin : (req,res)=>{
        res.render('superAdmin');
     },

     showAdmin : (req,res)=>{
       q.showAdmin((r)=>{
           res.render('showAdmins', {admins:r});
       })
     },

     deleteAdmin : (req,res)=>{
       q.deleteAdmin(req.params.id,(txt)=>{
           console.log(txt);
           res.redirect('/deconnexion');
       })
      },
   // END SUPERADMIN
}

