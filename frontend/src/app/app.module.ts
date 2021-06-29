import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from "ng2-charts"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component'
import { UsersService } from './users.service';
import { RecaptchaModule } from 'ng-recaptcha';
import {HttpClientModule} from '@angular/common/http';
import { CreatorComponent } from './creator/creator.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { PollviewComponent } from './pollview/pollview.component';
import { PollviewsolvedComponent } from './pollviewsolved/pollviewsolved.component';
import { TestviewComponent } from './testview/testview.component';
import { TestviewsolvedComponent } from './testviewsolved/testviewsolved.component';
import { PollviewcreatorComponent } from './pollviewcreator/pollviewcreator.component';
import { TestviewcreatorComponent } from './testviewcreator/testviewcreator.component';
import { TestdeletecreatorComponent } from './testdeletecreator/testdeletecreator.component';
import { PolldeletecreatorComponent } from './polldeletecreator/polldeletecreator.component';
import { PollcreatecreatorComponent } from './pollcreatecreator/pollcreatecreator.component';
import { TestcreatecreatorComponent } from './testcreatecreator/testcreatecreator.component';
import { PolljsonComponent } from './polljson/polljson.component';
import { TestjsonComponent } from './testjson/testjson.component';
import { PollresultviewComponent } from './pollresultview/pollresultview.component';
import { TestresultviewComponent } from './testresultview/testresultview.component';
import { AdminnewuserComponent } from './adminnewuser/adminnewuser.component';
import { AdminupdateuserComponent } from './adminupdateuser/adminupdateuser.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    UserComponent,
    CreatorComponent,
    ChangepassComponent,
    PollviewComponent,
    PollviewsolvedComponent,
    TestviewComponent,
    TestviewsolvedComponent,
    PollviewcreatorComponent,
    TestviewcreatorComponent,
    TestdeletecreatorComponent,
    PolldeletecreatorComponent,
    PollcreatecreatorComponent,
    TestcreatecreatorComponent,
    PolljsonComponent,
    TestjsonComponent,
    PollresultviewComponent,
    TestresultviewComponent,
    AdminnewuserComponent,
    AdminupdateuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    RecaptchaModule.forRoot()
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
