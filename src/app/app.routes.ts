import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { VoteComponent } from './components/vote/vote.component';


export const routes: Routes = [
    {path : '',component : LoginComponent},
    {path : 'signup',component : SignupComponent},
    {path : 'home', component : HomeComponent},
    {path : 'vote', component : VoteComponent}
];
