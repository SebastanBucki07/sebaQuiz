import {Component, OnInit} from '@angular/core';
import {QuestionDataService} from "../question-data.service";
import {PlayersService} from "../players.service";
import {FootballGamesAnswerModel, FootballGamesModel} from "../model/footballgames-model";
import {PlayerForFamiliada} from "../players/players.component";

@Component({
  selector: 'app-football-games',
  templateUrl: './football-games.component.html',
  styleUrls: ['./football-games.component.css']
})
export class FootballGamesComponent implements OnInit {

  public points: number = 5;
  public footballGames: FootballGamesModel | any = {};
  public answerForSquad: FootballGamesAnswerModel[] = [];
  public question: string = '';
  public tip: string = '';
  public userAnswer: string = '';
  public footballer: string | undefined = '';
  public players: PlayerForFamiliada[] = [];
  public actualPlayer: PlayerForFamiliada | any = null;
  public blockedButton = false;
  public isVisible = false;
  public end = false;
  public winner: PlayerForFamiliada | any = null;


  constructor(
    private questionDataService: QuestionDataService,
    public playerService: PlayersService
  ) {
  }

  ngOnInit(): void {
    this.getQuestion()
  }

  setPlayersForFamiliada() {
    const tmp = this.playerService.getPlayers();
    tmp.forEach((player) => {
      this.players.push({
        id: player.id,
        name: player.name,
        wrong: 0
      })
    })
    let playerIndex = this.players.findIndex(el => el.id === this.playerService.actualPlayer)
    this.setActualPlayer(this.players[playerIndex])
  }

  setActualPlayer(player: PlayerForFamiliada) {
    this.actualPlayer = player
  }

  nextPlayer() {
    if (this.actualPlayer.wrong >= 3) {
      const index = this.players.indexOf(this.actualPlayer, 0);
      if (index > -1) {
        this.players.splice(index, 1);
      }
    }
    if (this.players.length === 1) {
      this.winner = this.players[0]
      this.isVisible = true
      this.showAnswer()
    } else {
      const tmp = this.players[this.players.length - 1]
      if (this.actualPlayer.id === tmp.id
      ) {
        this.setActualPlayer(this.players[0])
      } else {
        this.setActualPlayer(this.players[this.players.indexOf(this.actualPlayer) + 1])
      }
    }
  }

  getQuestion(): void {
    this.setPlayersForFamiliada()
    this.points = 5;
    this.footballGames = this.questionDataService.getFootballGameQuestion();
    this.setAnswerForSquads();
    this.question = 'Wymień piłkarzy z meczu';
    this.tip = this.footballGames.mecz;
    this.isVisible = false

  }

  setAnswerForSquads() {
    this.footballGames.squad.forEach((player: string) => {
      this.answerForSquad.push(
        {
          footballer: player,
          display: false
        }
      )
    })
  }

  close() {
    this.question = '';
    this.footballGames = {};
    this.answerForSquad = [];
    this.blockedButton=false
    this.playerService.nextPlayer();
    this.playerService.setModal(false);
    this.getQuestion()
    this.playerService.nextPlayer()
  }

  showAnswer() {
    if (this.answerForSquad.length > 0) {
      this.answerForSquad.forEach((answer) => {
        answer.display = true
      })
    }
    this.isVisible = true;
    this.blockedButton = true
  }

  save() {
    const input = document.getElementById('userAnswer') as HTMLInputElement | null;
    const value = input?.value;
    if (input != null) {
      let tmp = this.answerForSquad.findIndex(el => el.footballer.toLowerCase() === value?.toLowerCase())
      if (tmp !== -1) {
        if (!this.answerForSquad[tmp].display) {
          this.answerForSquad[tmp].display = true;
          this.footballer = ''
          const audio = new Audio("../../assets/mp3/1z10dobrzee.mp3");
          audio.play();
          audio.playbackRate = 1;
        } else {
          this.setWrong()
        }
      } else {
        this.setWrong()
      }
      this.footballer = '';
      this.nextPlayer();
    }
  }

  setWrong() {
    this.actualPlayer.wrong++
    const audio = new Audio("../../assets/mp3/1z10zle.mp3");
    audio.play();
    audio.playbackRate = 1.2;
  }
}
