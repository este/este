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
    elements(args: { where?: ElementWhereInput, orderBy?: ElementOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element[]>; 
    childrens(args: { where?: ChildrenWhereInput, orderBy?: ChildrenOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Children[]>; 
    images(args: { where?: ImageWhereInput, orderBy?: ImageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image[]>; 
    user(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    web(args: { where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    page(args: { where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    element(args: { where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    image(args: { where: ImageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image | null>; 
    usersConnection(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<UserConnection>; 
    websConnection(args: { where?: WebWhereInput, orderBy?: WebOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<WebConnection>; 
    pagesConnection(args: { where?: PageWhereInput, orderBy?: PageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<PageConnection>; 
    elementsConnection(args: { where?: ElementWhereInput, orderBy?: ElementOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ElementConnection>; 
    childrensConnection(args: { where?: ChildrenWhereInput, orderBy?: ChildrenOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ChildrenConnection>; 
    imagesConnection(args: { where?: ImageWhereInput, orderBy?: ImageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ImageConnection>; 
    node(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Node | null>; 
  }

export interface Mutation {
    createUser(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User>; 
    createWeb(args: { data: WebCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web>; 
    createPage(args: { data: PageCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page>; 
    createElement(args: { data: ElementCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element>; 
    createChildren(args: { data: ChildrenCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Children>; 
    createImage(args: { data: ImageCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image>; 
    updateUser(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    updateWeb(args: { data: WebUpdateInput, where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    updatePage(args: { data: PageUpdateInput, where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    updateElement(args: { data: ElementUpdateInput, where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    updateImage(args: { data: ImageUpdateInput, where: ImageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image | null>; 
    deleteUser(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    deleteWeb(args: { where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    deletePage(args: { where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    deleteElement(args: { where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    deleteImage(args: { where: ImageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image | null>; 
    upsertUser(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User>; 
    upsertWeb(args: { where: WebWhereUniqueInput, create: WebCreateInput, update: WebUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web>; 
    upsertPage(args: { where: PageWhereUniqueInput, create: PageCreateInput, update: PageUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page>; 
    upsertElement(args: { where: ElementWhereUniqueInput, create: ElementCreateInput, update: ElementUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element>; 
    upsertImage(args: { where: ImageWhereUniqueInput, create: ImageCreateInput, update: ImageUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image>; 
    updateManyUsers(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyWebs(args: { data: WebUpdateInput, where?: WebWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyPages(args: { data: PageUpdateInput, where?: PageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyElements(args: { data: ElementUpdateInput, where?: ElementWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyChildrens(args: { data: ChildrenUpdateInput, where?: ChildrenWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyImages(args: { data: ImageUpdateInput, where?: ImageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyUsers(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyWebs(args: { where?: WebWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyPages(args: { where?: PageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyElements(args: { where?: ElementWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyChildrens(args: { where?: ChildrenWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyImages(args: { where?: ImageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
  }

export interface Subscription {
    user(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<UserSubscriptionPayload | null>>; 
    web(args: { where?: WebSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<WebSubscriptionPayload | null>>; 
    page(args: { where?: PageSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<PageSubscriptionPayload | null>>; 
    element(args: { where?: ElementSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ElementSubscriptionPayload | null>>; 
    children(args: { where?: ChildrenSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ChildrenSubscriptionPayload | null>>; 
    image(args: { where?: ImageSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ImageSubscriptionPayload | null>>; 
  }

export interface Exists {
User(where?: UserWhereInput): Promise<boolean>;
Web(where?: WebWhereInput): Promise<boolean>;
Page(where?: PageWhereInput): Promise<boolean>;
Element(where?: ElementWhereInput): Promise<boolean>;
Children(where?: ChildrenWhereInput): Promise<boolean>;
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

const typeDefs = `type AggregateChildren {
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

type Children {
  elements(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Element!]
  order: [ID!]!
}

"""A connection to a list of items."""
type ChildrenConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ChildrenEdge]!
  aggregate: AggregateChildren!
}

input ChildrenCreateInput {
  order: ChildrenCreateorderInput
  elements: ElementCreateManyWithoutContentChildrenInput
}

input ChildrenCreateOneInput {
  create: ChildrenCreateInput
}

input ChildrenCreateOneWithoutElementsInput {
  create: ChildrenCreateWithoutElementsInput
}

input ChildrenCreateorderInput {
  set: [ID!]
}

input ChildrenCreateWithoutElementsInput {
  order: ChildrenCreateorderInput
}

"""An edge in a connection."""
type ChildrenEdge {
  """The item at the end of the edge."""
  node: Children!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ChildrenOrderByInput {
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ChildrenPreviousValues {
  order: [ID!]!
}

type ChildrenSubscriptionPayload {
  mutation: MutationType!
  node: Children
  updatedFields: [String!]
  previousValues: ChildrenPreviousValues
}

input ChildrenSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ChildrenSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ChildrenSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ChildrenSubscriptionWhereInput!]

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
  node: ChildrenWhereInput
}

input ChildrenUpdateDataInput {
  order: ChildrenUpdateorderInput
  elements: ElementUpdateManyWithoutContentChildrenInput
}

input ChildrenUpdateInput {
  order: ChildrenUpdateorderInput
  elements: ElementUpdateManyWithoutContentChildrenInput
}

input ChildrenUpdateOneInput {
  create: ChildrenCreateInput
  delete: Boolean
  update: ChildrenUpdateDataInput
  upsert: ChildrenUpsertNestedInput
}

input ChildrenUpdateOneWithoutElementsInput {
  create: ChildrenCreateWithoutElementsInput
  disconnect: Boolean
  delete: Boolean
  update: ChildrenUpdateWithoutElementsDataInput
  upsert: ChildrenUpsertWithoutElementsInput
}

input ChildrenUpdateorderInput {
  set: [ID!]
}

input ChildrenUpdateWithoutElementsDataInput {
  order: ChildrenUpdateorderInput
}

input ChildrenUpsertNestedInput {
  update: ChildrenUpdateDataInput!
  create: ChildrenCreateInput!
}

input ChildrenUpsertWithoutElementsInput {
  update: ChildrenUpdateWithoutElementsDataInput!
  create: ChildrenCreateWithoutElementsInput!
}

input ChildrenWhereInput {
  """Logical AND on all given filters."""
  AND: [ChildrenWhereInput!]

  """Logical OR on all given filters."""
  OR: [ChildrenWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ChildrenWhereInput!]
  elements_every: ElementWhereInput
  elements_some: ElementWhereInput
  elements_none: ElementWhereInput
  _MagicalBackRelation_ChildrenToPage_every: PageWhereInput
  _MagicalBackRelation_ChildrenToPage_some: PageWhereInput
  _MagicalBackRelation_ChildrenToPage_none: PageWhereInput
}

scalar DateTime

type Element implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  creator(where: UserWhereInput): User!
  name: String
  contentText: String
  contentTextFormat: String!
  contentImage(where: ImageWhereInput): Image
  contentChildren(where: ChildrenWhereInput): Children
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
  contentText: String
  contentTextFormat: String
  creator: UserCreateOneWithoutElementsInput!
  contentImage: ImageCreateOneInput
  contentChildren: ChildrenCreateOneWithoutElementsInput
}

input ElementCreateManyWithoutContentChildrenInput {
  create: [ElementCreateWithoutContentChildrenInput!]
  connect: [ElementWhereUniqueInput!]
}

input ElementCreateManyWithoutCreatorInput {
  create: [ElementCreateWithoutCreatorInput!]
  connect: [ElementWhereUniqueInput!]
}

input ElementCreateWithoutContentChildrenInput {
  name: String
  contentText: String
  contentTextFormat: String
  creator: UserCreateOneWithoutElementsInput!
  contentImage: ImageCreateOneInput
}

input ElementCreateWithoutCreatorInput {
  name: String
  contentText: String
  contentTextFormat: String
  contentImage: ImageCreateOneInput
  contentChildren: ChildrenCreateOneWithoutElementsInput
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
  contentText_ASC
  contentText_DESC
  contentTextFormat_ASC
  contentTextFormat_DESC
}

type ElementPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String
  contentText: String
  contentTextFormat: String!
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

input ElementUpdateInput {
  name: String
  contentText: String
  contentTextFormat: String
  creator: UserUpdateOneWithoutElementsInput
  contentImage: ImageUpdateOneInput
  contentChildren: ChildrenUpdateOneWithoutElementsInput
}

input ElementUpdateManyWithoutContentChildrenInput {
  create: [ElementCreateWithoutContentChildrenInput!]
  connect: [ElementWhereUniqueInput!]
  disconnect: [ElementWhereUniqueInput!]
  delete: [ElementWhereUniqueInput!]
  update: [ElementUpdateWithWhereUniqueWithoutContentChildrenInput!]
  upsert: [ElementUpsertWithWhereUniqueWithoutContentChildrenInput!]
}

input ElementUpdateManyWithoutCreatorInput {
  create: [ElementCreateWithoutCreatorInput!]
  connect: [ElementWhereUniqueInput!]
  disconnect: [ElementWhereUniqueInput!]
  delete: [ElementWhereUniqueInput!]
  update: [ElementUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [ElementUpsertWithWhereUniqueWithoutCreatorInput!]
}

input ElementUpdateWithoutContentChildrenDataInput {
  name: String
  contentText: String
  contentTextFormat: String
  creator: UserUpdateOneWithoutElementsInput
  contentImage: ImageUpdateOneInput
}

input ElementUpdateWithoutCreatorDataInput {
  name: String
  contentText: String
  contentTextFormat: String
  contentImage: ImageUpdateOneInput
  contentChildren: ChildrenUpdateOneWithoutElementsInput
}

input ElementUpdateWithWhereUniqueWithoutContentChildrenInput {
  where: ElementWhereUniqueInput!
  data: ElementUpdateWithoutContentChildrenDataInput!
}

input ElementUpdateWithWhereUniqueWithoutCreatorInput {
  where: ElementWhereUniqueInput!
  data: ElementUpdateWithoutCreatorDataInput!
}

input ElementUpsertWithWhereUniqueWithoutContentChildrenInput {
  where: ElementWhereUniqueInput!
  update: ElementUpdateWithoutContentChildrenDataInput!
  create: ElementCreateWithoutContentChildrenInput!
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
  contentText: String

  """All values that are not equal to given value."""
  contentText_not: String

  """All values that are contained in given list."""
  contentText_in: [String!]

  """All values that are not contained in given list."""
  contentText_not_in: [String!]

  """All values less than the given value."""
  contentText_lt: String

  """All values less than or equal the given value."""
  contentText_lte: String

  """All values greater than the given value."""
  contentText_gt: String

  """All values greater than or equal the given value."""
  contentText_gte: String

  """All values containing the given string."""
  contentText_contains: String

  """All values not containing the given string."""
  contentText_not_contains: String

  """All values starting with the given string."""
  contentText_starts_with: String

  """All values not starting with the given string."""
  contentText_not_starts_with: String

  """All values ending with the given string."""
  contentText_ends_with: String

  """All values not ending with the given string."""
  contentText_not_ends_with: String
  contentTextFormat: String

  """All values that are not equal to given value."""
  contentTextFormat_not: String

  """All values that are contained in given list."""
  contentTextFormat_in: [String!]

  """All values that are not contained in given list."""
  contentTextFormat_not_in: [String!]

  """All values less than the given value."""
  contentTextFormat_lt: String

  """All values less than or equal the given value."""
  contentTextFormat_lte: String

  """All values greater than the given value."""
  contentTextFormat_gt: String

  """All values greater than or equal the given value."""
  contentTextFormat_gte: String

  """All values containing the given string."""
  contentTextFormat_contains: String

  """All values not containing the given string."""
  contentTextFormat_not_contains: String

  """All values starting with the given string."""
  contentTextFormat_starts_with: String

  """All values not starting with the given string."""
  contentTextFormat_not_starts_with: String

  """All values ending with the given string."""
  contentTextFormat_ends_with: String

  """All values not ending with the given string."""
  contentTextFormat_not_ends_with: String
  creator: UserWhereInput
  contentImage: ImageWhereInput
  contentChildren: ChildrenWhereInput
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
  createElement(data: ElementCreateInput!): Element!
  createChildren(data: ChildrenCreateInput!): Children!
  createImage(data: ImageCreateInput!): Image!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateWeb(data: WebUpdateInput!, where: WebWhereUniqueInput!): Web
  updatePage(data: PageUpdateInput!, where: PageWhereUniqueInput!): Page
  updateElement(data: ElementUpdateInput!, where: ElementWhereUniqueInput!): Element
  updateImage(data: ImageUpdateInput!, where: ImageWhereUniqueInput!): Image
  deleteUser(where: UserWhereUniqueInput!): User
  deleteWeb(where: WebWhereUniqueInput!): Web
  deletePage(where: PageWhereUniqueInput!): Page
  deleteElement(where: ElementWhereUniqueInput!): Element
  deleteImage(where: ImageWhereUniqueInput!): Image
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertWeb(where: WebWhereUniqueInput!, create: WebCreateInput!, update: WebUpdateInput!): Web!
  upsertPage(where: PageWhereUniqueInput!, create: PageCreateInput!, update: PageUpdateInput!): Page!
  upsertElement(where: ElementWhereUniqueInput!, create: ElementCreateInput!, update: ElementUpdateInput!): Element!
  upsertImage(where: ImageWhereUniqueInput!, create: ImageCreateInput!, update: ImageUpdateInput!): Image!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyWebs(data: WebUpdateInput!, where: WebWhereInput): BatchPayload!
  updateManyPages(data: PageUpdateInput!, where: PageWhereInput): BatchPayload!
  updateManyElements(data: ElementUpdateInput!, where: ElementWhereInput): BatchPayload!
  updateManyChildrens(data: ChildrenUpdateInput!, where: ChildrenWhereInput): BatchPayload!
  updateManyImages(data: ImageUpdateInput!, where: ImageWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyWebs(where: WebWhereInput): BatchPayload!
  deleteManyPages(where: PageWhereInput): BatchPayload!
  deleteManyElements(where: ElementWhereInput): BatchPayload!
  deleteManyChildrens(where: ChildrenWhereInput): BatchPayload!
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
  creator(where: UserWhereInput): User!
  title: String!
  web(where: WebWhereInput): Web!
  children(where: ChildrenWhereInput): Children!
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
  children: ChildrenCreateOneInput!
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
  children: ChildrenCreateOneInput!
}

input PageCreateWithoutWebInput {
  title: String!
  creator: UserCreateOneWithoutPagesInput!
  children: ChildrenCreateOneInput!
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
  children: ChildrenUpdateOneInput
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
  children: ChildrenUpdateOneInput
}

input PageUpdateWithoutWebDataInput {
  title: String
  creator: UserUpdateOneWithoutPagesInput
  children: ChildrenUpdateOneInput
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
  children: ChildrenWhereInput
}

input PageWhereUniqueInput {
  id: ID
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  webs(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Web]!
  pages(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Page]!
  elements(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Element]!
  childrens(where: ChildrenWhereInput, orderBy: ChildrenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Children]!
  images(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image]!
  user(where: UserWhereUniqueInput!): User
  web(where: WebWhereUniqueInput!): Web
  page(where: PageWhereUniqueInput!): Page
  element(where: ElementWhereUniqueInput!): Element
  image(where: ImageWhereUniqueInput!): Image
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  websConnection(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WebConnection!
  pagesConnection(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PageConnection!
  elementsConnection(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ElementConnection!
  childrensConnection(where: ChildrenWhereInput, orderBy: ChildrenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ChildrenConnection!
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
  element(where: ElementSubscriptionWhereInput): ElementSubscriptionPayload
  children(where: ChildrenSubscriptionWhereInput): ChildrenSubscriptionPayload
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
  

 export type PageOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'title_ASC'
    | 'title_DESC'
  

 export type ElementOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'contentText_ASC'
    | 'contentText_DESC'
    | 'contentTextFormat_ASC'
    | 'contentTextFormat_DESC'
  

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
  

 export type ChildrenOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
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
  pages_none?: PageWhereInput,
  elements_every?: ElementWhereInput,
  elements_some?: ElementWhereInput,
  elements_none?: ElementWhereInput,
  images_every?: ImageWhereInput,
  images_some?: ImageWhereInput,
  images_none?: ImageWhereInput
|}

 export type PageCreateWithoutCreatorInput = {| 
  title: String,
  web: WebCreateOneWithoutPagesInput,
  children: ChildrenCreateOneInput
|}

 export type ElementUpdateManyWithoutContentChildrenInput = {| 
  create?: Array< ElementCreateWithoutContentChildrenInput > | ElementCreateWithoutContentChildrenInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  disconnect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  delete?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  update?: Array< ElementUpdateWithWhereUniqueWithoutContentChildrenInput > | ElementUpdateWithWhereUniqueWithoutContentChildrenInput,
  upsert?: Array< ElementUpsertWithWhereUniqueWithoutContentChildrenInput > | ElementUpsertWithWhereUniqueWithoutContentChildrenInput
|}

 export type WebCreateOneWithoutPagesInput = {| 
  create?: WebCreateWithoutPagesInput,
  connect?: WebWhereUniqueInput
|}

 export type WebUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: WebWhereUniqueInput,
  data: WebUpdateWithoutCreatorDataInput
|}

 export type WebCreateWithoutPagesInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput
|}

 export type ChildrenSubscriptionWhereInput = {| 
  AND?: Array< ChildrenSubscriptionWhereInput > | ChildrenSubscriptionWhereInput,
  OR?: Array< ChildrenSubscriptionWhereInput > | ChildrenSubscriptionWhereInput,
  NOT?: Array< ChildrenSubscriptionWhereInput > | ChildrenSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: ChildrenWhereInput
|}

 export type UserCreateOneWithoutWebsInput = {| 
  create?: UserCreateWithoutWebsInput,
  connect?: UserWhereUniqueInput
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

 export type UserCreateWithoutWebsInput = {| 
  email: String,
  password: String,
  themeName?: String,
  pages?: PageCreateManyWithoutCreatorInput,
  elements?: ElementCreateManyWithoutCreatorInput,
  images?: ImageCreateManyWithoutCreatorInput
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
  children?: ChildrenWhereInput
|}

 export type ImageCreateManyWithoutCreatorInput = {| 
  create?: Array< ImageCreateWithoutCreatorInput > | ImageCreateWithoutCreatorInput,
  connect?: Array< ImageWhereUniqueInput > | ImageWhereUniqueInput
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

 export type ImageCreateWithoutCreatorInput = {| 
  src: String,
  width: Int,
  height: Int
|}

 export type ChildrenUpdateInput = {| 
  order?: ChildrenUpdateorderInput,
  elements?: ElementUpdateManyWithoutContentChildrenInput
|}

 export type ChildrenCreateOneInput = {| 
  create?: ChildrenCreateInput
|}

 export type WebWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type ChildrenCreateInput = {| 
  order?: ChildrenCreateorderInput,
  elements?: ElementCreateManyWithoutContentChildrenInput
|}

 export type ElementWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type ChildrenCreateorderInput = {| 
  set?: Array< ID_Input > | ID_Input
|}

 export type ImageUpdateInput = {| 
  src?: String,
  width?: Int,
  height?: Int,
  creator?: UserUpdateOneWithoutImagesInput
|}

 export type ElementCreateManyWithoutContentChildrenInput = {| 
  create?: Array< ElementCreateWithoutContentChildrenInput > | ElementCreateWithoutContentChildrenInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput
|}

 export type PageUpdateInput = {| 
  title?: String,
  creator?: UserUpdateOneWithoutPagesInput,
  web?: WebUpdateOneWithoutPagesInput,
  children?: ChildrenUpdateOneInput
|}

 export type ElementCreateWithoutContentChildrenInput = {| 
  name?: String,
  contentText?: String,
  contentTextFormat?: String,
  creator: UserCreateOneWithoutElementsInput,
  contentImage?: ImageCreateOneInput
|}

 export type WebUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: WebWhereUniqueInput,
  update: WebUpdateWithoutCreatorDataInput,
  create: WebCreateWithoutCreatorInput
|}

 export type UserCreateOneWithoutElementsInput = {| 
  create?: UserCreateWithoutElementsInput,
  connect?: UserWhereUniqueInput
|}

 export type UserUpsertWithoutPagesInput = {| 
  update: UserUpdateWithoutPagesDataInput,
  create: UserCreateWithoutPagesInput
|}

 export type UserCreateWithoutElementsInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput,
  pages?: PageCreateManyWithoutCreatorInput,
  images?: ImageCreateManyWithoutCreatorInput
|}

 export type ChildrenUpsertWithoutElementsInput = {| 
  update: ChildrenUpdateWithoutElementsDataInput,
  create: ChildrenCreateWithoutElementsInput
|}

 export type ChildrenCreateOneWithoutElementsInput = {| 
  create?: ChildrenCreateWithoutElementsInput
|}

 export type ChildrenUpdateOneWithoutElementsInput = {| 
  create?: ChildrenCreateWithoutElementsInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: ChildrenUpdateWithoutElementsDataInput,
  upsert?: ChildrenUpsertWithoutElementsInput
|}

 export type ChildrenCreateWithoutElementsInput = {| 
  order?: ChildrenCreateorderInput
|}

 export type UserUpsertWithoutImagesInput = {| 
  update: UserUpdateWithoutImagesDataInput,
  create: UserCreateWithoutImagesInput
|}

 export type ElementUpdateWithWhereUniqueWithoutContentChildrenInput = {| 
  where: ElementWhereUniqueInput,
  data: ElementUpdateWithoutContentChildrenDataInput
|}

 export type ChildrenUpsertNestedInput = {| 
  update: ChildrenUpdateDataInput,
  create: ChildrenCreateInput
|}

 export type PageCreateInput = {| 
  title: String,
  creator: UserCreateOneWithoutPagesInput,
  web: WebCreateOneWithoutPagesInput,
  children: ChildrenCreateOneInput
|}

 export type UserUpsertWithoutElementsInput = {| 
  update: UserUpdateWithoutElementsDataInput,
  create: UserCreateWithoutElementsInput
|}

 export type ElementCreateInput = {| 
  name?: String,
  contentText?: String,
  contentTextFormat?: String,
  creator: UserCreateOneWithoutElementsInput,
  contentImage?: ImageCreateOneInput,
  contentChildren?: ChildrenCreateOneWithoutElementsInput
|}

 export type UserUpdateOneWithoutElementsInput = {| 
  create?: UserCreateWithoutElementsInput,
  connect?: UserWhereUniqueInput,
  delete?: Boolean,
  update?: UserUpdateWithoutElementsDataInput,
  upsert?: UserUpsertWithoutElementsInput
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

 export type UserCreateInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput,
  pages?: PageCreateManyWithoutCreatorInput,
  elements?: ElementCreateManyWithoutCreatorInput,
  images?: ImageCreateManyWithoutCreatorInput
|}

 export type WebUpdateManyWithoutCreatorInput = {| 
  create?: Array< WebCreateWithoutCreatorInput > | WebCreateWithoutCreatorInput,
  connect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  disconnect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  delete?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  update?: Array< WebUpdateWithWhereUniqueWithoutCreatorInput > | WebUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< WebUpsertWithWhereUniqueWithoutCreatorInput > | WebUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type WebCreateWithoutCreatorInput = {| 
  name: String,
  pages?: PageCreateManyWithoutWebInput
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

 export type PageCreateWithoutWebInput = {| 
  title: String,
  creator: UserCreateOneWithoutPagesInput,
  children: ChildrenCreateOneInput
|}

 export type WebUpdateWithoutCreatorDataInput = {| 
  name?: String,
  pages?: PageUpdateManyWithoutWebInput
|}

 export type UserCreateWithoutPagesInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput,
  elements?: ElementCreateManyWithoutCreatorInput,
  images?: ImageCreateManyWithoutCreatorInput
|}

 export type PageUpdateManyWithoutWebInput = {| 
  create?: Array< PageCreateWithoutWebInput > | PageCreateWithoutWebInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  disconnect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  delete?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  update?: Array< PageUpdateWithWhereUniqueWithoutWebInput > | PageUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< PageUpsertWithWhereUniqueWithoutWebInput > | PageUpsertWithWhereUniqueWithoutWebInput
|}

 export type ElementCreateWithoutCreatorInput = {| 
  name?: String,
  contentText?: String,
  contentTextFormat?: String,
  contentImage?: ImageCreateOneInput,
  contentChildren?: ChildrenCreateOneWithoutElementsInput
|}

 export type PageUpdateWithWhereUniqueWithoutWebInput = {| 
  where: PageWhereUniqueInput,
  data: PageUpdateWithoutWebDataInput
|}

 export type ImageCreateInput = {| 
  src: String,
  width: Int,
  height: Int,
  creator: UserCreateOneWithoutImagesInput
|}

 export type PageUpdateWithoutWebDataInput = {| 
  title?: String,
  creator?: UserUpdateOneWithoutPagesInput,
  children?: ChildrenUpdateOneInput
|}

 export type UserCreateWithoutImagesInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput,
  pages?: PageCreateManyWithoutCreatorInput,
  elements?: ElementCreateManyWithoutCreatorInput
|}

 export type UserUpdateOneWithoutPagesInput = {| 
  create?: UserCreateWithoutPagesInput,
  connect?: UserWhereUniqueInput,
  delete?: Boolean,
  update?: UserUpdateWithoutPagesDataInput,
  upsert?: UserUpsertWithoutPagesInput
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

 export type UserUpdateWithoutPagesDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput,
  elements?: ElementUpdateManyWithoutCreatorInput,
  images?: ImageUpdateManyWithoutCreatorInput
|}

 export type ChildrenWhereInput = {| 
  AND?: Array< ChildrenWhereInput > | ChildrenWhereInput,
  OR?: Array< ChildrenWhereInput > | ChildrenWhereInput,
  NOT?: Array< ChildrenWhereInput > | ChildrenWhereInput,
  elements_every?: ElementWhereInput,
  elements_some?: ElementWhereInput,
  elements_none?: ElementWhereInput,
  _MagicalBackRelation_ChildrenToPage_every?: PageWhereInput,
  _MagicalBackRelation_ChildrenToPage_some?: PageWhereInput,
  _MagicalBackRelation_ChildrenToPage_none?: PageWhereInput
|}

 export type ElementUpdateManyWithoutCreatorInput = {| 
  create?: Array< ElementCreateWithoutCreatorInput > | ElementCreateWithoutCreatorInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  disconnect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  delete?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  update?: Array< ElementUpdateWithWhereUniqueWithoutCreatorInput > | ElementUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< ElementUpsertWithWhereUniqueWithoutCreatorInput > | ElementUpsertWithWhereUniqueWithoutCreatorInput
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

 export type ElementUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: ElementWhereUniqueInput,
  data: ElementUpdateWithoutCreatorDataInput
|}

 export type UserWhereUniqueInput = {| 
  id?: ID_Input,
  email?: String
|}

 export type ElementUpdateWithoutCreatorDataInput = {| 
  name?: String,
  contentText?: String,
  contentTextFormat?: String,
  contentImage?: ImageUpdateOneInput,
  contentChildren?: ChildrenUpdateOneWithoutElementsInput
|}

 export type ImageWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type ImageUpdateOneInput = {| 
  create?: ImageCreateInput,
  connect?: ImageWhereUniqueInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: ImageUpdateDataInput,
  upsert?: ImageUpsertNestedInput
|}

 export type WebUpdateInput = {| 
  name?: String,
  creator?: UserUpdateOneWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput
|}

 export type ImageUpdateDataInput = {| 
  src?: String,
  width?: Int,
  height?: Int,
  creator?: UserUpdateOneWithoutImagesInput
|}

 export type ElementUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: ElementWhereUniqueInput,
  update: ElementUpdateWithoutCreatorDataInput,
  create: ElementCreateWithoutCreatorInput
|}

 export type UserUpdateOneWithoutImagesInput = {| 
  create?: UserCreateWithoutImagesInput,
  connect?: UserWhereUniqueInput,
  delete?: Boolean,
  update?: UserUpdateWithoutImagesDataInput,
  upsert?: UserUpsertWithoutImagesInput
|}

 export type ImageUpsertNestedInput = {| 
  update: ImageUpdateDataInput,
  create: ImageCreateInput
|}

 export type UserUpdateWithoutImagesDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput,
  pages?: PageUpdateManyWithoutCreatorInput,
  elements?: ElementUpdateManyWithoutCreatorInput
|}

 export type ElementUpsertWithWhereUniqueWithoutContentChildrenInput = {| 
  where: ElementWhereUniqueInput,
  update: ElementUpdateWithoutContentChildrenDataInput,
  create: ElementCreateWithoutContentChildrenInput
|}

 export type PageUpdateManyWithoutCreatorInput = {| 
  create?: Array< PageCreateWithoutCreatorInput > | PageCreateWithoutCreatorInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  disconnect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  delete?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  update?: Array< PageUpdateWithWhereUniqueWithoutCreatorInput > | PageUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< PageUpsertWithWhereUniqueWithoutCreatorInput > | PageUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type ElementUpdateWithoutContentChildrenDataInput = {| 
  name?: String,
  contentText?: String,
  contentTextFormat?: String,
  creator?: UserUpdateOneWithoutElementsInput,
  contentImage?: ImageUpdateOneInput
|}

 export type PageUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: PageWhereUniqueInput,
  data: PageUpdateWithoutCreatorDataInput
|}

 export type PageCreateManyWithoutWebInput = {| 
  create?: Array< PageCreateWithoutWebInput > | PageCreateWithoutWebInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput
|}

 export type PageUpdateWithoutCreatorDataInput = {| 
  title?: String,
  web?: WebUpdateOneWithoutPagesInput,
  children?: ChildrenUpdateOneInput
|}

 export type ElementCreateManyWithoutCreatorInput = {| 
  create?: Array< ElementCreateWithoutCreatorInput > | ElementCreateWithoutCreatorInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput
|}

 export type WebUpdateOneWithoutPagesInput = {| 
  create?: WebCreateWithoutPagesInput,
  connect?: WebWhereUniqueInput,
  delete?: Boolean,
  update?: WebUpdateWithoutPagesDataInput,
  upsert?: WebUpsertWithoutPagesInput
|}

 export type UserCreateOneWithoutImagesInput = {| 
  create?: UserCreateWithoutImagesInput,
  connect?: UserWhereUniqueInput
|}

 export type WebUpdateWithoutPagesDataInput = {| 
  name?: String,
  creator?: UserUpdateOneWithoutWebsInput
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
  contentText?: String,
  contentText_not?: String,
  contentText_in?: Array< String > | String,
  contentText_not_in?: Array< String > | String,
  contentText_lt?: String,
  contentText_lte?: String,
  contentText_gt?: String,
  contentText_gte?: String,
  contentText_contains?: String,
  contentText_not_contains?: String,
  contentText_starts_with?: String,
  contentText_not_starts_with?: String,
  contentText_ends_with?: String,
  contentText_not_ends_with?: String,
  contentTextFormat?: String,
  contentTextFormat_not?: String,
  contentTextFormat_in?: Array< String > | String,
  contentTextFormat_not_in?: Array< String > | String,
  contentTextFormat_lt?: String,
  contentTextFormat_lte?: String,
  contentTextFormat_gt?: String,
  contentTextFormat_gte?: String,
  contentTextFormat_contains?: String,
  contentTextFormat_not_contains?: String,
  contentTextFormat_starts_with?: String,
  contentTextFormat_not_starts_with?: String,
  contentTextFormat_ends_with?: String,
  contentTextFormat_not_ends_with?: String,
  creator?: UserWhereInput,
  contentImage?: ImageWhereInput,
  contentChildren?: ChildrenWhereInput
|}

 export type UserUpdateOneWithoutWebsInput = {| 
  create?: UserCreateWithoutWebsInput,
  connect?: UserWhereUniqueInput,
  delete?: Boolean,
  update?: UserUpdateWithoutWebsDataInput,
  upsert?: UserUpsertWithoutWebsInput
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

 export type UserUpdateWithoutWebsDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  pages?: PageUpdateManyWithoutCreatorInput,
  elements?: ElementUpdateManyWithoutCreatorInput,
  images?: ImageUpdateManyWithoutCreatorInput
|}

 export type ElementUpdateInput = {| 
  name?: String,
  contentText?: String,
  contentTextFormat?: String,
  creator?: UserUpdateOneWithoutElementsInput,
  contentImage?: ImageUpdateOneInput,
  contentChildren?: ChildrenUpdateOneWithoutElementsInput
|}

 export type ImageUpdateManyWithoutCreatorInput = {| 
  create?: Array< ImageCreateWithoutCreatorInput > | ImageCreateWithoutCreatorInput,
  connect?: Array< ImageWhereUniqueInput > | ImageWhereUniqueInput,
  disconnect?: Array< ImageWhereUniqueInput > | ImageWhereUniqueInput,
  delete?: Array< ImageWhereUniqueInput > | ImageWhereUniqueInput,
  update?: Array< ImageUpdateWithWhereUniqueWithoutCreatorInput > | ImageUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< ImageUpsertWithWhereUniqueWithoutCreatorInput > | ImageUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type ChildrenUpdateWithoutElementsDataInput = {| 
  order?: ChildrenUpdateorderInput
|}

 export type ImageUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: ImageWhereUniqueInput,
  data: ImageUpdateWithoutCreatorDataInput
|}

 export type UserUpdateWithoutElementsDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput,
  pages?: PageUpdateManyWithoutCreatorInput,
  images?: ImageUpdateManyWithoutCreatorInput
|}

 export type ImageUpdateWithoutCreatorDataInput = {| 
  src?: String,
  width?: Int,
  height?: Int
|}

 export type UserCreateOneWithoutPagesInput = {| 
  create?: UserCreateWithoutPagesInput,
  connect?: UserWhereUniqueInput
|}

 export type ImageUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: ImageWhereUniqueInput,
  update: ImageUpdateWithoutCreatorDataInput,
  create: ImageCreateWithoutCreatorInput
|}

 export type PageCreateManyWithoutCreatorInput = {| 
  create?: Array< PageCreateWithoutCreatorInput > | PageCreateWithoutCreatorInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput
|}

 export type UserUpsertWithoutWebsInput = {| 
  update: UserUpdateWithoutWebsDataInput,
  create: UserCreateWithoutWebsInput
|}

 export type PageWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type ChildrenUpdateorderInput = {| 
  set?: Array< ID_Input > | ID_Input
|}

 export type ChildrenUpdateDataInput = {| 
  order?: ChildrenUpdateorderInput,
  elements?: ElementUpdateManyWithoutContentChildrenInput
|}

 export type ChildrenUpdateOneInput = {| 
  create?: ChildrenCreateInput,
  delete?: Boolean,
  update?: ChildrenUpdateDataInput,
  upsert?: ChildrenUpsertNestedInput
|}

 export type WebUpsertWithoutPagesInput = {| 
  update: WebUpdateWithoutPagesDataInput,
  create: WebCreateWithoutPagesInput
|}

 export type PageUpsertWithWhereUniqueWithoutWebInput = {| 
  where: PageWhereUniqueInput,
  update: PageUpdateWithoutWebDataInput,
  create: PageCreateWithoutWebInput
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

 export type ImageCreateOneInput = {| 
  create?: ImageCreateInput,
  connect?: ImageWhereUniqueInput
|}

 export type WebCreateManyWithoutCreatorInput = {| 
  create?: Array< WebCreateWithoutCreatorInput > | WebCreateWithoutCreatorInput,
  connect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput
|}

 export type PageUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: PageWhereUniqueInput,
  update: PageUpdateWithoutCreatorDataInput,
  create: PageCreateWithoutCreatorInput
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
 * Information about pagination in a connection.

*/
 export type PageInfo = {| 
   hasNextPage: Boolean,
   hasPreviousPage: Boolean,
   startCursor?: String,
   endCursor?: String,
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
 export type UserConnection = {| 
   pageInfo: PageInfo,
   edges: UserEdge[],
   aggregate: AggregateUser,
|}

 export type BatchPayload = {| 
   count: Long,
|}

 export type AggregateImage = {| 
   count: Int,
|}

/*
 * A connection to a list of items.

*/
 export type ImageConnection = {| 
   pageInfo: PageInfo,
   edges: ImageEdge[],
   aggregate: AggregateImage,
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

/*
 * An edge in a connection.

*/
 export type ChildrenEdge = {| 
   node: Children,
   cursor: String,
|}

 export type ChildrenPreviousValues = {| 
   order: ID_Output[],
|}

 export type AggregateElement = {| 
   count: Int,
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
 export type ElementConnection = {| 
   pageInfo: PageInfo,
   edges: ElementEdge[],
   aggregate: AggregateElement,
|}

 export type ChildrenSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Children,
   updatedFields?: String[],
   previousValues?: ChildrenPreviousValues,
|}

/*
 * An edge in a connection.

*/
 export type PageEdge = {| 
   node: Page,
   cursor: String,
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

 export type UserPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   email: String,
   password: String,
   themeName?: String,
|}

/*
 * A connection to a list of items.

*/
 export type WebConnection = {| 
   pageInfo: PageInfo,
   edges: WebEdge[],
   aggregate: AggregateWeb,
|}

 export type Element = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   creator: User,
   name?: String,
   contentText?: String,
   contentTextFormat: String,
   contentImage?: Image,
   contentChildren?: Children,
|}

/*
 * An edge in a connection.

*/
 export type UserEdge = {| 
   node: User,
   cursor: String,
|}

 export type WebSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Web,
   updatedFields?: String[],
   previousValues?: WebPreviousValues,
|}

/*
 * An edge in a connection.

*/
 export type ImageEdge = {| 
   node: Image,
   cursor: String,
|}

 export type WebPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   name: String,
|}

/*
 * A connection to a list of items.

*/
 export type ChildrenConnection = {| 
   pageInfo: PageInfo,
   edges: ChildrenEdge[],
   aggregate: AggregateChildren,
|}

 export type Children = {| 
   elements?: Element[],
   order: ID_Output[],
|}

 export type AggregatePage = {| 
   count: Int,
|}

 export type PageSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Page,
   updatedFields?: String[],
   previousValues?: PagePreviousValues,
|}

/*
 * An edge in a connection.

*/
 export type WebEdge = {| 
   node: Web,
   cursor: String,
|}

 export type ImageSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Image,
   updatedFields?: String[],
   previousValues?: ImagePreviousValues,
|}

 export type ElementPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   name?: String,
   contentText?: String,
   contentTextFormat: String,
|}

 export type ElementSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Element,
   updatedFields?: String[],
   previousValues?: ElementPreviousValues,
|}

 export type Page = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   creator: User,
   title: String,
   web: Web,
   children: Children,
|}

 export type PagePreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   title: String,
|}

 export type AggregateChildren = {| 
   count: Int,
|}

 export type AggregateUser = {| 
   count: Int,
|}

/*
 * A connection to a list of items.

*/
 export type PageConnection = {| 
   pageInfo: PageInfo,
   edges: PageEdge[],
   aggregate: AggregatePage,
|}

/*
 * An edge in a connection.

*/
 export type ElementEdge = {| 
   node: Element,
   cursor: String,
|}

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

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
 export type Long = string 

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
 export type String = string 

 export type DateTime = Date | string 