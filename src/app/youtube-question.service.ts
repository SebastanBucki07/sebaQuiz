import { Injectable } from '@angular/core';
import {YoutubeModel} from "./model/youtube-model";
import youtubeSongData from "../assets/youTube/youtubeSongs.json";
import youtubeSerialsIntroData from "../assets/youTube/youtubeSerialsIntros.json";
import {getAndDeleteRandomElementFromArray} from "../common/randomize.helper";

@Injectable({
  providedIn: 'root'
})
export class YoutubeQuestionService {
  public allYoutubeSongs: YoutubeModel[] = []
  public allYoutubeSerialIntros: YoutubeModel[] = []
  public init = false

  constructor() { }

  initial(){
    this.allYoutubeSongs = youtubeSongData
    this. allYoutubeSerialIntros = youtubeSerialsIntroData
    this.init = true
  }

  getYoutubeSongQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allYoutubeSongs)
  }

  getYoutubeSerialsQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allYoutubeSerialIntros)
  }
}
