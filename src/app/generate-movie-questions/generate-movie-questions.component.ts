import { Component, OnInit } from '@angular/core'
import { getEightMostPopularActorsForMovie, getFoundMovies, getMovieCredits } from '../helper/movies/movies.helper'
import { MovieModel } from '../model/movie-model'
import { ActorModel } from '../model/actor-model'
import movieActors from '../../assets/actors/movieActors.json'
import tvActors from '../../assets/actors/serialActors.json'
import serials from '../../assets/movies/serials.json'
import { DescriptionModel } from '../model/description-model'
import { splitStringAfterSpace } from 'src/common/string.helper'
import { getFoundTVSeries, getTvSeriesCredits } from '../helper/movies/tvSeries.helper'

@Component({
  selector: 'app-generate-movie-questions',
  templateUrl: './generate-movie-questions.component.html',
  styleUrls: ['./generate-movie-questions.component.css'],
})
export class GenerateMovieQuestionsComponent implements OnInit {
  isMovieFound = false
  isSerialFound = false
  allMoviesActors: ActorModel[] = []
  allSerials: DescriptionModel[] = []
  actors: ActorModel[] = []
  tvActors: ActorModel[] = []
  allTvActors: ActorModel[] = []
  movies: MovieModel[] = []
  tvSeries: MovieModel[] = []
  tvSeriesList: MovieModel[] = []
  moviesList: MovieModel[] = []

  constructor() {
    console.log(`constructor`)
  }

  ngOnInit(): void {
    this.allMoviesActors = movieActors
    this.allTvActors = tvActors
    this.allSerials = serials
  }

  async searchMovie(): Promise<void> {
    this.tvSeries = []
    const input = document.getElementById('movieName') as HTMLInputElement
    const value = input.value
    this.isSerialFound = false
    this.isMovieFound = true
    this.movies = await getFoundMovies(value)
  }

  async searchTvSeries(): Promise<void> {
    this.movies = []
    const input = document.getElementById('tvSeriesName') as HTMLInputElement
    const value = input.value
    this.isMovieFound = false
    this.isSerialFound = true
    this.tvSeries = await getFoundTVSeries(value)
  }

  async addTvSeriesToList(event: Event): Promise<void> {
    const button = event.target as HTMLButtonElement
    const id = button.getAttribute('data-id')

    const foundTvSeries = this.tvSeries.find((movie) => movie.id == Number(id))
    if (foundTvSeries) {
      this.tvSeriesList.push(foundTvSeries)
      this.gen2()
      const index = this.tvSeries.indexOf(foundTvSeries)
      if (index > -1) {
        // only splice array when item is found
        this.tvSeries.splice(index, 1) // 2nd parameter means remove one item only
      }
    }
  }

  async addMovieToList(event: Event): Promise<void> {
    const button = event.target as HTMLButtonElement
    const id = button.getAttribute('data-id')
    console.log('Button ID:', id)

    const foundMovie = this.movies.find((movie) => movie.id == Number(id))
    if (foundMovie) {
      this.moviesList.push(foundMovie)
      this.gen()
      const index = this.movies.indexOf(foundMovie)
      if (index > -1) {
        // only splice array when item is found
        this.movies.splice(index, 1) // 2nd parameter means remove one item only
      }
    }
  }

  async gen(): Promise<void> {
    for (const movie of this.moviesList) {
      const ids = this.actors.map((actor) => actor.id)
      if (!ids.includes(movie.id)) {
        const movieCredits = await getMovieCredits(movie.id)
        const mostPopularActors = getEightMostPopularActorsForMovie(movieCredits)
        if (movie.title) {
          this.actors.push({
            id: movie.id,
            title: movie.title,
            actors: mostPopularActors,
          })
        }
      }
    }
  }

  async gen2(): Promise<void> {
    for (const tv of this.tvSeriesList) {
      const ids = this.tvActors.map((tvActor) => tvActor.id)
      if (!ids.includes(tv.id)) {
        const tvSeriesCredits = await getTvSeriesCredits(tv.id)

        const tmp2 = getEightMostPopularActorsForMovie(tvSeriesCredits)

        if (tv.name) {
          this.tvActors.push({
            id: tv.id,
            title: tv.name,
            actors: tmp2,
          })
        }
      }
    }
  }

  async questionGenerator(): Promise<void> {
    for (const movie of this.actors) {
      let length = this.allMoviesActors.length
      const found = this.allMoviesActors.find((actor) => {
        return actor.title.toLowerCase() === movie.title.toLowerCase()
      })
      if (!found) {
        this.allMoviesActors.push({
          id: length + 1,
          title: movie.title,
          actors: movie.actors,
        })
        length = this.allMoviesActors.length
        console.log(`Dodano: ${movie.title}`)
      } else {
        console.log(`Movie ${movie.title} exist on list`)
      }
    }

    console.log(JSON.stringify(this.allMoviesActors))
  }

  async questionGenerator2(): Promise<void> {
    for (const movie of this.tvActors) {
      let length = this.allTvActors.length
      const found = this.allTvActors.find((actor) => {
        return actor.title.toLowerCase() === movie.title.toLowerCase()
      })
      if (!found) {
        this.allTvActors.push({
          id: length + 1,
          title: movie.title,
          actors: movie.actors,
        })
        length = this.allTvActors.length
        console.log(`Dodano: ${movie.title}`)
      } else {
        if (movie.actors.length > found.actors.length) {
          const index = this.allTvActors.findIndex((actor) => actor.title.toLowerCase() === movie.title.toLowerCase())
          this.allTvActors[index] = {
            ...this.allTvActors[index],
            ...{
              id: index + 1,
              title: movie.title,
              actors: movie.actors,
            },
          }
          console.log(`TvSeries ${movie.title} exist on list: updated`)
        } else {
          console.log(`TvSeries ${movie.title} exist on list: Not updated`)
        }
      }
    }

    console.log(JSON.stringify(this.allTvActors))
  }

  async questionGenerator3(): Promise<void> {
    for (const movie of this.tvSeriesList) {
      let length = this.allSerials.length
      const found = this.allSerials.find((actor) => {
        return actor.title.toLowerCase() === movie.name?.toLowerCase()
      })
      if (!found && movie.name) {
        this.allSerials.push({
          id: length + 1,
          title: movie.name,
          description: splitStringAfterSpace(movie.overview.replace(movie.name, `[...]`), 180),
        })
        length = this.allTvActors.length
        console.log(`Dodano: ${movie.title}`)
      } else {
        console.log(`TvSeries ${movie.title} exist on list: Not updated`)
      }
    }
    console.log(`TvSeries ${JSON.stringify(this.allSerials)}`)
  }
}
