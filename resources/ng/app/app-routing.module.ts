import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => import('./feature/portfolio/portfolio.module').then(m => m.PortfolioModule) },
  {path: 'welcome', loadChildren: () => import('./feature/welcome/welcome.module').then(m => m.WelcomeModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
