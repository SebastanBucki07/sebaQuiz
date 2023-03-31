export function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max)
}

export function randomFromArray(array: any[]) {
  return array[getRandomNumber(array.length)]
}

export function getAndDeleteRandomElementFromArray(array: any[]): any {
  if (array.length > 0) {
    const el = randomFromArray(array)
    const elementToBeDeleted = array.indexOf(el)
    array.splice(elementToBeDeleted, 1)
    return el
  }
  return {
    errorCode: 404,
    errorMsg: 'No more Elements for this question',
  }
}
