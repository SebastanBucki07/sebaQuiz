import {Component, OnInit} from '@angular/core';

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

  constructor() {
    this.players = []
    this.name = ''
  }

  ngOnInit(): void {
  }

  addPoints(id: number, points: number) {
    console.log(`player points: ${typeof(this.players[id].points)}` )
    console.log(`points: ${typeof(points)}` )
    this.players[id].points += points;
  }

  addTeam(name: string) {
    const playerLength = this.players.length
    const player: Player = {
      id: playerLength,
      name: name,
      points: 0,
      tmpPoints:0
    }
    this.players.push(player)
  }

  save(event: any) {
    const tmp2 = event.target.value.toLowerCase()
    this.name = tmp2
  }

  savePoints(id:number, event: any) {
    const point = parseFloat(event.target.value)
    this.players[id].tmpPoints = point
  }

  hideInput(){
    this.addTeamInputVisible = false
  }

}
