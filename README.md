# SKYS SCRAPER

## npmパッケージのアップデート

kubernetesのコンテナに入り下記を実行

```
ncu
ncu -u ＜パッケージ名＞
npm install
```

### コーディング規約

`Driver` → `Adapter` → `Core/UseCase` → `Core/Entity` の依存関係を厳守する