# テストコードを書いてみよう

`nabeatsu.ts` と、そのテストコードを完成させよう。
テストコードが書けたら、次の仕様変更を実装してみよう。

1. 整数ではない文字が入力された場合は、小数点以下を切り捨てる
1. 0 が入力された場合は、「世界のなべあつ」と返す
1. 負の整数が入力された場合は、「自然数を入力してください」と返す
1. 開始する数字を 1 ではなく 0 とする。
1. 最初の数字を第２引数で指定できる。指定しない場合は 0 から数える。

## テストの実行方法

```console
npx vitest packages/21-fizzbazz/
```

## キーワード

- リファクタリング