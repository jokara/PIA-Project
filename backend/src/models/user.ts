import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    birthdate: {
        type: String
    },
    birthplace: {
        type: String
    },
    jmbg: {
        type: String
    },
    email:{
        type: String
    },
    phone:{
        type: String
    },
    type:{
        type: String
    },
    picture:{
        type: String
    }
});

export default mongoose.model('User', User);