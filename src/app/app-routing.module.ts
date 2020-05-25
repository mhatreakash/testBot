import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path:"ui", loadChildren:() => import('./chatbot-ui/chatbot-ui.module').then( m => m.ChatbotUiPageModule)},
  {
    path: '',
    loadChildren: () => import('./chatbot-ui2/chatbot-ui2.module').then( m => m.ChatbotUi2PageModule)
  }

  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
