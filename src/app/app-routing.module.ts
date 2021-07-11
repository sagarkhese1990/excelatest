import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HowItWorksComponent } from './modules/how-it-works/how-it-works.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
    {
      path: 'how-it-works',     
      loadChildren: () => import('./modules/how-it-works/how-it-works.module').then(m => m.HowItWorksModule),
    },
   
    {
      path: 'user-list',     
      loadChildren: () => import('./modules/user-list/user-list.module').then(m => m.UserListModule),
    },
    {
      path: '',
      redirectTo: '/how-it-works',
      pathMatch: 'full'
    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
