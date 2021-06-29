import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Poll } from '../poll.model';

@Component({
  selector: 'app-polldeletecreator',
  templateUrl: './polldeletecreator.component.html',
  styleUrls: ['./polldeletecreator.component.css']
})
export class PolldeletecreatorComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    this.username=localStorage.getItem('username');
    this.dohvatiSveKreatoroveAnkete();
  }

  allPolls: Poll[]=[];
  username:string="";
  currentTest: Poll=null;

  dohvatiSveKreatoroveAnkete(){
    this.service.sveKreatoroveAnkete(this.username).subscribe(data=>{
      this.allPolls = JSON.parse(JSON.stringify(data));
    })
  }
  
  obrisiAnketu(p){
    this.service.obrisiAnketuKreator(p.Id).subscribe(data=>{
    });
    this.service.obrisiAnketeReseneKreator(p.Id).subscribe(data=>{
    });
    window.location.reload();
  }

  nazad(){
    this.router.navigate(['/kreator']);
  }
}
