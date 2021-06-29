import { QuestionTest } from './questiontest.model'

export class Test{
    Name: string
    StartDate: string
    EndDate: string
    About: string
    Id: string
    Creator: string
    Locked: string
    Time: string
    QuestionsByPage: string
    Questions: Array<QuestionTest>
}