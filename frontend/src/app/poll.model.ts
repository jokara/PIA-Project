import { Question } from './question.model'

export class Poll{
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
    Questions: Array<Question>
}