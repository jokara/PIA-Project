import { QuestionTestSolved } from './questiontestsolved.model'

export class TestResolved{
    
    UsernameUser:String
    NameUser:string
    SurnameUser:string
    Birthdate:string
    Name: string
    StartDate: string
    EndDate: string
    About: string
    Id: string
    Creator: string
    Locked: string
    Time: string
    QuestionsByPage: string
    Questions: Array<QuestionTestSolved>
}