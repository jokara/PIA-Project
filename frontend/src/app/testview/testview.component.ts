import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Test } from '../test.model';
import { TestResolved } from '../testresolved.model';
import { QuestionTestSolved } from '../questiontestsolved.model';


@Component({
  selector: 'app-testview',
  templateUrl: './testview.component.html',
  styleUrls: ['./testview.component.css']
})
export class TestviewComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }


  ngOnInit() {
    this.test = JSON.parse(localStorage.getItem('test'));
    this.shuffleFunction();
    this.username = localStorage.getItem('username');
    this.dohvatiPodatkeKorisnika();
    /**
       * Inicijalizacija nizova
       */
    for (let index = 0; index < 5; index++) {
      this.answerFirstQuestion[index] = "";
      this.answerSecondQuestion[index] = "";
      this.answerThirdQuestion[index] = "";
      this.answerFourthQuestion[index] = "";
      this.answerFifthQuestion[index] = "";

      this.answerSixthQuestion[index] = "";
      this.answerSeventhQuestion[index] = "";
      this.answerEightQuestion[index] = "";
      this.answerNinthQuestion[index] = "";
      this.answerTenthQuestion[index] = "";
    }
    this.nextPage = Number(this.test.QuestionsByPage);
    this.brojPitanjaAnkete = this.test.Questions.length;
    this.downBoundNextPage = 0;
    this.upBoundNextPage = this.nextPage;

    this.tajmer = Number(this.test.Time) * 60;
    this.zavrsavaj = true;
    this.odbrojavanjeVremena();
  }

  /**
   * Promenljiva koja sluzi za koriscenje next Page
   */
  nextPage: number;
  brojPitanjaAnkete: number;
  downBoundNextPage: number;
  upBoundNextPage: number;
  /**
   * Funkcija za Next Page i Previous Page
   */
  sledecaStranica() {
    if (this.upBoundNextPage < this.brojPitanjaAnkete) {
      this.downBoundNextPage += this.nextPage;
      this.upBoundNextPage += this.nextPage;
    }
  }

  prethodnaStranica() {
    if (this.downBoundNextPage != 0) {
      this.downBoundNextPage -= this.nextPage;
      this.upBoundNextPage -= this.nextPage;
    }
  }

  shuffleFunction() {
    let m = this.test.Questions.length;
    // While there remain elements to shuffle
    while (m > 0) {
      // Pick a remaining element…
      let i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      let t = this.test.Questions[m];
      this.test.Questions[m] = this.test.Questions[i];
      this.test.Questions[i] = t;
    }

    this.test.Questions.forEach(el => {
      let l = el.Answers.length;
      // While there remain elements to shuffle
      while (l > 0) {
        // Pick a remaining element…
        let j = Math.floor(Math.random() * l--);
        // And swap it with the current element.
        let t =el.Answers[l];
        el.Answers[l] = el.Answers[j];
        el.Answers[j] = t;
      }
    });
  }

  tajmer: number;
  zavrsavaj: boolean;
  interval;
  odbrojavanjeVremena() {
    this.interval = setInterval(() => {
      if (this.tajmer > 0) {
        this.tajmer--;
        if (this.tajmer < 10 && this.tajmer > 8 && this.zavrsavaj) {
          alert("Ostalo vam je jos 10 sekundi!")
        }
      } else {
        if (this.zavrsavaj) {
          let suma = this.test.Questions.length;
          let odgovorenoDosad = 0;
          /**
           * Provera da li je neko pitanje tipa checkBox
           */
          let firstCheck = false;
          this.answerFirstQuestion.forEach(e => {
            if (e.toString() == 'true') {
              firstCheck = true;
            }
          });
          //alert(firstCheck);
          let secondCheck = false;
          this.answerSecondQuestion.forEach(e => {
            if (e.toString() == 'true') {
              secondCheck = true;
            }
          });
          let thirdCheck = false;
          this.answerThirdQuestion.forEach(e => {
            if (e.toString() == 'true') {
              thirdCheck = true;
            }
          });
          let fourthCheck = false;
          this.answerFourthQuestion.forEach(e => {
            if (e.toString() == 'true') {
              fourthCheck = true;
            }
          });
          let fifthCheck = false;
          this.answerFifthQuestion.forEach(e => {
            if (e.toString() == 'true') {
              fifthCheck = true;
            }
          });

          let sixthCheck = false;
          this.answerSixthQuestion.forEach(e => {
            if (e.toString() == 'true') {
              sixthCheck = true;
            }
          });

          let seventhCheck = false;
          this.answerSeventhQuestion.forEach(e => {
            if (e.toString() == 'true') {
              seventhCheck = true;
            }
          });

          let eigthCheck = false;
          this.answerEightQuestion.forEach(e => {
            if (e.toString() == 'true') {
              eigthCheck = true;
            }
          });

          let ninthCheck = false;
          this.answerNinthQuestion.forEach(e => {
            if (e.toString() == 'true') {
              ninthCheck = true;
            }
          });

          let tenthCheck = false;
          this.answerTenthQuestion.forEach(e => {
            if (e.toString() == 'true') {
              tenthCheck = true;
            }
          });

          if (((firstCheck || (this.answerFirstQuestion[0] != "" || this.answerFirstQuestion[1] != "" || this.answerFirstQuestion[2] != "" || this.answerFirstQuestion[3] != "")) && this.answerFirstQuestion[0] != "false") && this.answerFirstQuestion.length > 0) odgovorenoDosad++;
          if (((secondCheck || (this.answerSecondQuestion[0] != "" || this.answerSecondQuestion[1] != "" || this.answerSecondQuestion[2] != "" || this.answerSecondQuestion[3] != "")) && this.answerSecondQuestion[0] != "false") && this.answerSecondQuestion.length > 0) odgovorenoDosad++;
          if (((thirdCheck || (this.answerThirdQuestion[0] != "" || this.answerThirdQuestion[1] != "" || this.answerThirdQuestion[2] != "" || this.answerThirdQuestion[3] != "")) && this.answerThirdQuestion[0] != "false") && this.answerThirdQuestion.length > 0) odgovorenoDosad++;
          if (((fourthCheck || (this.answerFourthQuestion[0] != "" || this.answerFourthQuestion[1] != "" || this.answerFourthQuestion[2] != "" || this.answerFourthQuestion[3] != "")) && this.answerFourthQuestion[0] != "false") && this.answerFourthQuestion.length > 0) odgovorenoDosad++;
          if (((fifthCheck || (this.answerFifthQuestion[0] != "" || this.answerFifthQuestion[1] != "" || this.answerFifthQuestion[2] != "" || this.answerFifthQuestion[3] != "")) && this.answerFifthQuestion[0] != "false") && this.answerFifthQuestion.length > 0) odgovorenoDosad++;
          if (((sixthCheck || (this.answerSixthQuestion[0] != "" || this.answerSixthQuestion[1] != "" || this.answerSixthQuestion[2] != "" || this.answerSixthQuestion[3] != "")) && this.answerSixthQuestion[0] != "false") && this.answerSixthQuestion.length > 0) odgovorenoDosad++;
          if (((seventhCheck || (this.answerSeventhQuestion[0] != "" || this.answerSeventhQuestion[1] != "" || this.answerSeventhQuestion[2] != "" || this.answerSeventhQuestion[3] != "")) && this.answerSeventhQuestion[0] != "false") && this.answerSeventhQuestion.length > 0) odgovorenoDosad++;
          if (((eigthCheck || (this.answerEightQuestion[0] != "" || this.answerEightQuestion[1] != "" || this.answerEightQuestion[2] != "" || this.answerEightQuestion[3] != "")) && this.answerEightQuestion[0] != "false") && this.answerEightQuestion.length > 0) odgovorenoDosad++;
          if (((ninthCheck || (this.answerNinthQuestion[0] != "" || this.answerNinthQuestion[1] != "" || this.answerNinthQuestion[2] != "" || this.answerNinthQuestion[3] != "")) && this.answerNinthQuestion[0] != "false") && this.answerNinthQuestion.length > 0) odgovorenoDosad++;
          if (((tenthCheck || (this.answerTenthQuestion[0] != "" || this.answerTenthQuestion[1] != "" || this.answerTenthQuestion[2] != "" || this.answerTenthQuestion[3] != "")) && this.answerTenthQuestion[0] != "false") && this.answerTenthQuestion.length > 0) odgovorenoDosad++;

          this.testResolved = new TestResolved();

          this.testResolved.Name = this.test.Name;
          this.testResolved.StartDate = this.test.StartDate;
          this.testResolved.EndDate = this.test.EndDate;
          this.testResolved.About = this.test.About;
          this.testResolved.Id = this.test.Id;
          this.testResolved.Locked = 'yes';
          this.testResolved.Time = this.test.Time;
          this.testResolved.QuestionsByPage = this.test.QuestionsByPage;
          this.testResolved.UsernameUser = this.username;
          this.testResolved.NameUser = this.user.name;
          this.testResolved.SurnameUser = this.user.surname;
          this.testResolved.Birthdate = this.user.birthdate;

          /*********************Dodavanje nizova***********/
          this.testResolved.Questions = [];
          for (let index = 0; index < this.test.Questions.length; index++) {
            this.testResolved.Questions[index] = new QuestionTestSolved();
            this.testResolved.Questions[index].Question = this.test.Questions[index].Question;
            this.testResolved.Questions[index].Type = this.test.Questions[index].Type;
            this.testResolved.Questions[index].NumberAnswers = this.test.Questions[index].NumberAnswers;
            this.testResolved.Questions[index].Answers = this.test.Questions[index].Answers;
            this.testResolved.Questions[index].CorrectAnswers = this.test.Questions[index].CorrectAnswers;
            this.testResolved.Questions[index].Points = this.test.Questions[index].Points;

            switch (index) {
              case 0:
                /**
                 * Za checkBox
                 */
                if (firstCheck) {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < this.test.Questions[0].Answers.length; i++) {
                    if (this.answerFirstQuestion[i].toString() == 'true') {
                      MyAnswerOnQuestion += this.test.Questions[0].Answers[i] + "$";
                    }
                  }
                  this.answerFirstQuestion[0] = MyAnswerOnQuestion;
                }
                /**
                 * Za sve ostale tipove pitanja
                 */
                else {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < Number(this.test.Questions[0].NumberAnswers); i++) {
                    if (this.answerFirstQuestion[i] != "") {
                      MyAnswerOnQuestion += this.answerFirstQuestion[i] + "$";
                    }
                  }
                  this.answerFirstQuestion[0] = MyAnswerOnQuestion;
                }

                this.testResolved.Questions[0].MyAnswer = this.answerFirstQuestion[0].toString();
                break;
              case 1:
                /**
                 * Za checkBox
                 */
                if (secondCheck) {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < this.test.Questions[1].Answers.length; i++) {
                    if (this.answerSecondQuestion[i].toString() == 'true') {
                      MyAnswerOnQuestion += this.test.Questions[1].Answers[i] + "$";
                    }
                  }
                  this.answerSecondQuestion[0] = MyAnswerOnQuestion;
                }
                /**
                 * Za sve ostale tipove pitanja
                 */
                else {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < Number(this.test.Questions[1].NumberAnswers); i++) {
                    if (this.answerSecondQuestion[i] != "") {
                      MyAnswerOnQuestion += this.answerSecondQuestion[i] + "$";
                    }
                  }
                  this.answerSecondQuestion[0] = MyAnswerOnQuestion;
                }
                this.testResolved.Questions[1].MyAnswer = this.answerSecondQuestion[0].toString();
                break;
              /**
               * Za checkBox
               */
              case 2:
                if (thirdCheck) {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < this.test.Questions[2].Answers.length; i++) {
                    if (this.answerThirdQuestion[i].toString() == 'true') {
                      MyAnswerOnQuestion += this.test.Questions[2].Answers[i] + "$";
                    }
                  }
                  this.answerThirdQuestion[0] = MyAnswerOnQuestion;
                }
                /**
                 * Za sve ostale tipove pitanja
                 */
                else {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < Number(this.test.Questions[2].NumberAnswers); i++) {
                    if (this.answerThirdQuestion[i] != "") {
                      MyAnswerOnQuestion += this.answerThirdQuestion[i] + "$";
                    }
                  }
                  this.answerThirdQuestion[0] = MyAnswerOnQuestion;
                }
                this.testResolved.Questions[2].MyAnswer = this.answerThirdQuestion[0].toString();
                break;
              /**
               * Za checkBox
               */
              case 3:
                if (fourthCheck) {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < this.test.Questions[3].Answers.length; i++) {
                    if (this.answerFourthQuestion[i].toString() == 'true') {
                      MyAnswerOnQuestion += this.test.Questions[3].Answers[i] + "$";
                    }
                  }
                  this.answerFourthQuestion[0] = MyAnswerOnQuestion;
                }
                /**
                 * Za sve ostale tipove pitanja
                 */
                else {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < Number(this.test.Questions[3].NumberAnswers); i++) {
                    if (this.answerFourthQuestion[i] != "") {
                      MyAnswerOnQuestion += this.answerFourthQuestion[i] + "$";
                    }
                  }
                  this.answerFourthQuestion[0] = MyAnswerOnQuestion;
                }
                this.testResolved.Questions[3].MyAnswer = this.answerFourthQuestion[0].toString();
                break;
              /**
               * Za checkBox
               */
              case 4:
                if (fifthCheck) {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < this.test.Questions[4].Answers.length; i++) {
                    if (this.answerFifthQuestion[i].toString() == 'true') {
                      MyAnswerOnQuestion += this.test.Questions[4].Answers[i] + "$";
                    }
                  }
                  this.answerFifthQuestion[0] = MyAnswerOnQuestion;
                }
                /**
                 * Za sve ostale tipove pitanja
                 */
                else {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < Number(this.test.Questions[4].NumberAnswers); i++) {
                    if (this.answerFifthQuestion[i] != "") {
                      MyAnswerOnQuestion += this.answerFifthQuestion[i] + "$";
                    }
                  }
                  this.answerFifthQuestion[0] = MyAnswerOnQuestion;
                }
                this.testResolved.Questions[4].MyAnswer = this.answerFifthQuestion[0].toString();
                break;

              case 5:
                /**
                 * Za checkBox
                 */
                if (sixthCheck) {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < this.test.Questions[5].Answers.length; i++) {
                    if (this.answerSixthQuestion[i].toString() == 'true') {
                      MyAnswerOnQuestion += this.test.Questions[5].Answers[i] + "$";
                    }
                  }
                  this.answerSixthQuestion[0] = MyAnswerOnQuestion;
                }
                /**
                 * Za sve ostale tipove pitanja
                 */
                else {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < Number(this.test.Questions[5].NumberAnswers); i++) {
                    if (this.answerSixthQuestion[i] != "") {
                      MyAnswerOnQuestion += this.answerSixthQuestion[i] + "$";
                    }
                  }
                  this.answerSixthQuestion[0] = MyAnswerOnQuestion;
                }
                this.testResolved.Questions[5].MyAnswer = this.answerSixthQuestion[0].toString();
                break;

              case 6:
                /**
                 * Za checkBox
                 */
                if (seventhCheck) {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < this.test.Questions[6].Answers.length; i++) {
                    if (this.answerSeventhQuestion[i].toString() == 'true') {
                      MyAnswerOnQuestion += this.test.Questions[6].Answers[i] + "$";
                    }
                  }
                  this.answerSeventhQuestion[0] = MyAnswerOnQuestion;
                }
                /**
                 * Za sve ostale tipove pitanja
                 */
                else {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < Number(this.test.Questions[6].NumberAnswers); i++) {
                    if (this.answerSeventhQuestion[i] != "") {
                      MyAnswerOnQuestion += this.answerSeventhQuestion[i] + "$";
                    }
                  }
                  this.answerSeventhQuestion[0] = MyAnswerOnQuestion;
                }
                this.testResolved.Questions[6].MyAnswer = this.answerSeventhQuestion[0].toString();
                break;

              case 7:
                /**
                 * Za checkBox
                 */
                if (eigthCheck) {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < this.test.Questions[7].Answers.length; i++) {
                    if (this.answerEightQuestion[i].toString() == 'true') {
                      MyAnswerOnQuestion += this.test.Questions[7].Answers[i] + "$";
                    }
                  }
                  this.answerEightQuestion[0] = MyAnswerOnQuestion;
                }
                /**
                 * Za sve ostale tipove pitanja
                 */
                else {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < Number(this.test.Questions[7].NumberAnswers); i++) {
                    if (this.answerEightQuestion[i] != "") {
                      MyAnswerOnQuestion += this.answerEightQuestion[i] + "$";
                    }
                  }
                  this.answerEightQuestion[0] = MyAnswerOnQuestion;
                }
                this.testResolved.Questions[7].MyAnswer = this.answerEightQuestion[0].toString();
                break;

              case 8:
                /**
                 * Za checkBox
                 */
                if (ninthCheck) {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < this.test.Questions[8].Answers.length; i++) {
                    if (this.answerNinthQuestion[i].toString() == 'true') {
                      MyAnswerOnQuestion += this.test.Questions[8].Answers[i] + "$";
                    }
                  }
                  this.answerNinthQuestion[0] = MyAnswerOnQuestion;
                }
                /**
                 * Za sve ostale tipove pitanja
                 */
                else {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < Number(this.test.Questions[8].NumberAnswers); i++) {
                    if (this.answerNinthQuestion[i] != "") {
                      MyAnswerOnQuestion += this.answerNinthQuestion[i] + "$";
                    }
                  }
                  this.answerNinthQuestion[0] = MyAnswerOnQuestion;
                }
                this.testResolved.Questions[8].MyAnswer = this.answerNinthQuestion[0].toString();
                break;

              case 9:
                /**
                 * Za checkBox
                 */
                if (tenthCheck) {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < this.test.Questions[9].Answers.length; i++) {
                    if (this.answerTenthQuestion[i].toString() == 'true') {
                      MyAnswerOnQuestion += this.test.Questions[9].Answers[i] + "$";
                    }
                  }
                  this.answerTenthQuestion[0] = MyAnswerOnQuestion;
                }
                /**
                 * Za sve ostale tipove pitanja
                 */
                else {
                  let MyAnswerOnQuestion = "";
                  for (let i = 0; i < Number(this.test.Questions[9].NumberAnswers); i++) {
                    if (this.answerTenthQuestion[i] != "") {
                      MyAnswerOnQuestion += this.answerTenthQuestion[i] + "$";
                    }
                  }
                  this.answerTenthQuestion[0] = MyAnswerOnQuestion;
                }
                this.testResolved.Questions[9].MyAnswer = this.answerTenthQuestion[0].toString();
                break;



            }
          }
          localStorage.setItem('filledTest', JSON.stringify(this.testResolved));
          localStorage.setItem('tipKorisnika', this.user.type);
          //alert("Kao sam je podigao");
          this.router.navigate(['/pregledTesta']);
          this.zavrsavaj = false;
        }
      }
    }, 1000)
  }


  /**
   * Promenljive za manipulaciju vec popunjenim pitanjima
   */
  vecRadio: String;
  //oldPoll: PollResolved;

  user: User = null;
  test: Test = null;
  testResolved: TestResolved = null;

  username: String
  answerFirstQuestion: String[] = []
  answerSecondQuestion: String[] = []
  answerThirdQuestion: String[] = []
  answerFourthQuestion: String[] = []
  answerFifthQuestion: String[] = []
  /**
   * Pitanja od 6 do 10
   */
  answerSixthQuestion: String[] = []
  answerSeventhQuestion: String[] = []
  answerEightQuestion: String[] = []
  answerNinthQuestion: String[] = []
  answerTenthQuestion: String[] = []


  progressBar: number = 0;

  odustani() {
    this.router.navigate(['/user']);
  }


  dohvatiPodatkeKorisnika() {
    this.service.podaciKorisnika(this.username).subscribe(data => {
      this.user = JSON.parse(JSON.stringify(data));

    })
  }

  getValue(): number {
    let suma = this.test.Questions.length;
    let odgovorenoDosad = 0;
    /**
     * Provera da li je neko pitanje tipa checkBox
     */
    let firstCheck = false;
    this.answerFirstQuestion.forEach(e => {
      if (e.toString() == 'true') {
        firstCheck = true;
      }
    });
    //alert(firstCheck);
    let secondCheck = false;
    this.answerSecondQuestion.forEach(e => {
      if (e.toString() == 'true') {
        secondCheck = true;
      }
    });
    let thirdCheck = false;
    this.answerThirdQuestion.forEach(e => {
      if (e.toString() == 'true') {
        thirdCheck = true;
      }
    });
    let fourthCheck = false;
    this.answerFourthQuestion.forEach(e => {
      if (e.toString() == 'true') {
        fourthCheck = true;
      }
    });
    let fifthCheck = false;
    this.answerFifthQuestion.forEach(e => {
      if (e.toString() == 'true') {
        fifthCheck = true;
      }
    });

    let sixthCheck = false;
    this.answerSixthQuestion.forEach(e => {
      if (e.toString() == 'true') {
        sixthCheck = true;
      }
    });

    let seventhCheck = false;
    this.answerSeventhQuestion.forEach(e => {
      if (e.toString() == 'true') {
        seventhCheck = true;
      }
    });

    let eigthCheck = false;
    this.answerEightQuestion.forEach(e => {
      if (e.toString() == 'true') {
        eigthCheck = true;
      }
    });

    let ninthCheck = false;
    this.answerNinthQuestion.forEach(e => {
      if (e.toString() == 'true') {
        ninthCheck = true;
      }
    });

    let tenthCheck = false;
    this.answerTenthQuestion.forEach(e => {
      if (e.toString() == 'true') {
        tenthCheck = true;
      }
    });


    if (((firstCheck || (this.answerFirstQuestion[0] != "" || this.answerFirstQuestion[1] != "" || this.answerFirstQuestion[2] != "" || this.answerFirstQuestion[3] != "")) && this.answerFirstQuestion[0] != "false") && this.answerFirstQuestion.length > 0) odgovorenoDosad++;
    if (((secondCheck || (this.answerSecondQuestion[0] != "" || this.answerSecondQuestion[1] != "" || this.answerSecondQuestion[2] != "" || this.answerSecondQuestion[3] != "")) && this.answerSecondQuestion[0] != "false") && this.answerSecondQuestion.length > 0) odgovorenoDosad++;
    if (((thirdCheck || (this.answerThirdQuestion[0] != "" || this.answerThirdQuestion[1] != "" || this.answerThirdQuestion[2] != "" || this.answerThirdQuestion[3] != "")) && this.answerThirdQuestion[0] != "false") && this.answerThirdQuestion.length > 0) odgovorenoDosad++;
    if (((fourthCheck || (this.answerFourthQuestion[0] != "" || this.answerFourthQuestion[1] != "" || this.answerFourthQuestion[2] != "" || this.answerFourthQuestion[3] != "")) && this.answerFourthQuestion[0] != "false") && this.answerFourthQuestion.length > 0) odgovorenoDosad++;
    if (((fifthCheck || (this.answerFifthQuestion[0] != "" || this.answerFifthQuestion[1] != "" || this.answerFifthQuestion[2] != "" || this.answerFifthQuestion[3] != "")) && this.answerFifthQuestion[0] != "false") && this.answerFifthQuestion.length > 0) odgovorenoDosad++;
    if (((sixthCheck || (this.answerSixthQuestion[0] != "" || this.answerSixthQuestion[1] != "" || this.answerSixthQuestion[2] != "" || this.answerSixthQuestion[3] != "")) && this.answerSixthQuestion[0] != "false") && this.answerSixthQuestion.length > 0) odgovorenoDosad++;
    if (((seventhCheck || (this.answerSeventhQuestion[0] != "" || this.answerSeventhQuestion[1] != "" || this.answerSeventhQuestion[2] != "" || this.answerSeventhQuestion[3] != "")) && this.answerSeventhQuestion[0] != "false") && this.answerSeventhQuestion.length > 0) odgovorenoDosad++;
    if (((eigthCheck || (this.answerEightQuestion[0] != "" || this.answerEightQuestion[1] != "" || this.answerEightQuestion[2] != "" || this.answerEightQuestion[3] != "")) && this.answerEightQuestion[0] != "false") && this.answerEightQuestion.length > 0) odgovorenoDosad++;
    if (((ninthCheck || (this.answerNinthQuestion[0] != "" || this.answerNinthQuestion[1] != "" || this.answerNinthQuestion[2] != "" || this.answerNinthQuestion[3] != "")) && this.answerNinthQuestion[0] != "false") && this.answerNinthQuestion.length > 0) odgovorenoDosad++;
    if (((tenthCheck || (this.answerTenthQuestion[0] != "" || this.answerTenthQuestion[1] != "" || this.answerTenthQuestion[2] != "" || this.answerTenthQuestion[3] != "")) && this.answerTenthQuestion[0] != "false") && this.answerTenthQuestion.length > 0) odgovorenoDosad++;

    this.progressBar = 100 * odgovorenoDosad / suma;
    return this.progressBar;
  }


  konacnoPredaj() {
    let suma = this.test.Questions.length;
    let odgovorenoDosad = 0;
    /**
     * Provera da li je neko pitanje tipa checkBox
     */
    let firstCheck = false;
    this.answerFirstQuestion.forEach(e => {
      if (e.toString() == 'true') {
        firstCheck = true;
      }
    });
    //alert(firstCheck);
    let secondCheck = false;
    this.answerSecondQuestion.forEach(e => {
      if (e.toString() == 'true') {
        secondCheck = true;
      }
    });
    let thirdCheck = false;
    this.answerThirdQuestion.forEach(e => {
      if (e.toString() == 'true') {
        thirdCheck = true;
      }
    });
    let fourthCheck = false;
    this.answerFourthQuestion.forEach(e => {
      if (e.toString() == 'true') {
        fourthCheck = true;
      }
    });
    let fifthCheck = false;
    this.answerFifthQuestion.forEach(e => {
      if (e.toString() == 'true') {
        fifthCheck = true;
      }
    });

    let sixthCheck = false;
    this.answerSixthQuestion.forEach(e => {
      if (e.toString() == 'true') {
        sixthCheck = true;
      }
    });

    let seventhCheck = false;
    this.answerSeventhQuestion.forEach(e => {
      if (e.toString() == 'true') {
        seventhCheck = true;
      }
    });

    let eigthCheck = false;
    this.answerEightQuestion.forEach(e => {
      if (e.toString() == 'true') {
        eigthCheck = true;
      }
    });

    let ninthCheck = false;
    this.answerNinthQuestion.forEach(e => {
      if (e.toString() == 'true') {
        ninthCheck = true;
      }
    });

    let tenthCheck = false;
    this.answerTenthQuestion.forEach(e => {
      if (e.toString() == 'true') {
        tenthCheck = true;
      }
    });


    if (((firstCheck || (this.answerFirstQuestion[0] != "" || this.answerFirstQuestion[1] != "" || this.answerFirstQuestion[2] != "" || this.answerFirstQuestion[3] != "")) && this.answerFirstQuestion[0] != "false") && this.answerFirstQuestion.length > 0) odgovorenoDosad++;
    if (((secondCheck || (this.answerSecondQuestion[0] != "" || this.answerSecondQuestion[1] != "" || this.answerSecondQuestion[2] != "" || this.answerSecondQuestion[3] != "")) && this.answerSecondQuestion[0] != "false") && this.answerSecondQuestion.length > 0) odgovorenoDosad++;
    if (((thirdCheck || (this.answerThirdQuestion[0] != "" || this.answerThirdQuestion[1] != "" || this.answerThirdQuestion[2] != "" || this.answerThirdQuestion[3] != "")) && this.answerThirdQuestion[0] != "false") && this.answerThirdQuestion.length > 0) odgovorenoDosad++;
    if (((fourthCheck || (this.answerFourthQuestion[0] != "" || this.answerFourthQuestion[1] != "" || this.answerFourthQuestion[2] != "" || this.answerFourthQuestion[3] != "")) && this.answerFourthQuestion[0] != "false") && this.answerFourthQuestion.length > 0) odgovorenoDosad++;
    if (((fifthCheck || (this.answerFifthQuestion[0] != "" || this.answerFifthQuestion[1] != "" || this.answerFifthQuestion[2] != "" || this.answerFifthQuestion[3] != "")) && this.answerFifthQuestion[0] != "false") && this.answerFifthQuestion.length > 0) odgovorenoDosad++;
    if (((sixthCheck || (this.answerSixthQuestion[0] != "" || this.answerSixthQuestion[1] != "" || this.answerSixthQuestion[2] != "" || this.answerSixthQuestion[3] != "")) && this.answerSixthQuestion[0] != "false") && this.answerSixthQuestion.length > 0) odgovorenoDosad++;
    if (((seventhCheck || (this.answerSeventhQuestion[0] != "" || this.answerSeventhQuestion[1] != "" || this.answerSeventhQuestion[2] != "" || this.answerSeventhQuestion[3] != "")) && this.answerSeventhQuestion[0] != "false") && this.answerSeventhQuestion.length > 0) odgovorenoDosad++;
    if (((eigthCheck || (this.answerEightQuestion[0] != "" || this.answerEightQuestion[1] != "" || this.answerEightQuestion[2] != "" || this.answerEightQuestion[3] != "")) && this.answerEightQuestion[0] != "false") && this.answerEightQuestion.length > 0) odgovorenoDosad++;
    if (((ninthCheck || (this.answerNinthQuestion[0] != "" || this.answerNinthQuestion[1] != "" || this.answerNinthQuestion[2] != "" || this.answerNinthQuestion[3] != "")) && this.answerNinthQuestion[0] != "false") && this.answerNinthQuestion.length > 0) odgovorenoDosad++;
    if (((tenthCheck || (this.answerTenthQuestion[0] != "" || this.answerTenthQuestion[1] != "" || this.answerTenthQuestion[2] != "" || this.answerTenthQuestion[3] != "")) && this.answerTenthQuestion[0] != "false") && this.answerTenthQuestion.length > 0) odgovorenoDosad++;

    if (suma == odgovorenoDosad) {
      window.confirm("Popunili ste celu test");
      if (confirm("OK za kraj, Cancel za povratak na popunjavanje!")) {
        alert("Uspesno ste zavrsili test!");
        /**
         * Cuvanje testa sa odgovorima ispitanika u bazi i njegovo preusmeravanje na stranicu za usera
         */
        this.testResolved = new TestResolved();

        this.testResolved.Name = this.test.Name;
        this.testResolved.StartDate = this.test.StartDate;
        this.testResolved.EndDate = this.test.EndDate;
        this.testResolved.About = this.test.About;
        this.testResolved.Id = this.test.Id;
        this.testResolved.Locked = 'yes';
        this.testResolved.Time = this.test.Time;
        this.testResolved.QuestionsByPage = this.test.QuestionsByPage;
        this.testResolved.UsernameUser = this.username;
        this.testResolved.NameUser = this.user.name;
        this.testResolved.SurnameUser = this.user.surname;
        this.testResolved.Birthdate = this.user.birthdate;

        /*********************Dodavanje nizova***********/
        this.testResolved.Questions = [];
        for (let index = 0; index < this.test.Questions.length; index++) {
          this.testResolved.Questions[index] = new QuestionTestSolved();
          this.testResolved.Questions[index].Question = this.test.Questions[index].Question;
          this.testResolved.Questions[index].Type = this.test.Questions[index].Type;
          this.testResolved.Questions[index].NumberAnswers = this.test.Questions[index].NumberAnswers;
          this.testResolved.Questions[index].Answers = this.test.Questions[index].Answers;
          this.testResolved.Questions[index].CorrectAnswers = this.test.Questions[index].CorrectAnswers;
          this.testResolved.Questions[index].Points = this.test.Questions[index].Points;

          switch (index) {
            case 0:
              /**
               * Za checkBox
               */
              if (firstCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[0].Answers.length; i++) {
                  if (this.answerFirstQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[0].Answers[i] + "$";
                  }
                }
                this.answerFirstQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[0].NumberAnswers); i++) {
                  if (this.answerFirstQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFirstQuestion[i] + "$";
                  }
                }
                this.answerFirstQuestion[0] = MyAnswerOnQuestion;
              }

              this.testResolved.Questions[0].MyAnswer = this.answerFirstQuestion[0].toString();
              break;
            case 1:
              /**
               * Za checkBox
               */
              if (secondCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[1].Answers.length; i++) {
                  if (this.answerSecondQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[1].Answers[i] + "$";
                  }
                }
                this.answerSecondQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[1].NumberAnswers); i++) {
                  if (this.answerSecondQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSecondQuestion[i] + "$";
                  }
                }
                this.answerSecondQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[1].MyAnswer = this.answerSecondQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 2:
              if (thirdCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[2].Answers.length; i++) {
                  if (this.answerThirdQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[2].Answers[i] + "$";
                  }
                }
                this.answerThirdQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[2].NumberAnswers); i++) {
                  if (this.answerThirdQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerThirdQuestion[i] + "$";
                  }
                }
                this.answerThirdQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[2].MyAnswer = this.answerThirdQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 3:
              if (fourthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[3].Answers.length; i++) {
                  if (this.answerFourthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[3].Answers[i] + "$";
                  }
                }
                this.answerFourthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[3].NumberAnswers); i++) {
                  if (this.answerFourthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFourthQuestion[i] + "$";
                  }
                }
                this.answerFourthQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[3].MyAnswer = this.answerFourthQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 4:
              if (fifthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[4].Answers.length; i++) {
                  if (this.answerFifthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[4].Answers[i] + "$";
                  }
                }
                this.answerFifthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[4].NumberAnswers); i++) {
                  if (this.answerFifthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFifthQuestion[i] + "$";
                  }
                }
                this.answerFifthQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[4].MyAnswer = this.answerFifthQuestion[0].toString();
              break;

            case 5:
              /**
               * Za checkBox
               */
              if (sixthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[5].Answers.length; i++) {
                  if (this.answerSixthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[5].Answers[i] + "$";
                  }
                }
                this.answerSixthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[5].NumberAnswers); i++) {
                  if (this.answerSixthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSixthQuestion[i] + "$";
                  }
                }
                this.answerSixthQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[5].MyAnswer = this.answerSixthQuestion[0].toString();
              break;

            case 6:
              /**
               * Za checkBox
               */
              if (seventhCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[6].Answers.length; i++) {
                  if (this.answerSeventhQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[6].Answers[i] + "$";
                  }
                }
                this.answerSeventhQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[6].NumberAnswers); i++) {
                  if (this.answerSeventhQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSeventhQuestion[i] + "$";
                  }
                }
                this.answerSeventhQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[6].MyAnswer = this.answerSeventhQuestion[0].toString();
              break;

            case 7:
              /**
               * Za checkBox
               */
              if (eigthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[7].Answers.length; i++) {
                  if (this.answerEightQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[7].Answers[i] + "$";
                  }
                }
                this.answerEightQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[7].NumberAnswers); i++) {
                  if (this.answerEightQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerEightQuestion[i] + "$";
                  }
                }
                this.answerEightQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[7].MyAnswer = this.answerEightQuestion[0].toString();
              break;

            case 8:
              /**
               * Za checkBox
               */
              if (ninthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[8].Answers.length; i++) {
                  if (this.answerNinthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[8].Answers[i] + "$";
                  }
                }
                this.answerNinthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[8].NumberAnswers); i++) {
                  if (this.answerNinthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerNinthQuestion[i] + "$";
                  }
                }
                this.answerNinthQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[8].MyAnswer = this.answerNinthQuestion[0].toString();
              break;

            case 9:
              /**
               * Za checkBox
               */
              if (tenthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[9].Answers.length; i++) {
                  if (this.answerTenthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[9].Answers[i] + "$";
                  }
                }
                this.answerTenthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[9].NumberAnswers); i++) {
                  if (this.answerTenthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerTenthQuestion[i] + "$";
                  }
                }
                this.answerTenthQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[9].MyAnswer = this.answerTenthQuestion[0].toString();
              break;


          }
        }
        localStorage.setItem('filledTest', JSON.stringify(this.testResolved));
        localStorage.setItem('tipKorisnika', this.user.type);
        //alert("Kao sam je podigao");
        this.router.navigate(['/pregledTesta']);
        this.zavrsavaj = false;
      } else {
        alert("Mozete nastaviti sa ispravljanjem!");
      }
    }
    else {
      window.confirm("Niste popunili celu test");
      if (confirm("OK za kraj, Cancel za povratak na popunjavanje!")) {
        alert("Uspesno ste zavrsili test!");
        /**
         * Cuvanje ankete sa odgovorima ispitanika u bazi i njegovo preusmeravanje na stranicu za usera
         */
        this.testResolved = new TestResolved();

        this.testResolved.Name = this.test.Name;
        this.testResolved.StartDate = this.test.StartDate;
        this.testResolved.EndDate = this.test.EndDate;
        this.testResolved.About = this.test.About;
        this.testResolved.Id = this.test.Id;
        this.testResolved.Locked = 'yes';
        this.testResolved.Time = this.test.Time;
        this.testResolved.QuestionsByPage = this.test.QuestionsByPage;
        this.testResolved.UsernameUser = this.username;
        this.testResolved.NameUser = this.user.name;
        this.testResolved.SurnameUser = this.user.surname;
        this.testResolved.Birthdate = this.user.birthdate;

        /*********************Dodavanje nizova***********/
        this.testResolved.Questions = [];
        for (let index = 0; index < this.test.Questions.length; index++) {
          this.testResolved.Questions[index] = new QuestionTestSolved();
          this.testResolved.Questions[index].Question = this.test.Questions[index].Question;
          this.testResolved.Questions[index].Type = this.test.Questions[index].Type;
          this.testResolved.Questions[index].NumberAnswers = this.test.Questions[index].NumberAnswers;
          this.testResolved.Questions[index].Answers = this.test.Questions[index].Answers;
          this.testResolved.Questions[index].CorrectAnswers = this.test.Questions[index].CorrectAnswers;
          this.testResolved.Questions[index].Points = this.test.Questions[index].Points;


          switch (index) {
            case 0:
              /**
               * Za checkBox
               */
              if (firstCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[0].Answers.length; i++) {
                  if (this.answerFirstQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[0].Answers[i] + "$";
                  }
                }
                this.answerFirstQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[0].NumberAnswers); i++) {
                  if (this.answerFirstQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFirstQuestion[i] + "$";
                  }
                }
                this.answerFirstQuestion[0] = MyAnswerOnQuestion;
              }

              this.testResolved.Questions[0].MyAnswer = this.answerFirstQuestion[0].toString();
              break;
            case 1:
              /**
               * Za checkBox
               */
              if (secondCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[1].Answers.length; i++) {
                  if (this.answerSecondQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[1].Answers[i] + "$";
                  }
                }
                this.answerSecondQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[1].NumberAnswers); i++) {
                  if (this.answerSecondQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSecondQuestion[i] + "$";
                  }
                }
                this.answerSecondQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[1].MyAnswer = this.answerSecondQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 2:
              if (thirdCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[2].Answers.length; i++) {
                  if (this.answerThirdQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[2].Answers[i] + "$";
                  }
                }
                this.answerThirdQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[2].NumberAnswers); i++) {
                  if (this.answerThirdQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerThirdQuestion[i] + "$";
                  }
                }
                this.answerThirdQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[2].MyAnswer = this.answerThirdQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 3:
              if (fourthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[3].Answers.length; i++) {
                  if (this.answerFourthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[3].Answers[i] + "$";
                  }
                }
                this.answerFourthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[3].NumberAnswers); i++) {
                  if (this.answerFourthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFourthQuestion[i] + "$";
                  }
                }
                this.answerFourthQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[3].MyAnswer = this.answerFourthQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 4:
              if (fifthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[4].Answers.length; i++) {
                  if (this.answerFifthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[4].Answers[i] + "$";
                  }
                }
                this.answerFifthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[4].NumberAnswers); i++) {
                  if (this.answerFifthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFifthQuestion[i] + "$";
                  }
                }
                this.answerFifthQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[4].MyAnswer = this.answerFifthQuestion[0].toString();
              break;

            case 5:
              /**
               * Za checkBox
               */
              if (sixthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[5].Answers.length; i++) {
                  if (this.answerSixthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[5].Answers[i] + "$";
                  }
                }
                this.answerSixthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[5].NumberAnswers); i++) {
                  if (this.answerSixthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSixthQuestion[i] + "$";
                  }
                }
                this.answerSixthQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[5].MyAnswer = this.answerSixthQuestion[0].toString();
              break;

            case 6:
              /**
               * Za checkBox
               */
              if (seventhCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[6].Answers.length; i++) {
                  if (this.answerSeventhQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[6].Answers[i] + "$";
                  }
                }
                this.answerSeventhQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[6].NumberAnswers); i++) {
                  if (this.answerSeventhQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSeventhQuestion[i] + "$";
                  }
                }
                this.answerSeventhQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[6].MyAnswer = this.answerSeventhQuestion[0].toString();
              break;

            case 7:
              /**
               * Za checkBox
               */
              if (eigthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[7].Answers.length; i++) {
                  if (this.answerEightQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[7].Answers[i] + "$";
                  }
                }
                this.answerEightQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[7].NumberAnswers); i++) {
                  if (this.answerEightQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerEightQuestion[i] + "$";
                  }
                }
                this.answerEightQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[7].MyAnswer = this.answerEightQuestion[0].toString();
              break;

            case 8:
              /**
               * Za checkBox
               */
              if (ninthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[8].Answers.length; i++) {
                  if (this.answerNinthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[8].Answers[i] + "$";
                  }
                }
                this.answerNinthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[8].NumberAnswers); i++) {
                  if (this.answerNinthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerNinthQuestion[i] + "$";
                  }
                }
                this.answerNinthQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[8].MyAnswer = this.answerNinthQuestion[0].toString();
              break;

            case 9:
              /**
               * Za checkBox
               */
              if (tenthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.test.Questions[9].Answers.length; i++) {
                  if (this.answerTenthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.test.Questions[9].Answers[i] + "$";
                  }
                }
                this.answerTenthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.test.Questions[9].NumberAnswers); i++) {
                  if (this.answerTenthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerTenthQuestion[i] + "$";
                  }
                }
                this.answerTenthQuestion[0] = MyAnswerOnQuestion;
              }
              this.testResolved.Questions[9].MyAnswer = this.answerTenthQuestion[0].toString();
              break;


          }
        }
        localStorage.setItem('filledTest', JSON.stringify(this.testResolved));
        localStorage.setItem('tipKorisnika', this.user.type);
        //alert("Kao sam je podigao");
        this.router.navigate(['/pregledTesta']);
        this.zavrsavaj = false;
      } else {
        alert("Mozete nastaviti sa ispravljanjem!");
      }
    }

  }




}
