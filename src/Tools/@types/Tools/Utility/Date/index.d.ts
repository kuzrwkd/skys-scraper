export interface IDayJs {
  getUtc(): string;
  processStartTime(): number;
  processEndTime(startTime: number): string;
  formatDate(date: string): string;
}
