export interface IDateUtil {
  getUtc(): string;
  processStartTime(): number;
  processEndTime(startTime: number): string;
  formatDate(date: string): string;
  formatMinutesNoZeroPadding(date: string): string;
}
