# サーバーレスのテスト

いろいろなテストでそれぞれどのようなバグが検出できるかを体験する。
その上で、それぞれのテストが継続的にどれほどの価値が出してくれるかを考える。

## テストの実行

### Small Size Test

```bash
npm run test-s
```

### Medium Size Test

準備:

```bash
docker compose --file ./test/medium/docker-compose.yml up
```

テスト実行:

```bash
npm run test-m
```

後片付け:

```bash
docker compose --file ./test/medium/docker-compose.yml down
```

### Large Size Test

AWS リソースのデプロイ:

```bash
npx cdk bootstrap # 初回のみ
npx cdk deploy
```

テスト実行:

```bash
npm run test-l
```

AWS リソースの後片付け:

```bash
npx cdk destroy
```