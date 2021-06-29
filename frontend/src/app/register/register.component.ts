import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Regrequest } from '../regrequest.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
    this.captchaMessage = "";
    this.popuniUsers();
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

  newUser:Regrequest=null;

  captchaMessage: String = "";

  Users: User[] = [];

  message: String = "";
  ErrorMessage: String = "";
  //
  regexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\.,@#$%])[A-Za-z\d\.,@%]{8,}$/;
  regexPatternPhone = /^[0-9]{5,}$/;
  regexPatternMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  jmbgPomocni: String = "";


  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    //alert(captchaResponse);
    this.captchaMessage = captchaResponse;
  }


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

  proveraZaCaptcha(): boolean {
    if (this.captchaMessage != "") return true;
    else {
      this.ErrorMessage = "";
      this.ErrorMessage = "Potvrdite da niste robot!";
      return false;
    }
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      if(event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/png") { 
        alert("Pogresan tip dokumenta == " + event.target.files[0].type); 
        return false;
      }
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        let url = reader.result.toString(); 
        localStorage.setItem("url", reader.result.toString());
      }
      
    }

  }

  register(): void {
    if (this.proveraSviPodaciUneti() && this.proveraSviPodaciValidni() && this.proveraZaJMBG()
      && this.proveraZaEmail() && this.proveraZaKorisnickoIme() && this.proveraZaTelefon() &&
      this.proveraZaLoznike() && this.proveraZaCaptcha()) {
      
      this.newUser=new Regrequest();
      this.newUser.name=this.name.toString();
      this.newUser.surname=this.surname.toString();
      this.newUser.username=this.username.toString();
      this.newUser.password=this.password.toString();
      this.newUser.birthdate=this.birthdate.toString();
      this.newUser.birthplace=this.birthplace.toString();
      this.newUser.jmbg=this.jmbg.toString();
      this.newUser.email=this.mail.toString();
      this.newUser.phone=this.phone.toString();
      this.newUser.type='ispitanik'
      this.newUser.status='cekanje'
      this.newUser.picture=localStorage.getItem("url");
      
      this.service.register(this.newUser).subscribe(user => {
          if (user['user'] == 'ok') {
            this.message = 'OK';
          }
        });

      alert("Uspesno ste se registrovali! Sacekajte da admin odobri vas zahtev kako biste mogli da se ulogujete");
      this.router.navigate(['/login']);
      //localStorage.setItem('username',this.username.toString());
    }


    /*this.service.register(this.username, this.password, this.mail, this.type).subscribe(user=>{
      if(user['user']=='ok'){
        this.message='OK';
      }

     
    })*/
  }

}
