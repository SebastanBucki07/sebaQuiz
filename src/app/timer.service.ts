import {Injectable} from '@angular/core';
import {interval, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  public timer = 1
  public subscription: Subscription | any;
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
    this.timer = 1
  }

  // setTimer(timer: number) {
  //   this.timer = timer
  // }

  getTimer() {
    return this.timer
  }

  /* timer */
  public getTimeDifference() {
    if (this.timeDifference <= 0) {
      this.inputDisabled = true
      this.subscription.unsubscribe();
    } else {
      this.timeDifference = this.dDay.getTime() - new Date().getTime();
      this.allocateTimeUnits(this.timeDifference);
    }
  }

  public allocateTimeUnits(timeDifference: any) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
  }

  /* end timer */

  setTimer(timer: number) {
    this.timer = timer
    this.dateNow = new Date();
    this.dDay = new Date(this.dateNow.getTime() + timer * 60000);
    this.subscription = interval(1000)
      .subscribe(x => {
        this.getTimeDifference();
      })
  }

}
