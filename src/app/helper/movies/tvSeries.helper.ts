import { environment } from 'src/environments/environment'
import { getImageUrl } from '../images/images.helper'
import { MovieModel } from '../../model/movie-model'
import { DetailsTvModel } from '../../model/detailsTv-model'

export async function getFoundTVSeries(phrase: string): Promise<MovieModel[]> {
  const movies: MovieModel[] = []

  phrase = phrase.replace(' ', '%2520')

  const url = `https://api.themoviedb.org/3/search/tv?query=${phrase}&include_adult=false&language=pl-PL&page=1`
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
          name: movie.name,
        })
      }
    })
    .catch((err) => console.error(err))
  return movies
}

export async function getTvSeriesCredits(id: number): Promise<DetailsTvModel[]> {
  let actors: DetailsTvModel[] = []

  const url = `https://api.themoviedb.org/3/tv/${id}/credits?language=pl-PL`

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
