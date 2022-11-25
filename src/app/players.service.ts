import { Injectable } from '@angular/core';
import {Player} from "./players/players.component";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  public players:Player[] = []
  public chosen: boolean

  constructor() {
    this.chosen= true;
  }

  setPlayers(players:Player[]){
    this.players = players
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

}
