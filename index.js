const { ApolloServer, gql } = require('apollo-server');
const { find } = require('lodash');

const books = require('./data');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    book(author: String!): Book
    books: [Book]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    book(parent, args, context, info) {
      return find(books, { author: args.author });
    },
    books: () => books,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
// GraphQL Playground - Apollo Server - Apollo GraphQL Docs - https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/
const server = new ApolloServer({ typeDefs, resolvers, playground: true });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
