import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Regrequest } from '../regrequest.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    this.username=localStorage.getItem('username');
    this.navigator=0;
    this.dohvatiSveKorisnike();
    this.dohvatiSveZahteveKorisnicke();
  }

  username:string;
  allUsers:User[]=[];
  navigator:number;
  allRegRequests:Regrequest[]=[];
  newUser:User=null;
/*dohvati sve korisnike admin*/
  dohvatiSveKorisnike(){
    this.service.sviKorisnici().subscribe(data=>{
      this.allUsers = JSON.parse(JSON.stringify(data));
    })
  }
/*dohvati sve zahteve korisnika admin*/
  dohvatiSveZahteveKorisnicke(){
    this.service.sviKorisnickiZahtevi().subscribe(data=>{
      this.allRegRequests = JSON.parse(JSON.stringify(data));
    })
  }

  odobriNoviZahtev(){
    this.navigator=1;
  }

  obrisiKorisnika(){
    this.navigator=2;
  }

  izmeniKorisnika(){
    this.navigator=3;
  }

  dodajNovogKorisnika(){
    this.router.navigate(['/adminNoviKorisnik']);
  }
/*obrisi korisnika admin*/
  obrisiDatogKorisnika(u){
    this.service.obrisiDatogKorisnika(u.username).subscribe(data=>{
    });
    window.location.reload();
  }
/*obrisi zahtev korisnika admin*/
  obrisiDatogKorisnikaNoviZahtev(r){
    this.service.obrisiKorisnikovZahtev(r.username).subscribe(data=>{
    });
    window.location.reload();
  }
/*dodaj novog korisnika admin*/
  dodajDatogKorisnikaNoviZahtev(r){
    this.newUser=new User();
    this.newUser.name=r.name;
    this.newUser.surname=r.surname;
    this.newUser.username=r.username;
    this.newUser.password=r.password;
    this.newUser.birthdate=r.birthdate;
    this.newUser.birthplace=r.birthplace;
    this.newUser.jmbg=r.jmbg;
    this.newUser.email=r.email;
    this.newUser.phone=r.phone;
    this.newUser.type=r.type;
    this.newUser.picture=r.picture;
    
    this.service.registerUser(this.newUser).subscribe(data=>{
    });
    this.service.obrisiKorisnikovZahtev(r.username).subscribe(data=>{
    });
    window.location.reload();

  }
/*izmeni korisnika admin*/
  izmeniDatogKorisnika(u){
    localStorage.setItem('izmenaKorisnik',JSON.stringify(u));
    this.router.navigate(['/adminIzmenaKorisnik']);
  }

  logout(){
    this.router.navigate(['/login']);
  }

}
