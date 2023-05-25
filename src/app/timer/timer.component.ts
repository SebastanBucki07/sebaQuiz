import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Timer, TimerService } from '../timer.service'

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  /* timer*/
  private subscription: Subscription | any
  public timers: Timer = {
    secondsToDday: 0,
    minutesToDday: 0,
  }

  constructor(public timerService: TimerService) {
    this.setTimer()
  }

  setTimer(): void {
    this.subscription = this.timerService.getTimers().subscribe((x) => {
      this.timers = x
    })
  }

  ngOnInit(): void {
    console.log(`init TimerComponent`)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
