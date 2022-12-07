import { Injectable } from '@angular/core';
import {PhotoModel} from "./model/photo-model";
import famousPeopleData from "../assets/photos/famousPeople.json";
import buildingsData from "../assets/photos/buildings.json";
import {getAndDeleteRandomElementFromArray} from "../common/randomize.helper";

@Injectable({
  providedIn: 'root'
})
export class PhotosQuestionService {
  public allFamousPeople: PhotoModel[] = []
  public allBuilding: PhotoModel[] = []
  public init = false

  constructor() { }

  initial(){
    this.allFamousPeople = famousPeopleData
    this.allBuilding = buildingsData
    this.init = true
  }

  getFamousPeoplePhotoQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allFamousPeople)
  }

  getBuildingsPhotoQuestion(){
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allBuilding)
  }
}
