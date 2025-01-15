import { PhotoModel } from 'src/app/model/photo-model'
import { environment } from 'src/environments/environment'

export interface Profile {
  aspect_ratio: number
  height: number
  iso_639_1: string | null
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface ResponseActors {
  id: number
  profiles: Profile[]
}

export function getImageUrl(filePath: string, size = 'w500'): string {
  const baseUrl = 'https://image.tmdb.org/t/p/'
  return `${baseUrl}${size}${filePath}`
}

export function getFirstImageUrl(response: ResponseActors): string {
  return response.profiles[0].file_path
}

export async function getActorId(actor: string): Promise<number> {
  actor = actor.replace(' ', '%2520')
  const url = `https://api.themoviedb.org/3/search/person?query=${actor}&include_adult=false&language=pl-pl&page=1`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${environment.apiToken}`,
    },
  }
  let id = 0

  await fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      id = json.results[0].id
    })
    .catch((err) => console.error(err))
  return id
}

export async function getAllActorsPhotos(actors: string[]): Promise<PhotoModel[]> {
  const photos: PhotoModel[] = []
  for (const actor of actors) {
    const actorID = await getActorId(actor)

    let photo = ''

    const url = `https://api.themoviedb.org/3/person/${actorID}/images`
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
        photo = getImageUrl(getFirstImageUrl(json))
      })
      .catch((err) => console.error(err))
    photos.push({
      id: actorID,
      name: actor,
      photo: photo,
    })
  }
  return photos
}
