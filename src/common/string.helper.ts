const replacements: Record<string, string> = {
    'ä': 'a',
    'ë': 'e',
    'ï': 'i',
    'ö': 'o',
    'ü': 'u',
    'ÿ': 'y',
    'Ä': 'A',
    'Ë': 'E',
    'Ï': 'I',
    'Ö': 'O',
    'Ü': 'U',
    'Ÿ': 'Y',
    'á': 'a',
    'ć': 'c',
    'é': 'e',
    'í': 'i',
    'ń': 'n',
    'ó': 'o',
    'ś': 's',
    'ú': 'u',
    'ý': 'y',
    'ź': 'z',
    'Á': 'A',
    'Ć': 'C',
    'É': 'E',
    'Í': 'I',
    'Ń': 'N',
    'Ó': 'O',
    'Ś': 'S',
    'Ú': 'U',
    'Ý': 'Y',
    'Ź': 'Z',
    'ő': 'o',
    'ű': 'u',
    'Ő': 'O',
    'Ű': 'U',
    'à': 'a',
    'è': 'e',
    'ì': 'i',
    'ò': 'o',
    'ù': 'u',
    'À': 'A',
    'È': 'E',
    'Ì': 'I',
    'Ò': 'O',
    'Ù': 'U',
    'â': 'a',
    'ê': 'e',
    'î': 'i',
    'ô': 'o',
    'û': 'u',
    'Â': 'A',
    'Ê': 'E',
    'Î': 'I',
    'Ô': 'O',
    'Û': 'U',
    'ã': 'a',
    'ñ': 'n',
    'õ': 'o',
    'Ã': 'A',
    'Ñ': 'N',
    'Õ': 'O',
    'č': 'c',
    'ď': 'd',
    'ě': 'e',
    'ǧ': 'g',
    'ň': 'n',
    'ř': 'r',
    'š': 's',
    'ť': 't',
    'ž': 'z',
    'Č': 'C',
    'Ď': 'D',
    'Ě': 'E',
    'Ǧ': 'G',
    'Ň': 'N',
    'Ř': 'R',
    'Š': 'S',
    'Ť': 'T',
    'Ž': 'Z',
    'đ': 'd',
    'Đ': 'D',
    'å': 'a',
    'ů': 'u',
    'Å': 'A',
    'Ů': 'U',
    'ą': 'a',
    'ę': 'e',
    'Ą': 'A',
    'Ę': 'E',
    'æ': 'ae',
    'Æ': 'Ae',
    'ø': 'o',
    'Ø': 'O',
    'ç': 'c',
    'Ç': 'C',
    'ł': 'l',
    'Ł': 'L',
    'ß': 'ss',
    'þ': 'th',
    'ż': 'z',
    'Ż': 'Z',
  }
;

export function formatStrings(text: string) {
  let result = '';
  for (let i = 0; i < text.length; ++i) {
    const entry = text[i];
    result += replacements[entry] ?? entry;
  }
  return result.toLowerCase();
}
