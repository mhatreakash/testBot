import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatbotUi2Page } from './chatbot-ui2.page';

describe('ChatbotUi2Page', () => {
  let component: ChatbotUi2Page;
  let fixture: ComponentFixture<ChatbotUi2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotUi2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotUi2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
