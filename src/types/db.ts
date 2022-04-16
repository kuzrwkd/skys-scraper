declare namespace DB {
  interface IMigration {
    up(): Promise<void>;
    down(): Promise<void>;
  }
  interface ISeeder {
    install(): Promise<void>;
  }
}
