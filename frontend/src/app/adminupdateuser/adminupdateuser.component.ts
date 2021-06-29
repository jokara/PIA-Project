import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-adminupdateuser',
  templateUrl: './adminupdateuser.component.html',
  styleUrls: ['./adminupdateuser.component.css']
})
export class AdminupdateuserComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    this.UserLocal=JSON.parse(localStorage.getItem("izmenaKorisnik"));

    this.popuniUsers();
    this.popuniStareVrednosti();

  }
  name: String = "";
  surname: String = "";
  username: String = "";
  password: String = "";
  password2: String = "";
  birthdate: String = "";
  birthplace: String = "";
  phone: String = "";
  jmbg: String = "";
  mail: String = "";
  type: String = "";
  UserLocal:User=null;
  newUser:User=null;

  Users: User[] = [];

  message: String = "";
  ErrorMessage: String = "";
  //
  regexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\.,@#$%])[A-Za-z\d\.,@%]{8,}$/;
  regexPatternPhone = /^[0-9]{5,}$/;
  regexPatternMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  jmbgPomocni: String = "";
/*popunjavanje starih vrednosti*/
  popuniStareVrednosti(){
    this.name=this.UserLocal.name;
    this.surname=this.UserLocal.surname;
    this.username=this.UserLocal.username;
    this.password=this.UserLocal.password;
    this.password2=this.UserLocal.password;
    this.birthdate=this.UserLocal.birthdate;
    this.birthplace=this.UserLocal.birthplace;
    this.phone=this.UserLocal.phone;
    this.jmbg=this.UserLocal.jmbg;
    this.mail=this.UserLocal.email;
    localStorage.setItem("url",this.UserLocal.picture);

  }


/*provera unetih podataka*/
  proveraSviPodaciUneti(): boolean {
    this.ErrorMessage = "";
    if (this.name == "") { this.ErrorMessage += "Ime ne sme biti prazno!\n" }
    if (this.surname == "") { this.ErrorMessage += "Prezime ne sme biti prazno!\n" }
    if (this.username == "") { this.ErrorMessage += "Korisnicko ime ne sme biti prazno!\n" }
    if (this.password == "") { this.ErrorMessage += "Lozinka ne sme biti prazna!\n" }
    if (this.password2 == "") { this.ErrorMessage += "Morate potvrditi lozinku!\n" }
    if (this.birthdate == "") { this.ErrorMessage += "Datum rodjenja mora biti unet!\n" }
    if (this.birthplace == "") { this.ErrorMessage += "Mesto rodjenja ne sme biti prazno!\n" }
    if (this.jmbg == "") { this.ErrorMessage += "JMBG mora biti unet!\n" }
    if (this.phone == "") { this.ErrorMessage += "Telefon mora biti unet!\n" }
    if (this.mail == "") { this.ErrorMessage += "Mail mora biti unet!\n" }
    if (this.ErrorMessage == "") return true;
    return false;
  }
/*provera validnosti podataka*/
  proveraSviPodaciValidni(): boolean {
    this.ErrorMessage = "";
    if (this.name.length <= 2) { this.ErrorMessage += "Ime ne sme biti krace od 3 slova!\n" }
    if (this.surname.length <= 2) { this.ErrorMessage += "Prezime ne sme biti krace od 3 slova!\n" }
    if (this.username.length <= 2) { this.ErrorMessage += "Korisnicko ime ne sme biti krace od 3 slova!\n" }
    if (this.birthplace.length <= 2) { this.ErrorMessage += "Mesto rodjenja ne sme biti krace od 3 slova!\n" }
    if (this.jmbg.length != 13) { this.ErrorMessage += "JMBG mora biti duzine 13 karaktera!\n" }
    if (this.ErrorMessage == "") return true;
    return false;
  }
/*popunjavanje za JMBG*/
  popunjavanjeZaJMBG(): void {
    for (let index = this.birthdate.length - 1; index >= 0; index--) {
      if (index == 7) {
        this.jmbgPomocni += this.birthdate[index + 1];
        this.jmbgPomocni += this.birthdate[index + 2];
      }
      if (index == 4) {
        this.jmbgPomocni += this.birthdate[index + 1];
        this.jmbgPomocni += this.birthdate[index + 2];
      }
      if (index == 0) {
        this.jmbgPomocni += this.birthdate[index + 1];
        this.jmbgPomocni += this.birthdate[index + 2];
        this.jmbgPomocni += this.birthdate[index + 3];
      }
    }
  }
/*provera za telefon*/
  proveraZaTelefon(): boolean {
    this.ErrorMessage = "";
    if (this.phone.match(this.regexPatternPhone) != null) {
      return true;
    }
    else {
      this.ErrorMessage += "Telefon mora sadrzati samo cifre i biti duzine vece od 5!"
      return false;
    }
  }
/*provera za lozinke*/
  proveraZaLoznike(): boolean {
    this.ErrorMessage = "";
    if (this.password == this.password2) {
      if (this.password.match(this.regexPattern) != null) {
        return true;
      }
      else {
        this.ErrorMessage += "Lozinka mora biti duzine 8 i mora sadrzati jedno veliko slovo, jedan broj i jedan specijalni karakter"
        return false;
      }
    }
    else {
      this.ErrorMessage += "Lozinke se ne poklapaju!";
      return false;
    }
    return false;
  }
/*provera za JMBG*/
  proveraZaJMBG(): boolean {
    this.popunjavanjeZaJMBG();
    for (let index = 0; index < 7; index++) {
      if (!(this.jmbg[index] == this.jmbgPomocni[index])) {
        this.ErrorMessage = "";
        this.ErrorMessage += "JMBG mora biti u skladu sa pravilima o formiranju JMBG!"
        return false;
      }
    }
    return true;
  }

  popuniUsers(): void {
    this.service.dohvatiBrojMejlova(this.mail).subscribe(data => {
      this.Users = JSON.parse(JSON.stringify(data));

    });
  }
/*provera za korisnicko ime*/
  proveraZaKorisnickoIme(): boolean {
    let flag = true;
    this.Users.forEach(u => {
      if (u.username == this.username) {
        this.ErrorMessage = "";
        this.ErrorMessage = "Vec postoji nalog sa tim korisnickim imenom!"
        flag = false;
      }
    });
    return flag;
  }
/*provera za email*/
  proveraZaEmail(): boolean {
    if (this.mail.match(this.regexPatternMail) != null) {
      let counter = 0;
      this.ErrorMessage = "";
      this.Users.forEach(u => {
        if (u.email == this.mail) counter++;
      });
      if (counter >= 2) {
        this.ErrorMessage = "";
        this.ErrorMessage = "Vec postoji dozvoljen broj naloga sa tim mejlom!"
        return false;
      }
      else return true;
    }
    else {
      this.ErrorMessage = "";
      this.ErrorMessage = "Email adresa mora biti u skladu sa pravilima o formiranju email adrese";
      return false;
    }
  }


  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        let url = reader.result.toString(); 
        localStorage.setItem("url", reader.result.toString());
      }
      
    }

  }

  register(): void {
    if (this.proveraSviPodaciUneti() && this.proveraSviPodaciValidni() && this.proveraZaJMBG()
      && this.proveraZaEmail() && this.proveraZaTelefon() &&
      this.proveraZaLoznike()) {
      
      this.newUser=new User();
      this.newUser.name=this.name.toString();
      this.newUser.surname=this.surname.toString();
      this.newUser.username=this.username.toString();
      this.newUser.password=this.password.toString();
      this.newUser.birthdate=this.birthdate.toString();
      this.newUser.birthplace=this.birthplace.toString();
      this.newUser.jmbg=this.jmbg.toString();
      this.newUser.email=this.mail.toString();
      this.newUser.phone=this.phone.toString();
      this.newUser.type=this.UserLocal.type;
      this.newUser.picture=localStorage.getItem("url");
      
      this.service.obrisiDatogKorisnika(this.username).subscribe(user => {
        if (user['user'] == 'ok') {
          this.message = 'OK';
        }
      });

      this.service.registerUser(this.newUser).subscribe(user => {
          if (user['user'] == 'ok') {
            this.message = 'OK';
          }
      });

      alert("Uspesno ste se izmenili korisnika!");
      this.router.navigate(['/admin']);
      //localStorage.setItem('username',this.username.toString());
    }
  }


  nazad(){
    this.router.navigate(['/admin']);
  }

}
