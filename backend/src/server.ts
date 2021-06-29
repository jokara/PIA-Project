import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';



const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));

mongoose.connect('mongodb://localhost:27017/projekat_pia');

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('mongo open');
})

const router = express.Router();

import User from './models/user';
import Regrequest from './models/regrequest';
import Poll from './models/poll';
import Pollresolved from './models/pollresolved';
import Test from './models/test';
import Testresolved from './models/testresolved';

router.route('/login').post(
    (req, res)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.find({'username':username, 'password':password},
         (err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }
);


router.route('/noviTestResen').post((req, res)=>{
    let testresolved = new Testresolved(req.body.test);
    testresolved.save().
        then(testresolved=>{
            res.status(200).json({'user':'ok'});
        }).catch(err=>{
            res.status(400).json({'user':'no'});
        })
});


router.route('/novaAnketaResena').post((req, res)=>{
    let poll = new Pollresolved(req.body.poll);
    poll.save().
        then(poll=>{
            res.status(200).json({'user':'ok'});
        }).catch(err=>{
            res.status(400).json({'user':'no'});
        })
});

router.route('/novaAnketaKreator').post((req, res)=>{
    let poll = new Poll(req.body.poll);
    poll.save().
        then(poll=>{
            res.status(200).json({'user':'ok'});
        }).catch(err=>{
            res.status(400).json({'user':'no'});
        })
});

router.route('/noviTestKreator').post((req, res)=>{
    let test = new Test(req.body.test);
    test.save().
        then(poll=>{
            res.status(200).json({'user':'ok'});
        }).catch(err=>{
            res.status(400).json({'user':'no'});
        })
});



router.route('/obrisiAnketuResenu').post((req, res)=>{
    let username=req.body.username;
    let id=req.body.id;
    Pollresolved.findOneAndDelete({'UsernameUser':username, 'Id':id},(err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
});

router.route('/register').post((req, res)=>{
    let user = new Regrequest(req.body.req);
    user.save().
        then(user=>{
            res.status(200).json({'user':'ok'});
        }).catch(err=>{
            res.status(400).json({'user':'no'});
        })
});

router.route('/registerUser').post((req, res)=>{
    let user = new User(req.body.user);
    user.save().
        then(user=>{
            res.status(200).json({'user':'ok'});
        }).catch(err=>{
            res.status(400).json({'user':'no'});
        })
});


router.route('/obrisiKorisnika').post((req, res)=>{
    let username=req.body.username;
    User.findOneAndDelete({'username':username},(err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
});


router.route('/obrisiZahtevKorisnika').post((req, res)=>{
    let username=req.body.username;
    Regrequest.findOneAndDelete({'username':username},(err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
});




router.route('/brojIstihMejlova').post((req, res)=>{
    User.find((err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
});



router.route('/staraLozinka').post((req, res)=>{
    User.findOne({'username':req.body.username},(err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
});

router.route('/postaviNovuLozinku').post((req, res)=>{
    User.collection.update({'username':req.body.username},{$set: {'password':req.body.password}},(err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
});

router.route('/dohvatiSveKorisnike').get((req, res)=>{
    User.find((err, poll)=>{
        if(err) console.log(err);
        else{
            res.json(poll);
        }
    })
})

router.route('/dohvatiSveZahteveZaReg').get((req, res)=>{
    Regrequest.find((err, poll)=>{
        if(err) console.log(err);
        else{
            res.json(poll);
        }
    })
})


router.route('/dohvatiSveAnkete').get((req, res)=>{
    Poll.find((err, poll)=>{
        if(err) console.log(err);
        else{
            res.json(poll);
        }
    })
})

router.route('/dohvatiSveTestove').get((req, res)=>{
    Test.find((err, test)=>{
        if(err) console.log(err);
        else{
            res.json(test);
        }
    })
})

router.route('/dohvatiPodatkeKorisnika').post((req, res)=>{
    User.findOne({'username':req.body.username}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
})

router.route('/dohvatiSvePopunjeneAnkete').post((req, res)=>{
    Pollresolved.find({'UsernameUser':req.body.username}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
})

router.route('/dohvatiSvePopunjeneTestove').post((req, res)=>{
    Testresolved.find({'UsernameUser':req.body.username}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
})

router.route('/dohvatiSveTestoveSaId').post((req, res)=>{
    Testresolved.find({'Id':req.body.id}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
})

router.route('/dohvatiSveAnketeSaId').post((req, res)=>{
    Pollresolved.find({'Id':req.body.id}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
})


router.route('/obrisiTestResen').post((req, res)=>{
    let username=req.body.username;
    let id=req.body.id;
    Testresolved.findOneAndDelete({'UsernameUser':username, 'Id':id},(err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
});

router.route('/obrisiTestKreatora').post((req, res)=>{
    let id=req.body.id;
    Test.deleteOne({'Id': id}, (err)=>{
        if(err) console.log(err);
        else{
            res.status(200).json({'user':'ok'});
        }
    })
});

router.route('/obrisiOstaleTestoveResene').post((req, res)=>{
    let id=req.body.id;
    Testresolved.deleteMany({'Id': id}, (err)=>{
        if(err) console.log(err);
        else{
            res.status(200).json({'user':'ok'});
        }
    })
});


router.route('/obrisiAnketuJednuKreatora').post((req, res)=>{
    let id=req.body.id;
    Poll.deleteOne({'Id': id}, (err)=>{
        if(err) console.log(err);
        else{
            res.status(200).json({'user':'ok'});
        }
    })
});

router.route('/obrisiOstaleAneketeResene').post((req, res)=>{
    let id=req.body.id;
    Pollresolved.deleteMany({'Id': id}, (err)=>{
        if(err) console.log(err);
        else{
            res.status(200).json({'user':'ok'});
        }
    })
});

router.route('/dohvatiSveKreatoroveAnkete').post((req, res)=>{
    Poll.find({'Creator':req.body.username}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
})


router.route('/dohvatiSveKreatoroveTestove').post((req, res)=>{
    Test.find({'Creator':req.body.username}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
})


/*router.route('/news').get((req, res)=>{
    User.findOne({'username':'admin'}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user.get('news'));
        }
    })
})

router.route('/newsByUser').post((req, res)=>{
    User.findOne({'username':req.body.username}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user.get('news'));
        }
    })
})

router.route('/addNewsToAdmin').post((req,res)=>{
    User.collection.updateOne({'username':'admin'}, {$push:{'news':'vest5'}});
});*/


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));