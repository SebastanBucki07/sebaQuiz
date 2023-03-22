import {Component, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {Timer, TimerService} from "../timer.service";

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
  public timers: Timer = {
    secondsToDday: 0,
    minutesToDday: 0
  }

  public timeDifference: any;
  public secondsToDday: any;

  constructor(public timerService: TimerService) {
    this.setTimer(this.timerService.getTimer())
  }

  setTimer(timer:number) {
    this.dateNow = new Date();
    this.dDay = new Date(this.dateNow.getTime() + timer * 60000);
    this.subscription = this.timerService.getTimers()
      .subscribe(x => {
        this.timers = x
      })
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
