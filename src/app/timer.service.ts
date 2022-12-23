import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  public timer = 1

  constructor() {
    this.timer =1
  }

  setTimer(timer:number){
    this.timer = timer
  }

  getTimer(){
    return this.timer
  }
}
