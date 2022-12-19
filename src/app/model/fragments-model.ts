export interface FragmentsModel {
  "id": number
  "author": string
  "title": string
  "fragment1": string
  "fragment2": string
  "fragment3": string
}

export enum Category {
  CITIES = "cities",
  SONG = "song",
  SONGTIPS = "songTips",
  LECTURE = "lecture"
}
