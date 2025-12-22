import { Component, input, Input, signal, Signal  } from '@angular/core';

@Component({
  selector: 'app-paragraph',
  imports: [],
  templateUrl: './paragraph.html',
  styleUrl: './paragraph.css',
  host: {
    class: 'block'
  }
})
export class Paragraph {
   @Input() color: string = 'red';
}
