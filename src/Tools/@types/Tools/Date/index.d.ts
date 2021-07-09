export interface IDayJs {
  get getUtc(): string;
  get processStartTime(): number;
  processEndTime(startTime: number): string;
  formatDate(date: string): string;
}
