# 人口推移確認web app

某社の提出課題用のweb appです。
不正防止のために合否関わらず後々privateにする予定です。

## 概要

人口推移を確認するためのweb appです。
都道府県を選択すると、その都道府県の人口推移を確認することができます。

## 使い方

ローカルで実行する場合、env.exampleを参考に.env.localファイルを作成してください。

```txt
VITE_RESAS_API_KEY={RESAS APIのAPIキー}
VITE_USE_MOCK_API={開発環境用でmswを使う場合はtrue, 使わない場合はfalse}
VITE_API_URL={RESAS APIのURL}
```

.env.localファイルを作成したら、以下のコマンドを実行してください。

```bash
bun install
bun dev
```

## 使用技術

- Vite

  HMRの速さと、開発要件からSPAであったため採用しました。
  ただ、クライアント側でfilter等を実行するのでSSRで実装したほうが良かったのですが、時間の都合上載せ替え等の作業は断念しました。

- Vitest

  Viteを採用していることと、実行速度の速さから採用しました。

- Kuma UI

  DXが良かったことと、css-in-jsの中でもゼロランタイムであり、パフォーマンスが良かったため採用しました。

- MSW

  開発時にAPIのモックを作成するために採用しました。Viteで実行する際にメジャバージョンがv2以上だとエラーが出るため、v1を使用しました。
  何か知見があったら教えていただけると幸いです。

- radix-ui/\*

  今回の条件上でスタイルの内包されていないコンポーネントライブラリは使用可能だと思い、採用しました。
  キー操作やaria属性が内包されているため、アクセシビリティに配慮して採用しました。
  ただ背マンティクスなマークアップをはかるという評価があるため、採用したことによる問題があった場合は申し訳ございません。

- react-query

  APIのキャッシュやステート管理が楽だと思い採用しました。
  swrも検討しましたが、人口取得の際にマルチプルなリクエストを送るため、頑張りましたがデータの取得ができてもエラー状態が取得できないため、代替ライブラリとして、機能が似ているreact-queryを採用しました。
  react-queryの方がquery paramsを使う際にキャッシングがしやすかったので結果的にいい判断でした。

- bun

  CI上での実行がはやく、開発体験を向上させるために採用しました。
  actions上ではcacheを使わずに逐一インストールしても、時間に大差はないと製作者の方がツイートしている記憶があったため、cahceは使わずにactionsを実行しています。

- recharts

  ドキュメントが充実していたため採用しました。

- linter周りについて

  eslint, stylelint, prettierを採用しました。

  
  eslint configに関しては @antfu/eslint-configを採用しました。
  このコンフィグでは、prettierを使うことは推奨していませんが([参考](https://antfu.me/posts/why-not-prettier/))、下記のコードのような状態でもインデントが修正されないため、prettierを使っています。そのため、CI上でのprettierによるスタイリングの修正は行わず、prettier => eslint fixの順で実行して対応してしまっています。


  ただこの場合、CI上でprettierのstyle checkを実行できないため、共同開発時に問題があるかもしれません。
  このeslint-configを使わずに自分で書くことも検討しましたが、時間の都合上と既存のconfigを引き継ぐと設定ファイルが肥大化してしまうため、断念しました。

```tsx
<div
  className={css`
color: red;
font-size: 20px;
  `}
/>
```

- その他

commitルールの統一のためにgit-czを使用しています。
