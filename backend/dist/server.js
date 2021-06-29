"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));
mongoose_1.default.connect('mongodb://localhost:27017/projekat_pia');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('mongo open');
});
const router = express_1.default.Router();
const user_1 = __importDefault(require("./models/user"));
const regrequest_1 = __importDefault(require("./models/regrequest"));
const poll_1 = __importDefault(require("./models/poll"));
const pollresolved_1 = __importDefault(require("./models/pollresolved"));
const test_1 = __importDefault(require("./models/test"));
const testresolved_1 = __importDefault(require("./models/testresolved"));
router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.find({ 'username': username, 'password': password }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/noviTestResen').post((req, res) => {
    let testresolved = new testresolved_1.default(req.body.test);
    testresolved.save().
        then(testresolved => {
        res.status(200).json({ 'user': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'user': 'no' });
    });
});
router.route('/novaAnketaResena').post((req, res) => {
    let poll = new pollresolved_1.default(req.body.poll);
    poll.save().
        then(poll => {
        res.status(200).json({ 'user': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'user': 'no' });
    });
});
router.route('/novaAnketaKreator').post((req, res) => {
    let poll = new poll_1.default(req.body.poll);
    poll.save().
        then(poll => {
        res.status(200).json({ 'user': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'user': 'no' });
    });
});
router.route('/noviTestKreator').post((req, res) => {
    let test = new test_1.default(req.body.test);
    test.save().
        then(poll => {
        res.status(200).json({ 'user': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'user': 'no' });
    });
});
router.route('/obrisiAnketuResenu').post((req, res) => {
    let username = req.body.username;
    let id = req.body.id;
    pollresolved_1.default.findOneAndDelete({ 'UsernameUser': username, 'Id': id }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/register').post((req, res) => {
    let user = new regrequest_1.default(req.body.req);
    user.save().
        then(user => {
        res.status(200).json({ 'user': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'user': 'no' });
    });
});
router.route('/registerUser').post((req, res) => {
    let user = new user_1.default(req.body.user);
    user.save().
        then(user => {
        res.status(200).json({ 'user': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'user': 'no' });
    });
});
router.route('/obrisiKorisnika').post((req, res) => {
    let username = req.body.username;
    user_1.default.findOneAndDelete({ 'username': username }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/obrisiZahtevKorisnika').post((req, res) => {
    let username = req.body.username;
    regrequest_1.default.findOneAndDelete({ 'username': username }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/brojIstihMejlova').post((req, res) => {
    user_1.default.find((err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/staraLozinka').post((req, res) => {
    user_1.default.findOne({ 'username': req.body.username }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/postaviNovuLozinku').post((req, res) => {
    user_1.default.collection.update({ 'username': req.body.username }, { $set: { 'password': req.body.password } }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/dohvatiSveKorisnike').get((req, res) => {
    user_1.default.find((err, poll) => {
        if (err)
            console.log(err);
        else {
            res.json(poll);
        }
    });
});
router.route('/dohvatiSveZahteveZaReg').get((req, res) => {
    regrequest_1.default.find((err, poll) => {
        if (err)
            console.log(err);
        else {
            res.json(poll);
        }
    });
});
router.route('/dohvatiSveAnkete').get((req, res) => {
    poll_1.default.find((err, poll) => {
        if (err)
            console.log(err);
        else {
            res.json(poll);
        }
    });
});
router.route('/dohvatiSveTestove').get((req, res) => {
    test_1.default.find((err, test) => {
        if (err)
            console.log(err);
        else {
            res.json(test);
        }
    });
});
router.route('/dohvatiPodatkeKorisnika').post((req, res) => {
    user_1.default.findOne({ 'username': req.body.username }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/dohvatiSvePopunjeneAnkete').post((req, res) => {
    pollresolved_1.default.find({ 'UsernameUser': req.body.username }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/dohvatiSvePopunjeneTestove').post((req, res) => {
    testresolved_1.default.find({ 'UsernameUser': req.body.username }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/dohvatiSveTestoveSaId').post((req, res) => {
    testresolved_1.default.find({ 'Id': req.body.id }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/dohvatiSveAnketeSaId').post((req, res) => {
    pollresolved_1.default.find({ 'Id': req.body.id }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/obrisiTestResen').post((req, res) => {
    let username = req.body.username;
    let id = req.body.id;
    testresolved_1.default.findOneAndDelete({ 'UsernameUser': username, 'Id': id }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/obrisiTestKreatora').post((req, res) => {
    let id = req.body.id;
    test_1.default.deleteOne({ 'Id': id }, (err) => {
        if (err)
            console.log(err);
        else {
            res.status(200).json({ 'user': 'ok' });
        }
    });
});
router.route('/obrisiOstaleTestoveResene').post((req, res) => {
    let id = req.body.id;
    testresolved_1.default.deleteMany({ 'Id': id }, (err) => {
        if (err)
            console.log(err);
        else {
            res.status(200).json({ 'user': 'ok' });
        }
    });
});
router.route('/obrisiAnketuJednuKreatora').post((req, res) => {
    let id = req.body.id;
    poll_1.default.deleteOne({ 'Id': id }, (err) => {
        if (err)
            console.log(err);
        else {
            res.status(200).json({ 'user': 'ok' });
        }
    });
});
router.route('/obrisiOstaleAneketeResene').post((req, res) => {
    let id = req.body.id;
    pollresolved_1.default.deleteMany({ 'Id': id }, (err) => {
        if (err)
            console.log(err);
        else {
            res.status(200).json({ 'user': 'ok' });
        }
    });
});
router.route('/dohvatiSveKreatoroveAnkete').post((req, res) => {
    poll_1.default.find({ 'Creator': req.body.username }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/dohvatiSveKreatoroveTestove').post((req, res) => {
    test_1.default.find({ 'Creator': req.body.username }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
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
//# sourceMappingURL=server.js.map