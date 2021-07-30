# SKYS SCRAPER

## npmパッケージのアップデート

kubernetesのコンテナに入り下記を実行

```
ncu
ncu -u ＜パッケージ名＞
npm upgrade ＜パッケージ名＞
```

パッケージバーションなど依存関係のエラーが出た場合は下記で強制的にインストールもできる（動作保証はされない）

```
npm install --legacy-peer-deps
```

### コーディング規約

`Driver` → `Adapter` → `Core/UseCase` → `Core/Entity` の依存関係を厳守する