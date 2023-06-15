import { ClubLinks } from './club-links'

export class BoardCreator {
  constructor(private readonly clubLinks: ClubLinks) {}

  private readonly boardSize = 3

  private readonly rowClubs: string[] = []
  private readonly columnClubs: string[] = []

  generateBoard() {
    const result = this.tryGenerate(this.clubLinks.getAllClubs(), this.rowClubs, this.columnClubs)
    if (!result) {
      return null
    }
    return {
      row: Array.from(this.rowClubs),
      column: Array.from(this.columnClubs),
    }
  }

  private tryGenerate(list: readonly string[], mainList: string[], otherList: string[]) {
    if (this.rowClubs.length === this.boardSize && this.columnClubs.length === this.boardSize) {
      //this was last item to generate - success
      return true
    }
    let candidates = Array.from(list)
    console.log(JSON.stringify(candidates))
    //remove already used clubs
    candidates = candidates.filter((c) => !this.rowClubs.includes(c) && !this.columnClubs.includes(c))
    //remove clubs that cannot be matched
    candidates = candidates.filter((c1) => otherList.every((c2) => this.clubLinks.linkExists(c1, c2)))
    while (candidates.length > 0) {
      const candidate = this.takeRandom(candidates)
      mainList.push(candidate)
      const linkedWithCandidate = this.clubLinks.getLinkedClubs(candidate)
      const result = this.tryGenerate(linkedWithCandidate, otherList, mainList)
      if (result) {
        return true
      } else {
        mainList.splice(-1)
        candidates = candidates.filter((c) => c !== candidate)
      }
    }
    // list of possible candidates is empty so dead end
    return false
  }

  private takeRandom(list: readonly string[]) {
    return list[Math.floor(Math.random() * list.length)]
  }
}
