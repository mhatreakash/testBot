import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

const dialogflowURL = 'https://us-central1-chatbot-rektta.cloudfunctions.net/dialogflowGateway';

@Component({
  selector: 'app-chatbot-ui2',
  templateUrl: './chatbot-ui2.page.html',
  styleUrls: ['./chatbot-ui2.page.scss'],
})
export class ChatbotUi2Page implements OnInit {
  // messages = [
  //   {
  //     text: "hi",
  //     sender: 'You',
  //     date: new Date()
  //   },
  //   {
  //     text: "hellow",
  //     sender: 'Bot',
  //     date: new Date()
  //   }
  // ];
  messages = [];
  message;
  sending: boolean;

  constructor(private http: HttpClient) { }

  @ViewChild(IonContent, { static: false }) content: IonContent

  ngOnInit() {
  }
  sessionId = Math.random().toString(36).slice(-5);
  sendMessage(event) {
    const text = this.message;
    this.addUserMessage(text);
    this.message = ""
    this.http.post<any>(
      dialogflowURL,
      {
        sessionId: this.sessionId,
        queryInput: {
          text: {
            text,
            languageCode: 'en-US'
          }
        }
      }
    )
      .subscribe(res => {
        const { fulfillmentText } = res;
        this.addBotMessage(fulfillmentText);
      });
  }


  handleUserMessage(event) {
    // console.log(event);
    const text = event.message;


    // this.loading = true;

    // Make the request

  }

  addUserMessage(text) {
    this.messages.push({
      text,
      sender: 'You',
      date: new Date()
    });
    this.content.scrollToBottom(200)
  }

  addBotMessage(text) {
    this.messages.push({
      text,
      sender: 'Bot',
      date: new Date()
    });
    this.content.scrollToBottom(200)
  }

}