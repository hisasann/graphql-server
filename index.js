const { ApolloServer, gql } = require('apollo-server');
const { find } = require('lodash');
const books = require('./data');

// via [Basic Apollo app - CodeSandbox](https://codesandbox.io/s/nn9y2wzyw4)

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    book(author: String!): Book
    books: [Book]
  }
  
  type Mutation {
    addBook(title: String!, author: String!): Book!
  }
`;

const resolvers = {
  Query: {
    // parent: 上位のリゾルバで解決した結果を含むオブジェクト
    // args: このリゾルバに、クエリから渡された引数
    // context: 外部から依存関係を注入するために使用する、共有引数
    // info: クエリの実行状態に関する情報
    book(parent, args, context, info) {
      return find(books, { author: args.author });
    },
    books: () => books,
  },
  Mutation: {
    addBook(parent, args, context, info) {
      const post = {
        title: args.title,
        author: args.author,
      };
      books.push(post);
      return post;
    },
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
// GraphQL Playground - Apollo Server - Apollo GraphQL Docs - https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/
const server = new ApolloServer({ typeDefs, resolvers, playground: true });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
