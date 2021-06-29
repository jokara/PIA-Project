import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { QuestionTest } from '../questiontest.model';
import { Test } from '../test.model';

@Component({
  selector: 'app-testcreatecreator',
  templateUrl: './testcreatecreator.component.html',
  styleUrls: ['./testcreatecreator.component.css']
})
export class TestcreatecreatorComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.dohvatiSveAnkete();
    this.creator = this.username;
    this.locked = 'no';
    this.name = "";
    this.startdate = "";
    this.enddate = "";
    this.about = "";
    this.flag = "false";
    this.questionsByPage = "";
    for (let index = 0; index < 10; index++) {
      this.radioChecks[index] = "";
      this.wholeQuestion[index] = "";
      this.questionAnswers[index] = "";
      this.questionName[index] = "";
      this.questionType[index] = "";
      this.questionNumAnswers[index] = "";
      this.questionCorrectAnswers[index] = "";
      this.questionPoints[index] = "";
    }

  }

  username: string;
  name: string
  startdate: string;
  enddate: string;
  about: string
  id: string;
  creator: string;
  locked: string;
  time: string;
  questions: QuestionTest[] = []
  questionsByPage: string;

  questionName: String[] = []
  questionType: String[] = []
  questionNumAnswers: String[] = []
  questionAnswers: String[] = []
  questionCorrectAnswers: String[] = []
  questionPoints: String[] = []
  wholeQuestion: String[] = []

  radioChecks: String[] = []
  questionsOffered: QuestionTest[] = [];
  allTests: Test[] = [];
  numQuestions: number;
  flag: string;
  newTest: Test = null;

  nazad() {
    this.router.navigate(['/kreator']);
  }


  kreirajPitanje() {
    let flag = false;
    if (this.wholeQuestion[0] == "" && this.questionName[0] == "") flag = true;
    if (this.wholeQuestion[0] == "" && this.questionType[0] == "") flag = true;
    if (this.wholeQuestion[0] == "" && this.questionNumAnswers[0] == "") flag = true;
    if (this.wholeQuestion[0] == "" && this.questionCorrectAnswers[0] == "") flag = true;
    if (this.wholeQuestion[0] == "" && this.questionPoints[0] == "") flag = true;

    for (let i = 0; i < this.numQuestions; i++) {
      if (this.wholeQuestion[i] == "" && this.questionName[i] == "") flag = true;
      if (this.wholeQuestion[i] == "" && this.questionType[i] == "") flag = true;
      if (this.wholeQuestion[i] == "" && this.questionNumAnswers[i] == "") flag = true;
      if (this.wholeQuestion[i] == "" && this.questionCorrectAnswers[i] == "") flag = true;
      if (this.wholeQuestion[i] == "" && this.questionPoints[i] == "") flag = true;
      //if (this.wholeQuestion[i]=="" && this.questionAnswers[i]=="") flag=true;
    }

    if (flag == true) {
      alert("Neka polja su ostala prazna!");
      return;
    }
    else {
      this.newTest = new Test();
      this.newTest.Name = this.name;
      this.newTest.StartDate = this.startdate;
      this.newTest.EndDate = this.enddate;
      this.newTest.About = this.about;
      this.newTest.Id = this.id;
      this.newTest.Creator = this.creator;
      this.newTest.Locked = this.locked;
      this.newTest.Time = this.time;
      this.newTest.QuestionsByPage = this.questionsByPage;
      this.newTest.Questions = [];
      for (let i = 0; i < this.numQuestions; i++) {
        this.newTest.Questions[i] = new QuestionTest();
        if (this.wholeQuestion[i] != "") {
          this.questionsOffered.forEach(element => {
            if (element.Question == this.wholeQuestion[i]) {
              this.newTest.Questions[i] = element;
            }
          });
        }
        else {
          this.newTest.Questions[i].Question = this.questionName[i].toString();
          this.newTest.Questions[i].Type = this.questionType[i].toString();
          this.newTest.Questions[i].NumberAnswers = this.questionNumAnswers[i].toString();
          this.newTest.Questions[i].Points = this.questionPoints[i].toString();
          let niz = this.questionAnswers[i].split(",");
          this.newTest.Questions[i].Answers = niz;
          let niz1 = this.questionCorrectAnswers[i].split(",");
          this.newTest.Questions[i].CorrectAnswers = niz1;
        }
      }

      //localStorage.setItem("noviTest", JSON.stringify(this.newTest));

      this.service.dodajTestKreatora(this.newTest).subscribe(test => {
      });

      alert("Uspesno ste kreirali test!");
      this.router.navigate(['/kreator']);

    }



  }


  dohvatiPonudjenaPitanja() {
    let ubaci = true;
    this.allTests.forEach(p => {

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
    this.service.sviTestovi().subscribe(data => {
      this.allTests = JSON.parse(JSON.stringify(data));
      //alert(this.allPolls.length);
      this.dohvatiPonudjenaPitanja();
      this.postaviId();
    })


  }

  postaviId() {
    let max = 0;
    this.allTests.forEach(p => {
      if (max < Number(p.Id)) {
        max = Number(p.Id);
      }
    });
    this.id = (max + 1) + "";
  }

  unosPitanja() {
    if (this.name != "" && this.startdate != "" && this.enddate != "" && this.about != "" && this.numQuestions != 0 && this.questionsByPage != "" && this.startdate < this.enddate) {
      for (let i = 0; i < this.numQuestions; i++) {
        this.questions[i] = new QuestionTest();
      }
      this.flag = "true";
    }
    else {
      alert("Sva polja moraju biti popunjena i datumi razumno rasporedjeni!");
    }
  }


}
