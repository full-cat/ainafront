import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.scss'],
  standalone: true
})
export class TypingComponent  implements OnInit {

  displayedText = '';
  currentIndex = 0;
  typingSpeed = 30;

  @Input() textToShow: string = '';

  ngOnInit() {
    this.typeText();
  }

  ngOnChanges() {
    this.displayedText = '';
    this.currentIndex = 0;
    this.typeText();
  }

  typeText() {
    if (this.currentIndex < this.textToShow.length) {
      this.displayedText += this.textToShow.charAt(this.currentIndex);
      this.currentIndex++;
      setTimeout(() => this.typeText(), this.typingSpeed);
    }
  }

}
