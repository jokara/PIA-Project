import mongoose from 'mongoose';

const Schema = mongoose.Schema;


let Pollresolved = new Schema({
    UsernameUser: {
        type: String
    },
    NameUser: {
        type: String
    },
    SurnameUser: {
        type: String
    },
    Birthdate: {
        type: String
    },
    Name: {
        type: String
    },
    StartDate: {
        type: String
    },
    EndDate: {
        type: String
    },
    About: {
        type: String
    },
    Type: {
        type: String
    },
    Id: {
        type: String
    },
    Creator: {
        type: String
    },
    Filled: {
        type: String
    },
    Locked: {
        type: String
    },
    Time: {
        type: String
    },
    QuestionsByPage: {
        type: String
    },
    Questions: {
        type: Array<{
            Question: String,
            Type: String,
            NumberAnswers: String,
            MyAnswer: String,
            Answers:Array<String>
        }>()
    }
});

export default mongoose.model('Pollresolved', Pollresolved);
