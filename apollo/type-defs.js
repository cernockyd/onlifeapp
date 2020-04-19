import gql from 'graphql-tag'

export const typeDefs = gql`
  type Group {
    id: ID!
    name: String!
    color: String!
  }

  type Quizz {
    link: String!
    display: Boolean!
    id: ID!
  }

  type SubTopic {
    link: String!
    display: Boolean!
    id: ID!
  }

  type Topic {
    id: ID!
    name: String!
    subtopics: [SubTopic]
  }

  type User {
    id: ID!
    email: String!
    name: String
    photoURL: String
  }

  input AddGroupInput {
    name: String!
  }

  type AddGroupPayload {
    name: String!
    id: String!
    color: String!
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type SignUpPayload {
    user: User!
  }

  type SignInPayload {
    user: User!
  }

  type Query {
    user: User
    viewer: User
    groups: [Group]
    group(id: ID!): Group
    quizz: Quizz
    topics: [Topic]
  }

  type Mutation {
    addGroup(input: AddGroupInput!): AddGroupPayload!
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
  }
`
