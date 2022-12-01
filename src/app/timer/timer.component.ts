import {Component, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";

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

  constructor() {
  }

  setTimer() {
    this.dateNow = new Date();
    this.dDay = new Date(this.dateNow.getTime() + this.minutesToAdd * 60000);
    this.subscription = interval(1000)
      .subscribe(x => {
        this.getTimeDifference();
      })
  }

  ngOnInit(): void {
    this.setTimer()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /* timer */
  private getTimeDifference() {
    if (this.timeDifference <= 0) {
      this.inputDisabled = true
      this.subscription.unsubscribe();
    } else {
      this.timeDifference = this.dDay.getTime() - new Date().getTime();
      this.allocateTimeUnits(this.timeDifference);
    }
  }

  private allocateTimeUnits(timeDifference: any) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
  }

  /* end timer */

}
