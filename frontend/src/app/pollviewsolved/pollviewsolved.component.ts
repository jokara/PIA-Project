import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { PollResolved } from '../pollresolved.model';

@Component({
  selector: 'app-pollviewsolved',
  templateUrl: './pollviewsolved.component.html',
  styleUrls: ['./pollviewsolved.component.css']
})
export class PollviewsolvedComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    this.poll = JSON.parse(localStorage.getItem('filledPoll'));
    this.obrisiStaruPopunjenuAnketu();
    this.dodajNovuPopunjenuAnketu();
    this.formatiranjeOdgovora();
    this.tipKorisnika=localStorage.getItem('tipKorisnika');
  }

  tipKorisnika:string
  poll: PollResolved = null;

  formatiranjeOdgovora(){
    this.poll.Questions.forEach(p => {
      let format=p.MyAnswer.split("$");
      p.MyAnswer=""
      format.forEach(f => {
        p.MyAnswer+=f + " ";
      });
    });
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

  dodajNovuPopunjenuAnketu() {
    this.service.dodajNovuResenuAnketu(this.poll).subscribe(poll => {
    })
  }

  obrisiStaruPopunjenuAnketu() {
    this.service.obrisiStaruResenuAnketu(this.poll.Id, this.poll.UsernameUser).subscribe()
  }




}
