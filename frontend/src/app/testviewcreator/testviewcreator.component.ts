import { Component, OnInit } from '@angular/core';
import { Test } from '../test.model';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-testviewcreator',
  templateUrl: './testviewcreator.component.html',
  styleUrls: ['./testviewcreator.component.css']
})
export class TestviewcreatorComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    this.username=localStorage.getItem('username');
    this.dohvatiSveKreatoroveTestove();
  }

  allTests: Test[]=[];
  username:string="";
  currentTest: Test=null;

  dohvatiSveKreatoroveTestove(){
    this.service.sviKreatoroviTestovi(this.username).subscribe(data=>{
      this.allTests = JSON.parse(JSON.stringify(data));
    })
  }

  popuniTrenutnu(t){
    this.currentTest=t;
  }

  nazad(){
    this.router.navigate(['/kreator']);
  }

}
