import { Component } from '@angular/core'
import { Player } from './players/players.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'seba Quiz'
  players: Player[] = []

  constructor() {
    console.log('constuctor in app module')
  }

  async ngOnInit(): Promise<void> {
    console.log('init app')
  }
}
