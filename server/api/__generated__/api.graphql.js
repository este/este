/**
 * @flow
 */
import type { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
// $FlowFixMe
import type { IResolvers } from 'graphql-tools/dist/Interfaces'
import type { Context } from '../index'
import type { BasePrismaOptions as BPOType } from 'prisma-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    me(args?: {}, info?: GraphQLResolveInfo | string, context: Context): Promise<User | null>; 
    post(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, context: Context): Promise<Post | null>; 
    web(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, context: Context): Promise<Web | null>; 
  }

export interface Mutation {
    auth(args: { input: AuthInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<AuthPayload | null>; 
    createWeb(args: { input: CreateWebInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<CreateWebPayload | null>; 
    deleteWeb(args: { input: DeleteWebInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<DeleteWebPayload | null>; 
    setTheme(args: { input: SetThemeInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<SetThemePayload | null>; 
    setPostName(args: { input: SetPostNameInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<SetPostNamePayload | null>; 
    setWebName(args: { input: SetWebNameInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<SetWebNamePayload | null>; 
    setPostText(args: { input: SetPostTextInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<SetPostTextPayload | null>; 
    deletePost(args: { input: DeletePostInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<DeletePostPayload | null>; 
  }

export interface Subscription {}

export interface Exists {

}

export interface Prisma {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
  exists: Exists;
  request(query: string, variables?: {[key: string]: any}): Promise<any>;
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, context: Context): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, context: Context): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BPOType): T
}
/**
 * Type Defs
*/

const typeDefs = `type AuthErrors {
  email: EmailError
  password: PasswordError
}

input AuthInput {
  email: String!
  password: String!
  isSignUp: Boolean!
}

type AuthPayload {
  errors: AuthErrors
  token: String
  user: User
}

type CreateWebErrors {
  name: Max140CharsError
  postName: Max140CharsError
}

input CreateWebInput {
  name: String!
  postName: String!
}

type CreateWebPayload {
  errors: CreateWebErrors
  postId: ID
}

scalar DateTime

input DeletePostInput {
  id: ID!
}

type DeletePostPayload {
  post: Post
}

input DeleteWebInput {
  id: ID!
}

type DeleteWebPayload {
  web: Web
}

enum EmailError {
  REQUIRED
  EMAIL
  ALREADY_EXISTS
  NOT_EXISTS
}

type Image implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  src: String!
  width: Int!
  height: Int!
  creator(where: UserWhereInput): User!
}

enum ImageOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  src_ASC
  src_DESC
  width_ASC
  width_DESC
  height_ASC
  height_DESC
}

input ImageWhereInput {
  """Logical AND on all given filters."""
  AND: [ImageWhereInput!]

  """Logical OR on all given filters."""
  OR: [ImageWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ImageWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  src: String

  """All values that are not equal to given value."""
  src_not: String

  """All values that are contained in given list."""
  src_in: [String!]

  """All values that are not contained in given list."""
  src_not_in: [String!]

  """All values less than the given value."""
  src_lt: String

  """All values less than or equal the given value."""
  src_lte: String

  """All values greater than the given value."""
  src_gt: String

  """All values greater than or equal the given value."""
  src_gte: String

  """All values containing the given string."""
  src_contains: String

  """All values not containing the given string."""
  src_not_contains: String

  """All values starting with the given string."""
  src_starts_with: String

  """All values not starting with the given string."""
  src_not_starts_with: String

  """All values ending with the given string."""
  src_ends_with: String

  """All values not ending with the given string."""
  src_not_ends_with: String
  width: Int

  """All values that are not equal to given value."""
  width_not: Int

  """All values that are contained in given list."""
  width_in: [Int!]

  """All values that are not contained in given list."""
  width_not_in: [Int!]

  """All values less than the given value."""
  width_lt: Int

  """All values less than or equal the given value."""
  width_lte: Int

  """All values greater than the given value."""
  width_gt: Int

  """All values greater than or equal the given value."""
  width_gte: Int
  height: Int

  """All values that are not equal to given value."""
  height_not: Int

  """All values that are contained in given list."""
  height_in: [Int!]

  """All values that are not contained in given list."""
  height_not_in: [Int!]

  """All values less than the given value."""
  height_lt: Int

  """All values less than or equal the given value."""
  height_lte: Int

  """All values greater than the given value."""
  height_gt: Int

  """All values greater than or equal the given value."""
  height_gte: Int
  creator: UserWhereInput
  _MagicalBackRelation_ImageToPost_every: PostWhereInput
  _MagicalBackRelation_ImageToPost_some: PostWhereInput
  _MagicalBackRelation_ImageToPost_none: PostWhereInput
}

enum Max140CharsError {
  REQUIRED
  MAX_140_CHARS
}

type Mutation {
  auth(input: AuthInput!): AuthPayload
  createWeb(input: CreateWebInput!): CreateWebPayload
  deleteWeb(input: DeleteWebInput!): DeleteWebPayload
  setTheme(input: SetThemeInput!): SetThemePayload
  setPostName(input: SetPostNameInput!): SetPostNamePayload
  setWebName(input: SetWebNameInput!): SetWebNamePayload
  setPostText(input: SetPostTextInput!): SetPostTextPayload
  deletePost(input: DeletePostInput!): DeletePostPayload
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

enum PasswordError {
  REQUIRED
  MIN_5_CHARS
  MAX_1024_CHARS
  WRONG_PASSWORD
}

type Post implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  creator(where: UserWhereInput): User!
  name: String
  web(where: WebWhereInput): Web!
  parents(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  children(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  childrenOrder: [ID!]!
  text: String
  textFormat: String!
  image(where: ImageWhereInput): Image
  type: PostType!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  text_ASC
  text_DESC
  textFormat_ASC
  textFormat_DESC
  type_ASC
  type_DESC
}

enum PostType {
  CHILDREN
  TEXT
  IMAGE
}

input PostWhereInput {
  """Logical AND on all given filters."""
  AND: [PostWhereInput!]

  """Logical OR on all given filters."""
  OR: [PostWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PostWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  text: String

  """All values that are not equal to given value."""
  text_not: String

  """All values that are contained in given list."""
  text_in: [String!]

  """All values that are not contained in given list."""
  text_not_in: [String!]

  """All values less than the given value."""
  text_lt: String

  """All values less than or equal the given value."""
  text_lte: String

  """All values greater than the given value."""
  text_gt: String

  """All values greater than or equal the given value."""
  text_gte: String

  """All values containing the given string."""
  text_contains: String

  """All values not containing the given string."""
  text_not_contains: String

  """All values starting with the given string."""
  text_starts_with: String

  """All values not starting with the given string."""
  text_not_starts_with: String

  """All values ending with the given string."""
  text_ends_with: String

  """All values not ending with the given string."""
  text_not_ends_with: String
  textFormat: String

  """All values that are not equal to given value."""
  textFormat_not: String

  """All values that are contained in given list."""
  textFormat_in: [String!]

  """All values that are not contained in given list."""
  textFormat_not_in: [String!]

  """All values less than the given value."""
  textFormat_lt: String

  """All values less than or equal the given value."""
  textFormat_lte: String

  """All values greater than the given value."""
  textFormat_gt: String

  """All values greater than or equal the given value."""
  textFormat_gte: String

  """All values containing the given string."""
  textFormat_contains: String

  """All values not containing the given string."""
  textFormat_not_contains: String

  """All values starting with the given string."""
  textFormat_starts_with: String

  """All values not starting with the given string."""
  textFormat_not_starts_with: String

  """All values ending with the given string."""
  textFormat_ends_with: String

  """All values not ending with the given string."""
  textFormat_not_ends_with: String
  type: PostType

  """All values that are not equal to given value."""
  type_not: PostType

  """All values that are contained in given list."""
  type_in: [PostType!]

  """All values that are not contained in given list."""
  type_not_in: [PostType!]
  creator: UserWhereInput
  web: WebWhereInput
  parents_every: PostWhereInput
  parents_some: PostWhereInput
  parents_none: PostWhereInput
  children_every: PostWhereInput
  children_some: PostWhereInput
  children_none: PostWhereInput
  image: ImageWhereInput
}

type Query {
  me: User
  post(id: ID!): Post
  web(id: ID!): Web
}

type SetPostNameErrors {
  name: Max140CharsError
}

input SetPostNameInput {
  id: ID!
  name: String!
}

type SetPostNamePayload {
  errors: SetPostNameErrors
  post: Post
}

input SetPostTextInput {
  id: ID!
  text: String!
}

type SetPostTextPayload {
  post: Post
}

input SetThemeInput {
  themeName: String!
}

type SetThemePayload {
  user: User
}

type SetWebNameErrors {
  name: Max140CharsError
}

input SetWebNameInput {
  id: ID!
  name: String!
}

type SetWebNamePayload {
  errors: SetWebNameErrors
  web: Web
}

type User implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  password: String!
  themeName: String
  webs(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Web!]
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  images(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image!]
}

input UserWhereInput {
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  email: String

  """All values that are not equal to given value."""
  email_not: String

  """All values that are contained in given list."""
  email_in: [String!]

  """All values that are not contained in given list."""
  email_not_in: [String!]

  """All values less than the given value."""
  email_lt: String

  """All values less than or equal the given value."""
  email_lte: String

  """All values greater than the given value."""
  email_gt: String

  """All values greater than or equal the given value."""
  email_gte: String

  """All values containing the given string."""
  email_contains: String

  """All values not containing the given string."""
  email_not_contains: String

  """All values starting with the given string."""
  email_starts_with: String

  """All values not starting with the given string."""
  email_not_starts_with: String

  """All values ending with the given string."""
  email_ends_with: String

  """All values not ending with the given string."""
  email_not_ends_with: String
  password: String

  """All values that are not equal to given value."""
  password_not: String

  """All values that are contained in given list."""
  password_in: [String!]

  """All values that are not contained in given list."""
  password_not_in: [String!]

  """All values less than the given value."""
  password_lt: String

  """All values less than or equal the given value."""
  password_lte: String

  """All values greater than the given value."""
  password_gt: String

  """All values greater than or equal the given value."""
  password_gte: String

  """All values containing the given string."""
  password_contains: String

  """All values not containing the given string."""
  password_not_contains: String

  """All values starting with the given string."""
  password_starts_with: String

  """All values not starting with the given string."""
  password_not_starts_with: String

  """All values ending with the given string."""
  password_ends_with: String

  """All values not ending with the given string."""
  password_not_ends_with: String
  themeName: String

  """All values that are not equal to given value."""
  themeName_not: String

  """All values that are contained in given list."""
  themeName_in: [String!]

  """All values that are not contained in given list."""
  themeName_not_in: [String!]

  """All values less than the given value."""
  themeName_lt: String

  """All values less than or equal the given value."""
  themeName_lte: String

  """All values greater than the given value."""
  themeName_gt: String

  """All values greater than or equal the given value."""
  themeName_gte: String

  """All values containing the given string."""
  themeName_contains: String

  """All values not containing the given string."""
  themeName_not_contains: String

  """All values starting with the given string."""
  themeName_starts_with: String

  """All values not starting with the given string."""
  themeName_not_starts_with: String

  """All values ending with the given string."""
  themeName_ends_with: String

  """All values not ending with the given string."""
  themeName_not_ends_with: String
  webs_every: WebWhereInput
  webs_some: WebWhereInput
  webs_none: WebWhereInput
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  images_every: ImageWhereInput
  images_some: ImageWhereInput
  images_none: ImageWhereInput
}

type Web implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  creator(where: UserWhereInput): User!
  name: String!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
}

enum WebOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
}

input WebWhereInput {
  """Logical AND on all given filters."""
  AND: [WebWhereInput!]

  """Logical OR on all given filters."""
  OR: [WebWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [WebWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  creator: UserWhereInput
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
}
`

const prisma: BindingConstructor<Prisma> = makePrismaBindingClass({typeDefs})
 


/**
 * Types
*/

 export type WebOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'name_ASC'
    | 'name_DESC'
  

 export type EmailError =
    | 'REQUIRED'
    | 'EMAIL'
    | 'ALREADY_EXISTS'
    | 'NOT_EXISTS'
  

 export type PostOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'text_ASC'
    | 'text_DESC'
    | 'textFormat_ASC'
    | 'textFormat_DESC'
    | 'type_ASC'
    | 'type_DESC'
  

 export type PostType =
    | 'CHILDREN'
    | 'TEXT'
    | 'IMAGE'
  

 export type Max140CharsError =
    | 'REQUIRED'
    | 'MAX_140_CHARS'
  

 export type ImageOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'src_ASC'
    | 'src_DESC'
    | 'width_ASC'
    | 'width_DESC'
    | 'height_ASC'
    | 'height_DESC'
  

 export type PasswordError =
    | 'REQUIRED'
    | 'MIN_5_CHARS'
    | 'MAX_1024_CHARS'
    | 'WRONG_PASSWORD'
  

 export type SetThemeInput = {| 
  themeName: String
|}

 export type SetPostTextInput = {| 
  id: ID_Input,
  text: String
|}

 export type UserWhereInput = {| 
  AND?: Array< UserWhereInput > | UserWhereInput,
  OR?: Array< UserWhereInput > | UserWhereInput,
  NOT?: Array< UserWhereInput > | UserWhereInput,
  id?: ID_Input,
  id_not?: ID_Input,
  id_in?: Array< ID_Input > | ID_Input,
  id_not_in?: Array< ID_Input > | ID_Input,
  id_lt?: ID_Input,
  id_lte?: ID_Input,
  id_gt?: ID_Input,
  id_gte?: ID_Input,
  id_contains?: ID_Input,
  id_not_contains?: ID_Input,
  id_starts_with?: ID_Input,
  id_not_starts_with?: ID_Input,
  id_ends_with?: ID_Input,
  id_not_ends_with?: ID_Input,
  createdAt?: DateTime,
  createdAt_not?: DateTime,
  createdAt_in?: Array< DateTime > | DateTime,
  createdAt_not_in?: Array< DateTime > | DateTime,
  createdAt_lt?: DateTime,
  createdAt_lte?: DateTime,
  createdAt_gt?: DateTime,
  createdAt_gte?: DateTime,
  updatedAt?: DateTime,
  updatedAt_not?: DateTime,
  updatedAt_in?: Array< DateTime > | DateTime,
  updatedAt_not_in?: Array< DateTime > | DateTime,
  updatedAt_lt?: DateTime,
  updatedAt_lte?: DateTime,
  updatedAt_gt?: DateTime,
  updatedAt_gte?: DateTime,
  email?: String,
  email_not?: String,
  email_in?: Array< String > | String,
  email_not_in?: Array< String > | String,
  email_lt?: String,
  email_lte?: String,
  email_gt?: String,
  email_gte?: String,
  email_contains?: String,
  email_not_contains?: String,
  email_starts_with?: String,
  email_not_starts_with?: String,
  email_ends_with?: String,
  email_not_ends_with?: String,
  password?: String,
  password_not?: String,
  password_in?: Array< String > | String,
  password_not_in?: Array< String > | String,
  password_lt?: String,
  password_lte?: String,
  password_gt?: String,
  password_gte?: String,
  password_contains?: String,
  password_not_contains?: String,
  password_starts_with?: String,
  password_not_starts_with?: String,
  password_ends_with?: String,
  password_not_ends_with?: String,
  themeName?: String,
  themeName_not?: String,
  themeName_in?: Array< String > | String,
  themeName_not_in?: Array< String > | String,
  themeName_lt?: String,
  themeName_lte?: String,
  themeName_gt?: String,
  themeName_gte?: String,
  themeName_contains?: String,
  themeName_not_contains?: String,
  themeName_starts_with?: String,
  themeName_not_starts_with?: String,
  themeName_ends_with?: String,
  themeName_not_ends_with?: String,
  webs_every?: WebWhereInput,
  webs_some?: WebWhereInput,
  webs_none?: WebWhereInput,
  posts_every?: PostWhereInput,
  posts_some?: PostWhereInput,
  posts_none?: PostWhereInput,
  images_every?: ImageWhereInput,
  images_some?: ImageWhereInput,
  images_none?: ImageWhereInput
|}

 export type SetPostNameInput = {| 
  id: ID_Input,
  name: String
|}

 export type WebWhereInput = {| 
  AND?: Array< WebWhereInput > | WebWhereInput,
  OR?: Array< WebWhereInput > | WebWhereInput,
  NOT?: Array< WebWhereInput > | WebWhereInput,
  id?: ID_Input,
  id_not?: ID_Input,
  id_in?: Array< ID_Input > | ID_Input,
  id_not_in?: Array< ID_Input > | ID_Input,
  id_lt?: ID_Input,
  id_lte?: ID_Input,
  id_gt?: ID_Input,
  id_gte?: ID_Input,
  id_contains?: ID_Input,
  id_not_contains?: ID_Input,
  id_starts_with?: ID_Input,
  id_not_starts_with?: ID_Input,
  id_ends_with?: ID_Input,
  id_not_ends_with?: ID_Input,
  createdAt?: DateTime,
  createdAt_not?: DateTime,
  createdAt_in?: Array< DateTime > | DateTime,
  createdAt_not_in?: Array< DateTime > | DateTime,
  createdAt_lt?: DateTime,
  createdAt_lte?: DateTime,
  createdAt_gt?: DateTime,
  createdAt_gte?: DateTime,
  updatedAt?: DateTime,
  updatedAt_not?: DateTime,
  updatedAt_in?: Array< DateTime > | DateTime,
  updatedAt_not_in?: Array< DateTime > | DateTime,
  updatedAt_lt?: DateTime,
  updatedAt_lte?: DateTime,
  updatedAt_gt?: DateTime,
  updatedAt_gte?: DateTime,
  name?: String,
  name_not?: String,
  name_in?: Array< String > | String,
  name_not_in?: Array< String > | String,
  name_lt?: String,
  name_lte?: String,
  name_gt?: String,
  name_gte?: String,
  name_contains?: String,
  name_not_contains?: String,
  name_starts_with?: String,
  name_not_starts_with?: String,
  name_ends_with?: String,
  name_not_ends_with?: String,
  creator?: UserWhereInput,
  posts_every?: PostWhereInput,
  posts_some?: PostWhereInput,
  posts_none?: PostWhereInput
|}

 export type CreateWebInput = {| 
  name: String,
  postName: String
|}

 export type AuthInput = {| 
  email: String,
  password: String,
  isSignUp: Boolean
|}

 export type DeletePostInput = {| 
  id: ID_Input
|}

 export type PostWhereInput = {| 
  AND?: Array< PostWhereInput > | PostWhereInput,
  OR?: Array< PostWhereInput > | PostWhereInput,
  NOT?: Array< PostWhereInput > | PostWhereInput,
  id?: ID_Input,
  id_not?: ID_Input,
  id_in?: Array< ID_Input > | ID_Input,
  id_not_in?: Array< ID_Input > | ID_Input,
  id_lt?: ID_Input,
  id_lte?: ID_Input,
  id_gt?: ID_Input,
  id_gte?: ID_Input,
  id_contains?: ID_Input,
  id_not_contains?: ID_Input,
  id_starts_with?: ID_Input,
  id_not_starts_with?: ID_Input,
  id_ends_with?: ID_Input,
  id_not_ends_with?: ID_Input,
  createdAt?: DateTime,
  createdAt_not?: DateTime,
  createdAt_in?: Array< DateTime > | DateTime,
  createdAt_not_in?: Array< DateTime > | DateTime,
  createdAt_lt?: DateTime,
  createdAt_lte?: DateTime,
  createdAt_gt?: DateTime,
  createdAt_gte?: DateTime,
  updatedAt?: DateTime,
  updatedAt_not?: DateTime,
  updatedAt_in?: Array< DateTime > | DateTime,
  updatedAt_not_in?: Array< DateTime > | DateTime,
  updatedAt_lt?: DateTime,
  updatedAt_lte?: DateTime,
  updatedAt_gt?: DateTime,
  updatedAt_gte?: DateTime,
  name?: String,
  name_not?: String,
  name_in?: Array< String > | String,
  name_not_in?: Array< String > | String,
  name_lt?: String,
  name_lte?: String,
  name_gt?: String,
  name_gte?: String,
  name_contains?: String,
  name_not_contains?: String,
  name_starts_with?: String,
  name_not_starts_with?: String,
  name_ends_with?: String,
  name_not_ends_with?: String,
  text?: String,
  text_not?: String,
  text_in?: Array< String > | String,
  text_not_in?: Array< String > | String,
  text_lt?: String,
  text_lte?: String,
  text_gt?: String,
  text_gte?: String,
  text_contains?: String,
  text_not_contains?: String,
  text_starts_with?: String,
  text_not_starts_with?: String,
  text_ends_with?: String,
  text_not_ends_with?: String,
  textFormat?: String,
  textFormat_not?: String,
  textFormat_in?: Array< String > | String,
  textFormat_not_in?: Array< String > | String,
  textFormat_lt?: String,
  textFormat_lte?: String,
  textFormat_gt?: String,
  textFormat_gte?: String,
  textFormat_contains?: String,
  textFormat_not_contains?: String,
  textFormat_starts_with?: String,
  textFormat_not_starts_with?: String,
  textFormat_ends_with?: String,
  textFormat_not_ends_with?: String,
  type?: PostType,
  type_not?: PostType,
  type_in?: Array< PostType > | PostType,
  type_not_in?: Array< PostType > | PostType,
  creator?: UserWhereInput,
  web?: WebWhereInput,
  parents_every?: PostWhereInput,
  parents_some?: PostWhereInput,
  parents_none?: PostWhereInput,
  children_every?: PostWhereInput,
  children_some?: PostWhereInput,
  children_none?: PostWhereInput,
  image?: ImageWhereInput
|}

 export type DeleteWebInput = {| 
  id: ID_Input
|}

 export type ImageWhereInput = {| 
  AND?: Array< ImageWhereInput > | ImageWhereInput,
  OR?: Array< ImageWhereInput > | ImageWhereInput,
  NOT?: Array< ImageWhereInput > | ImageWhereInput,
  id?: ID_Input,
  id_not?: ID_Input,
  id_in?: Array< ID_Input > | ID_Input,
  id_not_in?: Array< ID_Input > | ID_Input,
  id_lt?: ID_Input,
  id_lte?: ID_Input,
  id_gt?: ID_Input,
  id_gte?: ID_Input,
  id_contains?: ID_Input,
  id_not_contains?: ID_Input,
  id_starts_with?: ID_Input,
  id_not_starts_with?: ID_Input,
  id_ends_with?: ID_Input,
  id_not_ends_with?: ID_Input,
  createdAt?: DateTime,
  createdAt_not?: DateTime,
  createdAt_in?: Array< DateTime > | DateTime,
  createdAt_not_in?: Array< DateTime > | DateTime,
  createdAt_lt?: DateTime,
  createdAt_lte?: DateTime,
  createdAt_gt?: DateTime,
  createdAt_gte?: DateTime,
  updatedAt?: DateTime,
  updatedAt_not?: DateTime,
  updatedAt_in?: Array< DateTime > | DateTime,
  updatedAt_not_in?: Array< DateTime > | DateTime,
  updatedAt_lt?: DateTime,
  updatedAt_lte?: DateTime,
  updatedAt_gt?: DateTime,
  updatedAt_gte?: DateTime,
  src?: String,
  src_not?: String,
  src_in?: Array< String > | String,
  src_not_in?: Array< String > | String,
  src_lt?: String,
  src_lte?: String,
  src_gt?: String,
  src_gte?: String,
  src_contains?: String,
  src_not_contains?: String,
  src_starts_with?: String,
  src_not_starts_with?: String,
  src_ends_with?: String,
  src_not_ends_with?: String,
  width?: Int,
  width_not?: Int,
  width_in?: Array< Int > | Int,
  width_not_in?: Array< Int > | Int,
  width_lt?: Int,
  width_lte?: Int,
  width_gt?: Int,
  width_gte?: Int,
  height?: Int,
  height_not?: Int,
  height_in?: Array< Int > | Int,
  height_not_in?: Array< Int > | Int,
  height_lt?: Int,
  height_lte?: Int,
  height_gt?: Int,
  height_gte?: Int,
  creator?: UserWhereInput,
  _MagicalBackRelation_ImageToPost_every?: PostWhereInput,
  _MagicalBackRelation_ImageToPost_some?: PostWhereInput,
  _MagicalBackRelation_ImageToPost_none?: PostWhereInput
|}

 export type SetWebNameInput = {| 
  id: ID_Input,
  name: String
|}

/*
 * An object with an ID

*/
 export type Node = {| 
   id: ID_Output,
|}

 export type AuthErrors = {| 
   email?: EmailError,
   password?: PasswordError,
|}

 export type DeletePostPayload = {| 
   post?: Post,
|}

 export type User = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   email: String,
   password: String,
   themeName?: String,
   webs?: Web[],
   posts?: Post[],
   images?: Image[],
|}

 export type AuthPayload = {| 
   errors?: AuthErrors,
   token?: String,
   user?: User,
|}

 export type SetPostNamePayload = {| 
   errors?: SetPostNameErrors,
   post?: Post,
|}

 export type CreateWebPayload = {| 
   errors?: CreateWebErrors,
   postId?: ID_Output,
|}

 export type SetPostNameErrors = {| 
   name?: Max140CharsError,
|}

 export type Image = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   src: String,
   width: Int,
   height: Int,
   creator: User,
|}

 export type SetWebNameErrors = {| 
   name?: Max140CharsError,
|}

 export type SetWebNamePayload = {| 
   errors?: SetWebNameErrors,
   web?: Web,
|}

 export type Web = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   creator: User,
   name: String,
   posts?: Post[],
|}

 export type Post = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   creator: User,
   name?: String,
   web: Web,
   parents?: Post[],
   children?: Post[],
   childrenOrder: ID_Output[],
   text?: String,
   textFormat: String,
   image?: Image,
   type: PostType,
|}

 export type CreateWebErrors = {| 
   name?: Max140CharsError,
   postName?: Max140CharsError,
|}

 export type SetPostTextPayload = {| 
   post?: Post,
|}

 export type SetThemePayload = {| 
   user?: User,
|}

 export type DeleteWebPayload = {| 
   web?: Web,
|}

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
 export type String = string 

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
 export type Int = number 

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
 export type ID_Input = string
export type ID_Output = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
 export type Boolean = boolean 

 export type DateTime = Date | string 