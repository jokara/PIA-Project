import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Poll } from '../poll.model';
import { PollResolved } from '../pollresolved.model';
import { PollResult } from '../pollresult.model';

@Component({
  selector: 'app-pollresultview',
  templateUrl: './pollresultview.component.html',
  styleUrls: ['./pollresultview.component.css']
})
export class PollresultviewComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.dohvatiSveKreatoroveAnkete();
  }

  allPolls: Poll[] = [];
  username: string = "";
  currentPoll: Poll = null;
  allPollsResolved: PollResolved[] = [];
  flag: boolean = null;
  allPollsStatistic: PollResolved[] = [];
  pollResults: PollResult[] = [];


  dohvatiSveKreatoroveAnkete() {
    this.service.sveKreatoroveAnkete(this.username).subscribe(data => {
      this.allPolls = JSON.parse(JSON.stringify(data));
    })
  }

  popuniTrenutnu(p) {
    this.flag = true;
    this.service.sveAnketePoId(p.Id).subscribe(data => {
      this.allPollsResolved = JSON.parse(JSON.stringify(data));
      this.allPollsResolved.forEach(el => {
        el.Questions.forEach(q => {
          let niz = q.MyAnswer.split("$");
          q.MyAnswer = "";
          niz.forEach(element => {
            q.MyAnswer += element + " ";
          });

        });
      });
    })
  }

  izvuciStatistiku(p) {
    this.flag = false;
    this.service.sveAnketePoId(p.Id).subscribe(data => {
      
      for (let i = 0; i < p.Questions.length; i++) {
        this.pollResults[i] = new PollResult();
        this.pollResults[i].Answers = [];
        this.pollResults[i].Counter = [];
        this.pollResults[i].Percent = [];
        for (let jj = 0; jj < 10; jj++) {
          this.pollResults[i].Counter[jj] = 0;
        }
        this.pollResults[i].Name = p.Questions[i].Question
      }
      this.allPollsStatistic = JSON.parse(JSON.stringify(data));

      this.allPollsStatistic.forEach(pa => {
        
        for (let index = 0; index < pa.Questions.length; index++) {
          let niz = pa.Questions[index].MyAnswer.split("$");
          niz.forEach(elem => {
            if (elem != "") {
              if (this.pollResults[index].Answers.length==0) {
                let newElem=this.pollResults[index].Answers.push(elem);
                this.pollResults[index].Counter[newElem-1]++;
              }
              else{
                let flag = true;
                for (let j = 0; j < this.pollResults[index].Answers.length; j++) {
                  if (this.pollResults[index].Answers[j] == elem) {
                    flag = false;
                    this.pollResults[index].Counter[j]++;
                  }
                }
                if (flag==true) {
                  let newElem=this.pollResults[index].Answers.push(elem);
                  this.pollResults[index].Counter[newElem-1]++;
                }
              }
              
            }
          });
        }
      });

      this.pollResults.forEach(element => {
        let ukupno=0;
        for (let myindex = 0; myindex < element.Counter.length; myindex++) {
          ukupno+=element.Counter[myindex];
        }
        for (let myindex = 0; myindex < element.Counter.length; myindex++) {
          element.Percent[myindex]=100*element.Counter[myindex]/ukupno;
        }
      });
      /*alert("Dosao sam dovde")
      this.pollResults.forEach(poll => {
        poll.Counter.forEach(cnt => {
          cnt=cnt+1;
        });
      });*/
    })

    
  }


  nazad() {
    this.router.navigate(['/kreator']);
  }

}
