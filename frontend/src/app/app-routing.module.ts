import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
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

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'kreator', component: CreatorComponent},
  {path: 'user/promenaLozinke', component: ChangepassComponent},
  {path: 'admin/promenaLozinke', component: ChangepassComponent},
  {path: 'kreator/promenaLozinke', component: ChangepassComponent},
  {path: 'promenaLozinke', component: ChangepassComponent},
  {path: 'popuniAnketu', component: PollviewComponent},
  {path: 'pregledAnkete', component: PollviewsolvedComponent},
  {path: 'popuniTest', component: TestviewComponent},
  {path: 'pregledTesta', component: TestviewsolvedComponent},
  {path: 'kreatorPregledAnketa', component: PollviewcreatorComponent},
  {path: 'kreatorPregledTestova', component: TestviewcreatorComponent},
  {path: 'kreatorBrisanjeTestova', component: TestdeletecreatorComponent},
  {path: 'kreatorBrisanjeAnketa', component: PolldeletecreatorComponent},
  {path: 'kreatorKreiranjeTestova', component: TestcreatecreatorComponent},
  {path: 'kreatorKreiranjeAnketa', component: PollcreatecreatorComponent},
  {path: 'anketaJSON', component: PolljsonComponent},
  {path: 'testJSON', component: TestjsonComponent},
  {path: 'pregledRezultataAnketa', component: PollresultviewComponent},
  {path: 'pregledRezultataTestova', component: TestresultviewComponent},
  {path: 'adminNoviKorisnik', component: AdminnewuserComponent},
  {path: 'adminIzmenaKorisnik', component: AdminupdateuserComponent},
  {path: '', component: LoginComponent}
]


@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
