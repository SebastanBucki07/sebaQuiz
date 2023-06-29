import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'seba Quiz'

  constructor() {
    console.log('constuctor in app module')
  }

  async ngOnInit(): Promise<void> {
    console.log('init app')
  }
}
