# E2E テスト

このテストに追記してみよう。

- DB にデータが追加されていることを確認する
- 削除ボタンの動作と確認
- DB からデータが消されていることを確認する

## 起動方法

playwright を install する

```console
npx playwright install
```

このディレクトリにて以下を唱える。

```console
docker compose up
```

## テストの実行方法

サーバーを起動した状態で以下を実行

```console
npm test
```

## 後片付け

このディレクトリにて以下を唱える。

```console
docker compose down
```
