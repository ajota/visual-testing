import { Component, OnInit, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-search-credits',
  templateUrl: './form-search-credits.component.html',
  styleUrls: ['./form-search-credits.component.scss']
})
export class FormSearchCreditsComponent implements OnInit, AfterViewInit {

  @Output() submitFormSearch = new EventEmitter();
  @Output() eventBackButton = new EventEmitter();

  constructor() { }

  formSearch = new FormGroup({
    typeDocument: new FormControl( 'CC', [Validators.required]),
    idDocument: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    validationCode: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.pattern(/^\d+$/)])
  });

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.typeDocument.setValue('CC');
  }
  get typeDocument(): AbstractControl {
    return this.formSearch.get('typeDocument');
  }

  get idDocument(): AbstractControl {
    return this.formSearch.get('idDocument');
  }

  get validationCode(): AbstractControl {
    return this.formSearch.get('validationCode');
  }
}
