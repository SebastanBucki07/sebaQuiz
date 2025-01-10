import { ClubLinks } from './club-links'

const DEFAULT_PLAYER_LINK_REQ: RequiredPlayerLinks = 'one-unique'

export class BoardCreator {
  constructor(private readonly clubLinks: ClubLinks, private readonly boardSize = 3) {}

  private requiredPlayerLinks: RequiredPlayerLinks = DEFAULT_PLAYER_LINK_REQ
  private readonly rowClubs: string[] = []
  private readonly columnClubs: string[] = []

  generateBoard(requiredPlayerLinks: RequiredPlayerLinks = DEFAULT_PLAYER_LINK_REQ) {
    this.requiredPlayerLinks = requiredPlayerLinks
    const result = this.tryGenerate(this.clubLinks.getAllClubs(), this.rowClubs, this.columnClubs, [], true)
    if (!result) {
      return null
    }
    const arr = {
      row: Array.from(this.rowClubs),
      column: Array.from(this.columnClubs),
    }
    return {
      row: arr.row,
      column: arr.column,
      R0C0: this.clubLinks.getLinkingPlayers(arr.row[0], arr.column[0]),
      R0C1: this.clubLinks.getLinkingPlayers(arr.row[0], arr.column[1]),
      R0C2: this.clubLinks.getLinkingPlayers(arr.row[0], arr.column[2]),
      R1C0: this.clubLinks.getLinkingPlayers(arr.row[1], arr.column[0]),
      R1C1: this.clubLinks.getLinkingPlayers(arr.row[1], arr.column[1]),
      R1C2: this.clubLinks.getLinkingPlayers(arr.row[1], arr.column[2]),
      R2C0: this.clubLinks.getLinkingPlayers(arr.row[2], arr.column[0]),
      R2C1: this.clubLinks.getLinkingPlayers(arr.row[2], arr.column[1]),
      R2C2: this.clubLinks.getLinkingPlayers(arr.row[2], arr.column[2]),
    }
  }

  private tryGenerate(
    list: readonly string[],
    mainList: string[],
    otherList: string[],
    usedPlayers: string[],
    linkValidity: boolean
  ) {
    if (!linkValidity) {
      //unfofrunately duplicates on list so wrong branch
      return false
    }
    if (this.rowClubs.length === this.boardSize && this.columnClubs.length === this.boardSize) {
      //this was last item to generate - success
      return true
    }

    let candidates = Array.from(list)
    //remove already used clubs
    candidates = candidates.filter((c) => !this.rowClubs.includes(c) && !this.columnClubs.includes(c))
    //remove clubs that cannot be matched
    candidates = candidates.filter((c1) => otherList.every((c2) => this.isCompatible(c1, c2, usedPlayers)))
    while (candidates.length > 0) {
      const candidate = this.takeRandom(candidates)
      const linkage = otherList.map((club) => this.clubLinks.getLinkingPlayers(candidate, club))
      const linkingPlayers = linkage.flat()
      const linkValidity = this.checkLinkLevel(linkage)
      mainList.push(candidate)
      usedPlayers.push(...linkingPlayers)
      const linkedWithCandidate = this.clubLinks.getLinkedClubs(candidate)
      const result = this.tryGenerate(linkedWithCandidate, otherList, mainList, usedPlayers, linkValidity)
      if (result) {
        return true
      } else {
        mainList.splice(-1)
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!linkingPlayers.length) {
          usedPlayers.splice(-linkingPlayers.length)
        }
        candidates = candidates.filter((c) => c !== candidate)
      }
    }
    // list of possible candidates is empty so dead end
    return false
  }

  private isCompatible(club1: string, club2: string, usedPlayers: string[]) {
    const linkingPlayers = this.clubLinks.getLinkingPlayers(club1, club2)
    if (!linkingPlayers.length) {
      return false
    }
    if (this.requiredPlayerLinks === 'any') {
      return true
    }
    if (this.requiredPlayerLinks === 'one-unique') {
      return linkingPlayers.some((lp) => !usedPlayers.includes(lp))
    }
    if (this.requiredPlayerLinks === 'all-unique') {
      return linkingPlayers.every((lp) => !usedPlayers.includes(lp))
    }
    throw new Error(`Unknown linking constraint ${this.requiredPlayerLinks}`)
  }

  private checkLinkLevel(links: string[][]) {
    if (this.requiredPlayerLinks === 'any') {
      return true
    }
    if (this.requiredPlayerLinks === 'one-unique') {
      for (const link of links) {
        const other = links.filter((l) => l !== link)
        const myUnique = link.find((l) => other.every((ol) => !ol.includes(l)))
        if (!myUnique) {
          return false
        }
      }
      return true
    }
    if (this.requiredPlayerLinks === 'all-unique') {
      let allPlayersCount = 0
      const uniquePlayers = new Set<string>()
      for (const link of links) {
        allPlayersCount += link.length
        link.forEach((l) => uniquePlayers.add(l))
      }
      return uniquePlayers.size === allPlayersCount
    }
    throw new Error(`Unknown linking constraint ${this.requiredPlayerLinks}`)
  }

  private takeRandom(list: readonly string[]) {
    return list[Math.floor(Math.random() * list.length)]
  }
}

type RequiredPlayerLinks = 'any' | 'one-unique' | 'all-unique'
