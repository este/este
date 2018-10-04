/**
 * @flow
 */
import type { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
// $FlowFixMe
import type { IResolvers } from 'graphql-tools/dist/Interfaces'
// $FlowFixMe
import type { Options } from 'graphql-binding'
import type { BasePrismaOptions as BPOType } from 'prisma-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    users(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User[]>; 
    webs(args: { where?: WebWhereInput, orderBy?: WebOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web[]>; 
    pages(args: { where?: PageWhereInput, orderBy?: PageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page[]>; 
    elements(args: { where?: ElementWhereInput, orderBy?: ElementOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element[]>; 
    user(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    web(args: { where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    page(args: { where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    element(args: { where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    usersConnection(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<UserConnection>; 
    websConnection(args: { where?: WebWhereInput, orderBy?: WebOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<WebConnection>; 
    pagesConnection(args: { where?: PageWhereInput, orderBy?: PageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<PageConnection>; 
    elementsConnection(args: { where?: ElementWhereInput, orderBy?: ElementOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ElementConnection>; 
    node(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Node | null>; 
  }

export interface Mutation {
    createUser(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User>; 
    createWeb(args: { data: WebCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web>; 
    createPage(args: { data: PageCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page>; 
    createElement(args: { data: ElementCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element>; 
    updateUser(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    updateWeb(args: { data: WebUpdateInput, where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    updatePage(args: { data: PageUpdateInput, where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    updateElement(args: { data: ElementUpdateInput, where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    deleteUser(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    deleteWeb(args: { where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    deletePage(args: { where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    deleteElement(args: { where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    upsertUser(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User>; 
    upsertWeb(args: { where: WebWhereUniqueInput, create: WebCreateInput, update: WebUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web>; 
    upsertPage(args: { where: PageWhereUniqueInput, create: PageCreateInput, update: PageUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page>; 
    upsertElement(args: { where: ElementWhereUniqueInput, create: ElementCreateInput, update: ElementUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element>; 
    updateManyUsers(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyWebs(args: { data: WebUpdateInput, where?: WebWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyPages(args: { data: PageUpdateInput, where?: PageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyElements(args: { data: ElementUpdateInput, where?: ElementWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyUsers(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyWebs(args: { where?: WebWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyPages(args: { where?: PageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyElements(args: { where?: ElementWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
  }

export interface Subscription {
    user(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<UserSubscriptionPayload | null>>; 
    web(args: { where?: WebSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<WebSubscriptionPayload | null>>; 
    page(args: { where?: PageSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<PageSubscriptionPayload | null>>; 
    element(args: { where?: ElementSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ElementSubscriptionPayload | null>>; 
  }

export interface Exists {
User(where?: UserWhereInput): Promise<boolean>;
Web(where?: WebWhereInput): Promise<boolean>;
Page(where?: PageWhereInput): Promise<boolean>;
Element(where?: ElementWhereInput): Promise<boolean>;
}

export interface Prisma {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
  exists: Exists;
  request(query: string, variables?: {[key: string]: any}): Promise<any>;
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BPOType): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateElement {
  count: Int!
}

type AggregatePage {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateWeb {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

scalar DateTime

type Element implements Node {
  id: ID!
  type: ElementType!
  page(where: PageWhereInput): Page!
  path: [Int!]!
}

"""A connection to a list of items."""
type ElementConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ElementEdge]!
  aggregate: AggregateElement!
}

input ElementCreateInput {
  type: ElementType
  path: ElementCreatepathInput
  page: PageCreateOneWithoutElementsInput!
}

input ElementCreateManyWithoutPageInput {
  create: [ElementCreateWithoutPageInput!]
  connect: [ElementWhereUniqueInput!]
}

input ElementCreatepathInput {
  set: [Int!]
}

input ElementCreateWithoutPageInput {
  type: ElementType
  path: ElementCreatepathInput
}

"""An edge in a connection."""
type ElementEdge {
  """The item at the end of the edge."""
  node: Element!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ElementOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ElementPreviousValues {
  id: ID!
  type: ElementType!
  path: [Int!]!
}

type ElementSubscriptionPayload {
  mutation: MutationType!
  node: Element
  updatedFields: [String!]
  previousValues: ElementPreviousValues
}

input ElementSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ElementSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ElementSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ElementSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ElementWhereInput
}

enum ElementType {
  DOCUMENT
  BLOCK
  TEXT
}

input ElementUpdateInput {
  type: ElementType
  path: ElementUpdatepathInput
  page: PageUpdateOneWithoutElementsInput
}

input ElementUpdateManyWithoutPageInput {
  create: [ElementCreateWithoutPageInput!]
  connect: [ElementWhereUniqueInput!]
  disconnect: [ElementWhereUniqueInput!]
  delete: [ElementWhereUniqueInput!]
  update: [ElementUpdateWithWhereUniqueWithoutPageInput!]
  upsert: [ElementUpsertWithWhereUniqueWithoutPageInput!]
}

input ElementUpdatepathInput {
  set: [Int!]
}

input ElementUpdateWithoutPageDataInput {
  type: ElementType
  path: ElementUpdatepathInput
}

input ElementUpdateWithWhereUniqueWithoutPageInput {
  where: ElementWhereUniqueInput!
  data: ElementUpdateWithoutPageDataInput!
}

input ElementUpsertWithWhereUniqueWithoutPageInput {
  where: ElementWhereUniqueInput!
  update: ElementUpdateWithoutPageDataInput!
  create: ElementCreateWithoutPageInput!
}

input ElementWhereInput {
  """Logical AND on all given filters."""
  AND: [ElementWhereInput!]

  """Logical OR on all given filters."""
  OR: [ElementWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ElementWhereInput!]
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
  type: ElementType

  """All values that are not equal to given value."""
  type_not: ElementType

  """All values that are contained in given list."""
  type_in: [ElementType!]

  """All values that are not contained in given list."""
  type_not_in: [ElementType!]
  page: PageWhereInput
}

input ElementWhereUniqueInput {
  id: ID
}

"""Raw JSON value"""
scalar Json

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createUser(data: UserCreateInput!): User!
  createWeb(data: WebCreateInput!): Web!
  createPage(data: PageCreateInput!): Page!
  createElement(data: ElementCreateInput!): Element!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateWeb(data: WebUpdateInput!, where: WebWhereUniqueInput!): Web
  updatePage(data: PageUpdateInput!, where: PageWhereUniqueInput!): Page
  updateElement(data: ElementUpdateInput!, where: ElementWhereUniqueInput!): Element
  deleteUser(where: UserWhereUniqueInput!): User
  deleteWeb(where: WebWhereUniqueInput!): Web
  deletePage(where: PageWhereUniqueInput!): Page
  deleteElement(where: ElementWhereUniqueInput!): Element
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertWeb(where: WebWhereUniqueInput!, create: WebCreateInput!, update: WebUpdateInput!): Web!
  upsertPage(where: PageWhereUniqueInput!, create: PageCreateInput!, update: PageUpdateInput!): Page!
  upsertElement(where: ElementWhereUniqueInput!, create: ElementCreateInput!, update: ElementUpdateInput!): Element!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyWebs(data: WebUpdateInput!, where: WebWhereInput): BatchPayload!
  updateManyPages(data: PageUpdateInput!, where: PageWhereInput): BatchPayload!
  updateManyElements(data: ElementUpdateInput!, where: ElementWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyWebs(where: WebWhereInput): BatchPayload!
  deleteManyPages(where: PageWhereInput): BatchPayload!
  deleteManyElements(where: ElementWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

type Page implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  creator(where: UserWhereInput): User!
  title: String!
  web(where: WebWhereInput): Web!
  content: Json
  elements(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Element!]
}

"""A connection to a list of items."""
type PageConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PageEdge]!
  aggregate: AggregatePage!
}

input PageCreateInput {
  title: String!
  content: Json
  creator: UserCreateOneWithoutPagesInput!
  web: WebCreateOneWithoutPagesInput!
  elements: ElementCreateManyWithoutPageInput
}

input PageCreateManyWithoutCreatorInput {
  create: [PageCreateWithoutCreatorInput!]
  connect: [PageWhereUniqueInput!]
}

input PageCreateManyWithoutWebInput {
  create: [PageCreateWithoutWebInput!]
  connect: [PageWhereUniqueInput!]
}

input PageCreateOneWithoutElementsInput {
  create: PageCreateWithoutElementsInput
  connect: PageWhereUniqueInput
}

input PageCreateWithoutCreatorInput {
  title: String!
  content: Json
  web: WebCreateOneWithoutPagesInput!
  elements: ElementCreateManyWithoutPageInput
}

input PageCreateWithoutElementsInput {
  title: String!
  content: Json
  creator: UserCreateOneWithoutPagesInput!
  web: WebCreateOneWithoutPagesInput!
}

input PageCreateWithoutWebInput {
  title: String!
  content: Json
  creator: UserCreateOneWithoutPagesInput!
  elements: ElementCreateManyWithoutPageInput
}

"""An edge in a connection."""
type PageEdge {
  """The item at the end of the edge."""
  node: Page!

  """A cursor for use in pagination."""
  cursor: String!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

enum PageOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  title_ASC
  title_DESC
  content_ASC
  content_DESC
}

type PagePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  content: Json
}

type PageSubscriptionPayload {
  mutation: MutationType!
  node: Page
  updatedFields: [String!]
  previousValues: PagePreviousValues
}

input PageSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PageSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PageSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PageSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PageWhereInput
}

input PageUpdateInput {
  title: String
  content: Json
  creator: UserUpdateOneWithoutPagesInput
  web: WebUpdateOneWithoutPagesInput
  elements: ElementUpdateManyWithoutPageInput
}

input PageUpdateManyWithoutCreatorInput {
  create: [PageCreateWithoutCreatorInput!]
  connect: [PageWhereUniqueInput!]
  disconnect: [PageWhereUniqueInput!]
  delete: [PageWhereUniqueInput!]
  update: [PageUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [PageUpsertWithWhereUniqueWithoutCreatorInput!]
}

input PageUpdateManyWithoutWebInput {
  create: [PageCreateWithoutWebInput!]
  connect: [PageWhereUniqueInput!]
  disconnect: [PageWhereUniqueInput!]
  delete: [PageWhereUniqueInput!]
  update: [PageUpdateWithWhereUniqueWithoutWebInput!]
  upsert: [PageUpsertWithWhereUniqueWithoutWebInput!]
}

input PageUpdateOneWithoutElementsInput {
  create: PageCreateWithoutElementsInput
  connect: PageWhereUniqueInput
  delete: Boolean
  update: PageUpdateWithoutElementsDataInput
  upsert: PageUpsertWithoutElementsInput
}

input PageUpdateWithoutCreatorDataInput {
  title: String
  content: Json
  web: WebUpdateOneWithoutPagesInput
  elements: ElementUpdateManyWithoutPageInput
}

input PageUpdateWithoutElementsDataInput {
  title: String
  content: Json
  creator: UserUpdateOneWithoutPagesInput
  web: WebUpdateOneWithoutPagesInput
}

input PageUpdateWithoutWebDataInput {
  title: String
  content: Json
  creator: UserUpdateOneWithoutPagesInput
  elements: ElementUpdateManyWithoutPageInput
}

input PageUpdateWithWhereUniqueWithoutCreatorInput {
  where: PageWhereUniqueInput!
  data: PageUpdateWithoutCreatorDataInput!
}

input PageUpdateWithWhereUniqueWithoutWebInput {
  where: PageWhereUniqueInput!
  data: PageUpdateWithoutWebDataInput!
}

input PageUpsertWithoutElementsInput {
  update: PageUpdateWithoutElementsDataInput!
  create: PageCreateWithoutElementsInput!
}

input PageUpsertWithWhereUniqueWithoutCreatorInput {
  where: PageWhereUniqueInput!
  update: PageUpdateWithoutCreatorDataInput!
  create: PageCreateWithoutCreatorInput!
}

input PageUpsertWithWhereUniqueWithoutWebInput {
  where: PageWhereUniqueInput!
  update: PageUpdateWithoutWebDataInput!
  create: PageCreateWithoutWebInput!
}

input PageWhereInput {
  """Logical AND on all given filters."""
  AND: [PageWhereInput!]

  """Logical OR on all given filters."""
  OR: [PageWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PageWhereInput!]
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
  title: String

  """All values that are not equal to given value."""
  title_not: String

  """All values that are contained in given list."""
  title_in: [String!]

  """All values that are not contained in given list."""
  title_not_in: [String!]

  """All values less than the given value."""
  title_lt: String

  """All values less than or equal the given value."""
  title_lte: String

  """All values greater than the given value."""
  title_gt: String

  """All values greater than or equal the given value."""
  title_gte: String

  """All values containing the given string."""
  title_contains: String

  """All values not containing the given string."""
  title_not_contains: String

  """All values starting with the given string."""
  title_starts_with: String

  """All values not starting with the given string."""
  title_not_starts_with: String

  """All values ending with the given string."""
  title_ends_with: String

  """All values not ending with the given string."""
  title_not_ends_with: String
  creator: UserWhereInput
  web: WebWhereInput
  elements_every: ElementWhereInput
  elements_some: ElementWhereInput
  elements_none: ElementWhereInput
}

input PageWhereUniqueInput {
  id: ID
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  webs(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Web]!
  pages(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Page]!
  elements(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Element]!
  user(where: UserWhereUniqueInput!): User
  web(where: WebWhereUniqueInput!): Web
  page(where: PageWhereUniqueInput!): Page
  element(where: ElementWhereUniqueInput!): Element
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  websConnection(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WebConnection!
  pagesConnection(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PageConnection!
  elementsConnection(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ElementConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  web(where: WebSubscriptionWhereInput): WebSubscriptionPayload
  page(where: PageSubscriptionWhereInput): PageSubscriptionPayload
  element(where: ElementSubscriptionWhereInput): ElementSubscriptionPayload
}

type User implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  password: String!
  themeName: String
  webs(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Web!]
  pages(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Page!]
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  themeName: String
  webs: WebCreateManyWithoutCreatorInput
  pages: PageCreateManyWithoutCreatorInput
}

input UserCreateOneWithoutPagesInput {
  create: UserCreateWithoutPagesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutWebsInput {
  create: UserCreateWithoutWebsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutPagesInput {
  email: String!
  password: String!
  themeName: String
  webs: WebCreateManyWithoutCreatorInput
}

input UserCreateWithoutWebsInput {
  email: String!
  password: String!
  themeName: String
  pages: PageCreateManyWithoutCreatorInput
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  themeName_ASC
  themeName_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  password: String!
  themeName: String
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  email: String
  password: String
  themeName: String
  webs: WebUpdateManyWithoutCreatorInput
  pages: PageUpdateManyWithoutCreatorInput
}

input UserUpdateOneWithoutPagesInput {
  create: UserCreateWithoutPagesInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutPagesDataInput
  upsert: UserUpsertWithoutPagesInput
}

input UserUpdateOneWithoutWebsInput {
  create: UserCreateWithoutWebsInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutWebsDataInput
  upsert: UserUpsertWithoutWebsInput
}

input UserUpdateWithoutPagesDataInput {
  email: String
  password: String
  themeName: String
  webs: WebUpdateManyWithoutCreatorInput
}

input UserUpdateWithoutWebsDataInput {
  email: String
  password: String
  themeName: String
  pages: PageUpdateManyWithoutCreatorInput
}

input UserUpsertWithoutPagesInput {
  update: UserUpdateWithoutPagesDataInput!
  create: UserCreateWithoutPagesInput!
}

input UserUpsertWithoutWebsInput {
  update: UserUpdateWithoutWebsDataInput!
  create: UserCreateWithoutWebsInput!
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
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Web implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  creator(where: UserWhereInput): User!
  name: String!
  pages(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Page!]
}

"""A connection to a list of items."""
type WebConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [WebEdge]!
  aggregate: AggregateWeb!
}

input WebCreateInput {
  name: String!
  creator: UserCreateOneWithoutWebsInput!
  pages: PageCreateManyWithoutWebInput
}

input WebCreateManyWithoutCreatorInput {
  create: [WebCreateWithoutCreatorInput!]
  connect: [WebWhereUniqueInput!]
}

input WebCreateOneWithoutPagesInput {
  create: WebCreateWithoutPagesInput
  connect: WebWhereUniqueInput
}

input WebCreateWithoutCreatorInput {
  name: String!
  pages: PageCreateManyWithoutWebInput
}

input WebCreateWithoutPagesInput {
  name: String!
  creator: UserCreateOneWithoutWebsInput!
}

"""An edge in a connection."""
type WebEdge {
  """The item at the end of the edge."""
  node: Web!

  """A cursor for use in pagination."""
  cursor: String!
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

type WebPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
}

type WebSubscriptionPayload {
  mutation: MutationType!
  node: Web
  updatedFields: [String!]
  previousValues: WebPreviousValues
}

input WebSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [WebSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [WebSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [WebSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: WebWhereInput
}

input WebUpdateInput {
  name: String
  creator: UserUpdateOneWithoutWebsInput
  pages: PageUpdateManyWithoutWebInput
}

input WebUpdateManyWithoutCreatorInput {
  create: [WebCreateWithoutCreatorInput!]
  connect: [WebWhereUniqueInput!]
  disconnect: [WebWhereUniqueInput!]
  delete: [WebWhereUniqueInput!]
  update: [WebUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [WebUpsertWithWhereUniqueWithoutCreatorInput!]
}

input WebUpdateOneWithoutPagesInput {
  create: WebCreateWithoutPagesInput
  connect: WebWhereUniqueInput
  delete: Boolean
  update: WebUpdateWithoutPagesDataInput
  upsert: WebUpsertWithoutPagesInput
}

input WebUpdateWithoutCreatorDataInput {
  name: String
  pages: PageUpdateManyWithoutWebInput
}

input WebUpdateWithoutPagesDataInput {
  name: String
  creator: UserUpdateOneWithoutWebsInput
}

input WebUpdateWithWhereUniqueWithoutCreatorInput {
  where: WebWhereUniqueInput!
  data: WebUpdateWithoutCreatorDataInput!
}

input WebUpsertWithoutPagesInput {
  update: WebUpdateWithoutPagesDataInput!
  create: WebCreateWithoutPagesInput!
}

input WebUpsertWithWhereUniqueWithoutCreatorInput {
  where: WebWhereUniqueInput!
  update: WebUpdateWithoutCreatorDataInput!
  create: WebCreateWithoutCreatorInput!
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
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

input WebWhereUniqueInput {
  id: ID
}
`

const prisma: BindingConstructor<Prisma> = makePrismaBindingClass({typeDefs})
 


/**
 * Types
*/

 export type ElementType =
    | 'DOCUMENT'
    | 'BLOCK'
    | 'TEXT'
  

 export type UserOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'email_ASC'
    | 'email_DESC'
    | 'password_ASC'
    | 'password_DESC'
    | 'themeName_ASC'
    | 'themeName_DESC'
  

 export type WebOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'name_ASC'
    | 'name_DESC'
  

 export type PageOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'title_ASC'
    | 'title_DESC'
    | 'content_ASC'
    | 'content_DESC'
  

 export type ElementOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'type_ASC'
    | 'type_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

 export type MutationType =
    | 'CREATED'
    | 'UPDATED'
    | 'DELETED'
  

 export type WebCreateInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  pages?: PageCreateManyWithoutWebInput
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
  pages_every?: PageWhereInput,
  pages_some?: PageWhereInput,
  pages_none?: PageWhereInput
|}

 export type PageCreateWithoutElementsInput = {| 
  title: String,
  content?: Json,
  creator: UserCreateOneWithoutPagesInput,
  web: WebCreateOneWithoutPagesInput
|}

 export type ElementWhereInput = {| 
  AND?: Array< ElementWhereInput > | ElementWhereInput,
  OR?: Array< ElementWhereInput > | ElementWhereInput,
  NOT?: Array< ElementWhereInput > | ElementWhereInput,
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
  type?: ElementType,
  type_not?: ElementType,
  type_in?: Array< ElementType > | ElementType,
  type_not_in?: Array< ElementType > | ElementType,
  page?: PageWhereInput
|}

 export type UserCreateOneWithoutPagesInput = {| 
  create?: UserCreateWithoutPagesInput,
  connect?: UserWhereUniqueInput
|}

 export type PageUpsertWithWhereUniqueWithoutWebInput = {| 
  where: PageWhereUniqueInput,
  update: PageUpdateWithoutWebDataInput,
  create: PageCreateWithoutWebInput
|}

 export type UserCreateWithoutPagesInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput
|}

 export type UserUpdateInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput,
  pages?: PageUpdateManyWithoutCreatorInput
|}

 export type ElementCreateManyWithoutPageInput = {| 
  create?: Array< ElementCreateWithoutPageInput > | ElementCreateWithoutPageInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput
|}

 export type ElementSubscriptionWhereInput = {| 
  AND?: Array< ElementSubscriptionWhereInput > | ElementSubscriptionWhereInput,
  OR?: Array< ElementSubscriptionWhereInput > | ElementSubscriptionWhereInput,
  NOT?: Array< ElementSubscriptionWhereInput > | ElementSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: ElementWhereInput
|}

 export type ElementCreateWithoutPageInput = {| 
  type?: ElementType,
  path?: ElementCreatepathInput
|}

 export type PageSubscriptionWhereInput = {| 
  AND?: Array< PageSubscriptionWhereInput > | PageSubscriptionWhereInput,
  OR?: Array< PageSubscriptionWhereInput > | PageSubscriptionWhereInput,
  NOT?: Array< PageSubscriptionWhereInput > | PageSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: PageWhereInput
|}

 export type ElementCreatepathInput = {| 
  set?: Array< Int > | Int
|}

 export type UserSubscriptionWhereInput = {| 
  AND?: Array< UserSubscriptionWhereInput > | UserSubscriptionWhereInput,
  OR?: Array< UserSubscriptionWhereInput > | UserSubscriptionWhereInput,
  NOT?: Array< UserSubscriptionWhereInput > | UserSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: UserWhereInput
|}

 export type PageCreateManyWithoutCreatorInput = {| 
  create?: Array< PageCreateWithoutCreatorInput > | PageCreateWithoutCreatorInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput
|}

 export type UserWhereUniqueInput = {| 
  id?: ID_Input,
  email?: String
|}

 export type PageCreateWithoutCreatorInput = {| 
  title: String,
  content?: Json,
  web: WebCreateOneWithoutPagesInput,
  elements?: ElementCreateManyWithoutPageInput
|}

 export type PageWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type WebCreateOneWithoutPagesInput = {| 
  create?: WebCreateWithoutPagesInput,
  connect?: WebWhereUniqueInput
|}

 export type PageUpdateWithoutElementsDataInput = {| 
  title?: String,
  content?: Json,
  creator?: UserUpdateOneWithoutPagesInput,
  web?: WebUpdateOneWithoutPagesInput
|}

 export type WebCreateWithoutPagesInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput
|}

 export type ElementUpdateInput = {| 
  type?: ElementType,
  path?: ElementUpdatepathInput,
  page?: PageUpdateOneWithoutElementsInput
|}

 export type UserCreateOneWithoutWebsInput = {| 
  create?: UserCreateWithoutWebsInput,
  connect?: UserWhereUniqueInput
|}

 export type WebUpdateInput = {| 
  name?: String,
  creator?: UserUpdateOneWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput
|}

 export type UserCreateWithoutWebsInput = {| 
  email: String,
  password: String,
  themeName?: String,
  pages?: PageCreateManyWithoutCreatorInput
|}

 export type WebUpsertWithoutPagesInput = {| 
  update: WebUpdateWithoutPagesDataInput,
  create: WebCreateWithoutPagesInput
|}

 export type PageUpdateManyWithoutCreatorInput = {| 
  create?: Array< PageCreateWithoutCreatorInput > | PageCreateWithoutCreatorInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  disconnect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  delete?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  update?: Array< PageUpdateWithWhereUniqueWithoutCreatorInput > | PageUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< PageUpsertWithWhereUniqueWithoutCreatorInput > | PageUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type UserUpdateWithoutWebsDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  pages?: PageUpdateManyWithoutCreatorInput
|}

 export type PageCreateInput = {| 
  title: String,
  content?: Json,
  creator: UserCreateOneWithoutPagesInput,
  web: WebCreateOneWithoutPagesInput,
  elements?: ElementCreateManyWithoutPageInput
|}

 export type WebUpdateWithoutPagesDataInput = {| 
  name?: String,
  creator?: UserUpdateOneWithoutWebsInput
|}

 export type ElementCreateInput = {| 
  type?: ElementType,
  path?: ElementCreatepathInput,
  page: PageCreateOneWithoutElementsInput
|}

 export type PageUpdateWithoutCreatorDataInput = {| 
  title?: String,
  content?: Json,
  web?: WebUpdateOneWithoutPagesInput,
  elements?: ElementUpdateManyWithoutPageInput
|}

 export type PageCreateOneWithoutElementsInput = {| 
  create?: PageCreateWithoutElementsInput,
  connect?: PageWhereUniqueInput
|}

 export type UserCreateInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput,
  pages?: PageCreateManyWithoutCreatorInput
|}

 export type WebUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: WebWhereUniqueInput,
  update: WebUpdateWithoutCreatorDataInput,
  create: WebCreateWithoutCreatorInput
|}

 export type WebCreateWithoutCreatorInput = {| 
  name: String,
  pages?: PageCreateManyWithoutWebInput
|}

 export type PageCreateWithoutWebInput = {| 
  title: String,
  content?: Json,
  creator: UserCreateOneWithoutPagesInput,
  elements?: ElementCreateManyWithoutPageInput
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
  pages_every?: PageWhereInput,
  pages_some?: PageWhereInput,
  pages_none?: PageWhereInput
|}

 export type WebUpdateManyWithoutCreatorInput = {| 
  create?: Array< WebCreateWithoutCreatorInput > | WebCreateWithoutCreatorInput,
  connect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  disconnect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  delete?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  update?: Array< WebUpdateWithWhereUniqueWithoutCreatorInput > | WebUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< WebUpsertWithWhereUniqueWithoutCreatorInput > | WebUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type PageUpsertWithoutElementsInput = {| 
  update: PageUpdateWithoutElementsDataInput,
  create: PageCreateWithoutElementsInput
|}

 export type WebUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: WebWhereUniqueInput,
  data: WebUpdateWithoutCreatorDataInput
|}

 export type ElementWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type WebUpdateWithoutCreatorDataInput = {| 
  name?: String,
  pages?: PageUpdateManyWithoutWebInput
|}

 export type PageUpdateInput = {| 
  title?: String,
  content?: Json,
  creator?: UserUpdateOneWithoutPagesInput,
  web?: WebUpdateOneWithoutPagesInput,
  elements?: ElementUpdateManyWithoutPageInput
|}

 export type PageUpdateManyWithoutWebInput = {| 
  create?: Array< PageCreateWithoutWebInput > | PageCreateWithoutWebInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  disconnect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  delete?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  update?: Array< PageUpdateWithWhereUniqueWithoutWebInput > | PageUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< PageUpsertWithWhereUniqueWithoutWebInput > | PageUpsertWithWhereUniqueWithoutWebInput
|}

 export type UserUpsertWithoutWebsInput = {| 
  update: UserUpdateWithoutWebsDataInput,
  create: UserCreateWithoutWebsInput
|}

 export type PageUpdateWithWhereUniqueWithoutWebInput = {| 
  where: PageWhereUniqueInput,
  data: PageUpdateWithoutWebDataInput
|}

 export type WebUpdateOneWithoutPagesInput = {| 
  create?: WebCreateWithoutPagesInput,
  connect?: WebWhereUniqueInput,
  delete?: Boolean,
  update?: WebUpdateWithoutPagesDataInput,
  upsert?: WebUpsertWithoutPagesInput
|}

 export type PageUpdateWithoutWebDataInput = {| 
  title?: String,
  content?: Json,
  creator?: UserUpdateOneWithoutPagesInput,
  elements?: ElementUpdateManyWithoutPageInput
|}

 export type WebCreateManyWithoutCreatorInput = {| 
  create?: Array< WebCreateWithoutCreatorInput > | WebCreateWithoutCreatorInput,
  connect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput
|}

 export type UserUpdateOneWithoutPagesInput = {| 
  create?: UserCreateWithoutPagesInput,
  connect?: UserWhereUniqueInput,
  delete?: Boolean,
  update?: UserUpdateWithoutPagesDataInput,
  upsert?: UserUpsertWithoutPagesInput
|}

 export type PageWhereInput = {| 
  AND?: Array< PageWhereInput > | PageWhereInput,
  OR?: Array< PageWhereInput > | PageWhereInput,
  NOT?: Array< PageWhereInput > | PageWhereInput,
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
  title?: String,
  title_not?: String,
  title_in?: Array< String > | String,
  title_not_in?: Array< String > | String,
  title_lt?: String,
  title_lte?: String,
  title_gt?: String,
  title_gte?: String,
  title_contains?: String,
  title_not_contains?: String,
  title_starts_with?: String,
  title_not_starts_with?: String,
  title_ends_with?: String,
  title_not_ends_with?: String,
  creator?: UserWhereInput,
  web?: WebWhereInput,
  elements_every?: ElementWhereInput,
  elements_some?: ElementWhereInput,
  elements_none?: ElementWhereInput
|}

 export type UserUpdateWithoutPagesDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput
|}

 export type WebWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type UserUpsertWithoutPagesInput = {| 
  update: UserUpdateWithoutPagesDataInput,
  create: UserCreateWithoutPagesInput
|}

 export type PageUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: PageWhereUniqueInput,
  update: PageUpdateWithoutCreatorDataInput,
  create: PageCreateWithoutCreatorInput
|}

 export type ElementUpdateManyWithoutPageInput = {| 
  create?: Array< ElementCreateWithoutPageInput > | ElementCreateWithoutPageInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  disconnect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  delete?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  update?: Array< ElementUpdateWithWhereUniqueWithoutPageInput > | ElementUpdateWithWhereUniqueWithoutPageInput,
  upsert?: Array< ElementUpsertWithWhereUniqueWithoutPageInput > | ElementUpsertWithWhereUniqueWithoutPageInput
|}

 export type PageUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: PageWhereUniqueInput,
  data: PageUpdateWithoutCreatorDataInput
|}

 export type ElementUpsertWithWhereUniqueWithoutPageInput = {| 
  where: ElementWhereUniqueInput,
  update: ElementUpdateWithoutPageDataInput,
  create: ElementCreateWithoutPageInput
|}

 export type ElementUpdatepathInput = {| 
  set?: Array< Int > | Int
|}

 export type ElementUpdateWithoutPageDataInput = {| 
  type?: ElementType,
  path?: ElementUpdatepathInput
|}

 export type ElementUpdateWithWhereUniqueWithoutPageInput = {| 
  where: ElementWhereUniqueInput,
  data: ElementUpdateWithoutPageDataInput
|}

 export type PageCreateManyWithoutWebInput = {| 
  create?: Array< PageCreateWithoutWebInput > | PageCreateWithoutWebInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput
|}

 export type UserUpdateOneWithoutWebsInput = {| 
  create?: UserCreateWithoutWebsInput,
  connect?: UserWhereUniqueInput,
  delete?: Boolean,
  update?: UserUpdateWithoutWebsDataInput,
  upsert?: UserUpsertWithoutWebsInput
|}

 export type PageUpdateOneWithoutElementsInput = {| 
  create?: PageCreateWithoutElementsInput,
  connect?: PageWhereUniqueInput,
  delete?: Boolean,
  update?: PageUpdateWithoutElementsDataInput,
  upsert?: PageUpsertWithoutElementsInput
|}

 export type WebSubscriptionWhereInput = {| 
  AND?: Array< WebSubscriptionWhereInput > | WebSubscriptionWhereInput,
  OR?: Array< WebSubscriptionWhereInput > | WebSubscriptionWhereInput,
  NOT?: Array< WebSubscriptionWhereInput > | WebSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: WebWhereInput
|}

/*
 * An object with an ID

*/
 export type Node = {| 
   id: ID_Output,
|}

 export type ElementPreviousValues = {| 
   id: ID_Output,
   type: ElementType,
   path: Int[],
|}

 export type Element = {| ...Node,
 
   id: ID_Output,
   type: ElementType,
   page: Page,
   path: Int[],
|}

 export type User = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   email: String,
   password: String,
   themeName?: String,
   webs?: Web[],
   pages?: Page[],
|}

 export type BatchPayload = {| 
   count: Long,
|}

 export type AggregateElement = {| 
   count: Int,
|}

/*
 * A connection to a list of items.

*/
 export type UserConnection = {| 
   pageInfo: PageInfo,
   edges: UserEdge[],
   aggregate: AggregateUser,
|}

 export type WebPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   name: String,
|}

 export type Web = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   creator: User,
   name: String,
   pages?: Page[],
|}

/*
 * A connection to a list of items.

*/
 export type ElementConnection = {| 
   pageInfo: PageInfo,
   edges: ElementEdge[],
   aggregate: AggregateElement,
|}

/*
 * An edge in a connection.

*/
 export type ElementEdge = {| 
   node: Element,
   cursor: String,
|}

/*
 * A connection to a list of items.

*/
 export type PageConnection = {| 
   pageInfo: PageInfo,
   edges: PageEdge[],
   aggregate: AggregatePage,
|}

 export type AggregatePage = {| 
   count: Int,
|}

/*
 * An edge in a connection.

*/
 export type WebEdge = {| 
   node: Web,
   cursor: String,
|}

 export type PagePreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   title: String,
   content?: Json,
|}

 export type AggregateUser = {| 
   count: Int,
|}

 export type PageSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Page,
   updatedFields?: String[],
   previousValues?: PagePreviousValues,
|}

 export type ElementSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Element,
   updatedFields?: String[],
   previousValues?: ElementPreviousValues,
|}

/*
 * An edge in a connection.

*/
 export type PageEdge = {| 
   node: Page,
   cursor: String,
|}

 export type WebSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Web,
   updatedFields?: String[],
   previousValues?: WebPreviousValues,
|}

 export type Page = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   creator: User,
   title: String,
   web: Web,
   content?: Json,
   elements?: Element[],
|}

 export type UserPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   email: String,
   password: String,
   themeName?: String,
|}

 export type UserSubscriptionPayload = {| 
   mutation: MutationType,
   node?: User,
   updatedFields?: String[],
   previousValues?: UserPreviousValues,
|}

 export type AggregateWeb = {| 
   count: Int,
|}

/*
 * Information about pagination in a connection.

*/
 export type PageInfo = {| 
   hasNextPage: Boolean,
   hasPreviousPage: Boolean,
   startCursor?: String,
   endCursor?: String,
|}

/*
 * An edge in a connection.

*/
 export type UserEdge = {| 
   node: User,
   cursor: String,
|}

/*
 * A connection to a list of items.

*/
 export type WebConnection = {| 
   pageInfo: PageInfo,
   edges: WebEdge[],
   aggregate: AggregateWeb,
|}

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
 export type Long = string 

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
 export type Int = number 

/*
The `Boolean` scalar type represents `true` or `false`.
*/
 export type Boolean = boolean 

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
 export type ID_Input = string
export type ID_Output = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
 export type String = string 

 export type DateTime = Date | string 

/*
Raw JSON value
*/
 export type Json = string 