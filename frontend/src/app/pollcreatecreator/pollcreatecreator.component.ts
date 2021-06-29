import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Question } from '../question.model';
import { Poll } from '../poll.model';

@Component({
  selector: 'app-pollcreatecreator',
  templateUrl: './pollcreatecreator.component.html',
  styleUrls: ['./pollcreatecreator.component.css']
})
export class PollcreatecreatorComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.dohvatiSveAnkete();
    this.creator = this.username;
    this.filled = 'no';
    this.locked = 'no';

    this.time = "3";
    this.name = "";
    this.startdate = "";
    this.enddate = "";
    this.about = "";
    this.type = "";
    this.questionByPage = "";
    this.flag = "false";
    for (let index = 0; index < 10; index++) {
      this.radioChecks[index] = "";
      this.wholeQuestion[index] = "";
      this.questionAnswers[index] = "";
      this.questionName[index] = "";
      this.questionType[index] = "";
      this.questionNumAnswers[index] = "";
    }

  }

  username: string;
  name: string
  startdate: string;
  enddate: string;
  about: string
  type: string
  id: string;
  creator: string;
  filled: string;
  locked: string;
  time: string;
  questionByPage: string;
  questions: Question[] = []

  questionName: String[] = []
  questionType: String[] = []
  questionNumAnswers: String[] = []
  questionAnswers: String[] = []
  wholeQuestion: String[] = []

  radioChecks: String[] = []
  questionsOffered: Question[] = [];
  allPolls: Poll[] = [];
  numQuestions: number;
  flag: string;
  newPoll: Poll = null;

  nazad() {
    this.router.navigate(['/kreator']);
  }


  kreirajPitanje() {
    let flag = false;
    if (this.wholeQuestion[0] == "" && this.questionName[0] == "") flag = true;
    if (this.wholeQuestion[0] == "" && this.questionType[0] == "") flag = true;
    if (this.wholeQuestion[0] == "" && this.questionNumAnswers[0] == "") flag = true;
    
    for (let i = 0; i < this.numQuestions; i++) {
      if (this.wholeQuestion[i] == "" && this.questionName[i] == "") flag = true;
      if (this.wholeQuestion[i] == "" && this.questionType[i] == "") flag = true;
      if (this.wholeQuestion[i] == "" && this.questionNumAnswers[i] == "") flag = true;
      //if (this.wholeQuestion[i]=="" && this.questionAnswers[i]=="") flag=true;
    }

    if (flag == true) {
      alert("Neka polja su ostala prazna!");
      return;
    }
    else {
      this.newPoll = new Poll();
      this.newPoll.Name = this.name;
      this.newPoll.StartDate = this.startdate;
      this.newPoll.EndDate = this.enddate;
      this.newPoll.About = this.about;
      this.newPoll.Type = this.type;
      this.newPoll.Id = this.id;
      this.newPoll.Creator = this.creator;
      this.newPoll.Filled = this.filled;
      this.newPoll.Locked = this.locked;
      this.newPoll.Time = this.time;
      this.newPoll.QuestionsByPage = this.questionByPage;
      this.newPoll.Questions = [];
      for (let i = 0; i < this.numQuestions; i++) {
        this.newPoll.Questions[i] = new Question();
        if (this.wholeQuestion[i] != "") {
          this.questionsOffered.forEach(element => {
            if (element.Question == this.wholeQuestion[i]) {
              this.newPoll.Questions[i] = element;
            }
          });
        }
        else {
          this.newPoll.Questions[i].Question = this.questionName[i].toString();
          this.newPoll.Questions[i].Type = this.questionType[i].toString();
          this.newPoll.Questions[i].NumberAnswers = this.questionNumAnswers[i].toString();
          let niz = this.questionAnswers[i].split(",");
          this.newPoll.Questions[i].Answers = niz;
        }
      }

      //localStorage.setItem("novaAnketa", JSON.stringify(this.newPoll));

      this.service.dodajAnketuKreatora(this.newPoll).subscribe(poll => {
      });

      alert("Uspesno ste kreirali anketu!");
      this.router.navigate(['/kreator']);

    }



  }


  dohvatiPonudjenaPitanja() {
    let ubaci = true;
    this.allPolls.forEach(p => {

      p.Questions.forEach(element => {
        ubaci = true;
        this.questionsOffered.forEach(e => {
          if (e.Question == element.Question) {
            ubaci = false;
          }
        });
        if (ubaci) this.questionsOffered.push(element);
      });

    });
    //alert(this.questionsOffered.length);
  }

  dohvatiSveAnkete() {
    this.service.sveAnkete().subscribe(data => {
      this.allPolls = JSON.parse(JSON.stringify(data));
      //alert(this.allPolls.length);
      this.dohvatiPonudjenaPitanja();
      this.postaviId();
    })


  }

  postaviId() {
    let max = 0;
    this.allPolls.forEach(p => {
      if (max < Number(p.Id)) {
        max = Number(p.Id);
      }
    });
    this.id = (max + 1) + "";
  }

  unosPitanja() {
    if (this.name != "" && this.questionByPage != "" && this.startdate != "" && this.enddate != "" && this.about != "" && this.type != "" && this.numQuestions != 0 && this.startdate < this.enddate) {
      for (let i = 0; i < this.numQuestions; i++) {
        this.questions[i] = new Question();
      }
      this.flag = "true";
    }
    else {
      alert("Sva polja moraju biti popunjena i datumi razumno rasporedjeni!");
    }
  }





}
