import {Component, OnInit} from '@angular/core';
import {PlayersService} from "../players.service";
import {ClubsCrestsQuestionsService} from "../clubs-crests-questions.service";

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

  constructor(
    public clubCrestsService: ClubsCrestsQuestionsService,
    public playerService: PlayersService) {
  }

  ngOnInit(): void {
    this.random1 = this.clubCrestsService.getClubCrestsQuestion()
    this.isModalVisible = true;
    console.log(`${JSON.stringify(this.random1)}`)
  }

  close() {
    this.isVisible = false;
    this.isModalVisible = false
    this.answer = ''
    this.playerService.nextPlayer()
  }

  showAnswer() {
    this.isVisible = !this.isVisible;
  }

}
