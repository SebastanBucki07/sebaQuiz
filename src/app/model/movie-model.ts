export interface MovieModel {
  id: number
  overview: string
  poster_path: string
  release_date: string
  title?: string
  name?: string
}

export interface DetailsMovieModel {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
  department: string
  job: string
}
