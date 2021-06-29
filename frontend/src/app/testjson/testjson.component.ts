import { Component, OnInit } from '@angular/core';
import { Test } from '../test.model';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-testjson',
  templateUrl: './testjson.component.html',
  styleUrls: ['./testjson.component.css']
})
export class TestjsonComponent implements OnInit {

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
  }

  message='';
  file:any;
  test:Test;

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
      
      localStorage.setItem('jsonTest',(JSON.parse(JSON.stringify(lines))));
      this.test=new Test();
      try {
        this.test=JSON.parse(localStorage.getItem('jsonTest'));
        if (this.test.Name=="" || this.test.Name==null) {this.message="Test nije u dobrom formatu!"; return;}
        if (this.test.StartDate=="" || this.test.StartDate==null) {this.message="Test nije u dobrom formatu!"; return;}
        if (this.test.EndDate=="" || this.test.EndDate==null) {this.message="Test nije u dobrom formatu!"; return;}
        if (this.test.About=="" || this.test.About==null) {this.message="Test nije u dobrom formatu!"; return;}
        if (this.test.Id=="" || this.test.Id==null) {this.message="Test nije u dobrom formatu!"; return;}
        if (this.test.Creator=="" || this.test.EndDate==null) {this.message="Test nije u dobrom formatu!"; return;}
        if (this.test.Locked=="" || this.test.Locked==null) {this.message="Test nije u dobrom formatu!"; return;}
        if (this.test.Time=="" || this.test.Time==null) {this.message="Test nije u dobrom formatu!"; return;}
        if (this.test.QuestionsByPage=="" || this.test.QuestionsByPage==null) {this.message="Test nije u dobrom formatu!"; return;}
        this.test.Questions.forEach(q => {
          if (q.Question=="" || q.Question==null) {this.message="Test nije u dobrom formatu!"; return;}
          if (q.Type=="" || q.Type==null) {this.message="Test nije u dobrom formatu!"; return;}
          if (q.NumberAnswers=="" || q.NumberAnswers==null) {this.message="Test nije u dobrom formatu!"; return;}
          if (q.Points=="" || q.Points==null) {this.message="Test nije u dobrom formatu!"; return;}
        });
        this.message="Test je u dobrom formatu!"

        this.service.dodajTestKreatora(this.test).subscribe(test => {
        });
      } catch(e) {
        this.message="Test nije u dobrom formatu!";
      }
      
   };
    myReader.readAsText(this.file);
  }

  sacuvajTest(){
    if (this.message=="Test je u dobrom formatu!"){
      alert("Uspesno ste sacuvali novi test");
      this.router.navigate(['/kreator']);
    }
    else{
      alert("Niste sacuvali novi test!");
    }
  }

  nazad(){
    this.router.navigate(['/kreator']);
  }
}
