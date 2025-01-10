export class MovieLinks {
  private constructor() {
    console.log()
  }

  private readonly actors: Map<string, Map<string, string[]>> = new Map()

  public static readFromActorsList(
    actors: readonly {
      readonly title: string
      readonly actors: readonly string[]
    }[],
    actorFilter: readonly string[] = []
  ) {
    const result = new MovieLinks()
    for (const movie of actors) {
      if (!!actorFilter.length && !actorFilter.includes(movie.title)) {
        continue
      }
      for (const actor of movie.actors) {
        let actorInfo = result.actors.get(actor)
        if (!actorInfo) {
          actorInfo = new Map<string, string[]>()
          result.actors.set(actor, actorInfo)
        }
        const otherClubs = movie.actors.filter((c) => c !== actor)
        for (const otherClub of otherClubs) {
          let clubLink = actorInfo.get(otherClub)
          if (!clubLink) {
            clubLink = []
            actorInfo.set(otherClub, clubLink)
          }
          clubLink.push(movie.title)
        }
      }
    }
    console.log(`result: ${JSON.stringify(result)}`)
    return result
  }

  getAllActors() {
    return Array.from(this.actors.keys())
  }

  getLinkedActors(club: string) {
    const clubInfo = this.actors.get(club)
    if (!clubInfo) {
      return []
    }
    return Array.from(clubInfo.keys())
  }

  getLinkingActors(club1: string, club2: string) {
    const clubInfo = this.actors.get(club1)
    if (!clubInfo) {
      return []
    }
    return clubInfo.get(club2) || []
  }

  linkActorsExists(club1: string, club2: string) {
    //console.log(`getLinkingPlayers: ${this.getLinkingPlayers(club1, club2).length}`)
    return this.getLinkingActors(club1, club2).length > 1
  }
}
