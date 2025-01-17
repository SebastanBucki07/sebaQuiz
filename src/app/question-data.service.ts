import { Injectable } from '@angular/core'
import youtubeSongData from '../assets/youTube/youtubeSongs.json'
import youtubeSerialsIntroData from '../assets/youTube/youtubeSerialsIntros.json'
import youtubeEventsData from '../assets/youTube/youtubeEventsSongs.json'
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
import writingsCategory from '../assets/writings/writingsCategory.json'
import writingsFootballCategory from '../assets/writings/writingsFootballCategory.json'
import movieActors from '../assets/actors/movieActors.json'
import directorsData from '../assets/movies/directors.json'
import familiadaData from '../assets/familiada/familiada.json'
import serialActors from '../assets/actors/serialActors.json'
import playersData from '../assets/football/footballerClubData.json'
import gamesData from '../assets/games/games.json'
import allDistricts from '../assets/poland/citiesPL.json'
import allFootballData from '../assets/football/football.json'
import allStadiums from '../assets/stadiums/stadiums.json'
import allProverbs from '../assets/proverbs/proverbs.json'
import allHistory from '../assets/history/history.json'
import writingsData from '../assets/writings/writings.json'
import { DescriptionModel } from './model/description-model'
import { Country } from './model/country-model'
import countriesData from '../assets/countries/country.json'
import continentsData from '../assets/countries/continents.json'
import lettersData from '../assets/letters.json'
import chemicalElements from '../assets/chemist/chemist.json'
import biologyData from '../assets/biology/biology.json'
import godsData from '../assets/gods/gods.json'
import clubCrestsData from '../assets/clubs/clubCrests.json'
import logoData from '../assets/logo/logo.json'
import clubHistoryData from '../assets/clubs/clubsHistory.json'
import { ClubHistory } from './model/clubHistory-model'
import { ActorModel } from './model/actor-model'
import { TipsModel } from './model/tips-model'
import { QuestionMultipleChoice } from './model/question-model'
import { FamiliadaModel } from './model/familiada-model'
import { WritingData, WritingsCategoryModel } from './model/writingsCategory-model'
import { ClubLinks } from './football-cross/club-links'
import { BoardCreator } from './football-cross/board-creator'
import { players } from '../assets/football/players'
import { MovieLinks } from './movie-cross/movie-links'
import { actors } from '../assets/actors/actors'
import { BoardMovieCreator } from './movie-cross/board-creator'
import { FootballGamesModel } from './model/football-games-model'

@Injectable({
  providedIn: 'root',
})
export class QuestionDataService {
  protected allFamiliadaData: FamiliadaModel[] = []
  protected allFootballGames: FootballGamesModel[] = []
  protected allYoutubeSongs: YoutubeModel[] = []
  protected allYoutubeSerialIntros: YoutubeModel[] = []
  protected allYoutubeEventSongs: YoutubeModel[] = []
  protected allFamousPeople: PhotoModel[] = []
  protected allBuilding: PhotoModel[] = []
  protected allMovies: DescriptionModel[] = []
  protected allSerials: DescriptionModel[] = []
  protected allMoviesHero: TipsModel[] = []
  protected allSerialsHero: TipsModel[] = []
  protected allDirectorsData: TipsModel[] = []
  protected allGames: DescriptionModel[] = []
  protected allBiology: DescriptionModel[] = []
  protected allDistricts: DescriptionModel[] = []
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
  protected writingsCategoryElements: WritingsCategoryModel[] = []
  protected writingsCategoryFootballElements: WritingsCategoryModel[] = []
  protected writingsData: WritingData[] = []
  protected playersData: ClubLinks | any = null
  protected countriesForFlags: Country[] | any = null
  protected countriesForCapitals: Country[] | any = null
  protected continentsForCountries: string[] | any = []
  protected continentsForCapitals: string[] | any = []
  protected countriesLetters: string[] | any = null
  protected capitalsLetters: string[] | any = null
  protected allClubsCrests: string[] = []
  protected allLogo: string[] = []
  protected init = false

  initial(): void {
    this.allYoutubeSongs = youtubeSongData
    this.allYoutubeEventSongs = youtubeEventsData
    this.allClubsCrests = clubCrestsData
    this.allLogo = logoData
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
    this.allDistricts = allDistricts
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
    this.writingsCategoryElements = writingsCategory
    this.writingsCategoryFootballElements = writingsFootballCategory
    this.writingsData = writingsData
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
    const pf: string[] = []
    const links = ClubLinks.readFromPlayerList(players, pf)

    const generator = new BoardCreator(links)
    const result = generator.generateBoard()

    if (result != null) {
      for (const club1 of result!.row) {
        for (const club2 of result!.column) {
          console.log(`club1:${club1}, club2: ${club2} [${links.getLinkingPlayers(club1, club2).join(', ')}]`)
        }
      }
    }
    return result
  }

  getActorsQuestion() {
    const pf: string[] = []
    const links = MovieLinks.readFromActorsList(actors, pf)
    console.log(`links: ${JSON.stringify(links)}`)
    const generator = new BoardMovieCreator(links)
    const result = generator.generateBoard()
    console.log(`ResultACTORS: ${JSON.stringify(result)}`)
    if (result != null) {
      for (const actor1 of result!.row) {
        for (const actor2 of result!.column) {
          console.log(`actor1:${actor1}, actor2: ${actor2} [${links.getLinkingActors(actor1, actor2).join(', ')}]`)
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

  getYoutubeEventQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allYoutubeEventSongs)
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
    return getAndDeleteRandomElementFromArray(this.allDistricts)
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

  getWritingsCategoryQuestion(): WritingsCategoryModel {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.writingsCategoryElements)
  }

  getWritingsFootballCategoryQuestion(): WritingsCategoryModel {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.writingsCategoryFootballElements)
  }

  getWritingsCategoryDataQuestion(): WritingData[] {
    const category = this.getWritingsCategoryQuestion()
    return this.writingsData.filter((data) => data.category === category.category)
  }

  getWritingsFootballCategoryDataQuestion(): WritingData[] {
    const category = this.getWritingsFootballCategoryQuestion()
    return this.writingsData.filter((data) => data.category === category.category)
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

  getLogoQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allLogo)
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

  async getMoviesActorsQuestion() {
    if (!this.init) {
      this.initial()
    }
    return getAndDeleteRandomElementFromArray(this.allMoviesActors)
  }
}
