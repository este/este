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
    page(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, context: Context): Promise<Page | null>; 
    web(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, context: Context): Promise<Web | null>; 
  }

export interface Mutation {
    auth(args: { input: AuthInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<AuthPayload | null>; 
    createWeb(args: { input: CreateWebInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<CreateWebPayload | null>; 
    deleteWeb(args: { input: DeleteWebInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<DeleteWebPayload | null>; 
    setTheme(args: { input: SetThemeInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<SetThemePayload | null>; 
    setPageTitle(args: { input: SetPageTitleInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<SetPageTitlePayload | null>; 
    setWebName(args: { input: SetWebNameInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<SetWebNamePayload | null>; 
    setPageContent(args: { input: SetPageContentInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<SetPageContentPayload | null>; 
    deletePage(args: { input: DeletePageInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<DeletePagePayload | null>; 
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

type BorderValue {
  unit: BorderValueUnit!
  value: Int!
}

enum BorderValueUnit {
  POINT
}

input BorderValueWhereInput {
  """Logical AND on all given filters."""
  AND: [BorderValueWhereInput!]

  """Logical OR on all given filters."""
  OR: [BorderValueWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [BorderValueWhereInput!]
  unit: BorderValueUnit

  """All values that are not equal to given value."""
  unit_not: BorderValueUnit

  """All values that are contained in given list."""
  unit_in: [BorderValueUnit!]

  """All values that are not contained in given list."""
  unit_not_in: [BorderValueUnit!]
  value: Int

  """All values that are not equal to given value."""
  value_not: Int

  """All values that are contained in given list."""
  value_in: [Int!]

  """All values that are not contained in given list."""
  value_not_in: [Int!]

  """All values less than the given value."""
  value_lt: Int

  """All values less than or equal the given value."""
  value_lte: Int

  """All values greater than the given value."""
  value_gt: Int

  """All values greater than or equal the given value."""
  value_gte: Int
}

type ColorValue implements Node {
  id: ID!
  web(where: WebWhereInput): Web!
  name: String
  r: Int!
  g: Int!
  b: Int!
  a: Float
}

enum ColorValueOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  r_ASC
  r_DESC
  g_ASC
  g_DESC
  b_ASC
  b_DESC
  a_ASC
  a_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

input ColorValueWhereInput {
  """Logical AND on all given filters."""
  AND: [ColorValueWhereInput!]

  """Logical OR on all given filters."""
  OR: [ColorValueWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ColorValueWhereInput!]
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
  r: Int

  """All values that are not equal to given value."""
  r_not: Int

  """All values that are contained in given list."""
  r_in: [Int!]

  """All values that are not contained in given list."""
  r_not_in: [Int!]

  """All values less than the given value."""
  r_lt: Int

  """All values less than or equal the given value."""
  r_lte: Int

  """All values greater than the given value."""
  r_gt: Int

  """All values greater than or equal the given value."""
  r_gte: Int
  g: Int

  """All values that are not equal to given value."""
  g_not: Int

  """All values that are contained in given list."""
  g_in: [Int!]

  """All values that are not contained in given list."""
  g_not_in: [Int!]

  """All values less than the given value."""
  g_lt: Int

  """All values less than or equal the given value."""
  g_lte: Int

  """All values greater than the given value."""
  g_gt: Int

  """All values greater than or equal the given value."""
  g_gte: Int
  b: Int

  """All values that are not equal to given value."""
  b_not: Int

  """All values that are contained in given list."""
  b_in: [Int!]

  """All values that are not contained in given list."""
  b_not_in: [Int!]

  """All values less than the given value."""
  b_lt: Int

  """All values less than or equal the given value."""
  b_lte: Int

  """All values greater than the given value."""
  b_gt: Int

  """All values greater than or equal the given value."""
  b_gte: Int
  a: Float

  """All values that are not equal to given value."""
  a_not: Float

  """All values that are contained in given list."""
  a_in: [Float!]

  """All values that are not contained in given list."""
  a_not_in: [Float!]

  """All values less than the given value."""
  a_lt: Float

  """All values less than or equal the given value."""
  a_lte: Float

  """All values greater than the given value."""
  a_gt: Float

  """All values greater than or equal the given value."""
  a_gte: Float
  web: WebWhereInput
}

type Component implements Node {
  id: ID!
  web(where: WebWhereInput): Web!
  document(where: DocumentWhereInput): Document
  name: String!
  style(where: StyleWhereInput): Style
}

input ComponentWhereInput {
  """Logical AND on all given filters."""
  AND: [ComponentWhereInput!]

  """Logical OR on all given filters."""
  OR: [ComponentWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ComponentWhereInput!]
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
  web: WebWhereInput
  document: DocumentWhereInput
  style: StyleWhereInput
}

type CreateWebErrors {
  name: Max140CharsError
  pageTitle: Max140CharsError
}

input CreateWebInput {
  name: String!
  pageTitle: String!
}

type CreateWebPayload {
  errors: CreateWebErrors
  pageId: ID
}

scalar DateTime

input DeletePageInput {
  id: ID!
}

type DeletePagePayload {
  page: Page
}

input DeleteWebInput {
  id: ID!
}

type DeleteWebPayload {
  web: Web
}

type DimensionValue implements Node {
  id: ID!
  web(where: WebWhereInput): Web!
  name: String
  unit: DimensionValueUnit!
  value: Int!
}

enum DimensionValueOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  unit_ASC
  unit_DESC
  value_ASC
  value_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

enum DimensionValueUnit {
  POINT
  PERCENTAGE
}

input DimensionValueWhereInput {
  """Logical AND on all given filters."""
  AND: [DimensionValueWhereInput!]

  """Logical OR on all given filters."""
  OR: [DimensionValueWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DimensionValueWhereInput!]
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
  unit: DimensionValueUnit

  """All values that are not equal to given value."""
  unit_not: DimensionValueUnit

  """All values that are contained in given list."""
  unit_in: [DimensionValueUnit!]

  """All values that are not contained in given list."""
  unit_not_in: [DimensionValueUnit!]
  value: Int

  """All values that are not equal to given value."""
  value_not: Int

  """All values that are contained in given list."""
  value_in: [Int!]

  """All values that are not contained in given list."""
  value_not_in: [Int!]

  """All values less than the given value."""
  value_lt: Int

  """All values less than or equal the given value."""
  value_lte: Int

  """All values greater than the given value."""
  value_gt: Int

  """All values greater than or equal the given value."""
  value_gte: Int
  web: WebWhereInput
}

type Document implements Node {
  id: ID!
  elements(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Element!]
}

input DocumentWhereInput {
  """Logical AND on all given filters."""
  AND: [DocumentWhereInput!]

  """Logical OR on all given filters."""
  OR: [DocumentWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DocumentWhereInput!]
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
  elements_every: ElementWhereInput
  elements_some: ElementWhereInput
  elements_none: ElementWhereInput
}

type Element implements Node {
  id: ID!
  document(where: DocumentWhereInput): Document!
  component(where: ComponentWhereInput): Component
  path: [Int!]!
  type: ElementType
  style(where: StyleWhereInput): Style
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

enum ElementType {
  DOCUMENT
  BLOCK
  TEXT
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
  document: DocumentWhereInput
  component: ComponentWhereInput
  style: StyleWhereInput
}

enum EmailError {
  REQUIRED
  EMAIL
  ALREADY_EXISTS
  NOT_EXISTS
}

"""Raw JSON value"""
scalar Json

enum Max140CharsError {
  REQUIRED
  MAX_140_CHARS
}

type Mutation {
  auth(input: AuthInput!): AuthPayload
  createWeb(input: CreateWebInput!): CreateWebPayload
  deleteWeb(input: DeleteWebInput!): DeleteWebPayload
  setTheme(input: SetThemeInput!): SetThemePayload
  setPageTitle(input: SetPageTitleInput!): SetPageTitlePayload
  setWebName(input: SetWebNameInput!): SetWebNamePayload
  setPageContent(input: SetPageContentInput!): SetPageContentPayload
  deletePage(input: DeletePageInput!): DeletePagePayload
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

type Page implements Node {
  id: ID!
  creator(where: UserWhereInput): User!
  web(where: WebWhereInput): Web!
  document(where: DocumentWhereInput): Document
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  content: Json
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
  document: DocumentWhereInput
}

enum PasswordError {
  REQUIRED
  MIN_5_CHARS
  MAX_1024_CHARS
  WRONG_PASSWORD
}

type Query {
  me: User
  page(id: ID!): Page
  web(id: ID!): Web
}

input SetPageContentInput {
  id: ID!
  content: Json!
}

type SetPageContentPayload {
  page: Page
}

type SetPageTitleErrors {
  title: Max140CharsError
}

input SetPageTitleInput {
  id: ID!
  title: String!
}

type SetPageTitlePayload {
  errors: SetPageTitleErrors
  page: Page
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

type Style implements Node {
  id: ID!
  web(where: WebWhereInput): Web!
  type: StyleType!
  name: String
  display: StyleDisplay
  width(where: DimensionValueWhereInput): DimensionValue
  height(where: DimensionValueWhereInput): DimensionValue
  bottom(where: DimensionValueWhereInput): DimensionValue
  end(where: DimensionValueWhereInput): DimensionValue
  left(where: DimensionValueWhereInput): DimensionValue
  right(where: DimensionValueWhereInput): DimensionValue
  start(where: DimensionValueWhereInput): DimensionValue
  top(where: DimensionValueWhereInput): DimensionValue
  minWidth(where: DimensionValueWhereInput): DimensionValue
  maxWidth(where: DimensionValueWhereInput): DimensionValue
  minHeight(where: DimensionValueWhereInput): DimensionValue
  maxHeight(where: DimensionValueWhereInput): DimensionValue
  margin(where: DimensionValueWhereInput): DimensionValue
  marginBottom(where: DimensionValueWhereInput): DimensionValue
  marginEnd(where: DimensionValueWhereInput): DimensionValue
  marginHorizontal(where: DimensionValueWhereInput): DimensionValue
  marginLeft(where: DimensionValueWhereInput): DimensionValue
  marginRight(where: DimensionValueWhereInput): DimensionValue
  marginStart(where: DimensionValueWhereInput): DimensionValue
  marginTop(where: DimensionValueWhereInput): DimensionValue
  marginVertical(where: DimensionValueWhereInput): DimensionValue
  padding(where: DimensionValueWhereInput): DimensionValue
  paddingBottom(where: DimensionValueWhereInput): DimensionValue
  paddingEnd(where: DimensionValueWhereInput): DimensionValue
  paddingHorizontal(where: DimensionValueWhereInput): DimensionValue
  paddingLeft(where: DimensionValueWhereInput): DimensionValue
  paddingRight(where: DimensionValueWhereInput): DimensionValue
  paddingStart(where: DimensionValueWhereInput): DimensionValue
  paddingTop(where: DimensionValueWhereInput): DimensionValue
  paddingVertical(where: DimensionValueWhereInput): DimensionValue
  position: StylePosition
  flexDirection: StyleFlexDirection
  flexWrap: StyleFlexWrap
  justifyContent: StyleJustifyContent
  alignItems: StyleAlignItems
  alignSelf: StyleAlignSelf
  alignContent: StyleAlignContent
  overflow: StyleOverflow
  flex: Int
  flexGrow: Int
  flexShrink: Int
  flexBasis: Int
  zIndex: Int
  direction: StyleDirection
  shadowColor(where: ColorValueWhereInput): ColorValue
  shadowOffset(where: StyleShadowOffsetWhereInput): StyleShadowOffset
  shadowOpacity: Int
  shadowRadius: Int
  backgroundColor(where: ColorValueWhereInput): ColorValue
  borderColor(where: ColorValueWhereInput): ColorValue
  borderBottomColor(where: ColorValueWhereInput): ColorValue
  borderEndColor(where: ColorValueWhereInput): ColorValue
  borderLeftColor(where: ColorValueWhereInput): ColorValue
  borderRightColor(where: ColorValueWhereInput): ColorValue
  borderStartColor(where: ColorValueWhereInput): ColorValue
  borderTopColor(where: ColorValueWhereInput): ColorValue
  borderRadius(where: BorderValueWhereInput): BorderValue
  borderBottomEndRadius(where: BorderValueWhereInput): BorderValue
  borderBottomLeftRadius(where: BorderValueWhereInput): BorderValue
  borderBottomRightRadius(where: BorderValueWhereInput): BorderValue
  borderBottomStartRadius(where: BorderValueWhereInput): BorderValue
  borderTopEndRadius(where: BorderValueWhereInput): BorderValue
  borderTopLeftRadius(where: BorderValueWhereInput): BorderValue
  borderTopRightRadius(where: BorderValueWhereInput): BorderValue
  borderTopStartRadius(where: BorderValueWhereInput): BorderValue
  borderStyle: StyleBorderStyle
  borderWidth(where: BorderValueWhereInput): BorderValue
  borderBottomWidth(where: BorderValueWhereInput): BorderValue
  borderEndWidth(where: BorderValueWhereInput): BorderValue
  borderLeftWidth(where: BorderValueWhereInput): BorderValue
  borderRightWidth(where: BorderValueWhereInput): BorderValue
  borderStartWidth(where: BorderValueWhereInput): BorderValue
  borderTopWidth(where: BorderValueWhereInput): BorderValue
  opacity: Int
  color(where: ColorValueWhereInput): ColorValue
  fontFamily: String
  fontSize: Int
  fontStyle: StyleFontStyle
  fontWeight: StyleFontWeight
  fontVariant: StyleFontVariant
  letterSpacing: Int
  lineHeight: Int
  textAlign: StyleTextAlign
  textAlignVertical: StyleTextAlignVertical
  textDecorationLine: StyleTextDecorationLine
  textTransform: StyleTextTransform
}

enum StyleAlignContent {
  FLEX_START
  FLEX_END
  CENTER
  STRETCH
  SPACE_BETWEEN
  SPACE_AROUND
}

enum StyleAlignItems {
  FLEX_START
  FLEX_END
  CENTER
  STRETCH
  BASELINE
}

enum StyleAlignSelf {
  AUTO
  FLEX_START
  FLEX_END
  CENTER
  STRETCH
  BASELINE
}

enum StyleBorderStyle {
  SOLID
  DOTTED
  DASHED
}

enum StyleDirection {
  INHERIT
  LTR
  RTL
}

enum StyleDisplay {
  NONE
  FLEX
}

enum StyleFlexDirection {
  ROW
  ROW_REVERSE
  COLUMN
  COLUMN_REVERSE
}

enum StyleFlexWrap {
  WRAP
  NOWRAP
  WRAP_REVERSE
}

enum StyleFontStyle {
  NORMAL
  ITALIC
}

enum StyleFontVariant {
  SMALL_CAPS
}

enum StyleFontWeight {
  NORMAL
  BOLD
  INT_100
  INT_200
  INT_300
  INT_400
  INT_500
  INT_600
  INT_700
  INT_800
  INT_900
}

enum StyleJustifyContent {
  FLEX_START
  FLEX_END
  CENTER
  SPACE_BETWEEN
  SPACE_AROUND
  SPACE_EVENLY
}

enum StyleOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  name_ASC
  name_DESC
  display_ASC
  display_DESC
  position_ASC
  position_DESC
  flexDirection_ASC
  flexDirection_DESC
  flexWrap_ASC
  flexWrap_DESC
  justifyContent_ASC
  justifyContent_DESC
  alignItems_ASC
  alignItems_DESC
  alignSelf_ASC
  alignSelf_DESC
  alignContent_ASC
  alignContent_DESC
  overflow_ASC
  overflow_DESC
  flex_ASC
  flex_DESC
  flexGrow_ASC
  flexGrow_DESC
  flexShrink_ASC
  flexShrink_DESC
  flexBasis_ASC
  flexBasis_DESC
  zIndex_ASC
  zIndex_DESC
  direction_ASC
  direction_DESC
  shadowOpacity_ASC
  shadowOpacity_DESC
  shadowRadius_ASC
  shadowRadius_DESC
  borderStyle_ASC
  borderStyle_DESC
  opacity_ASC
  opacity_DESC
  fontFamily_ASC
  fontFamily_DESC
  fontSize_ASC
  fontSize_DESC
  fontStyle_ASC
  fontStyle_DESC
  fontWeight_ASC
  fontWeight_DESC
  fontVariant_ASC
  fontVariant_DESC
  letterSpacing_ASC
  letterSpacing_DESC
  lineHeight_ASC
  lineHeight_DESC
  textAlign_ASC
  textAlign_DESC
  textAlignVertical_ASC
  textAlignVertical_DESC
  textDecorationLine_ASC
  textDecorationLine_DESC
  textTransform_ASC
  textTransform_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

enum StyleOverflow {
  VISIBLE
  HIDDEN
  SCROLL
}

enum StylePosition {
  ABSOLUTE
  RELATIVE
}

type StyleShadowOffset {
  width: Int!
  height: Int!
}

input StyleShadowOffsetWhereInput {
  """Logical AND on all given filters."""
  AND: [StyleShadowOffsetWhereInput!]

  """Logical OR on all given filters."""
  OR: [StyleShadowOffsetWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StyleShadowOffsetWhereInput!]
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
}

enum StyleTextAlign {
  AUTO
  LEFT
  RIGHT
  CENTER
  JUSTIFY
}

enum StyleTextAlignVertical {
  AUTO
  TOP
  BOTTOM
  CENTER
}

enum StyleTextDecorationLine {
  NONE
  UNDERLINE
  LINE_THROUGH
  UNDERLINE_LINE_THROUGH
}

enum StyleTextTransform {
  NONE
  CAPITALIZE
  UPPERCASE
  LOWERCASE
}

enum StyleType {
  VIEW
  TEXT
}

input StyleWhereInput {
  """Logical AND on all given filters."""
  AND: [StyleWhereInput!]

  """Logical OR on all given filters."""
  OR: [StyleWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StyleWhereInput!]
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
  type: StyleType

  """All values that are not equal to given value."""
  type_not: StyleType

  """All values that are contained in given list."""
  type_in: [StyleType!]

  """All values that are not contained in given list."""
  type_not_in: [StyleType!]
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
  display: StyleDisplay

  """All values that are not equal to given value."""
  display_not: StyleDisplay

  """All values that are contained in given list."""
  display_in: [StyleDisplay!]

  """All values that are not contained in given list."""
  display_not_in: [StyleDisplay!]
  position: StylePosition

  """All values that are not equal to given value."""
  position_not: StylePosition

  """All values that are contained in given list."""
  position_in: [StylePosition!]

  """All values that are not contained in given list."""
  position_not_in: [StylePosition!]
  flexDirection: StyleFlexDirection

  """All values that are not equal to given value."""
  flexDirection_not: StyleFlexDirection

  """All values that are contained in given list."""
  flexDirection_in: [StyleFlexDirection!]

  """All values that are not contained in given list."""
  flexDirection_not_in: [StyleFlexDirection!]
  flexWrap: StyleFlexWrap

  """All values that are not equal to given value."""
  flexWrap_not: StyleFlexWrap

  """All values that are contained in given list."""
  flexWrap_in: [StyleFlexWrap!]

  """All values that are not contained in given list."""
  flexWrap_not_in: [StyleFlexWrap!]
  justifyContent: StyleJustifyContent

  """All values that are not equal to given value."""
  justifyContent_not: StyleJustifyContent

  """All values that are contained in given list."""
  justifyContent_in: [StyleJustifyContent!]

  """All values that are not contained in given list."""
  justifyContent_not_in: [StyleJustifyContent!]
  alignItems: StyleAlignItems

  """All values that are not equal to given value."""
  alignItems_not: StyleAlignItems

  """All values that are contained in given list."""
  alignItems_in: [StyleAlignItems!]

  """All values that are not contained in given list."""
  alignItems_not_in: [StyleAlignItems!]
  alignSelf: StyleAlignSelf

  """All values that are not equal to given value."""
  alignSelf_not: StyleAlignSelf

  """All values that are contained in given list."""
  alignSelf_in: [StyleAlignSelf!]

  """All values that are not contained in given list."""
  alignSelf_not_in: [StyleAlignSelf!]
  alignContent: StyleAlignContent

  """All values that are not equal to given value."""
  alignContent_not: StyleAlignContent

  """All values that are contained in given list."""
  alignContent_in: [StyleAlignContent!]

  """All values that are not contained in given list."""
  alignContent_not_in: [StyleAlignContent!]
  overflow: StyleOverflow

  """All values that are not equal to given value."""
  overflow_not: StyleOverflow

  """All values that are contained in given list."""
  overflow_in: [StyleOverflow!]

  """All values that are not contained in given list."""
  overflow_not_in: [StyleOverflow!]
  flex: Int

  """All values that are not equal to given value."""
  flex_not: Int

  """All values that are contained in given list."""
  flex_in: [Int!]

  """All values that are not contained in given list."""
  flex_not_in: [Int!]

  """All values less than the given value."""
  flex_lt: Int

  """All values less than or equal the given value."""
  flex_lte: Int

  """All values greater than the given value."""
  flex_gt: Int

  """All values greater than or equal the given value."""
  flex_gte: Int
  flexGrow: Int

  """All values that are not equal to given value."""
  flexGrow_not: Int

  """All values that are contained in given list."""
  flexGrow_in: [Int!]

  """All values that are not contained in given list."""
  flexGrow_not_in: [Int!]

  """All values less than the given value."""
  flexGrow_lt: Int

  """All values less than or equal the given value."""
  flexGrow_lte: Int

  """All values greater than the given value."""
  flexGrow_gt: Int

  """All values greater than or equal the given value."""
  flexGrow_gte: Int
  flexShrink: Int

  """All values that are not equal to given value."""
  flexShrink_not: Int

  """All values that are contained in given list."""
  flexShrink_in: [Int!]

  """All values that are not contained in given list."""
  flexShrink_not_in: [Int!]

  """All values less than the given value."""
  flexShrink_lt: Int

  """All values less than or equal the given value."""
  flexShrink_lte: Int

  """All values greater than the given value."""
  flexShrink_gt: Int

  """All values greater than or equal the given value."""
  flexShrink_gte: Int
  flexBasis: Int

  """All values that are not equal to given value."""
  flexBasis_not: Int

  """All values that are contained in given list."""
  flexBasis_in: [Int!]

  """All values that are not contained in given list."""
  flexBasis_not_in: [Int!]

  """All values less than the given value."""
  flexBasis_lt: Int

  """All values less than or equal the given value."""
  flexBasis_lte: Int

  """All values greater than the given value."""
  flexBasis_gt: Int

  """All values greater than or equal the given value."""
  flexBasis_gte: Int
  zIndex: Int

  """All values that are not equal to given value."""
  zIndex_not: Int

  """All values that are contained in given list."""
  zIndex_in: [Int!]

  """All values that are not contained in given list."""
  zIndex_not_in: [Int!]

  """All values less than the given value."""
  zIndex_lt: Int

  """All values less than or equal the given value."""
  zIndex_lte: Int

  """All values greater than the given value."""
  zIndex_gt: Int

  """All values greater than or equal the given value."""
  zIndex_gte: Int
  direction: StyleDirection

  """All values that are not equal to given value."""
  direction_not: StyleDirection

  """All values that are contained in given list."""
  direction_in: [StyleDirection!]

  """All values that are not contained in given list."""
  direction_not_in: [StyleDirection!]
  shadowOpacity: Int

  """All values that are not equal to given value."""
  shadowOpacity_not: Int

  """All values that are contained in given list."""
  shadowOpacity_in: [Int!]

  """All values that are not contained in given list."""
  shadowOpacity_not_in: [Int!]

  """All values less than the given value."""
  shadowOpacity_lt: Int

  """All values less than or equal the given value."""
  shadowOpacity_lte: Int

  """All values greater than the given value."""
  shadowOpacity_gt: Int

  """All values greater than or equal the given value."""
  shadowOpacity_gte: Int
  shadowRadius: Int

  """All values that are not equal to given value."""
  shadowRadius_not: Int

  """All values that are contained in given list."""
  shadowRadius_in: [Int!]

  """All values that are not contained in given list."""
  shadowRadius_not_in: [Int!]

  """All values less than the given value."""
  shadowRadius_lt: Int

  """All values less than or equal the given value."""
  shadowRadius_lte: Int

  """All values greater than the given value."""
  shadowRadius_gt: Int

  """All values greater than or equal the given value."""
  shadowRadius_gte: Int
  borderStyle: StyleBorderStyle

  """All values that are not equal to given value."""
  borderStyle_not: StyleBorderStyle

  """All values that are contained in given list."""
  borderStyle_in: [StyleBorderStyle!]

  """All values that are not contained in given list."""
  borderStyle_not_in: [StyleBorderStyle!]
  opacity: Int

  """All values that are not equal to given value."""
  opacity_not: Int

  """All values that are contained in given list."""
  opacity_in: [Int!]

  """All values that are not contained in given list."""
  opacity_not_in: [Int!]

  """All values less than the given value."""
  opacity_lt: Int

  """All values less than or equal the given value."""
  opacity_lte: Int

  """All values greater than the given value."""
  opacity_gt: Int

  """All values greater than or equal the given value."""
  opacity_gte: Int
  fontFamily: String

  """All values that are not equal to given value."""
  fontFamily_not: String

  """All values that are contained in given list."""
  fontFamily_in: [String!]

  """All values that are not contained in given list."""
  fontFamily_not_in: [String!]

  """All values less than the given value."""
  fontFamily_lt: String

  """All values less than or equal the given value."""
  fontFamily_lte: String

  """All values greater than the given value."""
  fontFamily_gt: String

  """All values greater than or equal the given value."""
  fontFamily_gte: String

  """All values containing the given string."""
  fontFamily_contains: String

  """All values not containing the given string."""
  fontFamily_not_contains: String

  """All values starting with the given string."""
  fontFamily_starts_with: String

  """All values not starting with the given string."""
  fontFamily_not_starts_with: String

  """All values ending with the given string."""
  fontFamily_ends_with: String

  """All values not ending with the given string."""
  fontFamily_not_ends_with: String
  fontSize: Int

  """All values that are not equal to given value."""
  fontSize_not: Int

  """All values that are contained in given list."""
  fontSize_in: [Int!]

  """All values that are not contained in given list."""
  fontSize_not_in: [Int!]

  """All values less than the given value."""
  fontSize_lt: Int

  """All values less than or equal the given value."""
  fontSize_lte: Int

  """All values greater than the given value."""
  fontSize_gt: Int

  """All values greater than or equal the given value."""
  fontSize_gte: Int
  fontStyle: StyleFontStyle

  """All values that are not equal to given value."""
  fontStyle_not: StyleFontStyle

  """All values that are contained in given list."""
  fontStyle_in: [StyleFontStyle!]

  """All values that are not contained in given list."""
  fontStyle_not_in: [StyleFontStyle!]
  fontWeight: StyleFontWeight

  """All values that are not equal to given value."""
  fontWeight_not: StyleFontWeight

  """All values that are contained in given list."""
  fontWeight_in: [StyleFontWeight!]

  """All values that are not contained in given list."""
  fontWeight_not_in: [StyleFontWeight!]
  fontVariant: StyleFontVariant

  """All values that are not equal to given value."""
  fontVariant_not: StyleFontVariant

  """All values that are contained in given list."""
  fontVariant_in: [StyleFontVariant!]

  """All values that are not contained in given list."""
  fontVariant_not_in: [StyleFontVariant!]
  letterSpacing: Int

  """All values that are not equal to given value."""
  letterSpacing_not: Int

  """All values that are contained in given list."""
  letterSpacing_in: [Int!]

  """All values that are not contained in given list."""
  letterSpacing_not_in: [Int!]

  """All values less than the given value."""
  letterSpacing_lt: Int

  """All values less than or equal the given value."""
  letterSpacing_lte: Int

  """All values greater than the given value."""
  letterSpacing_gt: Int

  """All values greater than or equal the given value."""
  letterSpacing_gte: Int
  lineHeight: Int

  """All values that are not equal to given value."""
  lineHeight_not: Int

  """All values that are contained in given list."""
  lineHeight_in: [Int!]

  """All values that are not contained in given list."""
  lineHeight_not_in: [Int!]

  """All values less than the given value."""
  lineHeight_lt: Int

  """All values less than or equal the given value."""
  lineHeight_lte: Int

  """All values greater than the given value."""
  lineHeight_gt: Int

  """All values greater than or equal the given value."""
  lineHeight_gte: Int
  textAlign: StyleTextAlign

  """All values that are not equal to given value."""
  textAlign_not: StyleTextAlign

  """All values that are contained in given list."""
  textAlign_in: [StyleTextAlign!]

  """All values that are not contained in given list."""
  textAlign_not_in: [StyleTextAlign!]
  textAlignVertical: StyleTextAlignVertical

  """All values that are not equal to given value."""
  textAlignVertical_not: StyleTextAlignVertical

  """All values that are contained in given list."""
  textAlignVertical_in: [StyleTextAlignVertical!]

  """All values that are not contained in given list."""
  textAlignVertical_not_in: [StyleTextAlignVertical!]
  textDecorationLine: StyleTextDecorationLine

  """All values that are not equal to given value."""
  textDecorationLine_not: StyleTextDecorationLine

  """All values that are contained in given list."""
  textDecorationLine_in: [StyleTextDecorationLine!]

  """All values that are not contained in given list."""
  textDecorationLine_not_in: [StyleTextDecorationLine!]
  textTransform: StyleTextTransform

  """All values that are not equal to given value."""
  textTransform_not: StyleTextTransform

  """All values that are contained in given list."""
  textTransform_in: [StyleTextTransform!]

  """All values that are not contained in given list."""
  textTransform_not_in: [StyleTextTransform!]
  web: WebWhereInput
  width: DimensionValueWhereInput
  height: DimensionValueWhereInput
  bottom: DimensionValueWhereInput
  end: DimensionValueWhereInput
  left: DimensionValueWhereInput
  right: DimensionValueWhereInput
  start: DimensionValueWhereInput
  top: DimensionValueWhereInput
  minWidth: DimensionValueWhereInput
  maxWidth: DimensionValueWhereInput
  minHeight: DimensionValueWhereInput
  maxHeight: DimensionValueWhereInput
  margin: DimensionValueWhereInput
  marginBottom: DimensionValueWhereInput
  marginEnd: DimensionValueWhereInput
  marginHorizontal: DimensionValueWhereInput
  marginLeft: DimensionValueWhereInput
  marginRight: DimensionValueWhereInput
  marginStart: DimensionValueWhereInput
  marginTop: DimensionValueWhereInput
  marginVertical: DimensionValueWhereInput
  padding: DimensionValueWhereInput
  paddingBottom: DimensionValueWhereInput
  paddingEnd: DimensionValueWhereInput
  paddingHorizontal: DimensionValueWhereInput
  paddingLeft: DimensionValueWhereInput
  paddingRight: DimensionValueWhereInput
  paddingStart: DimensionValueWhereInput
  paddingTop: DimensionValueWhereInput
  paddingVertical: DimensionValueWhereInput
  shadowColor: ColorValueWhereInput
  shadowOffset: StyleShadowOffsetWhereInput
  backgroundColor: ColorValueWhereInput
  borderColor: ColorValueWhereInput
  borderBottomColor: ColorValueWhereInput
  borderEndColor: ColorValueWhereInput
  borderLeftColor: ColorValueWhereInput
  borderRightColor: ColorValueWhereInput
  borderStartColor: ColorValueWhereInput
  borderTopColor: ColorValueWhereInput
  borderRadius: BorderValueWhereInput
  borderBottomEndRadius: BorderValueWhereInput
  borderBottomLeftRadius: BorderValueWhereInput
  borderBottomRightRadius: BorderValueWhereInput
  borderBottomStartRadius: BorderValueWhereInput
  borderTopEndRadius: BorderValueWhereInput
  borderTopLeftRadius: BorderValueWhereInput
  borderTopRightRadius: BorderValueWhereInput
  borderTopStartRadius: BorderValueWhereInput
  borderWidth: BorderValueWhereInput
  borderBottomWidth: BorderValueWhereInput
  borderEndWidth: BorderValueWhereInput
  borderLeftWidth: BorderValueWhereInput
  borderRightWidth: BorderValueWhereInput
  borderStartWidth: BorderValueWhereInput
  borderTopWidth: BorderValueWhereInput
  color: ColorValueWhereInput
}

type User implements Node {
  id: ID!
  webs(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Web!]
  pages(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Page!]
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  password: String!
  themeName: String
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

type Web implements Node {
  id: ID!
  creator(where: UserWhereInput): User!
  pages(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Page!]
  styles(where: StyleWhereInput, orderBy: StyleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Style!]
  dimensionValues(where: DimensionValueWhereInput, orderBy: DimensionValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DimensionValue!]
  colorValues(where: ColorValueWhereInput, orderBy: ColorValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ColorValue!]
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
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
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
  styles_every: StyleWhereInput
  styles_some: StyleWhereInput
  styles_none: StyleWhereInput
  dimensionValues_every: DimensionValueWhereInput
  dimensionValues_some: DimensionValueWhereInput
  dimensionValues_none: DimensionValueWhereInput
  colorValues_every: ColorValueWhereInput
  colorValues_some: ColorValueWhereInput
  colorValues_none: ColorValueWhereInput
}
`

const prisma: BindingConstructor<Prisma> = makePrismaBindingClass({typeDefs})
 


/**
 * Types
*/

 export type StyleFontStyle =
    | 'NORMAL'
    | 'ITALIC'
  

 export type StyleOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'type_ASC'
    | 'type_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'display_ASC'
    | 'display_DESC'
    | 'position_ASC'
    | 'position_DESC'
    | 'flexDirection_ASC'
    | 'flexDirection_DESC'
    | 'flexWrap_ASC'
    | 'flexWrap_DESC'
    | 'justifyContent_ASC'
    | 'justifyContent_DESC'
    | 'alignItems_ASC'
    | 'alignItems_DESC'
    | 'alignSelf_ASC'
    | 'alignSelf_DESC'
    | 'alignContent_ASC'
    | 'alignContent_DESC'
    | 'overflow_ASC'
    | 'overflow_DESC'
    | 'flex_ASC'
    | 'flex_DESC'
    | 'flexGrow_ASC'
    | 'flexGrow_DESC'
    | 'flexShrink_ASC'
    | 'flexShrink_DESC'
    | 'flexBasis_ASC'
    | 'flexBasis_DESC'
    | 'zIndex_ASC'
    | 'zIndex_DESC'
    | 'direction_ASC'
    | 'direction_DESC'
    | 'shadowOpacity_ASC'
    | 'shadowOpacity_DESC'
    | 'shadowRadius_ASC'
    | 'shadowRadius_DESC'
    | 'borderStyle_ASC'
    | 'borderStyle_DESC'
    | 'opacity_ASC'
    | 'opacity_DESC'
    | 'fontFamily_ASC'
    | 'fontFamily_DESC'
    | 'fontSize_ASC'
    | 'fontSize_DESC'
    | 'fontStyle_ASC'
    | 'fontStyle_DESC'
    | 'fontWeight_ASC'
    | 'fontWeight_DESC'
    | 'fontVariant_ASC'
    | 'fontVariant_DESC'
    | 'letterSpacing_ASC'
    | 'letterSpacing_DESC'
    | 'lineHeight_ASC'
    | 'lineHeight_DESC'
    | 'textAlign_ASC'
    | 'textAlign_DESC'
    | 'textAlignVertical_ASC'
    | 'textAlignVertical_DESC'
    | 'textDecorationLine_ASC'
    | 'textDecorationLine_DESC'
    | 'textTransform_ASC'
    | 'textTransform_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

 export type StyleFontWeight =
    | 'NORMAL'
    | 'BOLD'
    | 'INT_100'
    | 'INT_200'
    | 'INT_300'
    | 'INT_400'
    | 'INT_500'
    | 'INT_600'
    | 'INT_700'
    | 'INT_800'
    | 'INT_900'
  

 export type WebOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'name_ASC'
    | 'name_DESC'
  

 export type StyleAlignItems =
    | 'FLEX_START'
    | 'FLEX_END'
    | 'CENTER'
    | 'STRETCH'
    | 'BASELINE'
  

 export type StyleTextTransform =
    | 'NONE'
    | 'CAPITALIZE'
    | 'UPPERCASE'
    | 'LOWERCASE'
  

 export type StyleAlignSelf =
    | 'AUTO'
    | 'FLEX_START'
    | 'FLEX_END'
    | 'CENTER'
    | 'STRETCH'
    | 'BASELINE'
  

 export type StyleFontVariant =
    | 'SMALL_CAPS'
  

 export type StyleAlignContent =
    | 'FLEX_START'
    | 'FLEX_END'
    | 'CENTER'
    | 'STRETCH'
    | 'SPACE_BETWEEN'
    | 'SPACE_AROUND'
  

 export type ColorValueOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'r_ASC'
    | 'r_DESC'
    | 'g_ASC'
    | 'g_DESC'
    | 'b_ASC'
    | 'b_DESC'
    | 'a_ASC'
    | 'a_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

 export type StyleOverflow =
    | 'VISIBLE'
    | 'HIDDEN'
    | 'SCROLL'
  

 export type ElementType =
    | 'DOCUMENT'
    | 'BLOCK'
    | 'TEXT'
  

 export type Max140CharsError =
    | 'REQUIRED'
    | 'MAX_140_CHARS'
  

 export type ElementOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'type_ASC'
    | 'type_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

 export type StyleDirection =
    | 'INHERIT'
    | 'LTR'
    | 'RTL'
  

 export type StyleDisplay =
    | 'NONE'
    | 'FLEX'
  

 export type StyleBorderStyle =
    | 'SOLID'
    | 'DOTTED'
    | 'DASHED'
  

 export type StyleFlexDirection =
    | 'ROW'
    | 'ROW_REVERSE'
    | 'COLUMN'
    | 'COLUMN_REVERSE'
  

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
  

 export type StyleJustifyContent =
    | 'FLEX_START'
    | 'FLEX_END'
    | 'CENTER'
    | 'SPACE_BETWEEN'
    | 'SPACE_AROUND'
    | 'SPACE_EVENLY'
  

 export type BorderValueUnit =
    | 'POINT'
  

 export type EmailError =
    | 'REQUIRED'
    | 'EMAIL'
    | 'ALREADY_EXISTS'
    | 'NOT_EXISTS'
  

 export type StyleType =
    | 'VIEW'
    | 'TEXT'
  

 export type StyleTextDecorationLine =
    | 'NONE'
    | 'UNDERLINE'
    | 'LINE_THROUGH'
    | 'UNDERLINE_LINE_THROUGH'
  

 export type StyleTextAlignVertical =
    | 'AUTO'
    | 'TOP'
    | 'BOTTOM'
    | 'CENTER'
  

 export type StyleTextAlign =
    | 'AUTO'
    | 'LEFT'
    | 'RIGHT'
    | 'CENTER'
    | 'JUSTIFY'
  

 export type DimensionValueUnit =
    | 'POINT'
    | 'PERCENTAGE'
  

 export type StylePosition =
    | 'ABSOLUTE'
    | 'RELATIVE'
  

 export type PasswordError =
    | 'REQUIRED'
    | 'MIN_5_CHARS'
    | 'MAX_1024_CHARS'
    | 'WRONG_PASSWORD'
  

 export type DimensionValueOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'unit_ASC'
    | 'unit_DESC'
    | 'value_ASC'
    | 'value_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

 export type StyleFlexWrap =
    | 'WRAP'
    | 'NOWRAP'
    | 'WRAP_REVERSE'
  

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
  pages_none?: PageWhereInput,
  styles_every?: StyleWhereInput,
  styles_some?: StyleWhereInput,
  styles_none?: StyleWhereInput,
  dimensionValues_every?: DimensionValueWhereInput,
  dimensionValues_some?: DimensionValueWhereInput,
  dimensionValues_none?: DimensionValueWhereInput,
  colorValues_every?: ColorValueWhereInput,
  colorValues_some?: ColorValueWhereInput,
  colorValues_none?: ColorValueWhereInput
|}

 export type DeletePageInput = {| 
  id: ID_Input
|}

 export type SetWebNameInput = {| 
  id: ID_Input,
  name: String
|}

 export type SetPageTitleInput = {| 
  id: ID_Input,
  title: String
|}

 export type DimensionValueWhereInput = {| 
  AND?: Array< DimensionValueWhereInput > | DimensionValueWhereInput,
  OR?: Array< DimensionValueWhereInput > | DimensionValueWhereInput,
  NOT?: Array< DimensionValueWhereInput > | DimensionValueWhereInput,
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
  unit?: DimensionValueUnit,
  unit_not?: DimensionValueUnit,
  unit_in?: Array< DimensionValueUnit > | DimensionValueUnit,
  unit_not_in?: Array< DimensionValueUnit > | DimensionValueUnit,
  value?: Int,
  value_not?: Int,
  value_in?: Array< Int > | Int,
  value_not_in?: Array< Int > | Int,
  value_lt?: Int,
  value_lte?: Int,
  value_gt?: Int,
  value_gte?: Int,
  web?: WebWhereInput
|}

 export type CreateWebInput = {| 
  name: String,
  pageTitle: String
|}

 export type ColorValueWhereInput = {| 
  AND?: Array< ColorValueWhereInput > | ColorValueWhereInput,
  OR?: Array< ColorValueWhereInput > | ColorValueWhereInput,
  NOT?: Array< ColorValueWhereInput > | ColorValueWhereInput,
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
  r?: Int,
  r_not?: Int,
  r_in?: Array< Int > | Int,
  r_not_in?: Array< Int > | Int,
  r_lt?: Int,
  r_lte?: Int,
  r_gt?: Int,
  r_gte?: Int,
  g?: Int,
  g_not?: Int,
  g_in?: Array< Int > | Int,
  g_not_in?: Array< Int > | Int,
  g_lt?: Int,
  g_lte?: Int,
  g_gt?: Int,
  g_gte?: Int,
  b?: Int,
  b_not?: Int,
  b_in?: Array< Int > | Int,
  b_not_in?: Array< Int > | Int,
  b_lt?: Int,
  b_lte?: Int,
  b_gt?: Int,
  b_gte?: Int,
  a?: Float,
  a_not?: Float,
  a_in?: Array< Float > | Float,
  a_not_in?: Array< Float > | Float,
  a_lt?: Float,
  a_lte?: Float,
  a_gt?: Float,
  a_gte?: Float,
  web?: WebWhereInput
|}

 export type StyleWhereInput = {| 
  AND?: Array< StyleWhereInput > | StyleWhereInput,
  OR?: Array< StyleWhereInput > | StyleWhereInput,
  NOT?: Array< StyleWhereInput > | StyleWhereInput,
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
  type?: StyleType,
  type_not?: StyleType,
  type_in?: Array< StyleType > | StyleType,
  type_not_in?: Array< StyleType > | StyleType,
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
  display?: StyleDisplay,
  display_not?: StyleDisplay,
  display_in?: Array< StyleDisplay > | StyleDisplay,
  display_not_in?: Array< StyleDisplay > | StyleDisplay,
  position?: StylePosition,
  position_not?: StylePosition,
  position_in?: Array< StylePosition > | StylePosition,
  position_not_in?: Array< StylePosition > | StylePosition,
  flexDirection?: StyleFlexDirection,
  flexDirection_not?: StyleFlexDirection,
  flexDirection_in?: Array< StyleFlexDirection > | StyleFlexDirection,
  flexDirection_not_in?: Array< StyleFlexDirection > | StyleFlexDirection,
  flexWrap?: StyleFlexWrap,
  flexWrap_not?: StyleFlexWrap,
  flexWrap_in?: Array< StyleFlexWrap > | StyleFlexWrap,
  flexWrap_not_in?: Array< StyleFlexWrap > | StyleFlexWrap,
  justifyContent?: StyleJustifyContent,
  justifyContent_not?: StyleJustifyContent,
  justifyContent_in?: Array< StyleJustifyContent > | StyleJustifyContent,
  justifyContent_not_in?: Array< StyleJustifyContent > | StyleJustifyContent,
  alignItems?: StyleAlignItems,
  alignItems_not?: StyleAlignItems,
  alignItems_in?: Array< StyleAlignItems > | StyleAlignItems,
  alignItems_not_in?: Array< StyleAlignItems > | StyleAlignItems,
  alignSelf?: StyleAlignSelf,
  alignSelf_not?: StyleAlignSelf,
  alignSelf_in?: Array< StyleAlignSelf > | StyleAlignSelf,
  alignSelf_not_in?: Array< StyleAlignSelf > | StyleAlignSelf,
  alignContent?: StyleAlignContent,
  alignContent_not?: StyleAlignContent,
  alignContent_in?: Array< StyleAlignContent > | StyleAlignContent,
  alignContent_not_in?: Array< StyleAlignContent > | StyleAlignContent,
  overflow?: StyleOverflow,
  overflow_not?: StyleOverflow,
  overflow_in?: Array< StyleOverflow > | StyleOverflow,
  overflow_not_in?: Array< StyleOverflow > | StyleOverflow,
  flex?: Int,
  flex_not?: Int,
  flex_in?: Array< Int > | Int,
  flex_not_in?: Array< Int > | Int,
  flex_lt?: Int,
  flex_lte?: Int,
  flex_gt?: Int,
  flex_gte?: Int,
  flexGrow?: Int,
  flexGrow_not?: Int,
  flexGrow_in?: Array< Int > | Int,
  flexGrow_not_in?: Array< Int > | Int,
  flexGrow_lt?: Int,
  flexGrow_lte?: Int,
  flexGrow_gt?: Int,
  flexGrow_gte?: Int,
  flexShrink?: Int,
  flexShrink_not?: Int,
  flexShrink_in?: Array< Int > | Int,
  flexShrink_not_in?: Array< Int > | Int,
  flexShrink_lt?: Int,
  flexShrink_lte?: Int,
  flexShrink_gt?: Int,
  flexShrink_gte?: Int,
  flexBasis?: Int,
  flexBasis_not?: Int,
  flexBasis_in?: Array< Int > | Int,
  flexBasis_not_in?: Array< Int > | Int,
  flexBasis_lt?: Int,
  flexBasis_lte?: Int,
  flexBasis_gt?: Int,
  flexBasis_gte?: Int,
  zIndex?: Int,
  zIndex_not?: Int,
  zIndex_in?: Array< Int > | Int,
  zIndex_not_in?: Array< Int > | Int,
  zIndex_lt?: Int,
  zIndex_lte?: Int,
  zIndex_gt?: Int,
  zIndex_gte?: Int,
  direction?: StyleDirection,
  direction_not?: StyleDirection,
  direction_in?: Array< StyleDirection > | StyleDirection,
  direction_not_in?: Array< StyleDirection > | StyleDirection,
  shadowOpacity?: Int,
  shadowOpacity_not?: Int,
  shadowOpacity_in?: Array< Int > | Int,
  shadowOpacity_not_in?: Array< Int > | Int,
  shadowOpacity_lt?: Int,
  shadowOpacity_lte?: Int,
  shadowOpacity_gt?: Int,
  shadowOpacity_gte?: Int,
  shadowRadius?: Int,
  shadowRadius_not?: Int,
  shadowRadius_in?: Array< Int > | Int,
  shadowRadius_not_in?: Array< Int > | Int,
  shadowRadius_lt?: Int,
  shadowRadius_lte?: Int,
  shadowRadius_gt?: Int,
  shadowRadius_gte?: Int,
  borderStyle?: StyleBorderStyle,
  borderStyle_not?: StyleBorderStyle,
  borderStyle_in?: Array< StyleBorderStyle > | StyleBorderStyle,
  borderStyle_not_in?: Array< StyleBorderStyle > | StyleBorderStyle,
  opacity?: Int,
  opacity_not?: Int,
  opacity_in?: Array< Int > | Int,
  opacity_not_in?: Array< Int > | Int,
  opacity_lt?: Int,
  opacity_lte?: Int,
  opacity_gt?: Int,
  opacity_gte?: Int,
  fontFamily?: String,
  fontFamily_not?: String,
  fontFamily_in?: Array< String > | String,
  fontFamily_not_in?: Array< String > | String,
  fontFamily_lt?: String,
  fontFamily_lte?: String,
  fontFamily_gt?: String,
  fontFamily_gte?: String,
  fontFamily_contains?: String,
  fontFamily_not_contains?: String,
  fontFamily_starts_with?: String,
  fontFamily_not_starts_with?: String,
  fontFamily_ends_with?: String,
  fontFamily_not_ends_with?: String,
  fontSize?: Int,
  fontSize_not?: Int,
  fontSize_in?: Array< Int > | Int,
  fontSize_not_in?: Array< Int > | Int,
  fontSize_lt?: Int,
  fontSize_lte?: Int,
  fontSize_gt?: Int,
  fontSize_gte?: Int,
  fontStyle?: StyleFontStyle,
  fontStyle_not?: StyleFontStyle,
  fontStyle_in?: Array< StyleFontStyle > | StyleFontStyle,
  fontStyle_not_in?: Array< StyleFontStyle > | StyleFontStyle,
  fontWeight?: StyleFontWeight,
  fontWeight_not?: StyleFontWeight,
  fontWeight_in?: Array< StyleFontWeight > | StyleFontWeight,
  fontWeight_not_in?: Array< StyleFontWeight > | StyleFontWeight,
  fontVariant?: StyleFontVariant,
  fontVariant_not?: StyleFontVariant,
  fontVariant_in?: Array< StyleFontVariant > | StyleFontVariant,
  fontVariant_not_in?: Array< StyleFontVariant > | StyleFontVariant,
  letterSpacing?: Int,
  letterSpacing_not?: Int,
  letterSpacing_in?: Array< Int > | Int,
  letterSpacing_not_in?: Array< Int > | Int,
  letterSpacing_lt?: Int,
  letterSpacing_lte?: Int,
  letterSpacing_gt?: Int,
  letterSpacing_gte?: Int,
  lineHeight?: Int,
  lineHeight_not?: Int,
  lineHeight_in?: Array< Int > | Int,
  lineHeight_not_in?: Array< Int > | Int,
  lineHeight_lt?: Int,
  lineHeight_lte?: Int,
  lineHeight_gt?: Int,
  lineHeight_gte?: Int,
  textAlign?: StyleTextAlign,
  textAlign_not?: StyleTextAlign,
  textAlign_in?: Array< StyleTextAlign > | StyleTextAlign,
  textAlign_not_in?: Array< StyleTextAlign > | StyleTextAlign,
  textAlignVertical?: StyleTextAlignVertical,
  textAlignVertical_not?: StyleTextAlignVertical,
  textAlignVertical_in?: Array< StyleTextAlignVertical > | StyleTextAlignVertical,
  textAlignVertical_not_in?: Array< StyleTextAlignVertical > | StyleTextAlignVertical,
  textDecorationLine?: StyleTextDecorationLine,
  textDecorationLine_not?: StyleTextDecorationLine,
  textDecorationLine_in?: Array< StyleTextDecorationLine > | StyleTextDecorationLine,
  textDecorationLine_not_in?: Array< StyleTextDecorationLine > | StyleTextDecorationLine,
  textTransform?: StyleTextTransform,
  textTransform_not?: StyleTextTransform,
  textTransform_in?: Array< StyleTextTransform > | StyleTextTransform,
  textTransform_not_in?: Array< StyleTextTransform > | StyleTextTransform,
  web?: WebWhereInput,
  width?: DimensionValueWhereInput,
  height?: DimensionValueWhereInput,
  bottom?: DimensionValueWhereInput,
  end?: DimensionValueWhereInput,
  left?: DimensionValueWhereInput,
  right?: DimensionValueWhereInput,
  start?: DimensionValueWhereInput,
  top?: DimensionValueWhereInput,
  minWidth?: DimensionValueWhereInput,
  maxWidth?: DimensionValueWhereInput,
  minHeight?: DimensionValueWhereInput,
  maxHeight?: DimensionValueWhereInput,
  margin?: DimensionValueWhereInput,
  marginBottom?: DimensionValueWhereInput,
  marginEnd?: DimensionValueWhereInput,
  marginHorizontal?: DimensionValueWhereInput,
  marginLeft?: DimensionValueWhereInput,
  marginRight?: DimensionValueWhereInput,
  marginStart?: DimensionValueWhereInput,
  marginTop?: DimensionValueWhereInput,
  marginVertical?: DimensionValueWhereInput,
  padding?: DimensionValueWhereInput,
  paddingBottom?: DimensionValueWhereInput,
  paddingEnd?: DimensionValueWhereInput,
  paddingHorizontal?: DimensionValueWhereInput,
  paddingLeft?: DimensionValueWhereInput,
  paddingRight?: DimensionValueWhereInput,
  paddingStart?: DimensionValueWhereInput,
  paddingTop?: DimensionValueWhereInput,
  paddingVertical?: DimensionValueWhereInput,
  shadowColor?: ColorValueWhereInput,
  shadowOffset?: StyleShadowOffsetWhereInput,
  backgroundColor?: ColorValueWhereInput,
  borderColor?: ColorValueWhereInput,
  borderBottomColor?: ColorValueWhereInput,
  borderEndColor?: ColorValueWhereInput,
  borderLeftColor?: ColorValueWhereInput,
  borderRightColor?: ColorValueWhereInput,
  borderStartColor?: ColorValueWhereInput,
  borderTopColor?: ColorValueWhereInput,
  borderRadius?: BorderValueWhereInput,
  borderBottomEndRadius?: BorderValueWhereInput,
  borderBottomLeftRadius?: BorderValueWhereInput,
  borderBottomRightRadius?: BorderValueWhereInput,
  borderBottomStartRadius?: BorderValueWhereInput,
  borderTopEndRadius?: BorderValueWhereInput,
  borderTopLeftRadius?: BorderValueWhereInput,
  borderTopRightRadius?: BorderValueWhereInput,
  borderTopStartRadius?: BorderValueWhereInput,
  borderWidth?: BorderValueWhereInput,
  borderBottomWidth?: BorderValueWhereInput,
  borderEndWidth?: BorderValueWhereInput,
  borderLeftWidth?: BorderValueWhereInput,
  borderRightWidth?: BorderValueWhereInput,
  borderStartWidth?: BorderValueWhereInput,
  borderTopWidth?: BorderValueWhereInput,
  color?: ColorValueWhereInput
|}

 export type StyleShadowOffsetWhereInput = {| 
  AND?: Array< StyleShadowOffsetWhereInput > | StyleShadowOffsetWhereInput,
  OR?: Array< StyleShadowOffsetWhereInput > | StyleShadowOffsetWhereInput,
  NOT?: Array< StyleShadowOffsetWhereInput > | StyleShadowOffsetWhereInput,
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
  height_gte?: Int
|}

 export type ComponentWhereInput = {| 
  AND?: Array< ComponentWhereInput > | ComponentWhereInput,
  OR?: Array< ComponentWhereInput > | ComponentWhereInput,
  NOT?: Array< ComponentWhereInput > | ComponentWhereInput,
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
  web?: WebWhereInput,
  document?: DocumentWhereInput,
  style?: StyleWhereInput
|}

 export type SetPageContentInput = {| 
  id: ID_Input,
  content: Json
|}

 export type DeleteWebInput = {| 
  id: ID_Input
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
  document?: DocumentWhereInput
|}

 export type DocumentWhereInput = {| 
  AND?: Array< DocumentWhereInput > | DocumentWhereInput,
  OR?: Array< DocumentWhereInput > | DocumentWhereInput,
  NOT?: Array< DocumentWhereInput > | DocumentWhereInput,
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
  elements_every?: ElementWhereInput,
  elements_some?: ElementWhereInput,
  elements_none?: ElementWhereInput
|}

 export type AuthInput = {| 
  email: String,
  password: String,
  isSignUp: Boolean
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
  document?: DocumentWhereInput,
  component?: ComponentWhereInput,
  style?: StyleWhereInput
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

 export type BorderValueWhereInput = {| 
  AND?: Array< BorderValueWhereInput > | BorderValueWhereInput,
  OR?: Array< BorderValueWhereInput > | BorderValueWhereInput,
  NOT?: Array< BorderValueWhereInput > | BorderValueWhereInput,
  unit?: BorderValueUnit,
  unit_not?: BorderValueUnit,
  unit_in?: Array< BorderValueUnit > | BorderValueUnit,
  unit_not_in?: Array< BorderValueUnit > | BorderValueUnit,
  value?: Int,
  value_not?: Int,
  value_in?: Array< Int > | Int,
  value_not_in?: Array< Int > | Int,
  value_lt?: Int,
  value_lte?: Int,
  value_gt?: Int,
  value_gte?: Int
|}

 export type SetThemeInput = {| 
  themeName: String
|}

/*
 * An object with an ID

*/
 export type Node = {| 
   id: ID_Output,
|}

 export type DeletePagePayload = {| 
   page?: Page,
|}

 export type Page = {| ...Node,
 
   id: ID_Output,
   creator: User,
   web: Web,
   document?: Document,
   createdAt: DateTime,
   updatedAt: DateTime,
   title: String,
   content?: Json,
|}

 export type User = {| ...Node,
 
   id: ID_Output,
   webs?: Web[],
   pages?: Page[],
   createdAt: DateTime,
   updatedAt: DateTime,
   email: String,
   password: String,
   themeName?: String,
|}

 export type Web = {| ...Node,
 
   id: ID_Output,
   creator: User,
   pages?: Page[],
   styles?: Style[],
   dimensionValues?: DimensionValue[],
   colorValues?: ColorValue[],
   createdAt: DateTime,
   updatedAt: DateTime,
   name: String,
|}

 export type BorderValue = {| 
   unit: BorderValueUnit,
   value: Int,
|}

 export type DeleteWebPayload = {| 
   web?: Web,
|}

 export type StyleShadowOffset = {| 
   width: Int,
   height: Int,
|}

 export type ColorValue = {| ...Node,
 
   id: ID_Output,
   web: Web,
   name?: String,
   r: Int,
   g: Int,
   b: Int,
   a?: Float,
|}

 export type SetWebNamePayload = {| 
   errors?: SetWebNameErrors,
   web?: Web,
|}

 export type Style = {| ...Node,
 
   id: ID_Output,
   web: Web,
   type: StyleType,
   name?: String,
   display?: StyleDisplay,
   width?: DimensionValue,
   height?: DimensionValue,
   bottom?: DimensionValue,
   end?: DimensionValue,
   left?: DimensionValue,
   right?: DimensionValue,
   start?: DimensionValue,
   top?: DimensionValue,
   minWidth?: DimensionValue,
   maxWidth?: DimensionValue,
   minHeight?: DimensionValue,
   maxHeight?: DimensionValue,
   margin?: DimensionValue,
   marginBottom?: DimensionValue,
   marginEnd?: DimensionValue,
   marginHorizontal?: DimensionValue,
   marginLeft?: DimensionValue,
   marginRight?: DimensionValue,
   marginStart?: DimensionValue,
   marginTop?: DimensionValue,
   marginVertical?: DimensionValue,
   padding?: DimensionValue,
   paddingBottom?: DimensionValue,
   paddingEnd?: DimensionValue,
   paddingHorizontal?: DimensionValue,
   paddingLeft?: DimensionValue,
   paddingRight?: DimensionValue,
   paddingStart?: DimensionValue,
   paddingTop?: DimensionValue,
   paddingVertical?: DimensionValue,
   position?: StylePosition,
   flexDirection?: StyleFlexDirection,
   flexWrap?: StyleFlexWrap,
   justifyContent?: StyleJustifyContent,
   alignItems?: StyleAlignItems,
   alignSelf?: StyleAlignSelf,
   alignContent?: StyleAlignContent,
   overflow?: StyleOverflow,
   flex?: Int,
   flexGrow?: Int,
   flexShrink?: Int,
   flexBasis?: Int,
   zIndex?: Int,
   direction?: StyleDirection,
   shadowColor?: ColorValue,
   shadowOffset?: StyleShadowOffset,
   shadowOpacity?: Int,
   shadowRadius?: Int,
   backgroundColor?: ColorValue,
   borderColor?: ColorValue,
   borderBottomColor?: ColorValue,
   borderEndColor?: ColorValue,
   borderLeftColor?: ColorValue,
   borderRightColor?: ColorValue,
   borderStartColor?: ColorValue,
   borderTopColor?: ColorValue,
   borderRadius?: BorderValue,
   borderBottomEndRadius?: BorderValue,
   borderBottomLeftRadius?: BorderValue,
   borderBottomRightRadius?: BorderValue,
   borderBottomStartRadius?: BorderValue,
   borderTopEndRadius?: BorderValue,
   borderTopLeftRadius?: BorderValue,
   borderTopRightRadius?: BorderValue,
   borderTopStartRadius?: BorderValue,
   borderStyle?: StyleBorderStyle,
   borderWidth?: BorderValue,
   borderBottomWidth?: BorderValue,
   borderEndWidth?: BorderValue,
   borderLeftWidth?: BorderValue,
   borderRightWidth?: BorderValue,
   borderStartWidth?: BorderValue,
   borderTopWidth?: BorderValue,
   opacity?: Int,
   color?: ColorValue,
   fontFamily?: String,
   fontSize?: Int,
   fontStyle?: StyleFontStyle,
   fontWeight?: StyleFontWeight,
   fontVariant?: StyleFontVariant,
   letterSpacing?: Int,
   lineHeight?: Int,
   textAlign?: StyleTextAlign,
   textAlignVertical?: StyleTextAlignVertical,
   textDecorationLine?: StyleTextDecorationLine,
   textTransform?: StyleTextTransform,
|}

 export type DimensionValue = {| ...Node,
 
   id: ID_Output,
   web: Web,
   name?: String,
   unit: DimensionValueUnit,
   value: Int,
|}

 export type AuthPayload = {| 
   errors?: AuthErrors,
   token?: String,
   user?: User,
|}

 export type Component = {| ...Node,
 
   id: ID_Output,
   web: Web,
   document?: Document,
   name: String,
   style?: Style,
|}

 export type Document = {| ...Node,
 
   id: ID_Output,
   elements?: Element[],
|}

 export type SetPageTitleErrors = {| 
   title?: Max140CharsError,
|}

 export type SetPageTitlePayload = {| 
   errors?: SetPageTitleErrors,
   page?: Page,
|}

 export type SetWebNameErrors = {| 
   name?: Max140CharsError,
|}

 export type SetThemePayload = {| 
   user?: User,
|}

 export type CreateWebPayload = {| 
   errors?: CreateWebErrors,
   pageId?: ID_Output,
|}

 export type Element = {| ...Node,
 
   id: ID_Output,
   document: Document,
   component?: Component,
   path: Int[],
   type?: ElementType,
   style?: Style,
|}

 export type AuthErrors = {| 
   email?: EmailError,
   password?: PasswordError,
|}

 export type SetPageContentPayload = {| 
   page?: Page,
|}

 export type CreateWebErrors = {| 
   name?: Max140CharsError,
   pageTitle?: Max140CharsError,
|}

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
 export type Float = number 

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
Raw JSON value
*/
 export type Json = string 

 export type DateTime = Date | string 

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
 export type Int = number 

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
 export type String = string 