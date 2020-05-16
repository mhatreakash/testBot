import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatbotUi2Page } from './chatbot-ui2.page';

const routes: Routes = [
  {
    path: '',
    component: ChatbotUi2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatbotUi2PageRoutingModule {}
