import { Category, FragmentsModel } from '../model/fragments-model'
import { randomFromArray } from '../../common/randomize.helper'
import songData from '../../assets/songs/songs.json'
import songTipsData from '../../assets/songs/3tips.json'
import lectureData from '../../assets/books/books.json'
import citiesData from '../../assets/countries/cities.json'

export class FragmentBuilder {
  private category: Category = Category.SONG
  private id = 0
  private author = ''
  private title = ''
  private fragment1 = ''
  private fragment2 = ''
  private fragment3 = ''

  constructor(category: Category) {
    const initial = this.randomDataFromArray(1)
    this.id = initial.id
    this.author = initial.wykonawca
    this.title = initial.tytul
    this.fragment1 = initial.fragment1
    this.fragment2 = initial.fragment2
    this.fragment3 = initial.fragment3
    this.setCategory(category)
  }

  setCategory(category: Category): void {
    this.category = category
  }

  randomDataFromArray(count: number) {
    const array: FragmentsModel | any = []
    let data: any[] = []
    if (this.category === Category.CITIES) {
      data = citiesData
    }
    if (this.category === Category.SONG) {
      data = songData
    }
    if (this.category === Category.SONGTIPS) {
      data = songTipsData
    }
    if (this.category === Category.LECTURE) {
      data = lectureData
    }
    if (count === 1) {
      return randomFromArray(data)
    } else {
      for (let i = 0; i == count; i++) {
        array.push(randomFromArray(data))
      }
    }
    return array
  }

  build(): FragmentsModel {
    return {
      id: this.id,
      author: this.author,
      title: this.title,
      fragment1: this.fragment1,
      fragment2: this.fragment2,
      fragment3: this.fragment3,
    }
  }
}
