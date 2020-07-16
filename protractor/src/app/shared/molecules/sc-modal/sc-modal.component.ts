import { Component, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { ScModalProps } from './sc-modal.model';
import { LoginService } from '../../security/login.service';

@Component({
  selector: 'app-sc-modal',
  templateUrl: './sc-modal.component.html'
})
export class ScModalComponent implements OnChanges {
  @Output() actionAccept = new EventEmitter();
  @Input() addClass: string;
  @Input() embebed: boolean;
  @Input() id = 'default';

  showModal = false;
  hasAccept = true;
  initied = false;
  eventLoop;

  constructor(private resetSesionCount: LoginService) {
    window.onresize = () => this.centerModal();
  }

  ngOnChanges( changes ){
    if ( changes.addClass ) {
      this.addClass = changes.addClass.currentValue;
    }
  }

  open( opts: ScModalProps = null ) {
    this.showModal = true;
    this.centerModal();
    this.resetSessionCount();
  }


  close() {
    this.showModal = false;
    this.resetSessionCount();
  }

  centerModal() {

    let childWidth = 0;
    let childHeight = 0;

    clearTimeout(this.eventLoop);
    this.eventLoop = setTimeout(() => {
      const modals = document.querySelectorAll('.sc-modal');

      for ( const index in modals ) {
        if ( modals[index] ) {
          const modal = modals[index];
          const parentContainer: any = this.selectParentElement();

          // window
          if ( parentContainer ) {
            childWidth = parentContainer.offsetWidth || parentContainer.innerWidth;
            childHeight = parentContainer.offsetHeight || parentContainer.innerHeight;
          }

          // modal
          const itemWidth = modal.clientWidth;
          const itemHeight = modal.clientHeight;

          // calculation
          const posX = Math.abs(Math.round((childWidth - itemWidth) / 2));
          const posY = Math.abs(Math.round((childHeight - itemHeight) / 2));
          if ( modal.setAttribute ){// isMobile: no calcular
            modal.setAttribute('style', `left: ${posX}px; top: ${posY}px;`);
            // isMobile
            //modal.setAttribute('style', `top: ${posY}px;`);
          }
        }
      }
    });
  }

  selectParentElement() {
    const parent: HTMLElement = this.embebed &&  document.querySelector('.sc-chatbot-container');
    return parent && parent.offsetParent || window;
  }

  //session count
  resetSessionCount() {
    try {
      this.resetSesionCount.updateInteractionUserSession();
    } catch (e) {
    }
  }
}
