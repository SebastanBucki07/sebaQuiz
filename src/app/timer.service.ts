import {Injectable} from '@angular/core';
import {interval, map, Observable,takeWhile} from "rxjs";

export interface Timer {
  secondsToDday: number
  minutesToDday: number
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  public timer = 1
  public dateNow: Date | any
  public dDay: Date | any
  milliSecondsInASecond = 1000;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;
  public timers: Timer = {
    secondsToDday: 0,
    minutesToDday: 0
  }

  constructor() {
    this.timer = 1
  }

  getTimer() {
    return this.timer
  }

  /* timer */
  public getTimeDifference() {
    const timeDifference = this.dDay.getTime() - new Date().getTime();
    return {
      secondsToDday: Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute),
      minutesToDday: Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute)
    }
  }
  /* end timer */

  setTimer(timer: number) {
    this.timer = timer
    this.dateNow = new Date();
    this.dDay = new Date(this.dateNow.getTime() + timer * 60000);

  }

  getTimers(): Observable<Timer> {
    return interval(1000).pipe(map(() => this.getTimeDifference()), takeWhile((val) => val.secondsToDday >= 0))
  }


}
