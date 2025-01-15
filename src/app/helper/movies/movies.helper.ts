import { environment } from 'src/environments/environment'
import { getImageUrl } from '../images/images.helper'
import { DetailsTvModel } from '../../model/detailsTv-model'
import { DetailsMovieModel, MovieModel } from '../../model/movie-model'

export async function getFoundMovies(phrase: string): Promise<MovieModel[]> {
  const movies: MovieModel[] = []

  phrase = phrase.replace(' ', '%2520')

  const url = `https://api.themoviedb.org/3/search/movie?query=${phrase}&include_adult=false&language=pl-PL&page=1`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${environment.apiToken}`,
    },
  }

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      for (const movie of json.results) {
        movies.push({
          id: movie.id,
          overview: movie.overview,
          poster_path: getImageUrl(movie.poster_path),
          release_date: movie.release_date,
          title: movie.title,
        })
      }
    })
    .catch((err) => console.error(err))
  return movies
}

export async function getMovieCredits(id: number): Promise<DetailsMovieModel[]> {
  let actors: DetailsMovieModel[] = []

  const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=pl-PL`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${environment.apiToken}`,
    },
  }

  await fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      actors = json.cast
      return actors
    })
    .catch((err) => console.error(err))

  return actors
}

export function getEightMostPopularActorsForMovie(movieDetails: DetailsMovieModel[] | DetailsTvModel[]): string[] {
  const slicedMovieDetail = movieDetails.slice(0, 8)
  const names = slicedMovieDetail.map((movieDetail) => movieDetail.name)
  return names
}
