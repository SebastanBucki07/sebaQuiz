export function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

export function randomFromArray(array: any[]){
  return array[getRandomNumber(array.length)]
}

