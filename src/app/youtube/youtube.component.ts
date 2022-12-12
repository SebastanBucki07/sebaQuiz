import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {YoutubeModel} from "../model/youtube-model";
import {PlayersService} from "../players.service";
import {YoutubeQuestionService} from "../youtube-question.service";

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export abstract class YoutubeComponent {
  public random1: YoutubeModel | any = {}
  public points: number = 2
  public question: string = ''
  public isTitleVisible = false
  public isNotSerial = true
  public isAuthorVisible = false
  public isModalVisible = false
  public tip: string = ''
  public title: string = ''
  public author: string = ''
  public urlSafe: SafeResourceUrl = ''

  constructor(
    public youtubeQuestionService: YoutubeQuestionService,
    public playerService: PlayersService,
    public sanitizer: DomSanitizer
  ) { }

  getQuestion(category: string) {
    switch (category) {
      case 'song': {
        this.random1 = this.youtubeQuestionService.getYoutubeSongQuestion()
        this.question = 'Podaj tytuł oraz wykonawcę'
        this.points = 2
        break
      }
      case 'opening': {
        this.random1 = this.youtubeQuestionService.getYoutubeSerialsQuestion()
        this.question = 'Podaj tytuł serialu'
        this.points = 2
        this.isNotSerial = false
        break
      }
      default: {
        break;
      }
    }
    this.tip = this.random1.url
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.tip);
    this.title = this.random1.title
    this.author = this.random1.author
    this.isModalVisible = true;
  }

  close() {
    this.isAuthorVisible = false;
    this.isTitleVisible = false;
    this.isModalVisible = false
    this.title = ''
    this.author = ''
    this.isNotSerial = true
    this.playerService.nextPlayer()
  }

  showTitle() {
    this.isTitleVisible = !this.isTitleVisible;
  }
  showAuthor() {
    this.isAuthorVisible = !this.isAuthorVisible;
  }
}

@Component({
  selector: 'app-song-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeSongComponent extends YoutubeComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('song')
  }
}

@Component({
  selector: 'app-serials-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeSerialsComponent extends YoutubeComponent implements OnInit {
  ngOnInit(): void {
    this.getQuestion('opening')
  }
}
