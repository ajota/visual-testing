import { TestBed } from '@angular/core/testing';

import { ChatbotService } from './chatbot.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import {firebase} from 'src/environments/environment';


describe('ChatbotService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, AngularFireModule.initializeApp(firebase) ],
    providers: [ AngularFireDatabase ]
  }));

  it('should be created', () => {
    const service: ChatbotService = TestBed.get(ChatbotService);
    expect(service).toBeTruthy();
  });
});
