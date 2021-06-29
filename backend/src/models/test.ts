import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Test = new Schema({
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
            CorrectAnswers:Array<String>
        }>()
    }
});

export default mongoose.model('Test', Test);