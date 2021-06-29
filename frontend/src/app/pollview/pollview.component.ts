import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Poll } from '../poll.model';
import { PollResolved } from '../pollresolved.model';
import { User } from '../user.model';
import { Question } from '../question.model';
import { QuestionSolved } from '../questionsolved.model';

@Component({
  selector: 'app-pollview',
  templateUrl: './pollview.component.html',
  styleUrls: ['./pollview.component.css']
})
export class PollviewComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    this.poll = JSON.parse(localStorage.getItem('poll'));
    this.username = localStorage.getItem('username');
    this.dohvatiPodatkeKorisnika();
    this.vecRadio = localStorage.getItem('vecPopunjavao');
    this.nextPage = Number(this.poll.QuestionsByPage);
    this.brojPitanjaAnkete = this.poll.Questions.length;
    this.downBoundNextPage = 0;
    this.upBoundNextPage = this.nextPage;

    if (this.vecRadio == 'da') {
      this.oldPoll = JSON.parse(localStorage.getItem('filledByUser'));
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
      this.popunjavanjeVecDatihOdgovora();
    }
    else {
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
    }
  }

  /**
   * Promenljive za manipulaciju vec popunjenim pitanjima
   */
  vecRadio: String;
  oldPoll: PollResolved;

  user: User = null;
  poll: Poll = null;
  pollResolved: PollResolved;

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

  odustani() {
    this.router.navigate(['/user']);
  }

  popunjavanjeVecDatihOdgovora() {
    for (let index = 0; index < this.oldPoll.Questions.length; index++) {
      if (this.oldPoll.Questions[0].Type == '1') {
        let temp = this.oldPoll.Questions[0].MyAnswer.split("$");
        for (let i = 0; i < temp.length; i++) {
          this.answerFirstQuestion[i] = temp[i];
        }
      }
      if (this.oldPoll.Questions[0].Type == '2') {
        let temp = this.oldPoll.Questions[0].MyAnswer.split("$");
        for (let i = 0; i < temp.length; i++) {
          this.answerFirstQuestion[i] = temp[i];
        }
      }
      if (this.oldPoll.Questions[0].Type == '3') {
        let temp = this.oldPoll.Questions[0].MyAnswer.split("$");
        this.answerFirstQuestion[0] = temp[0];
      }
      if (this.oldPoll.Questions[0].Type == '4') {
        let temp = this.oldPoll.Questions[0].MyAnswer.split("$");
        this.answerFirstQuestion[0] = temp[0];
      }
      if (this.oldPoll.Questions[0].Type == '5') {
        let temp = this.oldPoll.Questions[0].MyAnswer.split("$");
        for (let i = 0; i < temp.length; i++) {
          for (let ind = 0; ind < this.oldPoll.Questions[0].Answers.length; ind++) {
            if (this.oldPoll.Questions[0].Answers[ind] == temp[i]) {
              this.answerFirstQuestion[ind] = "true";
            }
          }
        }
      }
      /*****************DRUGO PITANJE**********************************/
      if (this.oldPoll.Questions[1]) {
        if (this.oldPoll.Questions[1].Type == '1') {
          let temp = this.oldPoll.Questions[1].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerSecondQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[1].Type == '2') {
          let temp = this.oldPoll.Questions[1].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerSecondQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[1].Type == '3') {
          let temp = this.oldPoll.Questions[1].MyAnswer.split("$");
          this.answerSecondQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[1].Type == '4') {
          let temp = this.oldPoll.Questions[1].MyAnswer.split("$");
          this.answerSecondQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[1].Type == '5') {
          let temp = this.oldPoll.Questions[1].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            for (let ind = 0; ind < this.oldPoll.Questions[1].Answers.length; ind++) {
              if (this.oldPoll.Questions[1].Answers[ind] == temp[i]) {
                this.answerSecondQuestion[ind] = true + "";
              }
            }
          }
        }
      }
      /*****************TRECE PITANJE**********************************/
      if (this.oldPoll.Questions[2]) {
        if (this.oldPoll.Questions[2].Type == '1') {
          let temp = this.oldPoll.Questions[2].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerThirdQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[2].Type == '2') {
          let temp = this.oldPoll.Questions[2].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerThirdQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[2].Type == '3') {
          let temp = this.oldPoll.Questions[2].MyAnswer.split("$");
          this.answerThirdQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[2].Type == '4') {
          let temp = this.oldPoll.Questions[2].MyAnswer.split("$");
          this.answerThirdQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[2].Type == '5') {
          let temp = this.oldPoll.Questions[2].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            for (let ind = 0; ind < this.oldPoll.Questions[2].Answers.length; ind++) {
              if (this.oldPoll.Questions[2].Answers[ind] == temp[i]) {
                this.answerThirdQuestion[ind] = "true";
              }
            }
          }
        }
      }
      /*****************CETVRTO PITANJE**********************************/
      if (this.oldPoll.Questions[3]) {
        if (this.oldPoll.Questions[3].Type == '1') {
          let temp = this.oldPoll.Questions[3].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerFourthQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[3].Type == '2') {
          let temp = this.oldPoll.Questions[3].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerFourthQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[3].Type == '3') {
          let temp = this.oldPoll.Questions[3].MyAnswer.split("$");
          this.answerFourthQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[3].Type == '4') {
          let temp = this.oldPoll.Questions[3].MyAnswer.split("$");
          this.answerFourthQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[3].Type == '5') {
          let temp = this.oldPoll.Questions[3].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            for (let ind = 0; ind < this.oldPoll.Questions[3].Answers.length; ind++) {
              if (this.oldPoll.Questions[3].Answers[ind] == temp[i]) {
                this.answerFourthQuestion[ind] = "true";
              }
            }
          }
        }
      }
      /*****************PETO PITANJE**********************************/
      if (this.oldPoll.Questions[4]) {
        if (this.oldPoll.Questions[4].Type == '1') {
          let temp = this.oldPoll.Questions[4].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerFifthQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[4].Type == '2') {
          let temp = this.oldPoll.Questions[4].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerFifthQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[4].Type == '3') {
          let temp = this.oldPoll.Questions[4].MyAnswer.split("$");
          this.answerFifthQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[4].Type == '4') {
          let temp = this.oldPoll.Questions[4].MyAnswer.split("$");
          this.answerFifthQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[4].Type == '5') {
          let temp = this.oldPoll.Questions[4].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            for (let ind = 0; ind < this.oldPoll.Questions[4].Answers.length; ind++) {
              if (this.oldPoll.Questions[4].Answers[ind] == temp[i]) {
                this.answerFifthQuestion[ind] = "true";
              }
            }
          }
        }
      }
      /*****************SESTO PITANJE**********************************/

      if (this.oldPoll.Questions[5]) {
        if (this.oldPoll.Questions[5].Type == '1') {
          let temp = this.oldPoll.Questions[5].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerSixthQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[5].Type == '2') {
          let temp = this.oldPoll.Questions[5].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerSixthQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[5].Type == '3') {
          let temp = this.oldPoll.Questions[5].MyAnswer.split("$");
          this.answerSixthQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[5].Type == '4') {
          let temp = this.oldPoll.Questions[5].MyAnswer.split("$");
          this.answerSixthQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[5].Type == '5') {
          let temp = this.oldPoll.Questions[5].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            for (let ind = 0; ind < this.oldPoll.Questions[5].Answers.length; ind++) {
              if (this.oldPoll.Questions[5].Answers[ind] == temp[i]) {
                this.answerSixthQuestion[ind] = true + "";
              }
            }
          }
        }
      }
      /*****************SEDMO PITANJE**********************************/

      if (this.oldPoll.Questions[6]) {
        if (this.oldPoll.Questions[6].Type == '1') {
          let temp = this.oldPoll.Questions[6].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerSeventhQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[6].Type == '2') {
          let temp = this.oldPoll.Questions[6].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerSeventhQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[6].Type == '3') {
          let temp = this.oldPoll.Questions[6].MyAnswer.split("$");
          this.answerSeventhQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[6].Type == '4') {
          let temp = this.oldPoll.Questions[6].MyAnswer.split("$");
          this.answerSeventhQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[6].Type == '5') {
          let temp = this.oldPoll.Questions[6].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            for (let ind = 0; ind < this.oldPoll.Questions[6].Answers.length; ind++) {
              if (this.oldPoll.Questions[6].Answers[ind] == temp[i]) {
                this.answerSeventhQuestion[ind] = true + "";
              }
            }
          }
        }
      }

      /*****************OSMO PITANJE**********************************/

      if (this.oldPoll.Questions[7]) {
        if (this.oldPoll.Questions[7].Type == '1') {
          let temp = this.oldPoll.Questions[7].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerEightQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[7].Type == '2') {
          let temp = this.oldPoll.Questions[7].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerEightQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[7].Type == '3') {
          let temp = this.oldPoll.Questions[7].MyAnswer.split("$");
          this.answerEightQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[7].Type == '4') {
          let temp = this.oldPoll.Questions[7].MyAnswer.split("$");
          this.answerEightQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[7].Type == '5') {
          let temp = this.oldPoll.Questions[7].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            for (let ind = 0; ind < this.oldPoll.Questions[7].Answers.length; ind++) {
              if (this.oldPoll.Questions[7].Answers[ind] == temp[i]) {
                this.answerEightQuestion[ind] = true + "";
              }
            }
          }
        }
      }

      /*****************DEVETO PITANJE**********************************/

      if (this.oldPoll.Questions[8]) {
        if (this.oldPoll.Questions[8].Type == '1') {
          let temp = this.oldPoll.Questions[8].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerNinthQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[8].Type == '2') {
          let temp = this.oldPoll.Questions[8].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerNinthQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[8].Type == '3') {
          let temp = this.oldPoll.Questions[8].MyAnswer.split("$");
          this.answerNinthQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[8].Type == '4') {
          let temp = this.oldPoll.Questions[8].MyAnswer.split("$");
          this.answerNinthQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[8].Type == '5') {
          let temp = this.oldPoll.Questions[8].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            for (let ind = 0; ind < this.oldPoll.Questions[8].Answers.length; ind++) {
              if (this.oldPoll.Questions[8].Answers[ind] == temp[i]) {
                this.answerNinthQuestion[ind] = true + "";
              }
            }
          }
        }
      }

      /*****************DESETO PITANJE**********************************/

      if (this.oldPoll.Questions[9]) {
        if (this.oldPoll.Questions[9].Type == '1') {
          let temp = this.oldPoll.Questions[9].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerTenthQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[9].Type == '2') {
          let temp = this.oldPoll.Questions[9].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            this.answerTenthQuestion[i] = temp[i];
          }
        }
        if (this.oldPoll.Questions[9].Type == '3') {
          let temp = this.oldPoll.Questions[9].MyAnswer.split("$");
          this.answerTenthQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[9].Type == '4') {
          let temp = this.oldPoll.Questions[9].MyAnswer.split("$");
          this.answerTenthQuestion[0] = temp[0];
        }
        if (this.oldPoll.Questions[9].Type == '5') {
          let temp = this.oldPoll.Questions[9].MyAnswer.split("$");
          for (let i = 0; i < temp.length; i++) {
            for (let ind = 0; ind < this.oldPoll.Questions[9].Answers.length; ind++) {
              if (this.oldPoll.Questions[9].Answers[ind] == temp[i]) {
                this.answerTenthQuestion[ind] = true + "";
              }
            }
          }
        }
      }



    }
  }


  dohvatiPodatkeKorisnika() {
    this.service.podaciKorisnika(this.username).subscribe(data => {
      this.user = JSON.parse(JSON.stringify(data));

    })
  }

  getValue(): number {
    let suma = this.poll.Questions.length;
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


  trenutnoPredaj() {
    let suma = this.poll.Questions.length;
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
      window.confirm("Popunili ste celu anketu");
      if (confirm("OK za kraj, Cancel za povratak na popunjavanje!")) {
        alert("Uspesno ste zavrsili anketu!");
        /**
         * Cuvanje ankete sa odgovorima ispitanika u bazi i njegovo preusmeravanje na stranicu za usera
         */
        this.pollResolved = new PollResolved();

        this.pollResolved.Name = this.poll.Name;
        this.pollResolved.StartDate = this.poll.StartDate;
        this.pollResolved.EndDate = this.poll.EndDate;
        this.pollResolved.About = this.poll.About;
        this.pollResolved.Type = this.poll.Type;
        this.pollResolved.Id = this.poll.Id;
        this.pollResolved.Filled = 'yes';
        this.pollResolved.Locked = 'no';
        this.pollResolved.Time = this.poll.Time;
        this.pollResolved.QuestionsByPage = this.poll.QuestionsByPage;
        this.pollResolved.UsernameUser = this.username;
        this.pollResolved.NameUser = this.user.name;
        this.pollResolved.SurnameUser = this.user.surname;
        this.pollResolved.Birthdate = this.user.birthdate;

        /*********************Dodavanje nizova***********/
        this.pollResolved.Questions = [];
        for (let index = 0; index < this.poll.Questions.length; index++) {
          this.pollResolved.Questions[index] = new QuestionSolved();
          this.pollResolved.Questions[index].Question = this.poll.Questions[index].Question;
          this.pollResolved.Questions[index].Type = this.poll.Questions[index].Type;
          this.pollResolved.Questions[index].NumberAnswers = this.poll.Questions[index].NumberAnswers;
          this.pollResolved.Questions[index].Answers = this.poll.Questions[index].Answers;
          switch (index) {
            case 0:
              /**
               * Za checkBox
               */
              if (firstCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[0].Answers.length; i++) {
                  if (this.answerFirstQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[0].Answers[i] + "$";
                  }
                }
                this.answerFirstQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[0].NumberAnswers); i++) {
                  if (this.answerFirstQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFirstQuestion[i] + "$";
                  }
                }
                this.answerFirstQuestion[0] = MyAnswerOnQuestion;
              }

              this.pollResolved.Questions[0].MyAnswer = this.answerFirstQuestion[0].toString();
              break;
            case 1:
              /**
               * Za checkBox
               */
              if (secondCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[1].Answers.length; i++) {
                  if (this.answerSecondQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[1].Answers[i] + "$";
                  }
                }
                this.answerSecondQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[1].NumberAnswers); i++) {
                  if (this.answerSecondQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSecondQuestion[i] + "$";
                  }
                }
                this.answerSecondQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[1].MyAnswer = this.answerSecondQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 2:
              if (thirdCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[2].Answers.length; i++) {
                  if (this.answerThirdQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[2].Answers[i] + "$";
                  }
                }
                this.answerThirdQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[2].NumberAnswers); i++) {
                  if (this.answerThirdQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerThirdQuestion[i] + "$";
                  }
                }
                this.answerThirdQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[2].MyAnswer = this.answerThirdQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 3:
              if (fourthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[3].Answers.length; i++) {
                  if (this.answerFourthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[3].Answers[i] + "$";
                  }
                }
                this.answerFourthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[3].NumberAnswers); i++) {
                  if (this.answerFourthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFourthQuestion[i] + "$";
                  }
                }
                this.answerFourthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[3].MyAnswer = this.answerFourthQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 4:
              if (fifthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[4].Answers.length; i++) {
                  if (this.answerFifthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[4].Answers[i] + "$";
                  }
                }
                this.answerFifthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[4].NumberAnswers); i++) {
                  if (this.answerFifthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFifthQuestion[i] + "$";
                  }
                }
                this.answerFifthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[4].MyAnswer = this.answerFifthQuestion[0].toString();
              break;

              case 5:
              /**
               * Za checkBox
               */
              if (sixthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[5].Answers.length; i++) {
                  if (this.answerSixthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[5].Answers[i] + "$";
                  }
                }
                this.answerSixthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[5].NumberAnswers); i++) {
                  if (this.answerSixthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSixthQuestion[i] + "$";
                  }
                }
                this.answerSixthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[5].MyAnswer = this.answerSixthQuestion[0].toString();
              break;

              case 6:
              /**
               * Za checkBox
               */
              if (seventhCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[6].Answers.length; i++) {
                  if (this.answerSeventhQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[6].Answers[i] + "$";
                  }
                }
                this.answerSeventhQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[6].NumberAnswers); i++) {
                  if (this.answerSeventhQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSeventhQuestion[i] + "$";
                  }
                }
                this.answerSeventhQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[6].MyAnswer = this.answerSeventhQuestion[0].toString();
              break;

              case 7:
              /**
               * Za checkBox
               */
              if (eigthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[7].Answers.length; i++) {
                  if (this.answerEightQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[7].Answers[i] + "$";
                  }
                }
                this.answerEightQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[7].NumberAnswers); i++) {
                  if (this.answerEightQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerEightQuestion[i] + "$";
                  }
                }
                this.answerEightQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[7].MyAnswer = this.answerEightQuestion[0].toString();
              break;

              case 8:
              /**
               * Za checkBox
               */
              if (ninthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[8].Answers.length; i++) {
                  if (this.answerNinthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[8].Answers[i] + "$";
                  }
                }
                this.answerNinthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[8].NumberAnswers); i++) {
                  if (this.answerNinthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerNinthQuestion[i] + "$";
                  }
                }
                this.answerNinthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[8].MyAnswer = this.answerNinthQuestion[0].toString();
              break;

              case 9:
              /**
               * Za checkBox
               */
              if (tenthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[9].Answers.length; i++) {
                  if (this.answerTenthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[9].Answers[i] + "$";
                  }
                }
                this.answerTenthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[9].NumberAnswers); i++) {
                  if (this.answerTenthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerTenthQuestion[i] + "$";
                  }
                }
                this.answerTenthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[9].MyAnswer = this.answerTenthQuestion[0].toString();
              break;

          }


        }
        localStorage.setItem('filledPoll', JSON.stringify(this.pollResolved));
        localStorage.setItem('tipKorisnika', this.user.type);
        //alert("Kao sam je podigao");
        this.router.navigate(['/pregledAnkete']);
      } else {
        alert("Mozete nastaviti sa ispravljanjem!");
      }
    }
    else {
      window.confirm("Niste popunili celu anketu");
      if (confirm("OK za kraj, Cancel za povratak na popunjavanje!")) {
        alert("Uspesno ste zavrsili anketu!");
        /**
         * Cuvanje ankete sa odgovorima ispitanika u bazi i njegovo preusmeravanje na stranicu za usera
         */
        this.pollResolved = new PollResolved();

        this.pollResolved.Name = this.poll.Name;
        this.pollResolved.StartDate = this.poll.StartDate;
        this.pollResolved.EndDate = this.poll.EndDate;
        this.pollResolved.About = this.poll.About;
        this.pollResolved.Type = this.poll.Type;
        this.pollResolved.Id = this.poll.Id;
        this.pollResolved.Filled = 'yes';
        this.pollResolved.Locked = 'no';
        this.pollResolved.Time = this.poll.Time;
        this.pollResolved.QuestionsByPage = this.poll.QuestionsByPage;
        this.pollResolved.UsernameUser = this.username;
        this.pollResolved.NameUser = this.user.name;
        this.pollResolved.SurnameUser = this.user.surname;
        this.pollResolved.Birthdate = this.user.birthdate;

        /*********************Dodavanje nizova***********/
        this.pollResolved.Questions = [];
        for (let index = 0; index < this.poll.Questions.length; index++) {
          this.pollResolved.Questions[index] = new QuestionSolved();
          this.pollResolved.Questions[index].Question = this.poll.Questions[index].Question;
          this.pollResolved.Questions[index].Type = this.poll.Questions[index].Type;
          this.pollResolved.Questions[index].NumberAnswers = this.poll.Questions[index].NumberAnswers;
          this.pollResolved.Questions[index].Answers = this.poll.Questions[index].Answers;
          switch (index) {
            case 0:
              /**
               * Za checkBox
               */
              if (firstCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[0].Answers.length; i++) {
                  if (this.answerFirstQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[0].Answers[i] + "$";
                  }
                }
                this.answerFirstQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[0].NumberAnswers); i++) {
                  if (this.answerFirstQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFirstQuestion[i] + "$";
                  }
                }
                this.answerFirstQuestion[0] = MyAnswerOnQuestion;
              }

              this.pollResolved.Questions[0].MyAnswer = this.answerFirstQuestion[0].toString();
              break;
            case 1:
              /**
               * Za checkBox
               */
              if (secondCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[1].Answers.length; i++) {
                  if (this.answerSecondQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[1].Answers[i] + "$";
                  }
                }
                this.answerSecondQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[1].NumberAnswers); i++) {
                  if (this.answerSecondQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSecondQuestion[i] + "$";
                  }
                }
                this.answerSecondQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[1].MyAnswer = this.answerSecondQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 2:
              if (thirdCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[2].Answers.length; i++) {
                  if (this.answerThirdQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[2].Answers[i] + "$";
                  }
                }
                this.answerThirdQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[2].NumberAnswers); i++) {
                  if (this.answerThirdQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerThirdQuestion[i] + "$";
                  }
                }
                this.answerThirdQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[2].MyAnswer = this.answerThirdQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 3:
              if (fourthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[3].Answers.length; i++) {
                  if (this.answerFourthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[3].Answers[i] + "$";
                  }
                }
                this.answerFourthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[3].NumberAnswers); i++) {
                  if (this.answerFourthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFourthQuestion[i] + "$";
                  }
                }
                this.answerFourthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[3].MyAnswer = this.answerFourthQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 4:
              if (fifthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[4].Answers.length; i++) {
                  if (this.answerFifthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[4].Answers[i] + "$";
                  }
                }
                this.answerFifthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[4].NumberAnswers); i++) {
                  if (this.answerFifthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFifthQuestion[i] + "$";
                  }
                }
                this.answerFifthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[4].MyAnswer = this.answerFifthQuestion[0].toString();
              break;

              case 5:
              /**
               * Za checkBox
               */
              if (sixthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[5].Answers.length; i++) {
                  if (this.answerSixthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[5].Answers[i] + "$";
                  }
                }
                this.answerSixthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[5].NumberAnswers); i++) {
                  if (this.answerSixthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSixthQuestion[i] + "$";
                  }
                }
                this.answerSixthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[5].MyAnswer = this.answerSixthQuestion[0].toString();
              break;

              case 6:
              /**
               * Za checkBox
               */
              if (seventhCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[6].Answers.length; i++) {
                  if (this.answerSeventhQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[6].Answers[i] + "$";
                  }
                }
                this.answerSeventhQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[6].NumberAnswers); i++) {
                  if (this.answerSeventhQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSeventhQuestion[i] + "$";
                  }
                }
                this.answerSeventhQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[6].MyAnswer = this.answerSeventhQuestion[0].toString();
              break;

              case 7:
              /**
               * Za checkBox
               */
              if (eigthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[7].Answers.length; i++) {
                  if (this.answerEightQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[7].Answers[i] + "$";
                  }
                }
                this.answerEightQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[7].NumberAnswers); i++) {
                  if (this.answerEightQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerEightQuestion[i] + "$";
                  }
                }
                this.answerEightQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[7].MyAnswer = this.answerEightQuestion[0].toString();
              break;

              case 8:
              /**
               * Za checkBox
               */
              if (ninthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[8].Answers.length; i++) {
                  if (this.answerNinthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[8].Answers[i] + "$";
                  }
                }
                this.answerNinthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[8].NumberAnswers); i++) {
                  if (this.answerNinthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerNinthQuestion[i] + "$";
                  }
                }
                this.answerNinthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[8].MyAnswer = this.answerNinthQuestion[0].toString();
              break;

              case 9:
              /**
               * Za checkBox
               */
              if (tenthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[9].Answers.length; i++) {
                  if (this.answerTenthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[9].Answers[i] + "$";
                  }
                }
                this.answerTenthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[9].NumberAnswers); i++) {
                  if (this.answerTenthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerTenthQuestion[i] + "$";
                  }
                }
                this.answerTenthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[9].MyAnswer = this.answerTenthQuestion[0].toString();
              break;



          }
        }
        localStorage.setItem('filledPoll', JSON.stringify(this.pollResolved));
        localStorage.setItem('tipKorisnika', this.user.type);
        //alert("Kao sam je podigao");
        this.router.navigate(['/pregledAnkete']);

      } else {
        alert("Mozete nastaviti sa ispravljanjem!");
      }
    }

  }


  konacnoPredaj() {
    let suma = this.poll.Questions.length;
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
      window.confirm("Popunili ste celu anketu");
      if (confirm("OK za kraj, Cancel za povratak na popunjavanje!")) {
        alert("Uspesno ste zavrsili anketu!");
        /**
         * Cuvanje ankete sa odgovorima ispitanika u bazi i njegovo preusmeravanje na stranicu za usera
         */
        this.pollResolved = new PollResolved();

        this.pollResolved.Name = this.poll.Name;
        this.pollResolved.StartDate = this.poll.StartDate;
        this.pollResolved.EndDate = this.poll.EndDate;
        this.pollResolved.About = this.poll.About;
        this.pollResolved.Type = this.poll.Type;
        this.pollResolved.Id = this.poll.Id;
        this.pollResolved.Filled = 'yes';
        this.pollResolved.Locked = 'yes';
        this.pollResolved.Time = this.poll.Time;
        this.pollResolved.QuestionsByPage = this.poll.QuestionsByPage;
        this.pollResolved.UsernameUser = this.username;
        this.pollResolved.NameUser = this.user.name;
        this.pollResolved.SurnameUser = this.user.surname;
        this.pollResolved.Birthdate = this.user.birthdate;

        /*********************Dodavanje nizova***********/
        this.pollResolved.Questions = [];
        for (let index = 0; index < this.poll.Questions.length; index++) {
          this.pollResolved.Questions[index] = new QuestionSolved();
          this.pollResolved.Questions[index].Question = this.poll.Questions[index].Question;
          this.pollResolved.Questions[index].Type = this.poll.Questions[index].Type;
          this.pollResolved.Questions[index].NumberAnswers = this.poll.Questions[index].NumberAnswers;
          this.pollResolved.Questions[index].Answers = this.poll.Questions[index].Answers;
          switch (index) {
            case 0:
              /**
               * Za checkBox
               */
              if (firstCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[0].Answers.length; i++) {
                  if (this.answerFirstQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[0].Answers[i] + "$";
                  }
                }
                this.answerFirstQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[0].NumberAnswers); i++) {
                  if (this.answerFirstQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFirstQuestion[i] + "$";
                  }
                }
                this.answerFirstQuestion[0] = MyAnswerOnQuestion;
              }

              this.pollResolved.Questions[0].MyAnswer = this.answerFirstQuestion[0].toString();
              break;
            case 1:
              /**
               * Za checkBox
               */
              if (secondCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[1].Answers.length; i++) {
                  if (this.answerSecondQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[1].Answers[i] + "$";
                  }
                }
                this.answerSecondQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[1].NumberAnswers); i++) {
                  if (this.answerSecondQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSecondQuestion[i] + "$";
                  }
                }
                this.answerSecondQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[1].MyAnswer = this.answerSecondQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 2:
              if (thirdCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[2].Answers.length; i++) {
                  if (this.answerThirdQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[2].Answers[i] + "$";
                  }
                }
                this.answerThirdQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[2].NumberAnswers); i++) {
                  if (this.answerThirdQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerThirdQuestion[i] + "$";
                  }
                }
                this.answerThirdQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[2].MyAnswer = this.answerThirdQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 3:
              if (fourthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[3].Answers.length; i++) {
                  if (this.answerFourthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[3].Answers[i] + "$";
                  }
                }
                this.answerFourthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[3].NumberAnswers); i++) {
                  if (this.answerFourthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFourthQuestion[i] + "$";
                  }
                }
                this.answerFourthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[3].MyAnswer = this.answerFourthQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 4:
              if (fifthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[4].Answers.length; i++) {
                  if (this.answerFifthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[4].Answers[i] + "$";
                  }
                }
                this.answerFifthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[4].NumberAnswers); i++) {
                  if (this.answerFifthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFifthQuestion[i] + "$";
                  }
                }
                this.answerFifthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[4].MyAnswer = this.answerFifthQuestion[0].toString();
              break;

              case 5:
              /**
               * Za checkBox
               */
              if (sixthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[5].Answers.length; i++) {
                  if (this.answerSixthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[5].Answers[i] + "$";
                  }
                }
                this.answerSixthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[5].NumberAnswers); i++) {
                  if (this.answerSixthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSixthQuestion[i] + "$";
                  }
                }
                this.answerSixthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[5].MyAnswer = this.answerSixthQuestion[0].toString();
              break;

              case 6:
              /**
               * Za checkBox
               */
              if (seventhCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[6].Answers.length; i++) {
                  if (this.answerSeventhQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[6].Answers[i] + "$";
                  }
                }
                this.answerSeventhQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[6].NumberAnswers); i++) {
                  if (this.answerSeventhQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSeventhQuestion[i] + "$";
                  }
                }
                this.answerSeventhQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[6].MyAnswer = this.answerSeventhQuestion[0].toString();
              break;

              case 7:
              /**
               * Za checkBox
               */
              if (eigthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[7].Answers.length; i++) {
                  if (this.answerEightQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[7].Answers[i] + "$";
                  }
                }
                this.answerEightQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[7].NumberAnswers); i++) {
                  if (this.answerEightQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerEightQuestion[i] + "$";
                  }
                }
                this.answerEightQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[7].MyAnswer = this.answerEightQuestion[0].toString();
              break;

              case 8:
              /**
               * Za checkBox
               */
              if (ninthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[8].Answers.length; i++) {
                  if (this.answerNinthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[8].Answers[i] + "$";
                  }
                }
                this.answerNinthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[8].NumberAnswers); i++) {
                  if (this.answerNinthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerNinthQuestion[i] + "$";
                  }
                }
                this.answerNinthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[8].MyAnswer = this.answerNinthQuestion[0].toString();
              break;

              case 9:
              /**
               * Za checkBox
               */
              if (tenthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[9].Answers.length; i++) {
                  if (this.answerTenthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[9].Answers[i] + "$";
                  }
                }
                this.answerTenthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[9].NumberAnswers); i++) {
                  if (this.answerTenthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerTenthQuestion[i] + "$";
                  }
                }
                this.answerTenthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[9].MyAnswer = this.answerTenthQuestion[0].toString();
              break;




          }
        }
        localStorage.setItem('filledPoll', JSON.stringify(this.pollResolved));
        localStorage.setItem('tipKorisnika', this.user.type);
        //alert("Kao sam je podigao");
        this.router.navigate(['/pregledAnkete']);
      } else {
        alert("Mozete nastaviti sa ispravljanjem!");
      }
    }
    else {
      window.confirm("Niste popunili celu anketu");
      if (confirm("OK za kraj, Cancel za povratak na popunjavanje!")) {
        alert("Uspesno ste zavrsili anketu!");
        /**
         * Cuvanje ankete sa odgovorima ispitanika u bazi i njegovo preusmeravanje na stranicu za usera
         */
        this.pollResolved = new PollResolved();

        this.pollResolved.Name = this.poll.Name;
        this.pollResolved.StartDate = this.poll.StartDate;
        this.pollResolved.EndDate = this.poll.EndDate;
        this.pollResolved.About = this.poll.About;
        this.pollResolved.Type = this.poll.Type;
        this.pollResolved.Id = this.poll.Id;
        this.pollResolved.Filled = 'yes';
        this.pollResolved.Locked = 'no';
        this.pollResolved.Time = this.poll.Time;
        this.pollResolved.QuestionsByPage = this.poll.QuestionsByPage;
        this.pollResolved.UsernameUser = this.username;
        this.pollResolved.NameUser = this.user.name;
        this.pollResolved.SurnameUser = this.user.surname;
        this.pollResolved.Birthdate = this.user.birthdate;

        /*********************Dodavanje nizova***********/
        this.pollResolved.Questions = [];
        for (let index = 0; index < this.poll.Questions.length; index++) {
          this.pollResolved.Questions[index] = new QuestionSolved();
          this.pollResolved.Questions[index].Question = this.poll.Questions[index].Question;
          this.pollResolved.Questions[index].Type = this.poll.Questions[index].Type;
          this.pollResolved.Questions[index].NumberAnswers = this.poll.Questions[index].NumberAnswers;
          this.pollResolved.Questions[index].Answers = this.poll.Questions[index].Answers;
          switch (index) {
            case 0:
              /**
               * Za checkBox
               */
              if (firstCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[0].Answers.length; i++) {
                  if (this.answerFirstQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[0].Answers[i] + "$";
                  }
                }
                this.answerFirstQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[0].NumberAnswers); i++) {
                  if (this.answerFirstQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFirstQuestion[i] + "$";
                  }
                }
                this.answerFirstQuestion[0] = MyAnswerOnQuestion;
              }

              this.pollResolved.Questions[0].MyAnswer = this.answerFirstQuestion[0].toString();
              break;
            case 1:
              /**
               * Za checkBox
               */
              if (secondCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[1].Answers.length; i++) {
                  if (this.answerSecondQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[1].Answers[i] + "$";
                  }
                }
                this.answerSecondQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[1].NumberAnswers); i++) {
                  if (this.answerSecondQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSecondQuestion[i] + "$";
                  }
                }
                this.answerSecondQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[1].MyAnswer = this.answerSecondQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 2:
              if (thirdCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[2].Answers.length; i++) {
                  if (this.answerThirdQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[2].Answers[i] + "$";
                  }
                }
                this.answerThirdQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[2].NumberAnswers); i++) {
                  if (this.answerThirdQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerThirdQuestion[i] + "$";
                  }
                }
                this.answerThirdQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[2].MyAnswer = this.answerThirdQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 3:
              if (fourthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[3].Answers.length; i++) {
                  if (this.answerFourthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[3].Answers[i] + "$";
                  }
                }
                this.answerFourthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[3].NumberAnswers); i++) {
                  if (this.answerFourthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFourthQuestion[i] + "$";
                  }
                }
                this.answerFourthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[3].MyAnswer = this.answerFourthQuestion[0].toString();
              break;
            /**
             * Za checkBox
             */
            case 4:
              if (fifthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[4].Answers.length; i++) {
                  if (this.answerFifthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[4].Answers[i] + "$";
                  }
                }
                this.answerFifthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[4].NumberAnswers); i++) {
                  if (this.answerFifthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerFifthQuestion[i] + "$";
                  }
                }
                this.answerFifthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[4].MyAnswer = this.answerFifthQuestion[0].toString();
              break;

              case 5:
              /**
               * Za checkBox
               */
              if (sixthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[5].Answers.length; i++) {
                  if (this.answerSixthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[5].Answers[i] + "$";
                  }
                }
                this.answerSixthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[5].NumberAnswers); i++) {
                  if (this.answerSixthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSixthQuestion[i] + "$";
                  }
                }
                this.answerSixthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[5].MyAnswer = this.answerSixthQuestion[0].toString();
              break;

              case 6:
              /**
               * Za checkBox
               */
              if (seventhCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[6].Answers.length; i++) {
                  if (this.answerSeventhQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[6].Answers[i] + "$";
                  }
                }
                this.answerSeventhQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[6].NumberAnswers); i++) {
                  if (this.answerSeventhQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerSeventhQuestion[i] + "$";
                  }
                }
                this.answerSeventhQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[6].MyAnswer = this.answerSeventhQuestion[0].toString();
              break;

              case 7:
              /**
               * Za checkBox
               */
              if (eigthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[7].Answers.length; i++) {
                  if (this.answerEightQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[7].Answers[i] + "$";
                  }
                }
                this.answerEightQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[7].NumberAnswers); i++) {
                  if (this.answerEightQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerEightQuestion[i] + "$";
                  }
                }
                this.answerEightQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[7].MyAnswer = this.answerEightQuestion[0].toString();
              break;

              case 8:
              /**
               * Za checkBox
               */
              if (ninthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[8].Answers.length; i++) {
                  if (this.answerNinthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[8].Answers[i] + "$";
                  }
                }
                this.answerNinthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[8].NumberAnswers); i++) {
                  if (this.answerNinthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerNinthQuestion[i] + "$";
                  }
                }
                this.answerNinthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[8].MyAnswer = this.answerNinthQuestion[0].toString();
              break;

              case 9:
              /**
               * Za checkBox
               */
              if (tenthCheck) {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < this.poll.Questions[9].Answers.length; i++) {
                  if (this.answerTenthQuestion[i].toString() == 'true') {
                    MyAnswerOnQuestion += this.poll.Questions[9].Answers[i] + "$";
                  }
                }
                this.answerTenthQuestion[0] = MyAnswerOnQuestion;
              }
              /**
               * Za sve ostale tipove pitanja
               */
              else {
                let MyAnswerOnQuestion = "";
                for (let i = 0; i < Number(this.poll.Questions[9].NumberAnswers); i++) {
                  if (this.answerTenthQuestion[i] != "") {
                    MyAnswerOnQuestion += this.answerTenthQuestion[i] + "$";
                  }
                }
                this.answerTenthQuestion[0] = MyAnswerOnQuestion;
              }
              this.pollResolved.Questions[9].MyAnswer = this.answerTenthQuestion[0].toString();
              break;


          }
        }
        localStorage.setItem('filledPoll', JSON.stringify(this.pollResolved));
        localStorage.setItem('tipKorisnika', this.user.type);
        //alert("Kao sam je podigao");
        this.router.navigate(['/pregledAnkete']);

      } else {
        alert("Mozete nastaviti sa ispravljanjem!");
      }
    }

  }
}
