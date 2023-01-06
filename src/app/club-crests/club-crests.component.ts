import {Component, OnInit} from '@angular/core';
import {PlayersService} from "../players.service";
import {randomFromArray} from "../../common/randomize.helper";
import {QuestionDataService} from "../question-data.service";
import {TimerService} from "../timer.service";

@Component({
  selector: 'app-club-crests',
  templateUrl: './club-crests.component.html',
  styleUrls: ['./club-crests.component.css']
})
export class ClubCrestsComponent implements OnInit {
  public isModalVisible = false;
  public random1 = ''
  public isVisible = false;
  public answer: string = ''
  public sizes = [
    -50,-100,-150,-200,-250,-300,-350,-400,-450,-500
  ]
  public size1: number = -50
  public size2: number = -50

  constructor(
    public questionDataService: QuestionDataService,
    public playerService: PlayersService,
    private timerService: TimerService) {
  }

  ngOnInit(): void {
    this.init()
  }

  init(){
    this.random1 = this.questionDataService.getClubCrestsQuestion()
    this.setSize()
    this.isModalVisible = true;
    this.timerService.setTimer(1)
  }

  close() {
    this.playerService.setModal(false);
    this.isVisible = false;
    this.answer = ''
    this.playerService.nextPlayer()
    this.init()
  }

  showAnswer() {
    this.isVisible = !this.isVisible;
  }

  setSize(){
    this.size1 = randomFromArray(this.sizes)
    this.size2 = randomFromArray(this.sizes)
  }

}
