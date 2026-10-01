export function getSpentTime(start: number) {
  const duration = Date.now() - start;
  const totalSeconds = Math.floor(duration / 1000);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor(totalSeconds / 3600);
  return { hours, minutes, totalSeconds };
}

export function getSpentTimeString(start: number): string {
  const { hours, minutes, totalSeconds } = getSpentTime(start);
  return `${hours.toFixed(2)} h ${minutes.toFixed(2)} m, ${(totalSeconds % 60).toFixed(2)} s`;
}
