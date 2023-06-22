import { Category } from '../../app/model/category-model'

export const allCategories: Category[] = [
  { name: 'Fragmenty ksiażek', id: 0, checkbox: false },
  { name: 'Fragmenty piosenek', id: 1, checkbox: false },
  { name: 'Wypisz kraje lub stolice', id: 2, checkbox: false },
  { name: 'Klubowa Historia', id: 3, checkbox: false },
  { name: 'Klubowe herby', id: 4, checkbox: false },
  { name: 'Filmy - opis', id: 5, checkbox: false },
  { name: 'Seriale - opis', id: 6, checkbox: false },
  { name: 'Gra - opis', id: 7, checkbox: false },
  { name: 'Miasto - Województwo', id: 8, checkbox: false },
  { name: 'Stadiony świata', id: 9, checkbox: false },
  { name: 'Przysłowia', id: 10, checkbox: false },
  { name: 'Historia', id: 11, checkbox: false },
  { name: 'Rozpoznaj osobe ze zdjęcia', id: 12, checkbox: false },
  { name: 'Rozpoznaj budowle ze zdjęcia', id: 13, checkbox: false },
  { name: 'W jakim filmie zagrała taka obsada?', id: 14, checkbox: false },
  { name: 'W jakim serialu zagrała taka obsada?', id: 15, checkbox: false },
  { name: 'Jaka to melodia?', id: 16, checkbox: false },
  { name: 'Czołówka serialu', id: 17, checkbox: false },
  { name: 'Pierwiastki', id: 18, checkbox: false },
  { name: 'Biologia', id: 19, checkbox: false },
  { name: 'Bogowie', id: 20, checkbox: false },
  { name: 'Rozpoznaj artystę po tytułach piosenek', id: 21, checkbox: false },
  { name: 'Państwo po miastach', id: 22, checkbox: false },
  { name: 'Rozpoznaj film po bohaterach', id: 23, checkbox: false },
  { name: 'Rozpoznaj serial po bohaterach', id: 24, checkbox: false },
  { name: 'Reżyser po filmach', id: 25, checkbox: false },
  { name: 'Rozpoznaj impreze po piosence', id: 26, checkbox: false },
  { name: 'Zawodnik/klub/reprezentacja', id: 27, checkbox: false },
  { name: 'Pytanie wielokrotnego wyboru', id: 28, checkbox: false },
  { name: 'Z jakiego krjau jest ta flaga?', id: 29, checkbox: false },
  { name: 'Stolice krajów?', id: 30, checkbox: false },
  { name: 'Familiada', id: 31, checkbox: false },
  { name: 'Był taki mecz', id: 32, checkbox: false },
  { name: 'Wypisywanie róznych wspólnych', id: 33, checkbox: false },
  { name: 'Wypisywanie róznych wspólnych - piłka nożna', id: 34, checkbox: false },
  { name: 'Piłkarskie kółko i krzyżyk', id: 35, checkbox: false },
]

export const smallCategories: Category[] = [
  { name: 'Filmy', id: 0, checkbox: false },
  { name: 'Seriale', id: 1, checkbox: false },
  { name: 'Szkoła', id: 2, checkbox: false },
  { name: 'Muzyka', id: 3, checkbox: false },
  { name: 'Kraje', id: 4, checkbox: false },
  { name: 'piłka nożna', id: 5, checkbox: false },
  { name: 'Gry', id: 6, checkbox: false },
  { name: 'Wiedza ogólna A/B/C/D', id: 7, checkbox: false },
  { name: 'Znane postacie', id: 8, checkbox: false },
  { name: 'Wypisz kraje lub stolice', id: 9, checkbox: false },
  { name: 'Familiada', id: 10, checkbox: false },
  { name: 'Wypisywanie róznych wspólnych', id: 11, checkbox: false },
  { name: 'Piłkarskie kółko i krzyżyk', id: 12, checkbox: false },
]

export const groupedCategories = [
  {
    groupName: 'movieCategories',
    categories: [
      { name: 'Filmy - opis', id: 5, checkbox: false },
      { name: 'W jakim filmie zagrała taka obsada?', id: 14, checkbox: false },
      { name: 'Rozpoznaj film po bohaterach', id: 23, checkbox: false },
      // { name: 'Reżyser po filmach', id: 25, checkbox: false },
    ],
  },
  {
    groupName: 'serialCategories',
    categories: [
      { name: 'Seriale - opis', id: 6, checkbox: false },
      { name: 'W jakim serialu zagrała taka obsada?', id: 15, checkbox: false },
      { name: 'Czołówka serialu', id: 17, checkbox: false },
      { name: 'Rozpoznaj serial po bohaterach', id: 24, checkbox: false },
    ],
  },

  {
    groupName: 'schoolCategories',
    categories: [
      { name: 'Fragmenty ksiażek', id: 0, checkbox: false },
      { name: 'Rozpoznaj budowle ze zdjęcia', id: 13, checkbox: false },
      { name: 'Miasto - Województwo', id: 8, checkbox: false },
      { name: 'Historia', id: 11, checkbox: false },
      { name: 'Pierwiastki', id: 18, checkbox: false },
      // {name: "Biologia", id: 19, checkbox: false},
      { name: 'Bogowie', id: 20, checkbox: false },
    ],
  },
  {
    groupName: 'musicCategories',
    categories: [
      { name: 'Fragmenty piosenek', id: 1, checkbox: false },
      { name: 'Jaka to melodia?', id: 16, checkbox: false },
      { name: 'Rozpoznaj artystę po tytułach piosenek', id: 21, checkbox: false },
    ],
  },
  {
    groupName: 'footballCategories',
    categories: [
      { name: 'Klubowa Historia', id: 3, checkbox: false },
      { name: 'Klubowe herby', id: 4, checkbox: false },
      // { name: 'Stadiony świata', id: 9, checkbox: false },
      // {name: "Rozpoznaj impreze po piosence", id: 26, checkbox: false},
      { name: 'Zawodnik/klub/reprezentacja', id: 27, checkbox: false },
      { name: 'Był taki mecz', id: 32, checkbox: false },
      { name: 'Wypisywanie róznych wspólnych - piłka nożna', id: 34, checkbox: false },
    ],
  },
  {
    groupName: 'lifeCategories',
    categories: [
      // {name: "Przysłowia", id: 10, checkbox: false},
      { name: 'Pytanie wielokrotnego wyboru', id: 28, checkbox: false },
    ],
  },
  {
    groupName: 'famousPeople',
    categories: [{ name: 'Rozpoznaj osobe ze zdjęcia', id: 12, checkbox: false }],
  },
  {
    groupName: 'countryCategory',
    categories: [
      { name: 'Państwo po miastach', id: 22, checkbox: false },
      { name: 'Z jakiego krjau jest ta flaga?', id: 29, checkbox: false },
      { name: 'Stolice krajów?', id: 30, checkbox: false },
    ],
  },
  {
    groupName: 'countryInputCategory',
    categories: [{ name: 'Wypisz kraje lub stolice', id: 2, checkbox: false }],
  },
  {
    groupName: 'familiada',
    categories: [{ name: 'Familiada', id: 31, checkbox: false }],
  },
  {
    groupName: 'gamesCategory',
    categories: [{ name: 'Gra - opis', id: 7, checkbox: false }],
  },
  {
    groupName: 'writtingCategory',
    categories: [{ name: 'Wypisywanie róznych wspólnych', id: 33, checkbox: false }],
  },
  {
    groupName: 'footballCross',
    categories: [{ name: 'Piłkarskie kółko i krzyżyk', id: 35, checkbox: false }],
  },
]
