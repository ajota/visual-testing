import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatbotComponent } from './chatbot.component';
import { ChatbotService } from './chatbot.service';
import { AppModule } from 'src/app/app.module';
import { HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;
  let back: HttpTestingController;
  let service: ChatbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [ChatbotComponent, { provide: Router }]
    }).compileComponents();
    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
