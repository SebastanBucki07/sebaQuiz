export function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max)
}

export function randomFromArray(array: any[]) {
  return array[getRandomNumber(array.length)]
}

export function getAndDeleteRandomElementFromArray(array: any[]): any {
  if (array.length > 0) {
    const randomElement = randomFromArray(array)
    const elementToBeDeleted = array.indexOf(randomElement)
    array.splice(elementToBeDeleted, 1)
    return randomElement
  }
  return {
    errorCode: 404,
    errorMsg: 'No more Elements for this question',
  }
}
