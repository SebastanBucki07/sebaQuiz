import { Injectable } from '@angular/core'
import { Player } from './players/players.component'
import { interval, map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  public players: Player[] = []
  public actualPlayer = 0

  constructor() {
    console.log('player service')
  }

  setPlayers(players: Player[]): void {
    this.players = players
  }

  setActualPlayer(playerId: number): void {
    this.actualPlayer = playerId
  }

  getPlayers(): Player[] {
    return this.players
  }

  getActualPlayer(): Observable<number> {
    return interval(1000).pipe(map(() => this.actualPlayer))
  }

  addPoints(id: number, points: number): void {
    this.players[id].points += points
  }

  nextPlayer(): void {
    if (this.actualPlayer >= this.players.length - 1) {
      this.setActualPlayer(0)
    } else {
      this.setActualPlayer(this.actualPlayer + 1)
    }
  }
}
