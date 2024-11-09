import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.scss'],
  standalone: true
})
export class TypingComponent  implements OnInit {

  // lorem de 100 palabras
  textToShow = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud " +
    "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure " +
    "dolor in reprehenderit voluptate velit esse cillum dolore fugiat nulla pariatur excepteur" +
    " sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id" +
    " est laborum";
  displayedText = '';
  currentIndex = 0;
  typingSpeed = 30; // velocidad en ms entre cada letra

  ngOnInit() {
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
