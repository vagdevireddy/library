import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  helpSection: any;
  @ViewChild('getHelp') getHelp: ElementRef;
  @ViewChild('contactForm') contactForm: ElementRef;
  constructor(private elRef: ElementRef) { }
  ngOnInit() {}
  getHelpEvent () {
    if (this.contactForm.nativeElement.classList.contains('show-profile') === false) {
      this.contactForm.nativeElement.classList.add('show-profile');
      this.getHelp.nativeElement.classList.add('get-help-hide');
    } else {
      this.getHelp.nativeElement.classList.remove('get-help-hide');
      this.contactForm.nativeElement.classList.remove('show-profile');
    }
  }
}
