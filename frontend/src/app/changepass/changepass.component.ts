import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import {UsersService} from '../users.service';
import {User} from '../user.model';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    this.username=localStorage.getItem('username');
    this.dohvatiStaruLozinku();
  }

  username: String;
  oldpass: String;
  newpass: String="";
  newpass2: String="";
  user: User=null;

  regexPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\.,@#$%])[A-Za-z\d\.,@%]{8,}$/;


  ErrorMessage: String;


  dohvatiStaruLozinku():void{
    this.service.dohvatiLozinku(this.username).subscribe(data=>{
      this.user = JSON.parse(JSON.stringify(data));
    });
  }


  promeniLozinku(){
    if (this.proveraZaLoznike()){
      this.postaviNovuLozinku();
      alert("Lozinka je uspesno promenjena!");
      localStorage.removeItem('username');
      this.router.navigate(['/login']);
    }
  }

  postaviNovuLozinku():void{
    this.service.novaLozinka(this.username,this.newpass).subscribe(data=>{
      this.user = JSON.parse(JSON.stringify(data));
    });
  }

  proveraZaLoznike(): boolean{
    this.ErrorMessage="";
    if (this.user.password==this.oldpass){
      if (this.newpass==this.newpass2){
        if (this.newpass.match(this.regexPattern)!=null){
          return true;
        }
        else{
          this.ErrorMessage+="Lozinka mora biti duzine 8 i mora sadrzati jedno veliko slovo, jedan broj i jedan specijalni karakter"
          return false;
        }
      }
      else{
        this.ErrorMessage+="Lozinke se ne poklapaju!";
        return false;
      }
    }
    else{
      this.ErrorMessage+="Stara lozinka nije ispravna!";
      return false;
    }
    return false;
  }


}
