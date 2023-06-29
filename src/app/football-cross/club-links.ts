export class ClubLinks {
  private constructor() {}

  private readonly clubs: Map<string, Map<string, string[]>> = new Map()

  public static readFromPlayerList(
    players: readonly {
      readonly name: string
      readonly clubs: readonly string[]
    }[]
  ) {
    const result = new ClubLinks()
    for (const player of players) {
      for (const club of player.clubs) {
        let clubInfo = result.clubs.get(club)
        if (!clubInfo) {
          clubInfo = new Map<string, string[]>()
          result.clubs.set(club, clubInfo)
        }
        const otherClubs = player.clubs.filter((c) => c !== club)
        for (const otherClub of otherClubs) {
          let clubLink = clubInfo.get(otherClub)
          if (!clubLink) {
            clubLink = []
            clubInfo.set(otherClub, clubLink)
          }
          clubLink.push(player.name)
        }
      }
    }
    console.log(`result: ${JSON.stringify(result)}`)
    return result
  }

  getAllClubs() {
    return Array.from(this.clubs.keys())
  }

  getLinkedClubs(club: string) {
    const clubInfo = this.clubs.get(club)
    if (!clubInfo) {
      return []
    }
    return Array.from(clubInfo.keys())
  }

  getLinkingPlayers(club1: string, club2: string) {
    const clubInfo = this.clubs.get(club1)
    if (!clubInfo) {
      return []
    }
    return clubInfo.get(club2) || []
  }

  linkExists(club1: string, club2: string) {
    //console.log(`getLinkingPlayers: ${this.getLinkingPlayers(club1, club2).length}`)
    return this.getLinkingPlayers(club1, club2).length > 1
  }
}