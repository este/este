/**
 * @flow
 */
// $FlowFixMe
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
// $FlowFixMe
import { IResolvers } from 'graphql-tools/dist/Interfaces'
// $FlowFixMe
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    users(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User[]>; 
    webs(args: { where?: WebWhereInput, orderBy?: WebOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web[]>; 
    pages(args: { where?: PageWhereInput, orderBy?: PageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page[]>; 
    children(args: { where?: ChildWhereInput, orderBy?: ChildOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Child[]>; 
    elements(args: { where?: ElementWhereInput, orderBy?: ElementOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element[]>; 
    images(args: { where?: ImageWhereInput, orderBy?: ImageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image[]>; 
    user(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    web(args: { where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    page(args: { where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    child(args: { where: ChildWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Child | null>; 
    element(args: { where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    image(args: { where: ImageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image | null>; 
    usersConnection(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<UserConnection>; 
    websConnection(args: { where?: WebWhereInput, orderBy?: WebOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<WebConnection>; 
    pagesConnection(args: { where?: PageWhereInput, orderBy?: PageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<PageConnection>; 
    childrenConnection(args: { where?: ChildWhereInput, orderBy?: ChildOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ChildConnection>; 
    elementsConnection(args: { where?: ElementWhereInput, orderBy?: ElementOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ElementConnection>; 
    imagesConnection(args: { where?: ImageWhereInput, orderBy?: ImageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ImageConnection>; 
    node(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Node | null>; 
  }

export interface Mutation {
    createUser(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User>; 
    createWeb(args: { data: WebCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web>; 
    createPage(args: { data: PageCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page>; 
    createChild(args: { data: ChildCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Child>; 
    createElement(args: { data: ElementCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element>; 
    createImage(args: { data: ImageCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image>; 
    updateUser(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    updateWeb(args: { data: WebUpdateInput, where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    updatePage(args: { data: PageUpdateInput, where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    updateChild(args: { data: ChildUpdateInput, where: ChildWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Child | null>; 
    updateElement(args: { data: ElementUpdateInput, where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    updateImage(args: { data: ImageUpdateInput, where: ImageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image | null>; 
    deleteUser(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    deleteWeb(args: { where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    deletePage(args: { where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    deleteChild(args: { where: ChildWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Child | null>; 
    deleteElement(args: { where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    deleteImage(args: { where: ImageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image | null>; 
    upsertUser(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User>; 
    upsertWeb(args: { where: WebWhereUniqueInput, create: WebCreateInput, update: WebUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web>; 
    upsertPage(args: { where: PageWhereUniqueInput, create: PageCreateInput, update: PageUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page>; 
    upsertChild(args: { where: ChildWhereUniqueInput, create: ChildCreateInput, update: ChildUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Child>; 
    upsertElement(args: { where: ElementWhereUniqueInput, create: ElementCreateInput, update: ElementUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element>; 
    upsertImage(args: { where: ImageWhereUniqueInput, create: ImageCreateInput, update: ImageUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image>; 
    updateManyUsers(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyWebs(args: { data: WebUpdateInput, where?: WebWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyPages(args: { data: PageUpdateInput, where?: PageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyChildren(args: { data: ChildUpdateInput, where?: ChildWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyElements(args: { data: ElementUpdateInput, where?: ElementWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyImages(args: { data: ImageUpdateInput, where?: ImageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyUsers(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyWebs(args: { where?: WebWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyPages(args: { where?: PageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyChildren(args: { where?: ChildWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyElements(args: { where?: ElementWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyImages(args: { where?: ImageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
  }

export interface Subscription {
    user(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<UserSubscriptionPayload | null>>; 
    web(args: { where?: WebSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<WebSubscriptionPayload | null>>; 
    page(args: { where?: PageSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<PageSubscriptionPayload | null>>; 
    child(args: { where?: ChildSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ChildSubscriptionPayload | null>>; 
    element(args: { where?: ElementSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ElementSubscriptionPayload | null>>; 
    image(args: { where?: ImageSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ImageSubscriptionPayload | null>>; 
  }

export interface Exists {
User(where?: UserWhereInput): Promise<boolean>;
Web(where?: WebWhereInput): Promise<boolean>;
Page(where?: PageWhereInput): Promise<boolean>;
Child(where?: ChildWhereInput): Promise<boolean>;
Element(where?: ElementWhereInput): Promise<boolean>;
Image(where?: ImageWhereInput): Promise<boolean>;
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
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateChild {
  count: Int!
}

type AggregateElement {
  count: Int!
}

type AggregateImage {
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

type Child implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  index: Int!
  parent(where: ElementWhereInput): Element!
  element(where: ElementWhereInput): Element!
}

"""A connection to a list of items."""
type ChildConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ChildEdge]!
  aggregate: AggregateChild!
}

input ChildCreateInput {
  index: Int!
  parent: ElementCreateOneWithoutChildrenInput!
  element: ElementCreateOneWithoutParentInput!
}

input ChildCreateManyWithoutElementInput {
  create: [ChildCreateWithoutElementInput!]
  connect: [ChildWhereUniqueInput!]
}

input ChildCreateManyWithoutParentInput {
  create: [ChildCreateWithoutParentInput!]
  connect: [ChildWhereUniqueInput!]
}

input ChildCreateWithoutElementInput {
  index: Int!
  parent: ElementCreateOneWithoutChildrenInput!
}

input ChildCreateWithoutParentInput {
  index: Int!
  element: ElementCreateOneWithoutParentInput!
}

"""An edge in a connection."""
type ChildEdge {
  """The item at the end of the edge."""
  node: Child!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ChildOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  index_ASC
  index_DESC
}

type ChildPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  index: Int!
}

type ChildSubscriptionPayload {
  mutation: MutationType!
  node: Child
  updatedFields: [String!]
  previousValues: ChildPreviousValues
}

input ChildSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ChildSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ChildSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ChildSubscriptionWhereInput!]

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
  node: ChildWhereInput
}

input ChildUpdateInput {
  index: Int
  parent: ElementUpdateOneWithoutChildrenInput
  element: ElementUpdateOneWithoutParentInput
}

input ChildUpdateManyWithoutElementInput {
  create: [ChildCreateWithoutElementInput!]
  connect: [ChildWhereUniqueInput!]
  disconnect: [ChildWhereUniqueInput!]
  delete: [ChildWhereUniqueInput!]
  update: [ChildUpdateWithWhereUniqueWithoutElementInput!]
  upsert: [ChildUpsertWithWhereUniqueWithoutElementInput!]
}

input ChildUpdateManyWithoutParentInput {
  create: [ChildCreateWithoutParentInput!]
  connect: [ChildWhereUniqueInput!]
  disconnect: [ChildWhereUniqueInput!]
  delete: [ChildWhereUniqueInput!]
  update: [ChildUpdateWithWhereUniqueWithoutParentInput!]
  upsert: [ChildUpsertWithWhereUniqueWithoutParentInput!]
}

input ChildUpdateWithoutElementDataInput {
  index: Int
  parent: ElementUpdateOneWithoutChildrenInput
}

input ChildUpdateWithoutParentDataInput {
  index: Int
  element: ElementUpdateOneWithoutParentInput
}

input ChildUpdateWithWhereUniqueWithoutElementInput {
  where: ChildWhereUniqueInput!
  data: ChildUpdateWithoutElementDataInput!
}

input ChildUpdateWithWhereUniqueWithoutParentInput {
  where: ChildWhereUniqueInput!
  data: ChildUpdateWithoutParentDataInput!
}

input ChildUpsertWithWhereUniqueWithoutElementInput {
  where: ChildWhereUniqueInput!
  update: ChildUpdateWithoutElementDataInput!
  create: ChildCreateWithoutElementInput!
}

input ChildUpsertWithWhereUniqueWithoutParentInput {
  where: ChildWhereUniqueInput!
  update: ChildUpdateWithoutParentDataInput!
  create: ChildCreateWithoutParentInput!
}

input ChildWhereInput {
  """Logical AND on all given filters."""
  AND: [ChildWhereInput!]

  """Logical OR on all given filters."""
  OR: [ChildWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ChildWhereInput!]
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
  index: Int

  """All values that are not equal to given value."""
  index_not: Int

  """All values that are contained in given list."""
  index_in: [Int!]

  """All values that are not contained in given list."""
  index_not_in: [Int!]

  """All values less than the given value."""
  index_lt: Int

  """All values less than or equal the given value."""
  index_lte: Int

  """All values greater than the given value."""
  index_gt: Int

  """All values greater than or equal the given value."""
  index_gte: Int
  parent: ElementWhereInput
  element: ElementWhereInput
}

input ChildWhereUniqueInput {
  id: ID
}

scalar DateTime

type Element implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String
  type: ElementType!
  text: String
  textFormat: String!
  image(where: ImageWhereInput): Image
  children(where: ChildWhereInput, orderBy: ChildOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Child!]
  creator(where: UserWhereInput): User!
  parent(where: ChildWhereInput, orderBy: ChildOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Child!]
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
  name: String
  type: ElementType!
  text: String
  textFormat: String
  image: ImageCreateOneInput
  children: ChildCreateManyWithoutParentInput
  creator: UserCreateOneWithoutElementsInput!
  parent: ChildCreateManyWithoutElementInput
}

input ElementCreateManyWithoutCreatorInput {
  create: [ElementCreateWithoutCreatorInput!]
  connect: [ElementWhereUniqueInput!]
}

input ElementCreateOneInput {
  create: ElementCreateInput
  connect: ElementWhereUniqueInput
}

input ElementCreateOneWithoutChildrenInput {
  create: ElementCreateWithoutChildrenInput
  connect: ElementWhereUniqueInput
}

input ElementCreateOneWithoutParentInput {
  create: ElementCreateWithoutParentInput
  connect: ElementWhereUniqueInput
}

input ElementCreateWithoutChildrenInput {
  name: String
  type: ElementType!
  text: String
  textFormat: String
  image: ImageCreateOneInput
  creator: UserCreateOneWithoutElementsInput!
  parent: ChildCreateManyWithoutElementInput
}

input ElementCreateWithoutCreatorInput {
  name: String
  type: ElementType!
  text: String
  textFormat: String
  image: ImageCreateOneInput
  children: ChildCreateManyWithoutParentInput
  parent: ChildCreateManyWithoutElementInput
}

input ElementCreateWithoutParentInput {
  name: String
  type: ElementType!
  text: String
  textFormat: String
  image: ImageCreateOneInput
  children: ChildCreateManyWithoutParentInput
  creator: UserCreateOneWithoutElementsInput!
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
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  type_ASC
  type_DESC
  text_ASC
  text_DESC
  textFormat_ASC
  textFormat_DESC
}

type ElementPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String
  type: ElementType!
  text: String
  textFormat: String!
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
  TEXT
  IMAGE
  CHILDREN
}

input ElementUpdateDataInput {
  name: String
  type: ElementType
  text: String
  textFormat: String
  image: ImageUpdateOneInput
  children: ChildUpdateManyWithoutParentInput
  creator: UserUpdateOneWithoutElementsInput
  parent: ChildUpdateManyWithoutElementInput
}

input ElementUpdateInput {
  name: String
  type: ElementType
  text: String
  textFormat: String
  image: ImageUpdateOneInput
  children: ChildUpdateManyWithoutParentInput
  creator: UserUpdateOneWithoutElementsInput
  parent: ChildUpdateManyWithoutElementInput
}

input ElementUpdateManyWithoutCreatorInput {
  create: [ElementCreateWithoutCreatorInput!]
  connect: [ElementWhereUniqueInput!]
  disconnect: [ElementWhereUniqueInput!]
  delete: [ElementWhereUniqueInput!]
  update: [ElementUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [ElementUpsertWithWhereUniqueWithoutCreatorInput!]
}

input ElementUpdateOneInput {
  create: ElementCreateInput
  connect: ElementWhereUniqueInput
  delete: Boolean
  update: ElementUpdateDataInput
  upsert: ElementUpsertNestedInput
}

input ElementUpdateOneWithoutChildrenInput {
  create: ElementCreateWithoutChildrenInput
  connect: ElementWhereUniqueInput
  delete: Boolean
  update: ElementUpdateWithoutChildrenDataInput
  upsert: ElementUpsertWithoutChildrenInput
}

input ElementUpdateOneWithoutParentInput {
  create: ElementCreateWithoutParentInput
  connect: ElementWhereUniqueInput
  delete: Boolean
  update: ElementUpdateWithoutParentDataInput
  upsert: ElementUpsertWithoutParentInput
}

input ElementUpdateWithoutChildrenDataInput {
  name: String
  type: ElementType
  text: String
  textFormat: String
  image: ImageUpdateOneInput
  creator: UserUpdateOneWithoutElementsInput
  parent: ChildUpdateManyWithoutElementInput
}

input ElementUpdateWithoutCreatorDataInput {
  name: String
  type: ElementType
  text: String
  textFormat: String
  image: ImageUpdateOneInput
  children: ChildUpdateManyWithoutParentInput
  parent: ChildUpdateManyWithoutElementInput
}

input ElementUpdateWithoutParentDataInput {
  name: String
  type: ElementType
  text: String
  textFormat: String
  image: ImageUpdateOneInput
  children: ChildUpdateManyWithoutParentInput
  creator: UserUpdateOneWithoutElementsInput
}

input ElementUpdateWithWhereUniqueWithoutCreatorInput {
  where: ElementWhereUniqueInput!
  data: ElementUpdateWithoutCreatorDataInput!
}

input ElementUpsertNestedInput {
  update: ElementUpdateDataInput!
  create: ElementCreateInput!
}

input ElementUpsertWithoutChildrenInput {
  update: ElementUpdateWithoutChildrenDataInput!
  create: ElementCreateWithoutChildrenInput!
}

input ElementUpsertWithoutParentInput {
  update: ElementUpdateWithoutParentDataInput!
  create: ElementCreateWithoutParentInput!
}

input ElementUpsertWithWhereUniqueWithoutCreatorInput {
  where: ElementWhereUniqueInput!
  update: ElementUpdateWithoutCreatorDataInput!
  create: ElementCreateWithoutCreatorInput!
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
  type: ElementType

  """All values that are not equal to given value."""
  type_not: ElementType

  """All values that are contained in given list."""
  type_in: [ElementType!]

  """All values that are not contained in given list."""
  type_not_in: [ElementType!]
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
  image: ImageWhereInput
  children_every: ChildWhereInput
  children_some: ChildWhereInput
  children_none: ChildWhereInput
  creator: UserWhereInput
  parent_every: ChildWhereInput
  parent_some: ChildWhereInput
  parent_none: ChildWhereInput
  _MagicalBackRelation_ElementToPage_every: PageWhereInput
  _MagicalBackRelation_ElementToPage_some: PageWhereInput
  _MagicalBackRelation_ElementToPage_none: PageWhereInput
}

input ElementWhereUniqueInput {
  id: ID
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

"""A connection to a list of items."""
type ImageConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ImageEdge]!
  aggregate: AggregateImage!
}

input ImageCreateInput {
  src: String!
  width: Int!
  height: Int!
  creator: UserCreateOneWithoutImagesInput!
}

input ImageCreateManyWithoutCreatorInput {
  create: [ImageCreateWithoutCreatorInput!]
  connect: [ImageWhereUniqueInput!]
}

input ImageCreateOneInput {
  create: ImageCreateInput
  connect: ImageWhereUniqueInput
}

input ImageCreateWithoutCreatorInput {
  src: String!
  width: Int!
  height: Int!
}

"""An edge in a connection."""
type ImageEdge {
  """The item at the end of the edge."""
  node: Image!

  """A cursor for use in pagination."""
  cursor: String!
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

type ImagePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  src: String!
  width: Int!
  height: Int!
}

type ImageSubscriptionPayload {
  mutation: MutationType!
  node: Image
  updatedFields: [String!]
  previousValues: ImagePreviousValues
}

input ImageSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ImageSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ImageSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ImageSubscriptionWhereInput!]

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
  node: ImageWhereInput
}

input ImageUpdateDataInput {
  src: String
  width: Int
  height: Int
  creator: UserUpdateOneWithoutImagesInput
}

input ImageUpdateInput {
  src: String
  width: Int
  height: Int
  creator: UserUpdateOneWithoutImagesInput
}

input ImageUpdateManyWithoutCreatorInput {
  create: [ImageCreateWithoutCreatorInput!]
  connect: [ImageWhereUniqueInput!]
  disconnect: [ImageWhereUniqueInput!]
  delete: [ImageWhereUniqueInput!]
  update: [ImageUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [ImageUpsertWithWhereUniqueWithoutCreatorInput!]
}

input ImageUpdateOneInput {
  create: ImageCreateInput
  connect: ImageWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ImageUpdateDataInput
  upsert: ImageUpsertNestedInput
}

input ImageUpdateWithoutCreatorDataInput {
  src: String
  width: Int
  height: Int
}

input ImageUpdateWithWhereUniqueWithoutCreatorInput {
  where: ImageWhereUniqueInput!
  data: ImageUpdateWithoutCreatorDataInput!
}

input ImageUpsertNestedInput {
  update: ImageUpdateDataInput!
  create: ImageCreateInput!
}

input ImageUpsertWithWhereUniqueWithoutCreatorInput {
  where: ImageWhereUniqueInput!
  update: ImageUpdateWithoutCreatorDataInput!
  create: ImageCreateWithoutCreatorInput!
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
  _MagicalBackRelation_ElementToImage_every: ElementWhereInput
  _MagicalBackRelation_ElementToImage_some: ElementWhereInput
  _MagicalBackRelation_ElementToImage_none: ElementWhereInput
}

input ImageWhereUniqueInput {
  id: ID
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createUser(data: UserCreateInput!): User!
  createWeb(data: WebCreateInput!): Web!
  createPage(data: PageCreateInput!): Page!
  createChild(data: ChildCreateInput!): Child!
  createElement(data: ElementCreateInput!): Element!
  createImage(data: ImageCreateInput!): Image!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateWeb(data: WebUpdateInput!, where: WebWhereUniqueInput!): Web
  updatePage(data: PageUpdateInput!, where: PageWhereUniqueInput!): Page
  updateChild(data: ChildUpdateInput!, where: ChildWhereUniqueInput!): Child
  updateElement(data: ElementUpdateInput!, where: ElementWhereUniqueInput!): Element
  updateImage(data: ImageUpdateInput!, where: ImageWhereUniqueInput!): Image
  deleteUser(where: UserWhereUniqueInput!): User
  deleteWeb(where: WebWhereUniqueInput!): Web
  deletePage(where: PageWhereUniqueInput!): Page
  deleteChild(where: ChildWhereUniqueInput!): Child
  deleteElement(where: ElementWhereUniqueInput!): Element
  deleteImage(where: ImageWhereUniqueInput!): Image
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertWeb(where: WebWhereUniqueInput!, create: WebCreateInput!, update: WebUpdateInput!): Web!
  upsertPage(where: PageWhereUniqueInput!, create: PageCreateInput!, update: PageUpdateInput!): Page!
  upsertChild(where: ChildWhereUniqueInput!, create: ChildCreateInput!, update: ChildUpdateInput!): Child!
  upsertElement(where: ElementWhereUniqueInput!, create: ElementCreateInput!, update: ElementUpdateInput!): Element!
  upsertImage(where: ImageWhereUniqueInput!, create: ImageCreateInput!, update: ImageUpdateInput!): Image!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyWebs(data: WebUpdateInput!, where: WebWhereInput): BatchPayload!
  updateManyPages(data: PageUpdateInput!, where: PageWhereInput): BatchPayload!
  updateManyChildren(data: ChildUpdateInput!, where: ChildWhereInput): BatchPayload!
  updateManyElements(data: ElementUpdateInput!, where: ElementWhereInput): BatchPayload!
  updateManyImages(data: ImageUpdateInput!, where: ImageWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyWebs(where: WebWhereInput): BatchPayload!
  deleteManyPages(where: PageWhereInput): BatchPayload!
  deleteManyChildren(where: ChildWhereInput): BatchPayload!
  deleteManyElements(where: ElementWhereInput): BatchPayload!
  deleteManyImages(where: ImageWhereInput): BatchPayload!
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
  title: String!
  creator(where: UserWhereInput): User!
  web(where: WebWhereInput): Web!
  element(where: ElementWhereInput): Element!
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
  creator: UserCreateOneWithoutPagesInput!
  web: WebCreateOneWithoutPagesInput!
  element: ElementCreateOneInput!
}

input PageCreateManyWithoutCreatorInput {
  create: [PageCreateWithoutCreatorInput!]
  connect: [PageWhereUniqueInput!]
}

input PageCreateManyWithoutWebInput {
  create: [PageCreateWithoutWebInput!]
  connect: [PageWhereUniqueInput!]
}

input PageCreateWithoutCreatorInput {
  title: String!
  web: WebCreateOneWithoutPagesInput!
  element: ElementCreateOneInput!
}

input PageCreateWithoutWebInput {
  title: String!
  creator: UserCreateOneWithoutPagesInput!
  element: ElementCreateOneInput!
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
}

type PagePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
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
  creator: UserUpdateOneWithoutPagesInput
  web: WebUpdateOneWithoutPagesInput
  element: ElementUpdateOneInput
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

input PageUpdateWithoutCreatorDataInput {
  title: String
  web: WebUpdateOneWithoutPagesInput
  element: ElementUpdateOneInput
}

input PageUpdateWithoutWebDataInput {
  title: String
  creator: UserUpdateOneWithoutPagesInput
  element: ElementUpdateOneInput
}

input PageUpdateWithWhereUniqueWithoutCreatorInput {
  where: PageWhereUniqueInput!
  data: PageUpdateWithoutCreatorDataInput!
}

input PageUpdateWithWhereUniqueWithoutWebInput {
  where: PageWhereUniqueInput!
  data: PageUpdateWithoutWebDataInput!
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
  element: ElementWhereInput
}

input PageWhereUniqueInput {
  id: ID
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  webs(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Web]!
  pages(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Page]!
  children(where: ChildWhereInput, orderBy: ChildOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Child]!
  elements(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Element]!
  images(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image]!
  user(where: UserWhereUniqueInput!): User
  web(where: WebWhereUniqueInput!): Web
  page(where: PageWhereUniqueInput!): Page
  child(where: ChildWhereUniqueInput!): Child
  element(where: ElementWhereUniqueInput!): Element
  image(where: ImageWhereUniqueInput!): Image
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  websConnection(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WebConnection!
  pagesConnection(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PageConnection!
  childrenConnection(where: ChildWhereInput, orderBy: ChildOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ChildConnection!
  elementsConnection(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ElementConnection!
  imagesConnection(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ImageConnection!

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
  child(where: ChildSubscriptionWhereInput): ChildSubscriptionPayload
  element(where: ElementSubscriptionWhereInput): ElementSubscriptionPayload
  image(where: ImageSubscriptionWhereInput): ImageSubscriptionPayload
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
  elements(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Element!]
  images(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image!]
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
  elements: ElementCreateManyWithoutCreatorInput
  images: ImageCreateManyWithoutCreatorInput
}

input UserCreateOneWithoutElementsInput {
  create: UserCreateWithoutElementsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutImagesInput {
  create: UserCreateWithoutImagesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPagesInput {
  create: UserCreateWithoutPagesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutWebsInput {
  create: UserCreateWithoutWebsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutElementsInput {
  email: String!
  password: String!
  themeName: String
  webs: WebCreateManyWithoutCreatorInput
  pages: PageCreateManyWithoutCreatorInput
  images: ImageCreateManyWithoutCreatorInput
}

input UserCreateWithoutImagesInput {
  email: String!
  password: String!
  themeName: String
  webs: WebCreateManyWithoutCreatorInput
  pages: PageCreateManyWithoutCreatorInput
  elements: ElementCreateManyWithoutCreatorInput
}

input UserCreateWithoutPagesInput {
  email: String!
  password: String!
  themeName: String
  webs: WebCreateManyWithoutCreatorInput
  elements: ElementCreateManyWithoutCreatorInput
  images: ImageCreateManyWithoutCreatorInput
}

input UserCreateWithoutWebsInput {
  email: String!
  password: String!
  themeName: String
  pages: PageCreateManyWithoutCreatorInput
  elements: ElementCreateManyWithoutCreatorInput
  images: ImageCreateManyWithoutCreatorInput
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
  elements: ElementUpdateManyWithoutCreatorInput
  images: ImageUpdateManyWithoutCreatorInput
}

input UserUpdateOneWithoutElementsInput {
  create: UserCreateWithoutElementsInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutElementsDataInput
  upsert: UserUpsertWithoutElementsInput
}

input UserUpdateOneWithoutImagesInput {
  create: UserCreateWithoutImagesInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutImagesDataInput
  upsert: UserUpsertWithoutImagesInput
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

input UserUpdateWithoutElementsDataInput {
  email: String
  password: String
  themeName: String
  webs: WebUpdateManyWithoutCreatorInput
  pages: PageUpdateManyWithoutCreatorInput
  images: ImageUpdateManyWithoutCreatorInput
}

input UserUpdateWithoutImagesDataInput {
  email: String
  password: String
  themeName: String
  webs: WebUpdateManyWithoutCreatorInput
  pages: PageUpdateManyWithoutCreatorInput
  elements: ElementUpdateManyWithoutCreatorInput
}

input UserUpdateWithoutPagesDataInput {
  email: String
  password: String
  themeName: String
  webs: WebUpdateManyWithoutCreatorInput
  elements: ElementUpdateManyWithoutCreatorInput
  images: ImageUpdateManyWithoutCreatorInput
}

input UserUpdateWithoutWebsDataInput {
  email: String
  password: String
  themeName: String
  pages: PageUpdateManyWithoutCreatorInput
  elements: ElementUpdateManyWithoutCreatorInput
  images: ImageUpdateManyWithoutCreatorInput
}

input UserUpsertWithoutElementsInput {
  update: UserUpdateWithoutElementsDataInput!
  create: UserCreateWithoutElementsInput!
}

input UserUpsertWithoutImagesInput {
  update: UserUpdateWithoutImagesDataInput!
  create: UserCreateWithoutImagesInput!
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
  elements_every: ElementWhereInput
  elements_some: ElementWhereInput
  elements_none: ElementWhereInput
  images_every: ImageWhereInput
  images_some: ImageWhereInput
  images_none: ImageWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Web implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  creator(where: UserWhereInput): User!
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

export const prisma: BindingConstructor<Prisma> = makePrismaBindingClass({typeDefs})

/**
 * Types
*/

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
  

 export type ElementType =
    | 'TEXT'
    | 'IMAGE'
    | 'CHILDREN'
  

 export type PageOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'title_ASC'
    | 'title_DESC'
  

 export type ChildOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'index_ASC'
    | 'index_DESC'
  

 export type ElementOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'type_ASC'
    | 'type_DESC'
    | 'text_ASC'
    | 'text_DESC'
    | 'textFormat_ASC'
    | 'textFormat_DESC'
  

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
  

 export type MutationType =
    | 'CREATED'
    | 'UPDATED'
    | 'DELETED'
  

 export type PageCreateInput = {| 
  title: String,
  creator: UserCreateOneWithoutPagesInput,
  web: WebCreateOneWithoutPagesInput,
  element: ElementCreateOneInput
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
  pages_none?: PageWhereInput,
  elements_every?: ElementWhereInput,
  elements_some?: ElementWhereInput,
  elements_none?: ElementWhereInput,
  images_every?: ImageWhereInput,
  images_some?: ImageWhereInput,
  images_none?: ImageWhereInput
|}

 export type WebUpdateWithoutCreatorDataInput = {| 
  name?: String,
  pages?: PageUpdateManyWithoutWebInput
|}

 export type ChildWhereInput = {| 
  AND?: Array< ChildWhereInput > | ChildWhereInput,
  OR?: Array< ChildWhereInput > | ChildWhereInput,
  NOT?: Array< ChildWhereInput > | ChildWhereInput,
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
  index?: Int,
  index_not?: Int,
  index_in?: Array< Int > | Int,
  index_not_in?: Array< Int > | Int,
  index_lt?: Int,
  index_lte?: Int,
  index_gt?: Int,
  index_gte?: Int,
  parent?: ElementWhereInput,
  element?: ElementWhereInput
|}

 export type ImageCreateManyWithoutCreatorInput = {| 
  create?: Array< ImageCreateWithoutCreatorInput > | ImageCreateWithoutCreatorInput,
  connect?: Array< ImageWhereUniqueInput > | ImageWhereUniqueInput
|}

 export type UserUpsertWithoutElementsInput = {| 
  update: UserUpdateWithoutElementsDataInput,
  create: UserCreateWithoutElementsInput
|}

 export type ImageCreateWithoutCreatorInput = {| 
  src: String,
  width: Int,
  height: Int
|}

 export type PageUpdateManyWithoutWebInput = {| 
  create?: Array< PageCreateWithoutWebInput > | PageCreateWithoutWebInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  disconnect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  delete?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  update?: Array< PageUpdateWithWhereUniqueWithoutWebInput > | PageUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< PageUpsertWithWhereUniqueWithoutWebInput > | PageUpsertWithWhereUniqueWithoutWebInput
|}

 export type ElementCreateOneInput = {| 
  create?: ElementCreateInput,
  connect?: ElementWhereUniqueInput
|}

 export type ImageSubscriptionWhereInput = {| 
  AND?: Array< ImageSubscriptionWhereInput > | ImageSubscriptionWhereInput,
  OR?: Array< ImageSubscriptionWhereInput > | ImageSubscriptionWhereInput,
  NOT?: Array< ImageSubscriptionWhereInput > | ImageSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: ImageWhereInput
|}

 export type ElementCreateInput = {| 
  name?: String,
  type: ElementType,
  text?: String,
  textFormat?: String,
  image?: ImageCreateOneInput,
  children?: ChildCreateManyWithoutParentInput,
  creator: UserCreateOneWithoutElementsInput,
  parent?: ChildCreateManyWithoutElementInput
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

 export type ChildCreateManyWithoutParentInput = {| 
  create?: Array< ChildCreateWithoutParentInput > | ChildCreateWithoutParentInput,
  connect?: Array< ChildWhereUniqueInput > | ChildWhereUniqueInput
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

 export type ChildCreateWithoutParentInput = {| 
  index: Int,
  element: ElementCreateOneWithoutParentInput
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

 export type ElementCreateOneWithoutParentInput = {| 
  create?: ElementCreateWithoutParentInput,
  connect?: ElementWhereUniqueInput
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

 export type ElementCreateWithoutParentInput = {| 
  name?: String,
  type: ElementType,
  text?: String,
  textFormat?: String,
  image?: ImageCreateOneInput,
  children?: ChildCreateManyWithoutParentInput,
  creator: UserCreateOneWithoutElementsInput
|}

 export type WebWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type UserCreateOneWithoutElementsInput = {| 
  create?: UserCreateWithoutElementsInput,
  connect?: UserWhereUniqueInput
|}

 export type ChildWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type UserCreateWithoutElementsInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput,
  pages?: PageCreateManyWithoutCreatorInput,
  images?: ImageCreateManyWithoutCreatorInput
|}

 export type ImageWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type ChildCreateManyWithoutElementInput = {| 
  create?: Array< ChildCreateWithoutElementInput > | ChildCreateWithoutElementInput,
  connect?: Array< ChildWhereUniqueInput > | ChildWhereUniqueInput
|}

 export type ElementUpdateInput = {| 
  name?: String,
  type?: ElementType,
  text?: String,
  textFormat?: String,
  image?: ImageUpdateOneInput,
  children?: ChildUpdateManyWithoutParentInput,
  creator?: UserUpdateOneWithoutElementsInput,
  parent?: ChildUpdateManyWithoutElementInput
|}

 export type ChildCreateWithoutElementInput = {| 
  index: Int,
  parent: ElementCreateOneWithoutChildrenInput
|}

 export type PageUpdateInput = {| 
  title?: String,
  creator?: UserUpdateOneWithoutPagesInput,
  web?: WebUpdateOneWithoutPagesInput,
  element?: ElementUpdateOneInput
|}

 export type ElementCreateOneWithoutChildrenInput = {| 
  create?: ElementCreateWithoutChildrenInput,
  connect?: ElementWhereUniqueInput
|}

 export type WebUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: WebWhereUniqueInput,
  update: WebUpdateWithoutCreatorDataInput,
  create: WebCreateWithoutCreatorInput
|}

 export type ElementCreateWithoutChildrenInput = {| 
  name?: String,
  type: ElementType,
  text?: String,
  textFormat?: String,
  image?: ImageCreateOneInput,
  creator: UserCreateOneWithoutElementsInput,
  parent?: ChildCreateManyWithoutElementInput
|}

 export type UserUpsertWithoutPagesInput = {| 
  update: UserUpdateWithoutPagesDataInput,
  create: UserCreateWithoutPagesInput
|}

 export type WebCreateInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  pages?: PageCreateManyWithoutWebInput
|}

 export type ImageUpsertNestedInput = {| 
  update: ImageUpdateDataInput,
  create: ImageCreateInput
|}

 export type ChildUpsertWithWhereUniqueWithoutParentInput = {| 
  where: ChildWhereUniqueInput,
  update: ChildUpdateWithoutParentDataInput,
  create: ChildCreateWithoutParentInput
|}

 export type PageUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: PageWhereUniqueInput,
  update: PageUpdateWithoutCreatorDataInput,
  create: PageCreateWithoutCreatorInput
|}

 export type ChildCreateInput = {| 
  index: Int,
  parent: ElementCreateOneWithoutChildrenInput,
  element: ElementCreateOneWithoutParentInput
|}

 export type ChildUpsertWithWhereUniqueWithoutElementInput = {| 
  where: ChildWhereUniqueInput,
  update: ChildUpdateWithoutElementDataInput,
  create: ChildCreateWithoutElementInput
|}

 export type UserUpdateInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput,
  pages?: PageUpdateManyWithoutCreatorInput,
  elements?: ElementUpdateManyWithoutCreatorInput,
  images?: ImageUpdateManyWithoutCreatorInput
|}

 export type ElementUpdateWithoutChildrenDataInput = {| 
  name?: String,
  type?: ElementType,
  text?: String,
  textFormat?: String,
  image?: ImageUpdateOneInput,
  creator?: UserUpdateOneWithoutElementsInput,
  parent?: ChildUpdateManyWithoutElementInput
|}

 export type WebUpdateManyWithoutCreatorInput = {| 
  create?: Array< WebCreateWithoutCreatorInput > | WebCreateWithoutCreatorInput,
  connect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  disconnect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  delete?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  update?: Array< WebUpdateWithWhereUniqueWithoutCreatorInput > | WebUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< WebUpsertWithWhereUniqueWithoutCreatorInput > | WebUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type ChildUpdateWithoutElementDataInput = {| 
  index?: Int,
  parent?: ElementUpdateOneWithoutChildrenInput
|}

 export type WebUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: WebWhereUniqueInput,
  data: WebUpdateWithoutCreatorDataInput
|}

 export type ChildUpdateManyWithoutElementInput = {| 
  create?: Array< ChildCreateWithoutElementInput > | ChildCreateWithoutElementInput,
  connect?: Array< ChildWhereUniqueInput > | ChildWhereUniqueInput,
  disconnect?: Array< ChildWhereUniqueInput > | ChildWhereUniqueInput,
  delete?: Array< ChildWhereUniqueInput > | ChildWhereUniqueInput,
  update?: Array< ChildUpdateWithWhereUniqueWithoutElementInput > | ChildUpdateWithWhereUniqueWithoutElementInput,
  upsert?: Array< ChildUpsertWithWhereUniqueWithoutElementInput > | ChildUpsertWithWhereUniqueWithoutElementInput
|}

 export type ElementUpsertWithoutParentInput = {| 
  update: ElementUpdateWithoutParentDataInput,
  create: ElementCreateWithoutParentInput
|}

 export type WebCreateManyWithoutCreatorInput = {| 
  create?: Array< WebCreateWithoutCreatorInput > | WebCreateWithoutCreatorInput,
  connect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput
|}

 export type PageCreateManyWithoutWebInput = {| 
  create?: Array< PageCreateWithoutWebInput > | PageCreateWithoutWebInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput
|}

 export type UserCreateOneWithoutPagesInput = {| 
  create?: UserCreateWithoutPagesInput,
  connect?: UserWhereUniqueInput
|}

 export type PageUpdateWithWhereUniqueWithoutWebInput = {| 
  where: PageWhereUniqueInput,
  data: PageUpdateWithoutWebDataInput
|}

 export type ElementCreateManyWithoutCreatorInput = {| 
  create?: Array< ElementCreateWithoutCreatorInput > | ElementCreateWithoutCreatorInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput
|}

 export type PageUpdateWithoutWebDataInput = {| 
  title?: String,
  creator?: UserUpdateOneWithoutPagesInput,
  element?: ElementUpdateOneInput
|}

 export type ImageCreateOneInput = {| 
  create?: ImageCreateInput,
  connect?: ImageWhereUniqueInput
|}

 export type UserUpdateOneWithoutPagesInput = {| 
  create?: UserCreateWithoutPagesInput,
  connect?: UserWhereUniqueInput,
  delete?: Boolean,
  update?: UserUpdateWithoutPagesDataInput,
  upsert?: UserUpsertWithoutPagesInput
|}

 export type UserCreateOneWithoutImagesInput = {| 
  create?: UserCreateWithoutImagesInput,
  connect?: UserWhereUniqueInput
|}

 export type UserUpdateWithoutPagesDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput,
  elements?: ElementUpdateManyWithoutCreatorInput,
  images?: ImageUpdateManyWithoutCreatorInput
|}

 export type PageCreateManyWithoutCreatorInput = {| 
  create?: Array< PageCreateWithoutCreatorInput > | PageCreateWithoutCreatorInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput
|}

 export type ElementUpdateManyWithoutCreatorInput = {| 
  create?: Array< ElementCreateWithoutCreatorInput > | ElementCreateWithoutCreatorInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  disconnect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  delete?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  update?: Array< ElementUpdateWithWhereUniqueWithoutCreatorInput > | ElementUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< ElementUpsertWithWhereUniqueWithoutCreatorInput > | ElementUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type WebCreateOneWithoutPagesInput = {| 
  create?: WebCreateWithoutPagesInput,
  connect?: WebWhereUniqueInput
|}

 export type ElementUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: ElementWhereUniqueInput,
  data: ElementUpdateWithoutCreatorDataInput
|}

 export type UserCreateOneWithoutWebsInput = {| 
  create?: UserCreateWithoutWebsInput,
  connect?: UserWhereUniqueInput
|}

 export type ElementUpdateWithoutCreatorDataInput = {| 
  name?: String,
  type?: ElementType,
  text?: String,
  textFormat?: String,
  image?: ImageUpdateOneInput,
  children?: ChildUpdateManyWithoutParentInput,
  parent?: ChildUpdateManyWithoutElementInput
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
  _MagicalBackRelation_ElementToImage_every?: ElementWhereInput,
  _MagicalBackRelation_ElementToImage_some?: ElementWhereInput,
  _MagicalBackRelation_ElementToImage_none?: ElementWhereInput
|}

 export type ImageUpdateOneInput = {| 
  create?: ImageCreateInput,
  connect?: ImageWhereUniqueInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: ImageUpdateDataInput,
  upsert?: ImageUpsertNestedInput
|}

 export type ChildSubscriptionWhereInput = {| 
  AND?: Array< ChildSubscriptionWhereInput > | ChildSubscriptionWhereInput,
  OR?: Array< ChildSubscriptionWhereInput > | ChildSubscriptionWhereInput,
  NOT?: Array< ChildSubscriptionWhereInput > | ChildSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: ChildWhereInput
|}

 export type ImageUpdateDataInput = {| 
  src?: String,
  width?: Int,
  height?: Int,
  creator?: UserUpdateOneWithoutImagesInput
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

 export type UserUpdateOneWithoutImagesInput = {| 
  create?: UserCreateWithoutImagesInput,
  connect?: UserWhereUniqueInput,
  delete?: Boolean,
  update?: UserUpdateWithoutImagesDataInput,
  upsert?: UserUpsertWithoutImagesInput
|}

 export type PageWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type UserUpdateWithoutImagesDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput,
  pages?: PageUpdateManyWithoutCreatorInput,
  elements?: ElementUpdateManyWithoutCreatorInput
|}

 export type ImageUpdateInput = {| 
  src?: String,
  width?: Int,
  height?: Int,
  creator?: UserUpdateOneWithoutImagesInput
|}

 export type PageUpdateManyWithoutCreatorInput = {| 
  create?: Array< PageCreateWithoutCreatorInput > | PageCreateWithoutCreatorInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  disconnect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  delete?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  update?: Array< PageUpdateWithWhereUniqueWithoutCreatorInput > | PageUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< PageUpsertWithWhereUniqueWithoutCreatorInput > | PageUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type WebUpdateInput = {| 
  name?: String,
  creator?: UserUpdateOneWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput
|}

 export type PageUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: PageWhereUniqueInput,
  data: PageUpdateWithoutCreatorDataInput
|}

 export type ElementUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: ElementWhereUniqueInput,
  update: ElementUpdateWithoutCreatorDataInput,
  create: ElementCreateWithoutCreatorInput
|}

 export type PageUpdateWithoutCreatorDataInput = {| 
  title?: String,
  web?: WebUpdateOneWithoutPagesInput,
  element?: ElementUpdateOneInput
|}

 export type ElementUpsertNestedInput = {| 
  update: ElementUpdateDataInput,
  create: ElementCreateInput
|}

 export type WebUpdateOneWithoutPagesInput = {| 
  create?: WebCreateWithoutPagesInput,
  connect?: WebWhereUniqueInput,
  delete?: Boolean,
  update?: WebUpdateWithoutPagesDataInput,
  upsert?: WebUpsertWithoutPagesInput
|}

 export type ElementUpdateOneWithoutChildrenInput = {| 
  create?: ElementCreateWithoutChildrenInput,
  connect?: ElementWhereUniqueInput,
  delete?: Boolean,
  update?: ElementUpdateWithoutChildrenDataInput,
  upsert?: ElementUpsertWithoutChildrenInput
|}

 export type WebUpdateWithoutPagesDataInput = {| 
  name?: String,
  creator?: UserUpdateOneWithoutWebsInput
|}

 export type UserCreateInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput,
  pages?: PageCreateManyWithoutCreatorInput,
  elements?: ElementCreateManyWithoutCreatorInput,
  images?: ImageCreateManyWithoutCreatorInput
|}

 export type UserUpdateOneWithoutWebsInput = {| 
  create?: UserCreateWithoutWebsInput,
  connect?: UserWhereUniqueInput,
  delete?: Boolean,
  update?: UserUpdateWithoutWebsDataInput,
  upsert?: UserUpsertWithoutWebsInput
|}

 export type PageCreateWithoutWebInput = {| 
  title: String,
  creator: UserCreateOneWithoutPagesInput,
  element: ElementCreateOneInput
|}

 export type UserUpdateWithoutWebsDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  pages?: PageUpdateManyWithoutCreatorInput,
  elements?: ElementUpdateManyWithoutCreatorInput,
  images?: ImageUpdateManyWithoutCreatorInput
|}

 export type ElementCreateWithoutCreatorInput = {| 
  name?: String,
  type: ElementType,
  text?: String,
  textFormat?: String,
  image?: ImageCreateOneInput,
  children?: ChildCreateManyWithoutParentInput,
  parent?: ChildCreateManyWithoutElementInput
|}

 export type ImageUpdateManyWithoutCreatorInput = {| 
  create?: Array< ImageCreateWithoutCreatorInput > | ImageCreateWithoutCreatorInput,
  connect?: Array< ImageWhereUniqueInput > | ImageWhereUniqueInput,
  disconnect?: Array< ImageWhereUniqueInput > | ImageWhereUniqueInput,
  delete?: Array< ImageWhereUniqueInput > | ImageWhereUniqueInput,
  update?: Array< ImageUpdateWithWhereUniqueWithoutCreatorInput > | ImageUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< ImageUpsertWithWhereUniqueWithoutCreatorInput > | ImageUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type UserCreateWithoutImagesInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput,
  pages?: PageCreateManyWithoutCreatorInput,
  elements?: ElementCreateManyWithoutCreatorInput
|}

 export type ImageUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: ImageWhereUniqueInput,
  data: ImageUpdateWithoutCreatorDataInput
|}

 export type WebCreateWithoutPagesInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput
|}

 export type ImageUpdateWithoutCreatorDataInput = {| 
  src?: String,
  width?: Int,
  height?: Int
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
  type?: ElementType,
  type_not?: ElementType,
  type_in?: Array< ElementType > | ElementType,
  type_not_in?: Array< ElementType > | ElementType,
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
  image?: ImageWhereInput,
  children_every?: ChildWhereInput,
  children_some?: ChildWhereInput,
  children_none?: ChildWhereInput,
  creator?: UserWhereInput,
  parent_every?: ChildWhereInput,
  parent_some?: ChildWhereInput,
  parent_none?: ChildWhereInput,
  _MagicalBackRelation_ElementToPage_every?: PageWhereInput,
  _MagicalBackRelation_ElementToPage_some?: PageWhereInput,
  _MagicalBackRelation_ElementToPage_none?: PageWhereInput
|}

 export type ImageUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: ImageWhereUniqueInput,
  update: ImageUpdateWithoutCreatorDataInput,
  create: ImageCreateWithoutCreatorInput
|}

 export type UserWhereUniqueInput = {| 
  id?: ID_Input,
  email?: String
|}

 export type UserUpsertWithoutWebsInput = {| 
  update: UserUpdateWithoutWebsDataInput,
  create: UserCreateWithoutWebsInput
|}

 export type ChildUpdateInput = {| 
  index?: Int,
  parent?: ElementUpdateOneWithoutChildrenInput,
  element?: ElementUpdateOneWithoutParentInput
|}

 export type WebUpsertWithoutPagesInput = {| 
  update: WebUpdateWithoutPagesDataInput,
  create: WebCreateWithoutPagesInput
|}

 export type UserUpsertWithoutImagesInput = {| 
  update: UserUpdateWithoutImagesDataInput,
  create: UserCreateWithoutImagesInput
|}

 export type ElementUpdateOneInput = {| 
  create?: ElementCreateInput,
  connect?: ElementWhereUniqueInput,
  delete?: Boolean,
  update?: ElementUpdateDataInput,
  upsert?: ElementUpsertNestedInput
|}

 export type ChildUpdateWithWhereUniqueWithoutElementInput = {| 
  where: ChildWhereUniqueInput,
  data: ChildUpdateWithoutElementDataInput
|}

 export type ElementUpdateDataInput = {| 
  name?: String,
  type?: ElementType,
  text?: String,
  textFormat?: String,
  image?: ImageUpdateOneInput,
  children?: ChildUpdateManyWithoutParentInput,
  creator?: UserUpdateOneWithoutElementsInput,
  parent?: ChildUpdateManyWithoutElementInput
|}

 export type UserCreateWithoutPagesInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput,
  elements?: ElementCreateManyWithoutCreatorInput,
  images?: ImageCreateManyWithoutCreatorInput
|}

 export type ChildUpdateManyWithoutParentInput = {| 
  create?: Array< ChildCreateWithoutParentInput > | ChildCreateWithoutParentInput,
  connect?: Array< ChildWhereUniqueInput > | ChildWhereUniqueInput,
  disconnect?: Array< ChildWhereUniqueInput > | ChildWhereUniqueInput,
  delete?: Array< ChildWhereUniqueInput > | ChildWhereUniqueInput,
  update?: Array< ChildUpdateWithWhereUniqueWithoutParentInput > | ChildUpdateWithWhereUniqueWithoutParentInput,
  upsert?: Array< ChildUpsertWithWhereUniqueWithoutParentInput > | ChildUpsertWithWhereUniqueWithoutParentInput
|}

 export type PageCreateWithoutCreatorInput = {| 
  title: String,
  web: WebCreateOneWithoutPagesInput,
  element: ElementCreateOneInput
|}

 export type ChildUpdateWithWhereUniqueWithoutParentInput = {| 
  where: ChildWhereUniqueInput,
  data: ChildUpdateWithoutParentDataInput
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
  element?: ElementWhereInput
|}

 export type ChildUpdateWithoutParentDataInput = {| 
  index?: Int,
  element?: ElementUpdateOneWithoutParentInput
|}

 export type PageUpsertWithWhereUniqueWithoutWebInput = {| 
  where: PageWhereUniqueInput,
  update: PageUpdateWithoutWebDataInput,
  create: PageCreateWithoutWebInput
|}

 export type UserUpdateWithoutElementsDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput,
  pages?: PageUpdateManyWithoutCreatorInput,
  images?: ImageUpdateManyWithoutCreatorInput
|}

 export type UserUpdateOneWithoutElementsInput = {| 
  create?: UserCreateWithoutElementsInput,
  connect?: UserWhereUniqueInput,
  delete?: Boolean,
  update?: UserUpdateWithoutElementsDataInput,
  upsert?: UserUpsertWithoutElementsInput
|}

 export type ElementUpdateWithoutParentDataInput = {| 
  name?: String,
  type?: ElementType,
  text?: String,
  textFormat?: String,
  image?: ImageUpdateOneInput,
  children?: ChildUpdateManyWithoutParentInput,
  creator?: UserUpdateOneWithoutElementsInput
|}

 export type ElementUpdateOneWithoutParentInput = {| 
  create?: ElementCreateWithoutParentInput,
  connect?: ElementWhereUniqueInput,
  delete?: Boolean,
  update?: ElementUpdateWithoutParentDataInput,
  upsert?: ElementUpsertWithoutParentInput
|}

 export type ElementUpsertWithoutChildrenInput = {| 
  update: ElementUpdateWithoutChildrenDataInput,
  create: ElementCreateWithoutChildrenInput
|}

 export type ElementWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type UserCreateWithoutWebsInput = {| 
  email: String,
  password: String,
  themeName?: String,
  pages?: PageCreateManyWithoutCreatorInput,
  elements?: ElementCreateManyWithoutCreatorInput,
  images?: ImageCreateManyWithoutCreatorInput
|}

 export type ImageCreateInput = {| 
  src: String,
  width: Int,
  height: Int,
  creator: UserCreateOneWithoutImagesInput
|}

 export type WebCreateWithoutCreatorInput = {| 
  name: String,
  pages?: PageCreateManyWithoutWebInput
|}

/*
 * An object with an ID

*/
 export type Node = {| 
   id: ID_Output,
|}

 export type ImagePreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   src: String,
   width: Int,
   height: Int,
|}

/*
 * A connection to a list of items.

*/
 export type UserConnection = {| 
   pageInfo: PageInfo,
   edges: UserEdge[],
   aggregate: AggregateUser,
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
   elements?: Element[],
   images?: Image[],
|}

 export type BatchPayload = {| 
   count: Long,
|}

 export type AggregateImage = {| 
   count: Int,
|}

 export type Web = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   name: String,
   creator: User,
   pages?: Page[],
|}

 export type Page = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   title: String,
   creator: User,
   web: Web,
   element: Element,
|}

/*
 * An edge in a connection.

*/
 export type ImageEdge = {| 
   node: Image,
   cursor: String,
|}

/*
 * A connection to a list of items.

*/
 export type ImageConnection = {| 
   pageInfo: PageInfo,
   edges: ImageEdge[],
   aggregate: AggregateImage,
|}

 export type AggregateElement = {| 
   count: Int,
|}

/*
 * A connection to a list of items.

*/
 export type ElementConnection = {| 
   pageInfo: PageInfo,
   edges: ElementEdge[],
   aggregate: AggregateElement,
|}

 export type ElementPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   name?: String,
   type: ElementType,
   text?: String,
   textFormat: String,
|}

/*
 * An edge in a connection.

*/
 export type ChildEdge = {| 
   node: Child,
   cursor: String,
|}

 export type ElementSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Element,
   updatedFields?: String[],
   previousValues?: ElementPreviousValues,
|}

 export type AggregatePage = {| 
   count: Int,
|}

 export type UserSubscriptionPayload = {| 
   mutation: MutationType,
   node?: User,
   updatedFields?: String[],
   previousValues?: UserPreviousValues,
|}

/*
 * A connection to a list of items.

*/
 export type PageConnection = {| 
   pageInfo: PageInfo,
   edges: PageEdge[],
   aggregate: AggregatePage,
|}

 export type UserPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   email: String,
   password: String,
   themeName?: String,
|}

/*
 * An edge in a connection.

*/
 export type WebEdge = {| 
   node: Web,
   cursor: String,
|}

 export type Child = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   index: Int,
   parent: Element,
   element: Element,
|}

 export type AggregateUser = {| 
   count: Int,
|}

 export type WebSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Web,
   updatedFields?: String[],
   previousValues?: WebPreviousValues,
|}

 export type ImageSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Image,
   updatedFields?: String[],
   previousValues?: ImagePreviousValues,
|}

 export type WebPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   name: String,
|}

/*
 * An edge in a connection.

*/
 export type ElementEdge = {| 
   node: Element,
   cursor: String,
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

/*
 * A connection to a list of items.

*/
 export type ChildConnection = {| 
   pageInfo: PageInfo,
   edges: ChildEdge[],
   aggregate: AggregateChild,
|}

 export type PageSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Page,
   updatedFields?: String[],
   previousValues?: PagePreviousValues,
|}

 export type AggregateWeb = {| 
   count: Int,
|}

/*
 * An edge in a connection.

*/
 export type UserEdge = {| 
   node: User,
   cursor: String,
|}

 export type ChildPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   index: Int,
|}

 export type ChildSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Child,
   updatedFields?: String[],
   previousValues?: ChildPreviousValues,
|}

 export type Element = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   name?: String,
   type: ElementType,
   text?: String,
   textFormat: String,
   image?: Image,
   children?: Child[],
   creator: User,
   parent?: Child[],
|}

 export type PagePreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   title: String,
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
 * A connection to a list of items.

*/
 export type WebConnection = {| 
   pageInfo: PageInfo,
   edges: WebEdge[],
   aggregate: AggregateWeb,
|}

/*
 * An edge in a connection.

*/
 export type PageEdge = {| 
   node: Page,
   cursor: String,
|}

 export type AggregateChild = {| 
   count: Int,
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