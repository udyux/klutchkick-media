export function timeToString(time: number) {
  const seconds = String(Math.floor(time % 60)).padStart(2, '0');
  return `${Math.floor(time / 60)}:${seconds}`;
}

export function timeToNumber(time: string) {
  const cleanedValue = time
    .trim()
    .replace(/[^\d:]/g, '')
    .replace(/(:\d\d)\d+/, '$1');

  const [minutes = 0, seconds = 0] = cleanedValue.split(':').map(Number);
  return minutes + seconds;
}
