import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { TestResolved } from '../testresolved.model';

@Component({
  selector: 'app-testviewsolved',
  templateUrl: './testviewsolved.component.html',
  styleUrls: ['./testviewsolved.component.css']
})
export class TestviewsolvedComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    this.test = JSON.parse(localStorage.getItem('filledTest'));
    this.postaviOsvojenBrojPoenaPoPitanju();
    this.obrisiStariPopunjeniTest();
    this.dodajNoviPopunjenTest();   
    this.formatiranjeOdgovora();
    this.dohvatiMaksimumPoena();
    this.postaviTacneOdgUJednuLiniju();
    this.dohvatiMojBrojPoena();
    this.tipKorisnika=localStorage.getItem('tipKorisnika');
    //this.obrisiStaruPopunjenuAnketu();
    //this.dodajNovuPopunjenuAnketu();
  }

  test: TestResolved = null;
  maksimumPoena: string
  brojOsvojenih: string
  tipKorisnika:string

  formatiranjeOdgovora(){
    this.test.Questions.forEach(p => {
      let format=p.MyAnswer.split("$");
      p.MyAnswer=""
      format.forEach(f => {
        p.MyAnswer+=f + " ";
      });
    });
  } 

  postaviTacneOdgUJednuLiniju(){
    this.test.Questions.forEach(p => {
      let tacni="";
      p.CorrectAnswers.forEach(element => {
        tacni+=element+ " ";
      });
      p.CorrectAnswers[0]=tacni;
    });


  }

  postaviOsvojenBrojPoenaPoPitanju(){
    let poen=0;
    this.test.Questions.forEach(p => {
      let odgovorMoj=p.MyAnswer.split("$");
      let brojTacnihOdg=p.CorrectAnswers.length;
      let tacnoOdg=0; 
      odgovorMoj.forEach(e => {
        p.CorrectAnswers.forEach(el => {
          if (e==el) tacnoOdg++; 
        });
      });
      /**
       * OVAJ DEO JE SKORO MENJAN 
       */
      p.WonPoints=(tacnoOdg/brojTacnihOdg)*Number(p.Points)+"";
      
    });
  }

  dohvatiMaksimumPoena(){
    let poen=0;
    this.test.Questions.forEach(p => {
      poen+=Number(p.Points);
    });
    this.maksimumPoena=poen+"";
  }

  dohvatiMojBrojPoena(){
    let poen=0;
    this.test.Questions.forEach(p => {
      poen+=Number(p.WonPoints);
    });
    this.brojOsvojenih=poen+"";
  }

  povratak() {
    if (this.tipKorisnika=="ispitanik"){
      this.router.navigate(['/user']);
    }
    else{
      if (this.tipKorisnika="kreator"){
        this.router.navigate(['/kreator']);
      }
    }
  }

  dodajNoviPopunjenTest() {
    this.service.dodajNoviReseniTest(this.test).subscribe(test => {
    })
  }

  obrisiStariPopunjeniTest() {
    this.service.obrisiStariReseniTest(this.test.Id, this.test.UsernameUser).subscribe()
  }
}
