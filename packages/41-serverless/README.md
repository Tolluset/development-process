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
docker run -it --rm -e SERVICES=dynamodb -e INIT_SCRIPTS_PATH=/docker-entrypoint-initaws.d -e DEFAULT_REGION='ap-northeast-1' -e DYNAMODB_SHARE_DB=1 -p 4566:4566 -v $(pwd)/test/medium/init:/docker-entrypoint-initaws.d localstack/localstack:0.14
```

テスト実行:

```bash
npm run test-m
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
