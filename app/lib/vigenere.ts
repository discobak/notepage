function shiftChar(char: string, shift: number): string {
  const code = char.charCodeAt(0);

  if (code >= 65 && code <= 90) {
    return String.fromCharCode(((((code - 65 + shift) % 26) + 26) % 26) + 65);
  }
  if (code >= 97 && code <= 122) {
    return String.fromCharCode(((((code - 97 + shift) % 26) + 26) % 26) + 97);
  }
  return char;
}

function isLetter(char: string): boolean {
  return /[a-zA-Z]/.test(char);
}

function keyShifts(key: string): number[] {
  const shifts = key
    .toUpperCase()
    .split("")
    .filter(isLetter)
    .map((char) => char.charCodeAt(0) - 65);
  return shifts.length > 0 ? shifts : [0];
}

export function encodeWithKey(text: string, key: string): string {
  const shifts = keyShifts(key);
  let keyIndex = 0;
  return text
    .split("")
    .map((char) => {
      if (!isLetter(char)) return char;
      const shifted = shiftChar(char, shifts[keyIndex % shifts.length]);
      keyIndex++;
      return shifted;
    })
    .join("");
}

export function decodeWithKey(text: string, key: string): string {
  const shifts = keyShifts(key).map((s) => -s);
  let keyIndex = 0;
  return text
    .split("")
    .map((char) => {
      if (!isLetter(char)) return char;
      const shifted = shiftChar(char, shifts[keyIndex % shifts.length]);
      keyIndex++;
      return shifted;
    })
    .join("");
}
