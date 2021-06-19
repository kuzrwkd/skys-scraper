# SKYS SCRAPER

## 開発環境構築

.envファイルを作成し、書きをコピペする

```
PRISMA_DATABASE_URL=mysql://root:password@skys-scraper-db-svc:3306/skys-scraper
DATABASE_HOST=skys-scraper-db-svc
DATABASE_PORT=3306
```

## npmパッケージのアップデート

kubernetesのコンテナに入り下記を実行

```
ncu
ncu -u
rm -rf node_modules
npm install
```

パッケージバーションなど依存関係のエラーが出た場合は下記で強制的にインストールもできる（動作保証はされない）

```
npm install --legacy-peer-deps
```