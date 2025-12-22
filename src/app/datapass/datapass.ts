import { Component, OnInit, signal } from '@angular/core'
import { Paragraph } from '../components/paragraph/paragraph'

@Component({
  selector: 'app-datapass',
  imports: [Paragraph],
  templateUrl: './datapass.html',
  styleUrl: './datapass.css',
})
export class Datapass implements OnInit{
  date = signal(new Date())
  ngOnInit(): void {
    setInterval(()=>{
      this.date.set(new Date());
    }, 1000)
  }

}
