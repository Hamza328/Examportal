import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from '../app/pages/sign-up/sign-up.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionComponent } from './pages/admin/view-quiz-question/view-quiz-question.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './service/admin.guard';
import { NormalGuard } from './service/normal.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate:[AdminGuard],
    children: [
      { path: '', component: WelcomeComponent,},
      { path: 'profile', component: ProfileComponent},
      { path: 'category', component: ViewCategoriesComponent},
      { path: 'add-category', component: AddCategoriesComponent},
      { path: 'view-quizzes', component: ViewQuizzesComponent},
      { path: 'add-quiz', component: AddQuizComponent},
      { path: 'add-quiz/:id', component: AddQuizComponent},
      { path: 'view-question/:id/:title', component: ViewQuizQuestionComponent},
      { path: 'add-question/:id/:title', component: AddQuestionComponent},
    ],
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children:[
      {path:':catId',component:LoadQuizComponent},
      {path:'instructions/:qId',component:InstructionsComponent},

    ]

  },
  {path:'start/:qid',component:StartComponent},
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
