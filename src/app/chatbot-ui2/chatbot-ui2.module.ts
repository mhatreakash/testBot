import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatbotUi2PageRoutingModule } from './chatbot-ui2-routing.module';

import { ChatbotUi2Page } from './chatbot-ui2.page';
import { AutosizeModule } from 'ngx-autosize';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatbotUi2PageRoutingModule,
    AutosizeModule
  ],
  declarations: [ChatbotUi2Page]
})
export class ChatbotUi2PageModule {}
