# 🚀 graphql-server using apollo-server

[apollographql/apollo-server: 🌍 GraphQL server for Express, Connect, Hapi, Koa and more](https://github.com/apollographql/apollo-server)

## Getting started

[Get started with Apollo Server - Apollo Server - Apollo GraphQL Docs](https://www.apollographql.com/docs/apollo-server/getting-started/)

## エクスクラメーションマークについて

```graphql
type Query {
  book(author: String!): Book
  books: [Book]
}
```

そのフィールドがnullになることがないことを意味します。

つまり、必須オプションという意味になります。

[GraphQLのスキーマと型定義 - Qiita](https://qiita.com/NagaokaKenichi/items/d341dc092012e05d6606)
