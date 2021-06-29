import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Poll } from '../poll.model';

@Component({
  selector: 'app-pollviewcreator',
  templateUrl: './pollviewcreator.component.html',
  styleUrls: ['./pollviewcreator.component.css']
})
export class PollviewcreatorComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    this.username=localStorage.getItem('username');
    this.dohvatiSveKreatoroveAnkete();
  }

  allPolls: Poll[]=[];
  username:string="";
  currentPoll: Poll=null;

  dohvatiSveKreatoroveAnkete(){
    this.service.sveKreatoroveAnkete(this.username).subscribe(data=>{
      this.allPolls = JSON.parse(JSON.stringify(data));
    })
  }

  popuniTrenutnu(p){
    this.currentPoll=p;
  }

  nazad(){
    this.router.navigate(['/kreator']);
  }

}
