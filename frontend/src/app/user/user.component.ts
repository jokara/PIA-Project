import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Poll } from '../poll.model';
import { PollResolved } from '../pollresolved.model';
import { Test } from '../test.model';
import { TestResolved } from '../testresolved.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    //alert("Poziva se");
    this.username=localStorage.getItem('username');
    this.poNazivu="asc";
    this.poDatumuK="asc";
    this.poDatumuP="asc";
    this.poNazivuTest="asc";
    this.poDatumuKTest="asc";
    this.poDatumuPTest="asc";
    this.dohvatiSveAnkete();
    //this.dohvatiSvePopunjeneAnkete();
    this.dohvatiSveTestove();
    //this.dohvatiSvePopunjeneTestove();
  }
  /**
   * Sve ankete koje sam vec popunio
   */
  myAllPolls:PollResolved[]=[];
  myAllTests:TestResolved[]=[];
  /**
   * Sve ankete koje su prazne
   */
  allPolls: Poll[]=[];
  username:string="";
  /*promenljive koje se koriste za sortiranje*/
  poNazivu:String;
  poDatumuP:String;
  poDatumuK:String;
  poNazivuTest:String;
  poDatumuPTest:String;
  poDatumuKTest:String;

  /**
   * Svi testovi koji nisu reseni
   */
  allTests: Test[]=[];
/*menjanje lozinke router*/
  changePass(){
    this.router.navigate(['promenaLozinke']);
  }
/*dohvatanje svih testova*/
  dohvatiSveTestove(){
    this.service.sviTestovi().subscribe(data=>{
      this.allTests = JSON.parse(JSON.stringify(data));
      this.proveriTrajanjeTestova();
      this.dohvatiSvePopunjeneTestove();
    })
  }
/*dohvatanje popunjenih testova*/
  dohvatiSvePopunjeneTestove(){
    this.service.svePopunjeneTestove(this.username).subscribe(data=>{
      this.myAllTests = JSON.parse(JSON.stringify(data));
      this.proveriTrajanjeTestova();
      this.proveraValidniTestovi();
    })
  }
/*provera validni testovi*/
  proveraValidniTestovi(){
    for (let index = 0; index < this.myAllTests.length; index++) {
      for (let i = 0; i < this.allTests.length; i++) {
        if (this.myAllTests[index].Id==this.allTests[i].Id){
          this.allTests[i].Locked='yes';
        }
      }
    }
  }
/*provera trajanje testova*/
  proveriTrajanjeTestova(){
    this.allTests.forEach(t => {
      let today=new Date();
      let d=new Date(t.EndDate);
      if (d<today) t.Locked="past";
    });

    
  }
/*provera validne ankete*/
  proveraValidneAnkete(){
    for (let index = 0; index < this.myAllPolls.length; index++) {
      for (let i = 0; i < this.allPolls.length; i++) {
        if (this.myAllPolls[index].Locked=='yes' && this.myAllPolls[index].Id==this.allPolls[i].Id){
          this.allPolls[i].Locked='yes';
        }
      }
    }
  }
/*provera trajanja svih testova*/
  proveriTrajanjeAnketa(){
    this.allPolls.forEach(p => {
      let today=new Date();
      let d=new Date(p.EndDate);
      if (d<today) p.Filled="past";
    });

    this.myAllPolls.forEach(p => {
      let today=new Date();
      let d=new Date(p.EndDate);
      if (d<today) p.Filled="past";
    });
  }
/*sve popunjene ankete */
  dohvatiSvePopunjeneAnkete(){
    this.service.svePopunjeneAnkete(this.username).subscribe(data=>{
      this.myAllPolls = JSON.parse(JSON.stringify(data));
      this.proveraValidneAnkete();
    })
  }

/*dohvati sve ankete*/
  dohvatiSveAnkete(){
    this.service.sveAnkete().subscribe(data=>{
      this.allPolls = JSON.parse(JSON.stringify(data));
      this.proveriTrajanjeAnketa();
      this.dohvatiSvePopunjeneAnkete();
    })
  }
	/*pregledaj datu anketu*/
  pregledaj(p){
    this.myAllPolls.forEach(e => {
      if (p.Id==e.Id && e.UsernameUser==this.username && e.Locked=='yes'){
        localStorage.setItem('filledPoll',JSON.stringify(e));
        this.router.navigate(['/pregledAnkete']);
      }
    });
  }
/*popuni anketu*/
  popuni(p){
    localStorage.setItem('vecPopunjavao','ne');
    this.myAllPolls.forEach(e => {
      if (p.Id==e.Id && e.UsernameUser==this.username){
        localStorage.setItem('filledByUser',JSON.stringify(e));
        localStorage.setItem('vecPopunjavao','da');
      }
    });
    localStorage.setItem('poll',JSON.stringify(p));
    this.router.navigate(['/popuniAnketu'])
    //this.poll=JSON.parse(localStorage.getItem('poll'));
  }

  /**
   * Pregledanje i popunjavanje testa
   */
   
   /*popunjavanje testa*/
  popuniTest(t){
    localStorage.setItem('test',JSON.stringify(t));
    this.router.navigate(['/popuniTest']);
  }
/*pregledaj test*/
  pregledajTest(t){
    this.myAllTests.forEach(e => {
      if (t.Id==e.Id && e.UsernameUser==this.username){
        localStorage.setItem('filledTest',JSON.stringify(e));
        this.router.navigate(['/pregledTesta']);
      }
    });
  }
  /**
   * Sortiranja i logout
   */
/*sortiraj po nazivu ankete*/
  sortirajPoNazivu() {
    if (this.poNazivu == "asc") {
      this.poNazivu="desc";
      this.allPolls.sort((obj1, obj2) => {
        if (obj1.Name > obj2.Name) {
          return 1;
        }

        if (obj1.Name < obj2.Name) {
          return -1;
        }
        return 0;
      })
    }
    else{
      this.poNazivu="asc";
      this.allPolls.sort((obj1, obj2) => {
        if (obj1.Name > obj2.Name) {
          return -1;
        }

        if (obj1.Name < obj2.Name) {
          return 1;
        }
        return 0;
      })
    }
  }
/*sortiranje po datumu pocetka*/
  sortirajPoDatumuP() {
    if (this.poDatumuP == "asc") {
      this.poDatumuP="desc";
      this.allPolls.sort((obj1, obj2) => {
        if (obj1.StartDate > obj2.StartDate) {
          return 1;
        }

        if (obj1.StartDate < obj2.StartDate) {
          return -1;
        }
        return 0;
      })
    }
    else{
      this.poDatumuP="asc";
      this.allPolls.sort((obj1, obj2) => {
        if (obj1.StartDate > obj2.StartDate) {
          return -1;
        }

        if (obj1.StartDate < obj2.StartDate) {
          return 1;
        }
        return 0;
      })
    }
  }
/*sortiranje po datumu kraja*/
  sortirajPoDatumuK() {
    if (this.poDatumuK == "asc") {
      this.poDatumuK="desc";
      this.allPolls.sort((obj1, obj2) => {
        if (obj1.EndDate > obj2.EndDate) {
          return 1;
        }

        if (obj1.EndDate < obj2.EndDate) {
          return -1;
        }
        return 0;
      })
    }
    else{
      this.poDatumuK="asc";
      this.allPolls.sort((obj1, obj2) => {
        if (obj1.EndDate > obj2.EndDate) {
          return -1;
        }

        if (obj1.EndDate < obj2.EndDate) {
          return 1;
        }
        return 0;
      })
    }
  }
/*sortiranje po nazivu testa*/
  sortirajPoNazivuTest() {
    if (this.poNazivuTest == "asc") {
      this.poNazivuTest="desc";
      this.allTests.sort((obj1, obj2) => {
        if (obj1.Name > obj2.Name) {
          return 1;
        }

        if (obj1.Name < obj2.Name) {
          return -1;
        }
        return 0;
      })
    }
    else{
      this.poNazivuTest="asc";
      this.allTests.sort((obj1, obj2) => {
        if (obj1.Name > obj2.Name) {
          return -1;
        }

        if (obj1.Name < obj2.Name) {
          return 1;
        }
        return 0;
      })
    }
  }
/*sortiranje po datumu pocetka testa*/
  sortirajPoDatumuPTest() {
    if (this.poDatumuPTest == "asc") {
      this.poDatumuPTest="desc";
      this.allTests.sort((obj1, obj2) => {
        if (obj1.StartDate > obj2.StartDate) {
          return 1;
        }

        if (obj1.StartDate < obj2.StartDate) {
          return -1;
        }
        return 0;
      })
    }
    else{
      this.poDatumuPTest="asc";
      this.allTests.sort((obj1, obj2) => {
        if (obj1.StartDate > obj2.StartDate) {
          return -1;
        }

        if (obj1.StartDate < obj2.StartDate) {
          return 1;
        }
        return 0;
      })
    }
  }
/*sortiranje po datumu kraja testa*/
  sortirajPoDatumuKTest() {
    if (this.poDatumuKTest == "asc") {
      this.poDatumuKTest="desc";
      this.allTests.sort((obj1, obj2) => {
        if (obj1.EndDate > obj2.EndDate) {
          return 1;
        }

        if (obj1.EndDate < obj2.EndDate) {
          return -1;
        }
        return 0;
      })
    }
    else{
      this.poDatumuKTest="asc";
      this.allTests.sort((obj1, obj2) => {
        if (obj1.EndDate > obj2.EndDate) {
          return -1;
        }

        if (obj1.EndDate < obj2.EndDate) {
          return 1;
        }
        return 0;
      })
    }
  }

/*izloguj se*/
  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  //myNews: string[];

  /*news(){
    this.service.newsByUser('user').subscribe(data=>{
      this.myNews = JSON.parse(JSON.stringify(data));
      
    })
  }*/

}
