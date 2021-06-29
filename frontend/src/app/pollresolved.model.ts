import { QuestionSolved } from './questionsolved.model'

export class PollResolved{
    UsernameUser:String
    NameUser:string
    SurnameUser:string
    Birthdate:string
    Name: string
    StartDate: string
    EndDate: string
    About: string
    Type: string
    Id: string
    Creator: string
    Filled: string
    Locked: string
    Time: string
    QuestionsByPage: string
    Questions: Array<QuestionSolved>
}