import { Injectable } from '@angular/core'
import youtubeSongData from '../assets/youTube/youtubeSongs.json'
import youtubeSerialsIntroData from '../assets/youTube/youtubeSerialsIntros.json'
import youtubeMundialData from '../assets/youTube/youtubeMundialSongs.json'
import { getAndDeleteRandomElementFromArray } from '../common/randomize.helper'
import { YoutubeModel } from './model/youtube-model'
import famousPeopleData from '../assets/photos/famousPeopleForCategory.json'
import footballGamesData from '../assets/football/footballGames.json'
import multipleChoiceData from '../assets/multipleChoice/multipleChoice.json'
import buildingsData from '../assets/photos/buildings.json'
import { PhotoModel } from './model/photo-model'
import moviesData from '../assets/movies/movies.json'
import allMoviesHeroData from '../assets/movies/moviesHero.json'
import allSerialsHeroData from '../assets/movies/serialsHero.json'
import serialsData from '../assets/movies/serials.json'
import writtingsCattegory from '../assets/writings/writtingsCategory.json'
import writtingsFootballCattegory from '../assets/writings/writtingsFootballCategory.json'
import movieActors from '../assets/actors/movieActors.json'
import directorsData from '../assets/movies/directors.json'
import familiadaData from '../assets/familiada/familiada.json'
import serialActors from '../assets/actors/serialActors.json'
import playersData from '../assets/football/footballerClubData.json'
import gamesData from '../assets/games/games.json'
import allDistricts from '../assets/poland/citiesPL.json'
import allFootballData from '../assets/football/football.json'
import allStadiums from '../assets/stadions/stadions.json'
import allProverbs from '../assets/proverbs/proverbs.json'
import allHistory from '../assets/history/history.json'
import writtingsData from '../assets/writings/writings.json'
import { DescriptionModel } from './model/description-model'
import { Country } from './model/country-model'
import countriesData from '../assets/countries/country.json'
import continentsData from '../assets/countries/continents.json'
import lettersData from '../assets/letters.json'
import chemicalElements from '../assets/chemist/chemist.json'
import biologyData from '../assets/biology/biology.json'
import godsData from '../assets/gods/gods.json'
import clubCrestsData from '../assets/clubs/clubCrests.json'
import clubHistoryData from '../assets/clubs/clubsHistory.json'
import { ClubHistory } from './model/clubHistory-model'
import { ActorModel } from './model/actor-model'
import { TipsModel } from './model/tips-model'
import { QuestionMultipleChoice } from './model/question-model'
import { FamiliadaModel } from './model/familiada-model'
import { FootballGamesModel } from './model/footballgames-model'
import { WrittingData, WrittingsCategoryModel } from './model/writtingsCategory-model'
import { ClubLinks } from './football-cross/club-links'
import { BoardCreator } from './football-cross/board-creator'
import { players } from '../assets/football/players'

@Injectable({
  providedIn: 'root',
})
export class QuestionDataService {
  protected allFamiliadaData: FamiliadaModel[] = []
  protected allFootballGames: FootballGamesModel[] = []
  protected allYoutubeSongs: YoutubeModel[] = []
  protected allYoutubeSerialIntros: YoutubeModel[] = []
  protected allYoutubeMundial: YoutubeModel[] = []
  protected allFamousPeople: PhotoModel[] = []
  protected allBuilding: PhotoModel[] = []
  protected allMovies: DescriptionModel[] = []
  protected allSerials: DescriptionModel[] = []
  protected allMoviesHero: TipsModel[] = []
  protected allSerialsHero: TipsModel[] = []
  protected allDirectorsData: TipsModel[] = []
  protected allGames: DescriptionModel[] = []
  protected allBiology: DescriptionModel[] = []
  protected allDisctricts: DescriptionModel[] = []
  protected allStadiums: DescriptionModel[] = []
  protected allProverbs: DescriptionModel[] = []
  protected allFootball: DescriptionModel[] = []
  protected allMultipleChoice: QuestionMultipleChoice[] = []
  protected allHistory: DescriptionModel[] = []
  protected allGods: DescriptionModel[] = []
  protected allCountries: Country[] = []
  protected allMoviesActors: ActorModel[] = []
  protected allSerialsActors: ActorModel[] = []
  protected allClubsHistoryQuestion: ClubHistory[] = []
  protected allChemicalElements: DescriptionModel[] = []
  protected writtingsCategoryElements: WrittingsCategoryModel[] = []
  protected writtingsCategoryFootballElements: WrittingsCategoryModel[] = []
  protected writtingsData: WrittingData[] = []
  protected playersData: ClubLinks | any = null
  protected countriesForFlags: Country[] | any = null
  protected countriesForCapitals: Country[] | any = null
  protected continentsForCountries: string[] | any = []
  protected continentsForCapitals: string[] | any = []
  protected countriesLetters: string[] | any = null
  protected capitalsLetters: string[] | any = null
  protected allClubsCrests: string[] = []
  protected init = false

  initial(): void {
    this.allYoutubeSongs = youtubeSongData
    this.allYoutubeMundial = youtubeMundialData
    this.allClubsCrests = clubCrestsData
    this.allYoutubeSerialIntros = youtubeSerialsIntroData
    this.allFamousPeople = famousPeopleData
    this.allBuilding = buildingsData
    this.allMovies = moviesData
    this.allMoviesHero = allMoviesHeroData
    this.allSerialsHero = allSerialsHeroData
    this.allSerials = serialsData
    this.allGames = gamesData
    this.allBiology = biologyData
    this.allMultipleChoice = multipleChoiceData
    this.allFootball = allFootballData
    this.allFootballGames = footballGamesData
    this.allMoviesActors = movieActors
    this.allGods = godsData
    this.allSerialsActors = serialActors
    this.allDisctricts = allDistricts
    this.allDirectorsData = directorsData
    this.allStadiums = allStadiums
    this.allChemicalElements = chemicalElements
    this.allFamiliadaData = familiadaData
    this.allProverbs = allProverbs
    this.allHistory = allHistory
    this.allClubsHistoryQuestion = clubHistoryData
    this.allCountries = countriesData
    this.countriesForFlags = [...this.allCountries]
    this.countriesForCapitals = [...this.allCountries]
    this.continentsForCountries = continentsData
    this.continentsForCapitals = [...this.continentsForCountries]
    this.countriesLetters = lettersData
    this.capitalsLetters = [...this.countriesLetters]
    this.writtingsCategoryElements = writtingsCattegory
    this.writtingsCategoryFootballElements = writtingsFootballCattegory
    this.writtingsData = writtingsData
    this.playersData = ClubLinks.readFromPlayerList(playersData)
    this.init = true
  }

  getChemistQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allChemicalElements)
  }

  getFootballerQuestion() {
    const links = ClubLinks.readFromPlayerList(players)
    console.log(`links: ${JSON.stringify(links)}`)
    const generator = new BoardCreator(links)
    const result = generator.generateBoard()
    console.log(`Result: ${JSON.stringify(result)}`)
    if (result != null) {
      for (const club1 of result!.row) {
        for (const club2 of result!.column) {
          console.log(`club1:${club1}, club2: ${club2} [${links.getLinkingPlayers(club1, club2).join(', ')}]`)
        }
      }
    }
    return result
  }

  getMultipleChoiceQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allMultipleChoice)
  }

  getMundialQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allYoutubeMundial)
  }

  getFamiliadaQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allFamiliadaData)
  }

  getFootballGameQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allFootballGames)
  }

  getFootballQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allFootball)
  }

  getDirectorsQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allDirectorsData)
  }

  getGodsQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allGods)
  }

  getBiologyQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allBiology)
  }

  getYoutubeSongQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allYoutubeSongs)
  }

  getYoutubeSerialsQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allYoutubeSerialIntros)
  }

  getFamousPeoplePhotoQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allFamousPeople)
  }

  getBuildingsPhotoQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allBuilding)
  }

  getMoviesDescriptionQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allMovies)
  }

  getSerialsDescriptionQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allSerials)
  }

  getGamesDescriptionQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allGames)
  }

  getDistrictsDescriptionQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allDisctricts)
  }

  getStadiumQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allStadiums)
  }

  getProverbQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allProverbs)
  }

  getHistoryQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allHistory)
  }

  getMoviesHeroQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allMoviesHero)
  }

  getSerialsHeroQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allSerialsHero)
  }

  getWritingsCategoryQuestion(): WrittingsCategoryModel {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.writtingsCategoryElements)
  }

  getWritingsFootballCategoryQuestion(): WrittingsCategoryModel {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.writtingsCategoryFootballElements)
  }

  getWritingsCategoryDataQuestion(): WrittingData[] {
    const category = this.getWritingsCategoryQuestion()
    const tmp = this.writtingsData.filter((data) => data.category === category.category)
    return tmp
  }

  getWritingsFootballCategoryDataQuestion(): WrittingData[] {
    const category = this.getWritingsFootballCategoryQuestion()
    const tmp = this.writtingsData.filter((data) => data.category === category.category)
    return tmp
  }

  getCountries(question: string): Country[] | string[] | any {
    if (!this.init) {
      this.initial()
    }
    switch (question) {
      case 'allCountries': {
        return this.allCountries
      }
      case 'capitalsLetters': {
        return getAndDeleteRandomElementFromArray(this.capitalsLetters)
      }
      case 'countriesLetters': {
        return getAndDeleteRandomElementFromArray(this.countriesLetters)
      }
      case 'continentsForCountries': {
        return getAndDeleteRandomElementFromArray(this.continentsForCountries)
      }
      case 'continentsForCapitals': {
        return getAndDeleteRandomElementFromArray(this.continentsForCapitals)
      }
      case 'countriesForCapitals': {
        return getAndDeleteRandomElementFromArray(this.countriesForCapitals)
      }
      case 'countriesForFlags': {
        return getAndDeleteRandomElementFromArray(this.countriesForFlags)
      }
      default: {
        break
      }
    }
  }

  getClubCrestsQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allClubsCrests)
  }

  getClubHistoryQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allClubsHistoryQuestion)
  }

  getSerialsActorsQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allSerialsActors)
  }

  getMoviesActorsQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allMoviesActors)
  }
}
