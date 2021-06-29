import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import {UsersService} from '../users.service';
import {User} from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  message: String;

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
  }

  login():void{
    this.service.login(this.username, this.password).subscribe((user: User)=>{
      if(user[0]){
        localStorage.setItem('username',user[0].username);
        localStorage.setItem('typeUser',user[0].type);
        if(user[0].type=='ispitanik') {
          this.router.navigate(['/user']);
        }
        else{
          if (user[0].type=='kreator'){
            this.router.navigate(['/kreator']);
          }
          else{
            this.router.navigate(['/admin']);
          }
        } 
      }
      else{
        this.message = "Ne postoji taj korisnik";
      }
     
    })
  }

  register(){
    this.router.navigate(["/register"]);
  }
  

}
