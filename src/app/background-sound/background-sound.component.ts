import { Component, OnInit } from '@angular/core';
import mp3Data from "../../assets/mp3/mp3.json";

@Component({
  selector: 'app-background-sound',
  templateUrl: './background-sound.component.html',
  styleUrls: ['./background-sound.component.css']
})
export class BackgroundSoundComponent implements OnInit {
  public song: string =''
  public songs: string[] =[]

  constructor() { }

  ngOnInit(): void {
    this.getSongs()
    this.getRandomSong()
  }

  getSongs(): void {
    this.songs = [...mp3Data]
  }

  getRandomSong() {
    const random = Math.floor(Math.random() * this.songs.length)
    this.song = this.songs[random]
  }

}
