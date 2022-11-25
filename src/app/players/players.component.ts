import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {PlayersService} from "../players.service";

export interface Player {
  id: number,
  name: string,
  points: number
  tmpPoints:number
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  public addTeamInputVisible = true
  public players: Player[];
  public name: string;

  constructor(
    private playerService: PlayersService,
    public myApp: AppComponent)
  {
    this.players = []
    this.name = ''
  }

  ngOnInit(): void {
  }

  addPoints(id: number, points: number) {
    this.players[id].points += points;
  }

  addTeam(name: string) {
    const playerLength = this.players.length-1
    const player: Player = {
      id: playerLength,
      name: name,
      points: 0,
      tmpPoints:0
    }
    this.players.push(player)
    this.sendPlayers(this.players)
    this.name = ''
  }

  save(event: any) {
    this.name = event.target.value.toLowerCase()
  }

  savePoints(id:number, event: any) {
    this.players[id].tmpPoints = parseFloat(event.target.value)
  }

  hideInput(){
    this.addTeamInputVisible = false
    this.myApp.confirmPlayers()
  }

  sendPlayers(players:Player[]){
    this.playerService.setPlayers(players)
    this.myApp.addPlayers()
  }

}
