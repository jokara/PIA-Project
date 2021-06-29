import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Test } from '../test.model';
import { TestResolved } from '../testresolved.model';
import { TestResult } from '../testresult.model';

@Component({
  selector: 'app-testresultview',
  templateUrl: './testresultview.component.html',
  styleUrls: ['./testresultview.component.css']
})
export class TestresultviewComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.dohvatiSveKreatoroveTestove();
    this.pieChartType = 'pie';
    this.pieChartLabels = ['0-10%', '11-20%', '21-30%', '31-40%', '41-50%', '51-60%', '61-70%', '71-80%', '81-90%', '91-100%']
    //this.pieChartData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    for (let i = 0; i < 10; i++) {
      this.pieChartData[i]=0;
    }
  }

  allTests: Test[]=[];
  username:string="";
  currentTest: Test=null;
  allTestsResolved: TestResolved[]=[];
  testResults: TestResult[]=[]

  pieChartType='pie';
  pieChartLabels=['0-10%','11-20%','21-30%','31-40%','41-50%','51-60%','61-70%','71-80%','81-90%','91-100%']
  pieChartData=[];
  

  dohvatiSveKreatoroveTestove(){
    this.service.sviKreatoroviTestovi(this.username).subscribe(data=>{
      this.allTests = JSON.parse(JSON.stringify(data));
    })
  }

  popuniTrenutnu(t){
    for (let i = 0; i < 10; i++) {
      this.pieChartData[i]=0;
    }
    this.currentTest=t;
    while(this.testResults.length>0){
      this.testResults.pop();
    }
    this.service.sviTestoviSaId(t.Id).subscribe(data=>{
      this.allTestsResolved = JSON.parse(JSON.stringify(data));
      //alert(this.allTestsResolved.length);
      for (let i = 0; i < this.allTestsResolved.length; i++) {
        this.testResults[i]=new TestResult();
        this.testResults[i].Name=this.allTestsResolved[i].NameUser;
        this.testResults[i].Surname=this.allTestsResolved[i].SurnameUser;
        let maxPoints=0;
        let myPoints=0;
        this.allTestsResolved[i].Questions.forEach(p => {
          let odgovorMoj=p.MyAnswer.split("$");
          let brojTacnihOdg=p.CorrectAnswers.length;
          let tacnoOdg=0; 
          odgovorMoj.forEach(e => {
            p.CorrectAnswers.forEach(el => {
              if (e==el) tacnoOdg++; 
            });
          });
          myPoints+=(tacnoOdg/brojTacnihOdg)*Number(p.Points);
        });
        this.testResults[i].Points=myPoints+"";
        this.allTestsResolved[i].Questions.forEach(p => {
          maxPoints+=Number(p.Points);
        });
        this.testResults[i].MaxPoints=maxPoints+"";
        this.testResults[i].Percent=100*Number(myPoints)/Number(maxPoints)
        if(this.testResults[i].Percent>=0 && this.testResults[i].Percent<11) this.pieChartData[0]++;
        if(this.testResults[i].Percent>10 && this.testResults[i].Percent<21) this.pieChartData[1]++;
        if(this.testResults[i].Percent>20 && this.testResults[i].Percent<31) this.pieChartData[2]++;
        if(this.testResults[i].Percent>30 && this.testResults[i].Percent<41) this.pieChartData[3]++;
        if(this.testResults[i].Percent>40 && this.testResults[i].Percent<51) this.pieChartData[4]++;
        if(this.testResults[i].Percent>50 && this.testResults[i].Percent<61) this.pieChartData[5]++;
        if(this.testResults[i].Percent>60 && this.testResults[i].Percent<71) this.pieChartData[6]++;
        if(this.testResults[i].Percent>70 && this.testResults[i].Percent<81) this.pieChartData[7]++;
        if(this.testResults[i].Percent>80 && this.testResults[i].Percent<91) this.pieChartData[8]++;
        if(this.testResults[i].Percent>90 && this.testResults[i].Percent<101) this.pieChartData[9]++;
      }
      



    })

  }

  nazad(){
    this.router.navigate(['/kreator']);
  }


}
