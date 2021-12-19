export interface ISeeder {
  install(): Promise<void>;
}
