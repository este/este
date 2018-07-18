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
    posts(args: { where?: PostWhereInput, orderBy?: PostOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Post[]>; 
    images(args: { where?: ImageWhereInput, orderBy?: ImageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image[]>; 
    user(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    web(args: { where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    post(args: { where: PostWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Post | null>; 
    image(args: { where: ImageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image | null>; 
    usersConnection(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<UserConnection>; 
    websConnection(args: { where?: WebWhereInput, orderBy?: WebOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<WebConnection>; 
    postsConnection(args: { where?: PostWhereInput, orderBy?: PostOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<PostConnection>; 
    imagesConnection(args: { where?: ImageWhereInput, orderBy?: ImageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ImageConnection>; 
    node(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Node | null>; 
  }

export interface Mutation {
    createUser(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User>; 
    createWeb(args: { data: WebCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web>; 
    createPost(args: { data: PostCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Post>; 
    createImage(args: { data: ImageCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image>; 
    updateUser(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    updateWeb(args: { data: WebUpdateInput, where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    updatePost(args: { data: PostUpdateInput, where: PostWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Post | null>; 
    updateImage(args: { data: ImageUpdateInput, where: ImageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image | null>; 
    deleteUser(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    deleteWeb(args: { where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    deletePost(args: { where: PostWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Post | null>; 
    deleteImage(args: { where: ImageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image | null>; 
    upsertUser(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User>; 
    upsertWeb(args: { where: WebWhereUniqueInput, create: WebCreateInput, update: WebUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web>; 
    upsertPost(args: { where: PostWhereUniqueInput, create: PostCreateInput, update: PostUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Post>; 
    upsertImage(args: { where: ImageWhereUniqueInput, create: ImageCreateInput, update: ImageUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Image>; 
    updateManyUsers(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyWebs(args: { data: WebUpdateInput, where?: WebWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyPosts(args: { data: PostUpdateInput, where?: PostWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyImages(args: { data: ImageUpdateInput, where?: ImageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyUsers(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyWebs(args: { where?: WebWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyPosts(args: { where?: PostWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyImages(args: { where?: ImageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
  }

export interface Subscription {
    user(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<UserSubscriptionPayload | null>>; 
    web(args: { where?: WebSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<WebSubscriptionPayload | null>>; 
    post(args: { where?: PostSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<PostSubscriptionPayload | null>>; 
    image(args: { where?: ImageSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ImageSubscriptionPayload | null>>; 
  }

export interface Exists {
User(where?: UserWhereInput): Promise<boolean>;
Web(where?: WebWhereInput): Promise<boolean>;
Post(where?: PostWhereInput): Promise<boolean>;
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
  new(options: BPOType): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateImage {
  count: Int!
}

type AggregatePost {
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
  _MagicalBackRelation_ImageToPost_every: PostWhereInput
  _MagicalBackRelation_ImageToPost_some: PostWhereInput
  _MagicalBackRelation_ImageToPost_none: PostWhereInput
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
  createPost(data: PostCreateInput!): Post!
  createImage(data: ImageCreateInput!): Image!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateWeb(data: WebUpdateInput!, where: WebWhereUniqueInput!): Web
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateImage(data: ImageUpdateInput!, where: ImageWhereUniqueInput!): Image
  deleteUser(where: UserWhereUniqueInput!): User
  deleteWeb(where: WebWhereUniqueInput!): Web
  deletePost(where: PostWhereUniqueInput!): Post
  deleteImage(where: ImageWhereUniqueInput!): Image
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertWeb(where: WebWhereUniqueInput!, create: WebCreateInput!, update: WebUpdateInput!): Web!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  upsertImage(where: ImageWhereUniqueInput!, create: ImageCreateInput!, update: ImageUpdateInput!): Image!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyWebs(data: WebUpdateInput!, where: WebWhereInput): BatchPayload!
  updateManyPosts(data: PostUpdateInput!, where: PostWhereInput): BatchPayload!
  updateManyImages(data: ImageUpdateInput!, where: ImageWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyWebs(where: WebWhereInput): BatchPayload!
  deleteManyPosts(where: PostWhereInput): BatchPayload!
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

"""A connection to a list of items."""
type PostConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreatechildrenOrderInput {
  set: [ID!]
}

input PostCreateInput {
  name: String
  text: String
  textFormat: String
  type: PostType
  childrenOrder: PostCreatechildrenOrderInput
  creator: UserCreateOneWithoutPostsInput!
  web: WebCreateOneWithoutPostsInput!
  parents: PostCreateManyWithoutChildrenInput
  children: PostCreateManyWithoutParentsInput
  image: ImageCreateOneInput
}

input PostCreateManyWithoutChildrenInput {
  create: [PostCreateWithoutChildrenInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateManyWithoutCreatorInput {
  create: [PostCreateWithoutCreatorInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateManyWithoutParentsInput {
  create: [PostCreateWithoutParentsInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateManyWithoutWebInput {
  create: [PostCreateWithoutWebInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateWithoutChildrenInput {
  name: String
  text: String
  textFormat: String
  type: PostType
  childrenOrder: PostCreatechildrenOrderInput
  creator: UserCreateOneWithoutPostsInput!
  web: WebCreateOneWithoutPostsInput!
  parents: PostCreateManyWithoutChildrenInput
  image: ImageCreateOneInput
}

input PostCreateWithoutCreatorInput {
  name: String
  text: String
  textFormat: String
  type: PostType
  childrenOrder: PostCreatechildrenOrderInput
  web: WebCreateOneWithoutPostsInput!
  parents: PostCreateManyWithoutChildrenInput
  children: PostCreateManyWithoutParentsInput
  image: ImageCreateOneInput
}

input PostCreateWithoutParentsInput {
  name: String
  text: String
  textFormat: String
  type: PostType
  childrenOrder: PostCreatechildrenOrderInput
  creator: UserCreateOneWithoutPostsInput!
  web: WebCreateOneWithoutPostsInput!
  children: PostCreateManyWithoutParentsInput
  image: ImageCreateOneInput
}

input PostCreateWithoutWebInput {
  name: String
  text: String
  textFormat: String
  type: PostType
  childrenOrder: PostCreatechildrenOrderInput
  creator: UserCreateOneWithoutPostsInput!
  parents: PostCreateManyWithoutChildrenInput
  children: PostCreateManyWithoutParentsInput
  image: ImageCreateOneInput
}

"""An edge in a connection."""
type PostEdge {
  """The item at the end of the edge."""
  node: Post!

  """A cursor for use in pagination."""
  cursor: String!
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

type PostPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String
  childrenOrder: [ID!]!
  text: String
  textFormat: String!
  type: PostType!
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PostSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PostSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PostSubscriptionWhereInput!]

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
  node: PostWhereInput
}

enum PostType {
  CHILDREN
  TEXT
  IMAGE
}

input PostUpdatechildrenOrderInput {
  set: [ID!]
}

input PostUpdateInput {
  name: String
  text: String
  textFormat: String
  type: PostType
  childrenOrder: PostUpdatechildrenOrderInput
  creator: UserUpdateOneWithoutPostsInput
  web: WebUpdateOneWithoutPostsInput
  parents: PostUpdateManyWithoutChildrenInput
  children: PostUpdateManyWithoutParentsInput
  image: ImageUpdateOneInput
}

input PostUpdateManyWithoutChildrenInput {
  create: [PostCreateWithoutChildrenInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  delete: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutChildrenInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutChildrenInput!]
}

input PostUpdateManyWithoutCreatorInput {
  create: [PostCreateWithoutCreatorInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  delete: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutCreatorInput!]
}

input PostUpdateManyWithoutParentsInput {
  create: [PostCreateWithoutParentsInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  delete: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutParentsInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutParentsInput!]
}

input PostUpdateManyWithoutWebInput {
  create: [PostCreateWithoutWebInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  delete: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutWebInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutWebInput!]
}

input PostUpdateWithoutChildrenDataInput {
  name: String
  text: String
  textFormat: String
  type: PostType
  childrenOrder: PostUpdatechildrenOrderInput
  creator: UserUpdateOneWithoutPostsInput
  web: WebUpdateOneWithoutPostsInput
  parents: PostUpdateManyWithoutChildrenInput
  image: ImageUpdateOneInput
}

input PostUpdateWithoutCreatorDataInput {
  name: String
  text: String
  textFormat: String
  type: PostType
  childrenOrder: PostUpdatechildrenOrderInput
  web: WebUpdateOneWithoutPostsInput
  parents: PostUpdateManyWithoutChildrenInput
  children: PostUpdateManyWithoutParentsInput
  image: ImageUpdateOneInput
}

input PostUpdateWithoutParentsDataInput {
  name: String
  text: String
  textFormat: String
  type: PostType
  childrenOrder: PostUpdatechildrenOrderInput
  creator: UserUpdateOneWithoutPostsInput
  web: WebUpdateOneWithoutPostsInput
  children: PostUpdateManyWithoutParentsInput
  image: ImageUpdateOneInput
}

input PostUpdateWithoutWebDataInput {
  name: String
  text: String
  textFormat: String
  type: PostType
  childrenOrder: PostUpdatechildrenOrderInput
  creator: UserUpdateOneWithoutPostsInput
  parents: PostUpdateManyWithoutChildrenInput
  children: PostUpdateManyWithoutParentsInput
  image: ImageUpdateOneInput
}

input PostUpdateWithWhereUniqueWithoutChildrenInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutChildrenDataInput!
}

input PostUpdateWithWhereUniqueWithoutCreatorInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutCreatorDataInput!
}

input PostUpdateWithWhereUniqueWithoutParentsInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutParentsDataInput!
}

input PostUpdateWithWhereUniqueWithoutWebInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutWebDataInput!
}

input PostUpsertWithWhereUniqueWithoutChildrenInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutChildrenDataInput!
  create: PostCreateWithoutChildrenInput!
}

input PostUpsertWithWhereUniqueWithoutCreatorInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutCreatorDataInput!
  create: PostCreateWithoutCreatorInput!
}

input PostUpsertWithWhereUniqueWithoutParentsInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutParentsDataInput!
  create: PostCreateWithoutParentsInput!
}

input PostUpsertWithWhereUniqueWithoutWebInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutWebDataInput!
  create: PostCreateWithoutWebInput!
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

input PostWhereUniqueInput {
  id: ID
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  webs(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Web]!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  images(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image]!
  user(where: UserWhereUniqueInput!): User
  web(where: WebWhereUniqueInput!): Web
  post(where: PostWhereUniqueInput!): Post
  image(where: ImageWhereUniqueInput!): Image
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  websConnection(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WebConnection!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
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
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
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
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
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
  posts: PostCreateManyWithoutCreatorInput
  images: ImageCreateManyWithoutCreatorInput
}

input UserCreateOneWithoutImagesInput {
  create: UserCreateWithoutImagesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutWebsInput {
  create: UserCreateWithoutWebsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutImagesInput {
  email: String!
  password: String!
  themeName: String
  webs: WebCreateManyWithoutCreatorInput
  posts: PostCreateManyWithoutCreatorInput
}

input UserCreateWithoutPostsInput {
  email: String!
  password: String!
  themeName: String
  webs: WebCreateManyWithoutCreatorInput
  images: ImageCreateManyWithoutCreatorInput
}

input UserCreateWithoutWebsInput {
  email: String!
  password: String!
  themeName: String
  posts: PostCreateManyWithoutCreatorInput
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
  posts: PostUpdateManyWithoutCreatorInput
  images: ImageUpdateManyWithoutCreatorInput
}

input UserUpdateOneWithoutImagesInput {
  create: UserCreateWithoutImagesInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutImagesDataInput
  upsert: UserUpsertWithoutImagesInput
}

input UserUpdateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutPostsDataInput
  upsert: UserUpsertWithoutPostsInput
}

input UserUpdateOneWithoutWebsInput {
  create: UserCreateWithoutWebsInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutWebsDataInput
  upsert: UserUpsertWithoutWebsInput
}

input UserUpdateWithoutImagesDataInput {
  email: String
  password: String
  themeName: String
  webs: WebUpdateManyWithoutCreatorInput
  posts: PostUpdateManyWithoutCreatorInput
}

input UserUpdateWithoutPostsDataInput {
  email: String
  password: String
  themeName: String
  webs: WebUpdateManyWithoutCreatorInput
  images: ImageUpdateManyWithoutCreatorInput
}

input UserUpdateWithoutWebsDataInput {
  email: String
  password: String
  themeName: String
  posts: PostUpdateManyWithoutCreatorInput
  images: ImageUpdateManyWithoutCreatorInput
}

input UserUpsertWithoutImagesInput {
  update: UserUpdateWithoutImagesDataInput!
  create: UserCreateWithoutImagesInput!
}

input UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput!
  create: UserCreateWithoutPostsInput!
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
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
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
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
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
  posts: PostCreateManyWithoutWebInput
}

input WebCreateManyWithoutCreatorInput {
  create: [WebCreateWithoutCreatorInput!]
  connect: [WebWhereUniqueInput!]
}

input WebCreateOneWithoutPostsInput {
  create: WebCreateWithoutPostsInput
  connect: WebWhereUniqueInput
}

input WebCreateWithoutCreatorInput {
  name: String!
  posts: PostCreateManyWithoutWebInput
}

input WebCreateWithoutPostsInput {
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
  posts: PostUpdateManyWithoutWebInput
}

input WebUpdateManyWithoutCreatorInput {
  create: [WebCreateWithoutCreatorInput!]
  connect: [WebWhereUniqueInput!]
  disconnect: [WebWhereUniqueInput!]
  delete: [WebWhereUniqueInput!]
  update: [WebUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [WebUpsertWithWhereUniqueWithoutCreatorInput!]
}

input WebUpdateOneWithoutPostsInput {
  create: WebCreateWithoutPostsInput
  connect: WebWhereUniqueInput
  delete: Boolean
  update: WebUpdateWithoutPostsDataInput
  upsert: WebUpsertWithoutPostsInput
}

input WebUpdateWithoutCreatorDataInput {
  name: String
  posts: PostUpdateManyWithoutWebInput
}

input WebUpdateWithoutPostsDataInput {
  name: String
  creator: UserUpdateOneWithoutWebsInput
}

input WebUpdateWithWhereUniqueWithoutCreatorInput {
  where: WebWhereUniqueInput!
  data: WebUpdateWithoutCreatorDataInput!
}

input WebUpsertWithoutPostsInput {
  update: WebUpdateWithoutPostsDataInput!
  create: WebCreateWithoutPostsInput!
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
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
}

input WebWhereUniqueInput {
  id: ID
}
`

const prisma: BindingConstructor<Prisma> = makePrismaBindingClass({typeDefs})
 


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
  

 export type PostType =
    | 'CHILDREN'
    | 'TEXT'
    | 'IMAGE'
  

 export type WebOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'name_ASC'
    | 'name_DESC'
  

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
  

 export type WebCreateInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  posts?: PostCreateManyWithoutWebInput
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

 export type WebCreateWithoutPostsInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput
|}

 export type PostUpdateWithoutParentsDataInput = {| 
  name?: String,
  text?: String,
  textFormat?: String,
  type?: PostType,
  childrenOrder?: PostUpdatechildrenOrderInput,
  creator?: UserUpdateOneWithoutPostsInput,
  web?: WebUpdateOneWithoutPostsInput,
  children?: PostUpdateManyWithoutParentsInput,
  image?: ImageUpdateOneInput
|}

 export type UserCreateOneWithoutWebsInput = {| 
  create?: UserCreateWithoutWebsInput,
  connect?: UserWhereUniqueInput
|}

 export type WebUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: WebWhereUniqueInput,
  data: WebUpdateWithoutCreatorDataInput
|}

 export type UserCreateWithoutWebsInput = {| 
  email: String,
  password: String,
  themeName?: String,
  posts?: PostCreateManyWithoutCreatorInput,
  images?: ImageCreateManyWithoutCreatorInput
|}

 export type PostSubscriptionWhereInput = {| 
  AND?: Array< PostSubscriptionWhereInput > | PostSubscriptionWhereInput,
  OR?: Array< PostSubscriptionWhereInput > | PostSubscriptionWhereInput,
  NOT?: Array< PostSubscriptionWhereInput > | PostSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: PostWhereInput
|}

 export type PostCreateManyWithoutCreatorInput = {| 
  create?: Array< PostCreateWithoutCreatorInput > | PostCreateWithoutCreatorInput,
  connect?: Array< PostWhereUniqueInput > | PostWhereUniqueInput
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

 export type PostCreateWithoutCreatorInput = {| 
  name?: String,
  text?: String,
  textFormat?: String,
  type?: PostType,
  childrenOrder?: PostCreatechildrenOrderInput,
  web: WebCreateOneWithoutPostsInput,
  parents?: PostCreateManyWithoutChildrenInput,
  children?: PostCreateManyWithoutParentsInput,
  image?: ImageCreateOneInput
|}

 export type ImageUpdateInput = {| 
  src?: String,
  width?: Int,
  height?: Int,
  creator?: UserUpdateOneWithoutImagesInput
|}

 export type PostCreateManyWithoutParentsInput = {| 
  create?: Array< PostCreateWithoutParentsInput > | PostCreateWithoutParentsInput,
  connect?: Array< PostWhereUniqueInput > | PostWhereUniqueInput
|}

 export type WebWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type PostCreateWithoutParentsInput = {| 
  name?: String,
  text?: String,
  textFormat?: String,
  type?: PostType,
  childrenOrder?: PostCreatechildrenOrderInput,
  creator: UserCreateOneWithoutPostsInput,
  web: WebCreateOneWithoutPostsInput,
  children?: PostCreateManyWithoutParentsInput,
  image?: ImageCreateOneInput
|}

 export type ImageWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type ImageCreateOneInput = {| 
  create?: ImageCreateInput,
  connect?: ImageWhereUniqueInput
|}

 export type WebUpdateInput = {| 
  name?: String,
  creator?: UserUpdateOneWithoutWebsInput,
  posts?: PostUpdateManyWithoutWebInput
|}

 export type ImageCreateInput = {| 
  src: String,
  width: Int,
  height: Int,
  creator: UserCreateOneWithoutImagesInput
|}

 export type PostUpsertWithWhereUniqueWithoutWebInput = {| 
  where: PostWhereUniqueInput,
  update: PostUpdateWithoutWebDataInput,
  create: PostCreateWithoutWebInput
|}

 export type UserCreateOneWithoutImagesInput = {| 
  create?: UserCreateWithoutImagesInput,
  connect?: UserWhereUniqueInput
|}

 export type WebUpsertWithoutPostsInput = {| 
  update: WebUpdateWithoutPostsDataInput,
  create: WebCreateWithoutPostsInput
|}

 export type UserCreateWithoutImagesInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput,
  posts?: PostCreateManyWithoutCreatorInput
|}

 export type PostUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: PostWhereUniqueInput,
  update: PostUpdateWithoutCreatorDataInput,
  create: PostCreateWithoutCreatorInput
|}

 export type ImageUpdateOneInput = {| 
  create?: ImageCreateInput,
  connect?: ImageWhereUniqueInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: ImageUpdateDataInput,
  upsert?: ImageUpsertNestedInput
|}

 export type ImageUpsertNestedInput = {| 
  update: ImageUpdateDataInput,
  create: ImageCreateInput
|}

 export type PostCreateInput = {| 
  name?: String,
  text?: String,
  textFormat?: String,
  type?: PostType,
  childrenOrder?: PostCreatechildrenOrderInput,
  creator: UserCreateOneWithoutPostsInput,
  web: WebCreateOneWithoutPostsInput,
  parents?: PostCreateManyWithoutChildrenInput,
  children?: PostCreateManyWithoutParentsInput,
  image?: ImageCreateOneInput
|}

 export type UserUpdateWithoutImagesDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput,
  posts?: PostUpdateManyWithoutCreatorInput
|}

 export type UserUpdateInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput,
  posts?: PostUpdateManyWithoutCreatorInput,
  images?: ImageUpdateManyWithoutCreatorInput
|}

 export type ImageUpdateDataInput = {| 
  src?: String,
  width?: Int,
  height?: Int,
  creator?: UserUpdateOneWithoutImagesInput
|}

 export type WebUpdateManyWithoutCreatorInput = {| 
  create?: Array< WebCreateWithoutCreatorInput > | WebCreateWithoutCreatorInput,
  connect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  disconnect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  delete?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  update?: Array< WebUpdateWithWhereUniqueWithoutCreatorInput > | WebUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< WebUpsertWithWhereUniqueWithoutCreatorInput > | WebUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type WebCreateManyWithoutCreatorInput = {| 
  create?: Array< WebCreateWithoutCreatorInput > | WebCreateWithoutCreatorInput,
  connect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput
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

 export type PostCreateManyWithoutWebInput = {| 
  create?: Array< PostCreateWithoutWebInput > | PostCreateWithoutWebInput,
  connect?: Array< PostWhereUniqueInput > | PostWhereUniqueInput
|}

 export type WebUpdateWithoutCreatorDataInput = {| 
  name?: String,
  posts?: PostUpdateManyWithoutWebInput
|}

 export type PostCreatechildrenOrderInput = {| 
  set?: Array< ID_Input > | ID_Input
|}

 export type PostUpdateManyWithoutWebInput = {| 
  create?: Array< PostCreateWithoutWebInput > | PostCreateWithoutWebInput,
  connect?: Array< PostWhereUniqueInput > | PostWhereUniqueInput,
  disconnect?: Array< PostWhereUniqueInput > | PostWhereUniqueInput,
  delete?: Array< PostWhereUniqueInput > | PostWhereUniqueInput,
  update?: Array< PostUpdateWithWhereUniqueWithoutWebInput > | PostUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< PostUpsertWithWhereUniqueWithoutWebInput > | PostUpsertWithWhereUniqueWithoutWebInput
|}

 export type UserCreateWithoutPostsInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput,
  images?: ImageCreateManyWithoutCreatorInput
|}

 export type PostUpdateWithWhereUniqueWithoutWebInput = {| 
  where: PostWhereUniqueInput,
  data: PostUpdateWithoutWebDataInput
|}

 export type ImageCreateWithoutCreatorInput = {| 
  src: String,
  width: Int,
  height: Int
|}

 export type PostUpdateWithoutWebDataInput = {| 
  name?: String,
  text?: String,
  textFormat?: String,
  type?: PostType,
  childrenOrder?: PostUpdatechildrenOrderInput,
  creator?: UserUpdateOneWithoutPostsInput,
  parents?: PostUpdateManyWithoutChildrenInput,
  children?: PostUpdateManyWithoutParentsInput,
  image?: ImageUpdateOneInput
|}

 export type PostCreateWithoutChildrenInput = {| 
  name?: String,
  text?: String,
  textFormat?: String,
  type?: PostType,
  childrenOrder?: PostCreatechildrenOrderInput,
  creator: UserCreateOneWithoutPostsInput,
  web: WebCreateOneWithoutPostsInput,
  parents?: PostCreateManyWithoutChildrenInput,
  image?: ImageCreateOneInput
|}

 export type PostUpdatechildrenOrderInput = {| 
  set?: Array< ID_Input > | ID_Input
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

 export type UserUpdateOneWithoutPostsInput = {| 
  create?: UserCreateWithoutPostsInput,
  connect?: UserWhereUniqueInput,
  delete?: Boolean,
  update?: UserUpdateWithoutPostsDataInput,
  upsert?: UserUpsertWithoutPostsInput
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

 export type UserUpdateWithoutPostsDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput,
  images?: ImageUpdateManyWithoutCreatorInput
|}

 export type UserWhereUniqueInput = {| 
  id?: ID_Input,
  email?: String
|}

 export type ImageUpdateManyWithoutCreatorInput = {| 
  create?: Array< ImageCreateWithoutCreatorInput > | ImageCreateWithoutCreatorInput,
  connect?: Array< ImageWhereUniqueInput > | ImageWhereUniqueInput,
  disconnect?: Array< ImageWhereUniqueInput > | ImageWhereUniqueInput,
  delete?: Array< ImageWhereUniqueInput > | ImageWhereUniqueInput,
  update?: Array< ImageUpdateWithWhereUniqueWithoutCreatorInput > | ImageUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< ImageUpsertWithWhereUniqueWithoutCreatorInput > | ImageUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type PostUpdateInput = {| 
  name?: String,
  text?: String,
  textFormat?: String,
  type?: PostType,
  childrenOrder?: PostUpdatechildrenOrderInput,
  creator?: UserUpdateOneWithoutPostsInput,
  web?: WebUpdateOneWithoutPostsInput,
  parents?: PostUpdateManyWithoutChildrenInput,
  children?: PostUpdateManyWithoutParentsInput,
  image?: ImageUpdateOneInput
|}

 export type ImageUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: ImageWhereUniqueInput,
  data: ImageUpdateWithoutCreatorDataInput
|}

 export type PostUpsertWithWhereUniqueWithoutChildrenInput = {| 
  where: PostWhereUniqueInput,
  update: PostUpdateWithoutChildrenDataInput,
  create: PostCreateWithoutChildrenInput
|}

 export type ImageUpdateWithoutCreatorDataInput = {| 
  src?: String,
  width?: Int,
  height?: Int
|}

 export type PostUpsertWithWhereUniqueWithoutParentsInput = {| 
  where: PostWhereUniqueInput,
  update: PostUpdateWithoutParentsDataInput,
  create: PostCreateWithoutParentsInput
|}

 export type ImageUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: ImageWhereUniqueInput,
  update: ImageUpdateWithoutCreatorDataInput,
  create: ImageCreateWithoutCreatorInput
|}

 export type UserUpdateOneWithoutImagesInput = {| 
  create?: UserCreateWithoutImagesInput,
  connect?: UserWhereUniqueInput,
  delete?: Boolean,
  update?: UserUpdateWithoutImagesDataInput,
  upsert?: UserUpsertWithoutImagesInput
|}

 export type UserUpsertWithoutPostsInput = {| 
  update: UserUpdateWithoutPostsDataInput,
  create: UserCreateWithoutPostsInput
|}

 export type WebCreateWithoutCreatorInput = {| 
  name: String,
  posts?: PostCreateManyWithoutWebInput
|}

 export type PostUpdateManyWithoutChildrenInput = {| 
  create?: Array< PostCreateWithoutChildrenInput > | PostCreateWithoutChildrenInput,
  connect?: Array< PostWhereUniqueInput > | PostWhereUniqueInput,
  disconnect?: Array< PostWhereUniqueInput > | PostWhereUniqueInput,
  delete?: Array< PostWhereUniqueInput > | PostWhereUniqueInput,
  update?: Array< PostUpdateWithWhereUniqueWithoutChildrenInput > | PostUpdateWithWhereUniqueWithoutChildrenInput,
  upsert?: Array< PostUpsertWithWhereUniqueWithoutChildrenInput > | PostUpsertWithWhereUniqueWithoutChildrenInput
|}

 export type UserCreateOneWithoutPostsInput = {| 
  create?: UserCreateWithoutPostsInput,
  connect?: UserWhereUniqueInput
|}

 export type PostUpdateWithWhereUniqueWithoutChildrenInput = {| 
  where: PostWhereUniqueInput,
  data: PostUpdateWithoutChildrenDataInput
|}

 export type PostCreateManyWithoutChildrenInput = {| 
  create?: Array< PostCreateWithoutChildrenInput > | PostCreateWithoutChildrenInput,
  connect?: Array< PostWhereUniqueInput > | PostWhereUniqueInput
|}

 export type PostUpdateWithoutChildrenDataInput = {| 
  name?: String,
  text?: String,
  textFormat?: String,
  type?: PostType,
  childrenOrder?: PostUpdatechildrenOrderInput,
  creator?: UserUpdateOneWithoutPostsInput,
  web?: WebUpdateOneWithoutPostsInput,
  parents?: PostUpdateManyWithoutChildrenInput,
  image?: ImageUpdateOneInput
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

 export type WebUpdateOneWithoutPostsInput = {| 
  create?: WebCreateWithoutPostsInput,
  connect?: WebWhereUniqueInput,
  delete?: Boolean,
  update?: WebUpdateWithoutPostsDataInput,
  upsert?: WebUpsertWithoutPostsInput
|}

 export type PostWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type WebUpdateWithoutPostsDataInput = {| 
  name?: String,
  creator?: UserUpdateOneWithoutWebsInput
|}

 export type UserUpsertWithoutWebsInput = {| 
  update: UserUpdateWithoutWebsDataInput,
  create: UserCreateWithoutWebsInput
|}

 export type UserUpdateOneWithoutWebsInput = {| 
  create?: UserCreateWithoutWebsInput,
  connect?: UserWhereUniqueInput,
  delete?: Boolean,
  update?: UserUpdateWithoutWebsDataInput,
  upsert?: UserUpsertWithoutWebsInput
|}

 export type UserCreateInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput,
  posts?: PostCreateManyWithoutCreatorInput,
  images?: ImageCreateManyWithoutCreatorInput
|}

 export type UserUpdateWithoutWebsDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  posts?: PostUpdateManyWithoutCreatorInput,
  images?: ImageUpdateManyWithoutCreatorInput
|}

 export type ImageCreateManyWithoutCreatorInput = {| 
  create?: Array< ImageCreateWithoutCreatorInput > | ImageCreateWithoutCreatorInput,
  connect?: Array< ImageWhereUniqueInput > | ImageWhereUniqueInput
|}

 export type PostUpdateManyWithoutCreatorInput = {| 
  create?: Array< PostCreateWithoutCreatorInput > | PostCreateWithoutCreatorInput,
  connect?: Array< PostWhereUniqueInput > | PostWhereUniqueInput,
  disconnect?: Array< PostWhereUniqueInput > | PostWhereUniqueInput,
  delete?: Array< PostWhereUniqueInput > | PostWhereUniqueInput,
  update?: Array< PostUpdateWithWhereUniqueWithoutCreatorInput > | PostUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< PostUpsertWithWhereUniqueWithoutCreatorInput > | PostUpsertWithWhereUniqueWithoutCreatorInput
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

 export type PostUpdateWithWhereUniqueWithoutParentsInput = {| 
  where: PostWhereUniqueInput,
  data: PostUpdateWithoutParentsDataInput
|}

 export type PostUpdateManyWithoutParentsInput = {| 
  create?: Array< PostCreateWithoutParentsInput > | PostCreateWithoutParentsInput,
  connect?: Array< PostWhereUniqueInput > | PostWhereUniqueInput,
  disconnect?: Array< PostWhereUniqueInput > | PostWhereUniqueInput,
  delete?: Array< PostWhereUniqueInput > | PostWhereUniqueInput,
  update?: Array< PostUpdateWithWhereUniqueWithoutParentsInput > | PostUpdateWithWhereUniqueWithoutParentsInput,
  upsert?: Array< PostUpsertWithWhereUniqueWithoutParentsInput > | PostUpsertWithWhereUniqueWithoutParentsInput
|}

 export type PostUpdateWithoutCreatorDataInput = {| 
  name?: String,
  text?: String,
  textFormat?: String,
  type?: PostType,
  childrenOrder?: PostUpdatechildrenOrderInput,
  web?: WebUpdateOneWithoutPostsInput,
  parents?: PostUpdateManyWithoutChildrenInput,
  children?: PostUpdateManyWithoutParentsInput,
  image?: ImageUpdateOneInput
|}

 export type PostUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: PostWhereUniqueInput,
  data: PostUpdateWithoutCreatorDataInput
|}

 export type WebUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: WebWhereUniqueInput,
  update: WebUpdateWithoutCreatorDataInput,
  create: WebCreateWithoutCreatorInput
|}

 export type WebCreateOneWithoutPostsInput = {| 
  create?: WebCreateWithoutPostsInput,
  connect?: WebWhereUniqueInput
|}

 export type PostCreateWithoutWebInput = {| 
  name?: String,
  text?: String,
  textFormat?: String,
  type?: PostType,
  childrenOrder?: PostCreatechildrenOrderInput,
  creator: UserCreateOneWithoutPostsInput,
  parents?: PostCreateManyWithoutChildrenInput,
  children?: PostCreateManyWithoutParentsInput,
  image?: ImageCreateOneInput
|}

 export type UserUpsertWithoutImagesInput = {| 
  update: UserUpdateWithoutImagesDataInput,
  create: UserCreateWithoutImagesInput
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

 export type PostSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Post,
   updatedFields?: String[],
   previousValues?: PostPreviousValues,
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

 export type BatchPayload = {| 
   count: Long,
|}

/*
 * An edge in a connection.

*/
 export type PostEdge = {| 
   node: Post,
   cursor: String,
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

 export type AggregateWeb = {| 
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
 export type WebConnection = {| 
   pageInfo: PageInfo,
   edges: WebEdge[],
   aggregate: AggregateWeb,
|}

 export type PostPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   name?: String,
   childrenOrder: ID_Output[],
   text?: String,
   textFormat: String,
   type: PostType,
|}

/*
 * An edge in a connection.

*/
 export type UserEdge = {| 
   node: User,
   cursor: String,
|}

 export type UserSubscriptionPayload = {| 
   mutation: MutationType,
   node?: User,
   updatedFields?: String[],
   previousValues?: UserPreviousValues,
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

 export type UserPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   email: String,
   password: String,
   themeName?: String,
|}

 export type AggregatePost = {| 
   count: Int,
|}

 export type Web = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   creator: User,
   name: String,
   posts?: Post[],
|}

 export type WebPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   name: String,
|}

 export type WebSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Web,
   updatedFields?: String[],
   previousValues?: WebPreviousValues,
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

/*
 * A connection to a list of items.

*/
 export type PostConnection = {| 
   pageInfo: PageInfo,
   edges: PostEdge[],
   aggregate: AggregatePost,
|}

/*
 * An edge in a connection.

*/
 export type ImageEdge = {| 
   node: Image,
   cursor: String,
|}

 export type ImageSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Image,
   updatedFields?: String[],
   previousValues?: ImagePreviousValues,
|}

 export type AggregateUser = {| 
   count: Int,
|}

/*
 * An edge in a connection.

*/
 export type WebEdge = {| 
   node: Web,
   cursor: String,
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

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
 export type Long = string 

 export type DateTime = Date | string 