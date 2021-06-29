import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Test } from '../test.model';

@Component({
  selector: 'app-testdeletecreator',
  templateUrl: './testdeletecreator.component.html',
  styleUrls: ['./testdeletecreator.component.css']
})
export class TestdeletecreatorComponent implements OnInit {

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
  
  obrisiTest(t){
    this.service.obrisiTestoveReseneKreator(t.Id).subscribe(data=>{
    });
    this.service.obrisiTest(t.Id).subscribe(data=>{
    });
    window.location.reload();
  }

  nazad(){
    this.router.navigate(['/kreator']);
  }

}
