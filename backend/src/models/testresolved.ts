import mongoose from 'mongoose';

const Schema = mongoose.Schema;


let Testresolved = new Schema({
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
    Id: {
        type: String
    },
    Creator: {
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
            Points: String,
            Answers:Array<String>,
            CorrectAnswers:Array<String>,
            MyAnswer: String,
            WonPoints:String
        }>()
    }
});

export default mongoose.model('Testresolved', Testresolved);
