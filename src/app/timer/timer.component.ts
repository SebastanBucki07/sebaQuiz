import {Component, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {TimerService} from "../timer.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  /* timer*/
  private subscription: Subscription | any;
  public inputDisabled = false
  public dateNow: Date | any
  public minutesToAdd = 3
  public dDay: Date | any
  milliSecondsInASecond = 1000;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference: any;
  public secondsToDday: any;
  public minutesToDday: any;

  constructor(public timerService: TimerService) {
    this.setTimer(this.timerService.getTimer())
  }

  setTimer(timer:number) {
    this.dateNow = new Date();
    this.dDay = new Date(this.dateNow.getTime() + timer * 60000);
    this.subscription = interval(1000)
      .subscribe(x => {
        this.timerService.getTimeDifference()
      })
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
