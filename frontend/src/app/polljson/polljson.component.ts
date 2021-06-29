import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Poll } from '../poll.model';

@Component({
  selector: 'app-polljson',
  templateUrl: './polljson.component.html',
  styleUrls: ['./polljson.component.css']
})
export class PolljsonComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
  }
  
  message='';
  file:any;
  poll:Poll;

  fileChanged(e) {
      this.file = e.target.files[0];
      this.uploadDocument(this.file);
  }

  uploadDocument(file) {
    this.message='';
    let myReader = new FileReader();
    myReader.onloadend = (e) => {
      //console.log(myReader.result);
      // Entire file
      //console.log(myReader.result);

      // By lines
      var lines = (String)(myReader.result)
      
      localStorage.setItem('jsonAnketa',(JSON.parse(JSON.stringify(lines))));
      this.poll=new Poll();
      try {
        this.poll=JSON.parse(localStorage.getItem('jsonAnketa'));
        if (this.poll.Name=="" || this.poll.Name==null) {this.message="Anketa nije u dobrom formatu!"; return;}
        if (this.poll.StartDate=="" || this.poll.StartDate==null) {this.message="Anketa nije u dobrom formatu!"; return;}
        if (this.poll.EndDate=="" || this.poll.EndDate==null) {this.message="Anketa nije u dobrom formatu!"; return;}
        if (this.poll.About=="" || this.poll.About==null) {this.message="Anketa nije u dobrom formatu!"; return;}
        if (this.poll.Type=="" || this.poll.Type==null) {this.message="Anketa nije u dobrom formatu!"; return;}
        if (this.poll.Id=="" || this.poll.Id==null) {this.message="Anketa nije u dobrom formatu!"; return;}
        if (this.poll.Creator=="" || this.poll.EndDate==null) {this.message="Anketa nije u dobrom formatu!"; return;}
        if (this.poll.Filled=="" || this.poll.Filled==null) {this.message="Anketa nije u dobrom formatu!"; return;}
        if (this.poll.Locked=="" || this.poll.Locked==null) {this.message="Anketa nije u dobrom formatu!"; return;}
        if (this.poll.Time=="" || this.poll.Time==null) {this.message="Anketa nije u dobrom formatu!"; return;}
        if (this.poll.QuestionsByPage=="" || this.poll.QuestionsByPage==null) {this.message="Anketa nije u dobrom formatu!"; return;}
        this.poll.Questions.forEach(q => {
          if (q.Question=="" || q.Question==null) {this.message="Anketa nije u dobrom formatu!"; return;}
          if (q.Type=="" || q.Type==null) {this.message="Anketa nije u dobrom formatu!"; return;}
          if (q.NumberAnswers=="" || q.NumberAnswers==null) {this.message="Anketa nije u dobrom formatu!"; return;}
        });
        this.message="Anketa je u dobrom formatu!"

        this.service.dodajAnketuKreatora(this.poll).subscribe(poll => {
        });
      } catch(e) {
        this.message="Anketa nije u dobrom formatu!";
      }
      
   };
    myReader.readAsText(this.file);
  }

  sacuvajAnketu(){
    if (this.message=="Anketa je u dobrom formatu!"){
      alert("Uspesno ste sacuvali novu anketu");
      this.router.navigate(['/kreator']);
    }
    else{
      alert("Niste sacuvali novu anketu!");
    }
  }

  nazad(){
    this.router.navigate(['/kreator']);
  }
}
