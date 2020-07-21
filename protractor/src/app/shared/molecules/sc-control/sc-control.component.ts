import { Component, Input, OnInit, Output, EventEmitter, DoCheck, ViewEncapsulation } from '@angular/core';
import { FormGroup, ValidationErrors, AbstractControl, PatternValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { getDomains } from '../../util/web-config';

@Component({
  selector: 'sc-control',
  templateUrl: './sc-control.component.html',
  encapsulation: ViewEncapsulation.None
})
/**
 * Componente de controles
 *
 * @Input type: the control functionality name (password, text, email, date, number... etc.)
 * @Input name: Name of the control assigned into the Formgroup
 * @Input label: text to show as name of the control
 * @Input form: FromGroup to relate with the control
 * @Input ricon: Show an icon to the right side of the control
 * @Input licon: Show an icon to the left side of the control
 * @Input theme: Class Name to change the general appearence of the control
 * @Input msgValidation: { [key]:[value] } -> Object to add the message of the validation
 * @Output valueChange: Event fired when the value is changed.
 * Ej:
 */
export class ScControlComponent  implements OnInit {
  public model: any;
  @Input() type: string;
  @Input() name: string;
  @Input() label: string;
  @Input() form: FormGroup;
  @Input() ricon: string;
  @Input() licon: string;
  @Input() theme: string;
  @Input() placeholder: string;
  @Input() msgValidation: ValidationErrors = {};
  @Output() valueChange = new  EventEmitter();

  riconClick = false;
  riconInitClass: string;
  riconInitType: string = JSON.stringify( this.type );
  messagesValidation: Array<string>;
  userEmail: string;

  constructor(private mapConfigBase: MapConfigBasePipe) {  }
  
  regDomainEmail = new RegExp (this.mapConfigBase.transform('str_regular_expression_email_domain'));
  domains = getDomains();

  ngOnInit() {
    this.riconInitClass = this.ricon + '';
    this.riconInitType =  this.type + '';
    this.msgValidation = this.validateIfRequired();
    this.messagesValidation = Object.keys( this.msgValidation );
  }

  riconActionClick( ) {
    if ( this.riconInitType === 'password' || this.riconInitType === 'passwordlogin' ) {

      if ( !this.riconClick ) {

        this.ricon = 'sc-icon--password-hide';
        this.type = 'text';
        this.riconClick = true;

      } else {

        this.ricon = this.riconInitClass;
        this.type = this.riconInitType;
        this.riconClick = false;
      }

    }

  }

  validateIfRequired() {
    const control = this.form.get( this.name );
    let validators;
    if(control.validator !== null){
      validators = control.validator( {} as AbstractControl );
    }
    const cond = validators && validators.required && !this.msgValidation.required  && this.msgValidation.pattern;

    if ( cond ) {
      this.msgValidation.required = this.msgValidation.pattern;
    }

    return this.msgValidation;
  }

  // events
  changeInputEvent( event ) {
    this.valueChange.emit( event );
  }

  // getters


  // suggestion domain
  searchDomain() {
    return (text$: Observable<string>) => text$.pipe(
      debounceTime(200),
      map(term => {
        if(term.includes('@') && this.type === 'email') { 
          this.userEmail = term.split('@')[0];
          const filtered = term.match(this.regDomainEmail).toString();
          return this.domains.filter(v => v.toLowerCase().indexOf(filtered) > -1).slice(0, 10).map(domain => this.userEmail + domain);
        } else{
          return []
        }
      })
    )
  }
}