import { Injectable } from '@angular/core';
import {Player} from "./players/players.component";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  public players:Player[] = []
  public actualPlayer:number = 0
  public chosen: boolean

  constructor() {
    this.chosen= true;
  }

  setPlayers(players:Player[]){
    this.players = players
  }

  setActualPlayer(playerId:number){
    this.actualPlayer = playerId
  }

  getPlayers():Player[]{
    return this.players
  }

  acceptPlayers(){
    this.chosen = false
  }

  addPoints(id: number, points: number) {
    this.players[id].points += points;
  }

  nextPlayer() {
    if (this.actualPlayer >= this.players.length - 1) {
      this.setActualPlayer(0)
    } else {
      this.setActualPlayer(this.actualPlayer + 1)
    }
  }

}
