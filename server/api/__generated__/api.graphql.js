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
    components(args: { where?: ComponentWhereInput, orderBy?: ComponentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, context: Context): Promise<Component[]>; 
  }

export interface Mutation {
    auth(args: { input: AuthInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<AuthPayload | null>; 
    createWeb(args: { input: CreateWebInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<CreateWebPayload | null>; 
    deleteWeb(args: { input: DeleteWebInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<DeleteWebPayload | null>; 
    setTheme(args: { input: SetThemeInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<SetThemePayload | null>; 
    setPageTitle(args: { input: SetPageTitleInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<SetPageTitlePayload | null>; 
    setWebName(args: { input: SetWebNameInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<SetWebNamePayload | null>; 
    setPageElement(args: { input: SetPageElementInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<SetPageElementPayload | null>; 
    deletePage(args: { input: DeletePageInput }, info?: GraphQLResolveInfo | string, context: Context): Promise<DeletePagePayload | null>; 
  }

export interface Subscription {}

export interface Exists {
undefined(where?: ComponentWhereInput): Promise<boolean>;
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

type BorderValue implements Node {
  id: ID!
  web: Web!
  name: String
  unit: BorderValueUnit!
  value: Int!
}

input BorderValueCreateInput {
  name: String
  unit: BorderValueUnit!
  value: Int!
  web: WebCreateOneWithoutBorderValuesInput!
}

input BorderValueCreateManyWithoutWebInput {
  create: [BorderValueCreateWithoutWebInput!]
  connect: [BorderValueWhereUniqueInput!]
}

input BorderValueCreateOneInput {
  create: BorderValueCreateInput
  connect: BorderValueWhereUniqueInput
}

input BorderValueCreateWithoutWebInput {
  name: String
  unit: BorderValueUnit!
  value: Int!
}

enum BorderValueOrderByInput {
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
  web: WebWhereInput
}

input BorderValueWhereUniqueInput {
  id: ID
}

type ColorValue implements Node {
  id: ID!
  web: Web!
  name: String
  r: Int!
  g: Int!
  b: Int!
  a: Float
}

input ColorValueCreateInput {
  name: String
  r: Int!
  g: Int!
  b: Int!
  a: Float
  web: WebCreateOneWithoutColorValuesInput!
}

input ColorValueCreateManyWithoutWebInput {
  create: [ColorValueCreateWithoutWebInput!]
  connect: [ColorValueWhereUniqueInput!]
}

input ColorValueCreateOneInput {
  create: ColorValueCreateInput
  connect: ColorValueWhereUniqueInput
}

input ColorValueCreateWithoutWebInput {
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

input ColorValueWhereUniqueInput {
  id: ID
}

type Component implements Node {
  id: ID!
  name: String!
  creator: User!
  props(where: ComponentPropWhereInput, orderBy: ComponentPropOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ComponentProp!]
}

input ComponentCreateInput {
  name: String!
  creator: UserCreateOneWithoutComponentsInput!
  props: ComponentPropCreateManyWithoutComponentInput
}

input ComponentCreateManyWithoutCreatorInput {
  create: [ComponentCreateWithoutCreatorInput!]
  connect: [ComponentWhereUniqueInput!]
}

input ComponentCreateOneInput {
  create: ComponentCreateInput
  connect: ComponentWhereUniqueInput
}

input ComponentCreateWithoutCreatorInput {
  name: String!
  props: ComponentPropCreateManyWithoutComponentInput
}

enum ComponentOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ComponentProp implements Node {
  id: ID!
  component: Component!
  name: String!
  type: PropType!
}

input ComponentPropCreateManyWithoutComponentInput {
  create: [ComponentPropCreateWithoutComponentInput!]
  connect: [ComponentPropWhereUniqueInput!]
}

input ComponentPropCreateWithoutComponentInput {
  name: String!
  type: PropType!
}

enum ComponentPropOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  type_ASC
  type_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

input ComponentPropWhereInput {
  """Logical AND on all given filters."""
  AND: [ComponentPropWhereInput!]

  """Logical OR on all given filters."""
  OR: [ComponentPropWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ComponentPropWhereInput!]
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
  type: PropType

  """All values that are not equal to given value."""
  type_not: PropType

  """All values that are contained in given list."""
  type_in: [PropType!]

  """All values that are not contained in given list."""
  type_not_in: [PropType!]
  component: ComponentWhereInput
}

input ComponentPropWhereUniqueInput {
  id: ID
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
  creator: UserWhereInput
  props_every: ComponentPropWhereInput
  props_some: ComponentPropWhereInput
  props_none: ComponentPropWhereInput
}

input ComponentWhereUniqueInput {
  id: ID
  name: String
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
  web: Web!
  name: String
  unit: DimensionValueUnit!
  value: Int!
}

input DimensionValueCreateInput {
  name: String
  unit: DimensionValueUnit!
  value: Int!
  web: WebCreateOneWithoutDimensionValuesInput!
}

input DimensionValueCreateManyWithoutWebInput {
  create: [DimensionValueCreateWithoutWebInput!]
  connect: [DimensionValueWhereUniqueInput!]
}

input DimensionValueCreateOneInput {
  create: DimensionValueCreateInput
  connect: DimensionValueWhereUniqueInput
}

input DimensionValueCreateWithoutWebInput {
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
  KEYWORD
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

input DimensionValueWhereUniqueInput {
  id: ID
}

type Element implements Node {
  id: ID!
  type: ElementType!
  index: Int!
  web: Web!
  parent: Element
  textLeaves: Json
  children(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Element!]
  shared: SharedElement
  component: Component!
  props(where: ElementPropWhereInput, orderBy: ElementPropOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ElementProp!]
}

input ElementCreateInput {
  type: ElementType!
  index: Int!
  textLeaves: Json
  web: WebCreateOneWithoutElementsInput!
  parent: ElementCreateOneWithoutChildrenInput
  children: ElementCreateManyWithoutParentInput
  shared: SharedElementCreateOneWithoutSharedByInput
  component: ComponentCreateOneInput!
  props: ElementPropCreateManyWithoutElementInput
}

input ElementCreateManyWithoutParentInput {
  create: [ElementCreateWithoutParentInput!]
  connect: [ElementWhereUniqueInput!]
}

input ElementCreateManyWithoutWebInput {
  create: [ElementCreateWithoutWebInput!]
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

input ElementCreateOneWithoutPropsInput {
  create: ElementCreateWithoutPropsInput
  connect: ElementWhereUniqueInput
}

input ElementCreateWithoutChildrenInput {
  type: ElementType!
  index: Int!
  textLeaves: Json
  web: WebCreateOneWithoutElementsInput!
  parent: ElementCreateOneWithoutChildrenInput
  shared: SharedElementCreateOneWithoutSharedByInput
  component: ComponentCreateOneInput!
  props: ElementPropCreateManyWithoutElementInput
}

input ElementCreateWithoutParentInput {
  type: ElementType!
  index: Int!
  textLeaves: Json
  web: WebCreateOneWithoutElementsInput!
  children: ElementCreateManyWithoutParentInput
  shared: SharedElementCreateOneWithoutSharedByInput
  component: ComponentCreateOneInput!
  props: ElementPropCreateManyWithoutElementInput
}

input ElementCreateWithoutPropsInput {
  type: ElementType!
  index: Int!
  textLeaves: Json
  web: WebCreateOneWithoutElementsInput!
  parent: ElementCreateOneWithoutChildrenInput
  children: ElementCreateManyWithoutParentInput
  shared: SharedElementCreateOneWithoutSharedByInput
  component: ComponentCreateOneInput!
}

input ElementCreateWithoutWebInput {
  type: ElementType!
  index: Int!
  textLeaves: Json
  parent: ElementCreateOneWithoutChildrenInput
  children: ElementCreateManyWithoutParentInput
  shared: SharedElementCreateOneWithoutSharedByInput
  component: ComponentCreateOneInput!
  props: ElementPropCreateManyWithoutElementInput
}

enum ElementOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  index_ASC
  index_DESC
  textLeaves_ASC
  textLeaves_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ElementProp implements Node {
  id: ID!
  element: Element!
  name: String!
  type: PropType!
  valueStyle: Style
  value: String
}

input ElementPropCreateManyWithoutElementInput {
  create: [ElementPropCreateWithoutElementInput!]
  connect: [ElementPropWhereUniqueInput!]
}

input ElementPropCreateManyWithoutValueStyleInput {
  create: [ElementPropCreateWithoutValueStyleInput!]
  connect: [ElementPropWhereUniqueInput!]
}

input ElementPropCreateWithoutElementInput {
  name: String!
  type: PropType!
  value: String
  valueStyle: StyleCreateOneWithoutPropsInput
}

input ElementPropCreateWithoutValueStyleInput {
  name: String!
  type: PropType!
  value: String
  element: ElementCreateOneWithoutPropsInput!
}

enum ElementPropOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  type_ASC
  type_DESC
  value_ASC
  value_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

input ElementPropWhereInput {
  """Logical AND on all given filters."""
  AND: [ElementPropWhereInput!]

  """Logical OR on all given filters."""
  OR: [ElementPropWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ElementPropWhereInput!]
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
  type: PropType

  """All values that are not equal to given value."""
  type_not: PropType

  """All values that are contained in given list."""
  type_in: [PropType!]

  """All values that are not contained in given list."""
  type_not_in: [PropType!]
  value: String

  """All values that are not equal to given value."""
  value_not: String

  """All values that are contained in given list."""
  value_in: [String!]

  """All values that are not contained in given list."""
  value_not_in: [String!]

  """All values less than the given value."""
  value_lt: String

  """All values less than or equal the given value."""
  value_lte: String

  """All values greater than the given value."""
  value_gt: String

  """All values greater than or equal the given value."""
  value_gte: String

  """All values containing the given string."""
  value_contains: String

  """All values not containing the given string."""
  value_not_contains: String

  """All values starting with the given string."""
  value_starts_with: String

  """All values not starting with the given string."""
  value_not_starts_with: String

  """All values ending with the given string."""
  value_ends_with: String

  """All values not ending with the given string."""
  value_not_ends_with: String
  element: ElementWhereInput
  valueStyle: StyleWhereInput
}

input ElementPropWhereUniqueInput {
  id: ID
}

enum ElementType {
  BLOCK
  INLINE
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
  web: WebWhereInput
  parent: ElementWhereInput
  children_every: ElementWhereInput
  children_some: ElementWhereInput
  children_none: ElementWhereInput
  shared: SharedElementWhereInput
  component: ComponentWhereInput
  props_every: ElementPropWhereInput
  props_some: ElementPropWhereInput
  props_none: ElementPropWhereInput
}

input ElementWhereUniqueInput {
  id: ID
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
  setPageElement(input: SetPageElementInput!): SetPageElementPayload
  deletePage(input: DeletePageInput!): DeletePagePayload
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

type Page implements Node {
  id: ID!
  creator: User!
  web: Web!
  element: Element!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
}

input PageCreateManyWithoutWebInput {
  create: [PageCreateWithoutWebInput!]
  connect: [PageWhereUniqueInput!]
}

input PageCreateWithoutWebInput {
  title: String!
  creator: UserCreateOneInput!
  element: ElementCreateOneInput!
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

enum PasswordError {
  REQUIRED
  MIN_5_CHARS
  MAX_1024_CHARS
  WRONG_PASSWORD
}

enum PropType {
  BOOLEAN
  NUMBER
  STRING
  VIEW_STYLE
  TEXT_STYLE
}

type Query {
  me: User
  page(id: ID!): Page
  web(id: ID!): Web
  components(where: ComponentWhereInput, orderBy: ComponentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Component!]!
}

input SetPageElementInput {
  id: ID!
  element: ElementCreateInput!
}

type SetPageElementPayload {
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

type SharedElement implements Node {
  id: ID!
  sharedBy(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Element!]
  name: String!
  element: Element!
}

input SharedElementCreateOneWithoutSharedByInput {
  create: SharedElementCreateWithoutSharedByInput
  connect: SharedElementWhereUniqueInput
}

input SharedElementCreateWithoutSharedByInput {
  name: String!
  element: ElementCreateOneInput!
}

input SharedElementWhereInput {
  """Logical AND on all given filters."""
  AND: [SharedElementWhereInput!]

  """Logical OR on all given filters."""
  OR: [SharedElementWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SharedElementWhereInput!]
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
  sharedBy_every: ElementWhereInput
  sharedBy_some: ElementWhereInput
  sharedBy_none: ElementWhereInput
  element: ElementWhereInput
}

input SharedElementWhereUniqueInput {
  id: ID
}

type Style implements Node {
  id: ID!
  web: Web!
  props(where: ElementPropWhereInput, orderBy: ElementPropOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ElementProp!]
  name: String!
  isText: Boolean
  spreadStyles(where: StyleSpreadWhereInput, orderBy: StyleSpreadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StyleSpread!]
  display: StyleDisplay
  width: DimensionValue
  height: DimensionValue
  bottom: DimensionValue
  end: DimensionValue
  left: DimensionValue
  right: DimensionValue
  start: DimensionValue
  top: DimensionValue
  minWidth: DimensionValue
  maxWidth: DimensionValue
  minHeight: DimensionValue
  maxHeight: DimensionValue
  margin: DimensionValue
  marginBottom: DimensionValue
  marginEnd: DimensionValue
  marginHorizontal: DimensionValue
  marginLeft: DimensionValue
  marginRight: DimensionValue
  marginStart: DimensionValue
  marginTop: DimensionValue
  marginVertical: DimensionValue
  padding: DimensionValue
  paddingBottom: DimensionValue
  paddingEnd: DimensionValue
  paddingHorizontal: DimensionValue
  paddingLeft: DimensionValue
  paddingRight: DimensionValue
  paddingStart: DimensionValue
  paddingTop: DimensionValue
  paddingVertical: DimensionValue
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
  backgroundColor: ColorValue
  borderColor: ColorValue
  borderBottomColor: ColorValue
  borderEndColor: ColorValue
  borderLeftColor: ColorValue
  borderRightColor: ColorValue
  borderStartColor: ColorValue
  borderTopColor: ColorValue
  borderRadius: BorderValue
  borderBottomEndRadius: BorderValue
  borderBottomLeftRadius: BorderValue
  borderBottomRightRadius: BorderValue
  borderBottomStartRadius: BorderValue
  borderTopEndRadius: BorderValue
  borderTopLeftRadius: BorderValue
  borderTopRightRadius: BorderValue
  borderTopStartRadius: BorderValue
  borderStyle: StyleBorderStyle
  borderWidth: BorderValue
  borderBottomWidth: BorderValue
  borderEndWidth: BorderValue
  borderLeftWidth: BorderValue
  borderRightWidth: BorderValue
  borderStartWidth: BorderValue
  borderTopWidth: BorderValue
  opacity: Int
  color: ColorValue
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

input StyleCreateInput {
  name: String!
  isText: Boolean
  display: StyleDisplay
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
  borderStyle: StyleBorderStyle
  opacity: Int
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
  web: WebCreateOneWithoutStylesInput!
  props: ElementPropCreateManyWithoutValueStyleInput
  spreadStyles: StyleSpreadCreateManyWithoutSpreadStyleInput
  width: DimensionValueCreateOneInput
  height: DimensionValueCreateOneInput
  bottom: DimensionValueCreateOneInput
  end: DimensionValueCreateOneInput
  left: DimensionValueCreateOneInput
  right: DimensionValueCreateOneInput
  start: DimensionValueCreateOneInput
  top: DimensionValueCreateOneInput
  minWidth: DimensionValueCreateOneInput
  maxWidth: DimensionValueCreateOneInput
  minHeight: DimensionValueCreateOneInput
  maxHeight: DimensionValueCreateOneInput
  margin: DimensionValueCreateOneInput
  marginBottom: DimensionValueCreateOneInput
  marginEnd: DimensionValueCreateOneInput
  marginHorizontal: DimensionValueCreateOneInput
  marginLeft: DimensionValueCreateOneInput
  marginRight: DimensionValueCreateOneInput
  marginStart: DimensionValueCreateOneInput
  marginTop: DimensionValueCreateOneInput
  marginVertical: DimensionValueCreateOneInput
  padding: DimensionValueCreateOneInput
  paddingBottom: DimensionValueCreateOneInput
  paddingEnd: DimensionValueCreateOneInput
  paddingHorizontal: DimensionValueCreateOneInput
  paddingLeft: DimensionValueCreateOneInput
  paddingRight: DimensionValueCreateOneInput
  paddingStart: DimensionValueCreateOneInput
  paddingTop: DimensionValueCreateOneInput
  paddingVertical: DimensionValueCreateOneInput
  backgroundColor: ColorValueCreateOneInput
  borderColor: ColorValueCreateOneInput
  borderBottomColor: ColorValueCreateOneInput
  borderEndColor: ColorValueCreateOneInput
  borderLeftColor: ColorValueCreateOneInput
  borderRightColor: ColorValueCreateOneInput
  borderStartColor: ColorValueCreateOneInput
  borderTopColor: ColorValueCreateOneInput
  borderRadius: BorderValueCreateOneInput
  borderBottomEndRadius: BorderValueCreateOneInput
  borderBottomLeftRadius: BorderValueCreateOneInput
  borderBottomRightRadius: BorderValueCreateOneInput
  borderBottomStartRadius: BorderValueCreateOneInput
  borderTopEndRadius: BorderValueCreateOneInput
  borderTopLeftRadius: BorderValueCreateOneInput
  borderTopRightRadius: BorderValueCreateOneInput
  borderTopStartRadius: BorderValueCreateOneInput
  borderWidth: BorderValueCreateOneInput
  borderBottomWidth: BorderValueCreateOneInput
  borderEndWidth: BorderValueCreateOneInput
  borderLeftWidth: BorderValueCreateOneInput
  borderRightWidth: BorderValueCreateOneInput
  borderStartWidth: BorderValueCreateOneInput
  borderTopWidth: BorderValueCreateOneInput
  color: ColorValueCreateOneInput
}

input StyleCreateManyWithoutWebInput {
  create: [StyleCreateWithoutWebInput!]
  connect: [StyleWhereUniqueInput!]
}

input StyleCreateOneInput {
  create: StyleCreateInput
  connect: StyleWhereUniqueInput
}

input StyleCreateOneWithoutPropsInput {
  create: StyleCreateWithoutPropsInput
  connect: StyleWhereUniqueInput
}

input StyleCreateWithoutPropsInput {
  name: String!
  isText: Boolean
  display: StyleDisplay
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
  borderStyle: StyleBorderStyle
  opacity: Int
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
  web: WebCreateOneWithoutStylesInput!
  spreadStyles: StyleSpreadCreateManyWithoutSpreadStyleInput
  width: DimensionValueCreateOneInput
  height: DimensionValueCreateOneInput
  bottom: DimensionValueCreateOneInput
  end: DimensionValueCreateOneInput
  left: DimensionValueCreateOneInput
  right: DimensionValueCreateOneInput
  start: DimensionValueCreateOneInput
  top: DimensionValueCreateOneInput
  minWidth: DimensionValueCreateOneInput
  maxWidth: DimensionValueCreateOneInput
  minHeight: DimensionValueCreateOneInput
  maxHeight: DimensionValueCreateOneInput
  margin: DimensionValueCreateOneInput
  marginBottom: DimensionValueCreateOneInput
  marginEnd: DimensionValueCreateOneInput
  marginHorizontal: DimensionValueCreateOneInput
  marginLeft: DimensionValueCreateOneInput
  marginRight: DimensionValueCreateOneInput
  marginStart: DimensionValueCreateOneInput
  marginTop: DimensionValueCreateOneInput
  marginVertical: DimensionValueCreateOneInput
  padding: DimensionValueCreateOneInput
  paddingBottom: DimensionValueCreateOneInput
  paddingEnd: DimensionValueCreateOneInput
  paddingHorizontal: DimensionValueCreateOneInput
  paddingLeft: DimensionValueCreateOneInput
  paddingRight: DimensionValueCreateOneInput
  paddingStart: DimensionValueCreateOneInput
  paddingTop: DimensionValueCreateOneInput
  paddingVertical: DimensionValueCreateOneInput
  backgroundColor: ColorValueCreateOneInput
  borderColor: ColorValueCreateOneInput
  borderBottomColor: ColorValueCreateOneInput
  borderEndColor: ColorValueCreateOneInput
  borderLeftColor: ColorValueCreateOneInput
  borderRightColor: ColorValueCreateOneInput
  borderStartColor: ColorValueCreateOneInput
  borderTopColor: ColorValueCreateOneInput
  borderRadius: BorderValueCreateOneInput
  borderBottomEndRadius: BorderValueCreateOneInput
  borderBottomLeftRadius: BorderValueCreateOneInput
  borderBottomRightRadius: BorderValueCreateOneInput
  borderBottomStartRadius: BorderValueCreateOneInput
  borderTopEndRadius: BorderValueCreateOneInput
  borderTopLeftRadius: BorderValueCreateOneInput
  borderTopRightRadius: BorderValueCreateOneInput
  borderTopStartRadius: BorderValueCreateOneInput
  borderWidth: BorderValueCreateOneInput
  borderBottomWidth: BorderValueCreateOneInput
  borderEndWidth: BorderValueCreateOneInput
  borderLeftWidth: BorderValueCreateOneInput
  borderRightWidth: BorderValueCreateOneInput
  borderStartWidth: BorderValueCreateOneInput
  borderTopWidth: BorderValueCreateOneInput
  color: ColorValueCreateOneInput
}

input StyleCreateWithoutWebInput {
  name: String!
  isText: Boolean
  display: StyleDisplay
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
  borderStyle: StyleBorderStyle
  opacity: Int
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
  props: ElementPropCreateManyWithoutValueStyleInput
  spreadStyles: StyleSpreadCreateManyWithoutSpreadStyleInput
  width: DimensionValueCreateOneInput
  height: DimensionValueCreateOneInput
  bottom: DimensionValueCreateOneInput
  end: DimensionValueCreateOneInput
  left: DimensionValueCreateOneInput
  right: DimensionValueCreateOneInput
  start: DimensionValueCreateOneInput
  top: DimensionValueCreateOneInput
  minWidth: DimensionValueCreateOneInput
  maxWidth: DimensionValueCreateOneInput
  minHeight: DimensionValueCreateOneInput
  maxHeight: DimensionValueCreateOneInput
  margin: DimensionValueCreateOneInput
  marginBottom: DimensionValueCreateOneInput
  marginEnd: DimensionValueCreateOneInput
  marginHorizontal: DimensionValueCreateOneInput
  marginLeft: DimensionValueCreateOneInput
  marginRight: DimensionValueCreateOneInput
  marginStart: DimensionValueCreateOneInput
  marginTop: DimensionValueCreateOneInput
  marginVertical: DimensionValueCreateOneInput
  padding: DimensionValueCreateOneInput
  paddingBottom: DimensionValueCreateOneInput
  paddingEnd: DimensionValueCreateOneInput
  paddingHorizontal: DimensionValueCreateOneInput
  paddingLeft: DimensionValueCreateOneInput
  paddingRight: DimensionValueCreateOneInput
  paddingStart: DimensionValueCreateOneInput
  paddingTop: DimensionValueCreateOneInput
  paddingVertical: DimensionValueCreateOneInput
  backgroundColor: ColorValueCreateOneInput
  borderColor: ColorValueCreateOneInput
  borderBottomColor: ColorValueCreateOneInput
  borderEndColor: ColorValueCreateOneInput
  borderLeftColor: ColorValueCreateOneInput
  borderRightColor: ColorValueCreateOneInput
  borderStartColor: ColorValueCreateOneInput
  borderTopColor: ColorValueCreateOneInput
  borderRadius: BorderValueCreateOneInput
  borderBottomEndRadius: BorderValueCreateOneInput
  borderBottomLeftRadius: BorderValueCreateOneInput
  borderBottomRightRadius: BorderValueCreateOneInput
  borderBottomStartRadius: BorderValueCreateOneInput
  borderTopEndRadius: BorderValueCreateOneInput
  borderTopLeftRadius: BorderValueCreateOneInput
  borderTopRightRadius: BorderValueCreateOneInput
  borderTopStartRadius: BorderValueCreateOneInput
  borderWidth: BorderValueCreateOneInput
  borderBottomWidth: BorderValueCreateOneInput
  borderEndWidth: BorderValueCreateOneInput
  borderLeftWidth: BorderValueCreateOneInput
  borderRightWidth: BorderValueCreateOneInput
  borderStartWidth: BorderValueCreateOneInput
  borderTopWidth: BorderValueCreateOneInput
  color: ColorValueCreateOneInput
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
  name_ASC
  name_DESC
  isText_ASC
  isText_DESC
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

type StyleSpread implements Node {
  id: ID!
  spreadStyle: Style!
  index: Int!
  style: Style!
}

input StyleSpreadCreateManyWithoutSpreadStyleInput {
  create: [StyleSpreadCreateWithoutSpreadStyleInput!]
  connect: [StyleSpreadWhereUniqueInput!]
}

input StyleSpreadCreateWithoutSpreadStyleInput {
  index: Int!
  style: StyleCreateOneInput!
}

enum StyleSpreadOrderByInput {
  id_ASC
  id_DESC
  index_ASC
  index_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

input StyleSpreadWhereInput {
  """Logical AND on all given filters."""
  AND: [StyleSpreadWhereInput!]

  """Logical OR on all given filters."""
  OR: [StyleSpreadWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StyleSpreadWhereInput!]
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
  spreadStyle: StyleWhereInput
  style: StyleWhereInput
}

input StyleSpreadWhereUniqueInput {
  id: ID
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
  isText: Boolean

  """All values that are not equal to given value."""
  isText_not: Boolean
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
  props_every: ElementPropWhereInput
  props_some: ElementPropWhereInput
  props_none: ElementPropWhereInput
  spreadStyles_every: StyleSpreadWhereInput
  spreadStyles_some: StyleSpreadWhereInput
  spreadStyles_none: StyleSpreadWhereInput
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

input StyleWhereUniqueInput {
  id: ID
}

type User implements Node {
  id: ID!
  webs(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Web!]
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  password: String!
  themeName: String
  components(where: ComponentWhereInput, orderBy: ComponentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Component!]
}

input UserCreateInput {
  email: String!
  password: String!
  themeName: String
  webs: WebCreateManyWithoutCreatorInput
  components: ComponentCreateManyWithoutCreatorInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutComponentsInput {
  create: UserCreateWithoutComponentsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutWebsInput {
  create: UserCreateWithoutWebsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutComponentsInput {
  email: String!
  password: String!
  themeName: String
  webs: WebCreateManyWithoutCreatorInput
}

input UserCreateWithoutWebsInput {
  email: String!
  password: String!
  themeName: String
  components: ComponentCreateManyWithoutCreatorInput
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
  components_every: ComponentWhereInput
  components_some: ComponentWhereInput
  components_none: ComponentWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Web implements Node {
  id: ID!
  creator: User!
  pages(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Page!]
  elements(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Element!]
  styles(where: StyleWhereInput, orderBy: StyleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Style!]
  dimensionValues(where: DimensionValueWhereInput, orderBy: DimensionValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DimensionValue!]
  colorValues(where: ColorValueWhereInput, orderBy: ColorValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ColorValue!]
  borderValues(where: BorderValueWhereInput, orderBy: BorderValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [BorderValue!]
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
}

input WebCreateManyWithoutCreatorInput {
  create: [WebCreateWithoutCreatorInput!]
  connect: [WebWhereUniqueInput!]
}

input WebCreateOneWithoutBorderValuesInput {
  create: WebCreateWithoutBorderValuesInput
  connect: WebWhereUniqueInput
}

input WebCreateOneWithoutColorValuesInput {
  create: WebCreateWithoutColorValuesInput
  connect: WebWhereUniqueInput
}

input WebCreateOneWithoutDimensionValuesInput {
  create: WebCreateWithoutDimensionValuesInput
  connect: WebWhereUniqueInput
}

input WebCreateOneWithoutElementsInput {
  create: WebCreateWithoutElementsInput
  connect: WebWhereUniqueInput
}

input WebCreateOneWithoutStylesInput {
  create: WebCreateWithoutStylesInput
  connect: WebWhereUniqueInput
}

input WebCreateWithoutBorderValuesInput {
  name: String!
  creator: UserCreateOneWithoutWebsInput!
  pages: PageCreateManyWithoutWebInput
  elements: ElementCreateManyWithoutWebInput
  styles: StyleCreateManyWithoutWebInput
  dimensionValues: DimensionValueCreateManyWithoutWebInput
  colorValues: ColorValueCreateManyWithoutWebInput
}

input WebCreateWithoutColorValuesInput {
  name: String!
  creator: UserCreateOneWithoutWebsInput!
  pages: PageCreateManyWithoutWebInput
  elements: ElementCreateManyWithoutWebInput
  styles: StyleCreateManyWithoutWebInput
  dimensionValues: DimensionValueCreateManyWithoutWebInput
  borderValues: BorderValueCreateManyWithoutWebInput
}

input WebCreateWithoutCreatorInput {
  name: String!
  pages: PageCreateManyWithoutWebInput
  elements: ElementCreateManyWithoutWebInput
  styles: StyleCreateManyWithoutWebInput
  dimensionValues: DimensionValueCreateManyWithoutWebInput
  colorValues: ColorValueCreateManyWithoutWebInput
  borderValues: BorderValueCreateManyWithoutWebInput
}

input WebCreateWithoutDimensionValuesInput {
  name: String!
  creator: UserCreateOneWithoutWebsInput!
  pages: PageCreateManyWithoutWebInput
  elements: ElementCreateManyWithoutWebInput
  styles: StyleCreateManyWithoutWebInput
  colorValues: ColorValueCreateManyWithoutWebInput
  borderValues: BorderValueCreateManyWithoutWebInput
}

input WebCreateWithoutElementsInput {
  name: String!
  creator: UserCreateOneWithoutWebsInput!
  pages: PageCreateManyWithoutWebInput
  styles: StyleCreateManyWithoutWebInput
  dimensionValues: DimensionValueCreateManyWithoutWebInput
  colorValues: ColorValueCreateManyWithoutWebInput
  borderValues: BorderValueCreateManyWithoutWebInput
}

input WebCreateWithoutStylesInput {
  name: String!
  creator: UserCreateOneWithoutWebsInput!
  pages: PageCreateManyWithoutWebInput
  elements: ElementCreateManyWithoutWebInput
  dimensionValues: DimensionValueCreateManyWithoutWebInput
  colorValues: ColorValueCreateManyWithoutWebInput
  borderValues: BorderValueCreateManyWithoutWebInput
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
  elements_every: ElementWhereInput
  elements_some: ElementWhereInput
  elements_none: ElementWhereInput
  styles_every: StyleWhereInput
  styles_some: StyleWhereInput
  styles_none: StyleWhereInput
  dimensionValues_every: DimensionValueWhereInput
  dimensionValues_some: DimensionValueWhereInput
  dimensionValues_none: DimensionValueWhereInput
  colorValues_every: ColorValueWhereInput
  colorValues_some: ColorValueWhereInput
  colorValues_none: ColorValueWhereInput
  borderValues_every: BorderValueWhereInput
  borderValues_some: BorderValueWhereInput
  borderValues_none: BorderValueWhereInput
}

input WebWhereUniqueInput {
  id: ID
}
`

const prisma: BindingConstructor<Prisma> = makePrismaBindingClass({typeDefs})
 


/**
 * Types
*/

 export type BorderValueOrderByInput =
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
  

 export type BorderValueUnit =
    | 'POINT'
  

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
  

 export type ComponentOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

 export type ComponentPropOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'type_ASC'
    | 'type_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

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
  

 export type DimensionValueUnit =
    | 'POINT'
    | 'PERCENTAGE'
    | 'KEYWORD'
  

 export type ElementOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'type_ASC'
    | 'type_DESC'
    | 'index_ASC'
    | 'index_DESC'
    | 'textLeaves_ASC'
    | 'textLeaves_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

 export type ElementPropOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'type_ASC'
    | 'type_DESC'
    | 'value_ASC'
    | 'value_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

 export type ElementType =
    | 'BLOCK'
    | 'INLINE'
    | 'TEXT'
  

 export type EmailError =
    | 'REQUIRED'
    | 'EMAIL'
    | 'ALREADY_EXISTS'
    | 'NOT_EXISTS'
  

 export type Max140CharsError =
    | 'REQUIRED'
    | 'MAX_140_CHARS'
  

 export type PageOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'title_ASC'
    | 'title_DESC'
  

 export type PasswordError =
    | 'REQUIRED'
    | 'MIN_5_CHARS'
    | 'MAX_1024_CHARS'
    | 'WRONG_PASSWORD'
  

 export type PropType =
    | 'BOOLEAN'
    | 'NUMBER'
    | 'STRING'
    | 'VIEW_STYLE'
    | 'TEXT_STYLE'
  

 export type StyleAlignContent =
    | 'FLEX_START'
    | 'FLEX_END'
    | 'CENTER'
    | 'STRETCH'
    | 'SPACE_BETWEEN'
    | 'SPACE_AROUND'
  

 export type StyleAlignItems =
    | 'FLEX_START'
    | 'FLEX_END'
    | 'CENTER'
    | 'STRETCH'
    | 'BASELINE'
  

 export type StyleAlignSelf =
    | 'AUTO'
    | 'FLEX_START'
    | 'FLEX_END'
    | 'CENTER'
    | 'STRETCH'
    | 'BASELINE'
  

 export type StyleBorderStyle =
    | 'SOLID'
    | 'DOTTED'
    | 'DASHED'
  

 export type StyleDirection =
    | 'INHERIT'
    | 'LTR'
    | 'RTL'
  

 export type StyleDisplay =
    | 'NONE'
    | 'FLEX'
  

 export type StyleFlexDirection =
    | 'ROW'
    | 'ROW_REVERSE'
    | 'COLUMN'
    | 'COLUMN_REVERSE'
  

 export type StyleFlexWrap =
    | 'WRAP'
    | 'NOWRAP'
    | 'WRAP_REVERSE'
  

 export type StyleFontStyle =
    | 'NORMAL'
    | 'ITALIC'
  

 export type StyleFontVariant =
    | 'SMALL_CAPS'
  

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
  

 export type StyleJustifyContent =
    | 'FLEX_START'
    | 'FLEX_END'
    | 'CENTER'
    | 'SPACE_BETWEEN'
    | 'SPACE_AROUND'
    | 'SPACE_EVENLY'
  

 export type StyleOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'isText_ASC'
    | 'isText_DESC'
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
  

 export type StyleOverflow =
    | 'VISIBLE'
    | 'HIDDEN'
    | 'SCROLL'
  

 export type StylePosition =
    | 'ABSOLUTE'
    | 'RELATIVE'
  

 export type StyleSpreadOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'index_ASC'
    | 'index_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

 export type StyleTextAlign =
    | 'AUTO'
    | 'LEFT'
    | 'RIGHT'
    | 'CENTER'
    | 'JUSTIFY'
  

 export type StyleTextAlignVertical =
    | 'AUTO'
    | 'TOP'
    | 'BOTTOM'
    | 'CENTER'
  

 export type StyleTextDecorationLine =
    | 'NONE'
    | 'UNDERLINE'
    | 'LINE_THROUGH'
    | 'UNDERLINE_LINE_THROUGH'
  

 export type StyleTextTransform =
    | 'NONE'
    | 'CAPITALIZE'
    | 'UPPERCASE'
    | 'LOWERCASE'
  

 export type WebOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'name_ASC'
    | 'name_DESC'
  

 export type AuthInput = {| 
  email: String,
  password: String,
  isSignUp: Boolean
|}

 export type BorderValueCreateInput = {| 
  name?: String,
  unit: BorderValueUnit,
  value: Int,
  web: WebCreateOneWithoutBorderValuesInput
|}

 export type BorderValueCreateManyWithoutWebInput = {| 
  create?: Array< BorderValueCreateWithoutWebInput > | BorderValueCreateWithoutWebInput,
  connect?: Array< BorderValueWhereUniqueInput > | BorderValueWhereUniqueInput
|}

 export type BorderValueCreateOneInput = {| 
  create?: BorderValueCreateInput,
  connect?: BorderValueWhereUniqueInput
|}

 export type BorderValueCreateWithoutWebInput = {| 
  name?: String,
  unit: BorderValueUnit,
  value: Int
|}

 export type BorderValueWhereInput = {| 
  AND?: Array< BorderValueWhereInput > | BorderValueWhereInput,
  OR?: Array< BorderValueWhereInput > | BorderValueWhereInput,
  NOT?: Array< BorderValueWhereInput > | BorderValueWhereInput,
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
  value_gte?: Int,
  web?: WebWhereInput
|}

 export type BorderValueWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type ColorValueCreateInput = {| 
  name?: String,
  r: Int,
  g: Int,
  b: Int,
  a?: Float,
  web: WebCreateOneWithoutColorValuesInput
|}

 export type ColorValueCreateManyWithoutWebInput = {| 
  create?: Array< ColorValueCreateWithoutWebInput > | ColorValueCreateWithoutWebInput,
  connect?: Array< ColorValueWhereUniqueInput > | ColorValueWhereUniqueInput
|}

 export type ColorValueCreateOneInput = {| 
  create?: ColorValueCreateInput,
  connect?: ColorValueWhereUniqueInput
|}

 export type ColorValueCreateWithoutWebInput = {| 
  name?: String,
  r: Int,
  g: Int,
  b: Int,
  a?: Float
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

 export type ColorValueWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type ComponentCreateInput = {| 
  name: String,
  creator: UserCreateOneWithoutComponentsInput,
  props?: ComponentPropCreateManyWithoutComponentInput
|}

 export type ComponentCreateManyWithoutCreatorInput = {| 
  create?: Array< ComponentCreateWithoutCreatorInput > | ComponentCreateWithoutCreatorInput,
  connect?: Array< ComponentWhereUniqueInput > | ComponentWhereUniqueInput
|}

 export type ComponentCreateOneInput = {| 
  create?: ComponentCreateInput,
  connect?: ComponentWhereUniqueInput
|}

 export type ComponentCreateWithoutCreatorInput = {| 
  name: String,
  props?: ComponentPropCreateManyWithoutComponentInput
|}

 export type ComponentPropCreateManyWithoutComponentInput = {| 
  create?: Array< ComponentPropCreateWithoutComponentInput > | ComponentPropCreateWithoutComponentInput,
  connect?: Array< ComponentPropWhereUniqueInput > | ComponentPropWhereUniqueInput
|}

 export type ComponentPropCreateWithoutComponentInput = {| 
  name: String,
  type: PropType
|}

 export type ComponentPropWhereInput = {| 
  AND?: Array< ComponentPropWhereInput > | ComponentPropWhereInput,
  OR?: Array< ComponentPropWhereInput > | ComponentPropWhereInput,
  NOT?: Array< ComponentPropWhereInput > | ComponentPropWhereInput,
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
  type?: PropType,
  type_not?: PropType,
  type_in?: Array< PropType > | PropType,
  type_not_in?: Array< PropType > | PropType,
  component?: ComponentWhereInput
|}

 export type ComponentPropWhereUniqueInput = {| 
  id?: ID_Input
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
  creator?: UserWhereInput,
  props_every?: ComponentPropWhereInput,
  props_some?: ComponentPropWhereInput,
  props_none?: ComponentPropWhereInput
|}

 export type ComponentWhereUniqueInput = {| 
  id?: ID_Input,
  name?: String
|}

 export type CreateWebInput = {| 
  name: String,
  pageTitle: String
|}

 export type DeletePageInput = {| 
  id: ID_Input
|}

 export type DeleteWebInput = {| 
  id: ID_Input
|}

 export type DimensionValueCreateInput = {| 
  name?: String,
  unit: DimensionValueUnit,
  value: Int,
  web: WebCreateOneWithoutDimensionValuesInput
|}

 export type DimensionValueCreateManyWithoutWebInput = {| 
  create?: Array< DimensionValueCreateWithoutWebInput > | DimensionValueCreateWithoutWebInput,
  connect?: Array< DimensionValueWhereUniqueInput > | DimensionValueWhereUniqueInput
|}

 export type DimensionValueCreateOneInput = {| 
  create?: DimensionValueCreateInput,
  connect?: DimensionValueWhereUniqueInput
|}

 export type DimensionValueCreateWithoutWebInput = {| 
  name?: String,
  unit: DimensionValueUnit,
  value: Int
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

 export type DimensionValueWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type ElementCreateInput = {| 
  type: ElementType,
  index: Int,
  textLeaves?: Json,
  web: WebCreateOneWithoutElementsInput,
  parent?: ElementCreateOneWithoutChildrenInput,
  children?: ElementCreateManyWithoutParentInput,
  shared?: SharedElementCreateOneWithoutSharedByInput,
  component: ComponentCreateOneInput,
  props?: ElementPropCreateManyWithoutElementInput
|}

 export type ElementCreateManyWithoutParentInput = {| 
  create?: Array< ElementCreateWithoutParentInput > | ElementCreateWithoutParentInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput
|}

 export type ElementCreateManyWithoutWebInput = {| 
  create?: Array< ElementCreateWithoutWebInput > | ElementCreateWithoutWebInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput
|}

 export type ElementCreateOneInput = {| 
  create?: ElementCreateInput,
  connect?: ElementWhereUniqueInput
|}

 export type ElementCreateOneWithoutChildrenInput = {| 
  create?: ElementCreateWithoutChildrenInput,
  connect?: ElementWhereUniqueInput
|}

 export type ElementCreateOneWithoutPropsInput = {| 
  create?: ElementCreateWithoutPropsInput,
  connect?: ElementWhereUniqueInput
|}

 export type ElementCreateWithoutChildrenInput = {| 
  type: ElementType,
  index: Int,
  textLeaves?: Json,
  web: WebCreateOneWithoutElementsInput,
  parent?: ElementCreateOneWithoutChildrenInput,
  shared?: SharedElementCreateOneWithoutSharedByInput,
  component: ComponentCreateOneInput,
  props?: ElementPropCreateManyWithoutElementInput
|}

 export type ElementCreateWithoutParentInput = {| 
  type: ElementType,
  index: Int,
  textLeaves?: Json,
  web: WebCreateOneWithoutElementsInput,
  children?: ElementCreateManyWithoutParentInput,
  shared?: SharedElementCreateOneWithoutSharedByInput,
  component: ComponentCreateOneInput,
  props?: ElementPropCreateManyWithoutElementInput
|}

 export type ElementCreateWithoutPropsInput = {| 
  type: ElementType,
  index: Int,
  textLeaves?: Json,
  web: WebCreateOneWithoutElementsInput,
  parent?: ElementCreateOneWithoutChildrenInput,
  children?: ElementCreateManyWithoutParentInput,
  shared?: SharedElementCreateOneWithoutSharedByInput,
  component: ComponentCreateOneInput
|}

 export type ElementCreateWithoutWebInput = {| 
  type: ElementType,
  index: Int,
  textLeaves?: Json,
  parent?: ElementCreateOneWithoutChildrenInput,
  children?: ElementCreateManyWithoutParentInput,
  shared?: SharedElementCreateOneWithoutSharedByInput,
  component: ComponentCreateOneInput,
  props?: ElementPropCreateManyWithoutElementInput
|}

 export type ElementPropCreateManyWithoutElementInput = {| 
  create?: Array< ElementPropCreateWithoutElementInput > | ElementPropCreateWithoutElementInput,
  connect?: Array< ElementPropWhereUniqueInput > | ElementPropWhereUniqueInput
|}

 export type ElementPropCreateManyWithoutValueStyleInput = {| 
  create?: Array< ElementPropCreateWithoutValueStyleInput > | ElementPropCreateWithoutValueStyleInput,
  connect?: Array< ElementPropWhereUniqueInput > | ElementPropWhereUniqueInput
|}

 export type ElementPropCreateWithoutElementInput = {| 
  name: String,
  type: PropType,
  value?: String,
  valueStyle?: StyleCreateOneWithoutPropsInput
|}

 export type ElementPropCreateWithoutValueStyleInput = {| 
  name: String,
  type: PropType,
  value?: String,
  element: ElementCreateOneWithoutPropsInput
|}

 export type ElementPropWhereInput = {| 
  AND?: Array< ElementPropWhereInput > | ElementPropWhereInput,
  OR?: Array< ElementPropWhereInput > | ElementPropWhereInput,
  NOT?: Array< ElementPropWhereInput > | ElementPropWhereInput,
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
  type?: PropType,
  type_not?: PropType,
  type_in?: Array< PropType > | PropType,
  type_not_in?: Array< PropType > | PropType,
  value?: String,
  value_not?: String,
  value_in?: Array< String > | String,
  value_not_in?: Array< String > | String,
  value_lt?: String,
  value_lte?: String,
  value_gt?: String,
  value_gte?: String,
  value_contains?: String,
  value_not_contains?: String,
  value_starts_with?: String,
  value_not_starts_with?: String,
  value_ends_with?: String,
  value_not_ends_with?: String,
  element?: ElementWhereInput,
  valueStyle?: StyleWhereInput
|}

 export type ElementPropWhereUniqueInput = {| 
  id?: ID_Input
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
  index?: Int,
  index_not?: Int,
  index_in?: Array< Int > | Int,
  index_not_in?: Array< Int > | Int,
  index_lt?: Int,
  index_lte?: Int,
  index_gt?: Int,
  index_gte?: Int,
  web?: WebWhereInput,
  parent?: ElementWhereInput,
  children_every?: ElementWhereInput,
  children_some?: ElementWhereInput,
  children_none?: ElementWhereInput,
  shared?: SharedElementWhereInput,
  component?: ComponentWhereInput,
  props_every?: ElementPropWhereInput,
  props_some?: ElementPropWhereInput,
  props_none?: ElementPropWhereInput
|}

 export type ElementWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type PageCreateManyWithoutWebInput = {| 
  create?: Array< PageCreateWithoutWebInput > | PageCreateWithoutWebInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput
|}

 export type PageCreateWithoutWebInput = {| 
  title: String,
  creator: UserCreateOneInput,
  element: ElementCreateOneInput
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

 export type PageWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type SetPageElementInput = {| 
  id: ID_Input,
  element: ElementCreateInput
|}

 export type SetPageTitleInput = {| 
  id: ID_Input,
  title: String
|}

 export type SetThemeInput = {| 
  themeName: String
|}

 export type SetWebNameInput = {| 
  id: ID_Input,
  name: String
|}

 export type SharedElementCreateOneWithoutSharedByInput = {| 
  create?: SharedElementCreateWithoutSharedByInput,
  connect?: SharedElementWhereUniqueInput
|}

 export type SharedElementCreateWithoutSharedByInput = {| 
  name: String,
  element: ElementCreateOneInput
|}

 export type SharedElementWhereInput = {| 
  AND?: Array< SharedElementWhereInput > | SharedElementWhereInput,
  OR?: Array< SharedElementWhereInput > | SharedElementWhereInput,
  NOT?: Array< SharedElementWhereInput > | SharedElementWhereInput,
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
  sharedBy_every?: ElementWhereInput,
  sharedBy_some?: ElementWhereInput,
  sharedBy_none?: ElementWhereInput,
  element?: ElementWhereInput
|}

 export type SharedElementWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type StyleCreateInput = {| 
  name: String,
  isText?: Boolean,
  display?: StyleDisplay,
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
  borderStyle?: StyleBorderStyle,
  opacity?: Int,
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
  web: WebCreateOneWithoutStylesInput,
  props?: ElementPropCreateManyWithoutValueStyleInput,
  spreadStyles?: StyleSpreadCreateManyWithoutSpreadStyleInput,
  width?: DimensionValueCreateOneInput,
  height?: DimensionValueCreateOneInput,
  bottom?: DimensionValueCreateOneInput,
  end?: DimensionValueCreateOneInput,
  left?: DimensionValueCreateOneInput,
  right?: DimensionValueCreateOneInput,
  start?: DimensionValueCreateOneInput,
  top?: DimensionValueCreateOneInput,
  minWidth?: DimensionValueCreateOneInput,
  maxWidth?: DimensionValueCreateOneInput,
  minHeight?: DimensionValueCreateOneInput,
  maxHeight?: DimensionValueCreateOneInput,
  margin?: DimensionValueCreateOneInput,
  marginBottom?: DimensionValueCreateOneInput,
  marginEnd?: DimensionValueCreateOneInput,
  marginHorizontal?: DimensionValueCreateOneInput,
  marginLeft?: DimensionValueCreateOneInput,
  marginRight?: DimensionValueCreateOneInput,
  marginStart?: DimensionValueCreateOneInput,
  marginTop?: DimensionValueCreateOneInput,
  marginVertical?: DimensionValueCreateOneInput,
  padding?: DimensionValueCreateOneInput,
  paddingBottom?: DimensionValueCreateOneInput,
  paddingEnd?: DimensionValueCreateOneInput,
  paddingHorizontal?: DimensionValueCreateOneInput,
  paddingLeft?: DimensionValueCreateOneInput,
  paddingRight?: DimensionValueCreateOneInput,
  paddingStart?: DimensionValueCreateOneInput,
  paddingTop?: DimensionValueCreateOneInput,
  paddingVertical?: DimensionValueCreateOneInput,
  backgroundColor?: ColorValueCreateOneInput,
  borderColor?: ColorValueCreateOneInput,
  borderBottomColor?: ColorValueCreateOneInput,
  borderEndColor?: ColorValueCreateOneInput,
  borderLeftColor?: ColorValueCreateOneInput,
  borderRightColor?: ColorValueCreateOneInput,
  borderStartColor?: ColorValueCreateOneInput,
  borderTopColor?: ColorValueCreateOneInput,
  borderRadius?: BorderValueCreateOneInput,
  borderBottomEndRadius?: BorderValueCreateOneInput,
  borderBottomLeftRadius?: BorderValueCreateOneInput,
  borderBottomRightRadius?: BorderValueCreateOneInput,
  borderBottomStartRadius?: BorderValueCreateOneInput,
  borderTopEndRadius?: BorderValueCreateOneInput,
  borderTopLeftRadius?: BorderValueCreateOneInput,
  borderTopRightRadius?: BorderValueCreateOneInput,
  borderTopStartRadius?: BorderValueCreateOneInput,
  borderWidth?: BorderValueCreateOneInput,
  borderBottomWidth?: BorderValueCreateOneInput,
  borderEndWidth?: BorderValueCreateOneInput,
  borderLeftWidth?: BorderValueCreateOneInput,
  borderRightWidth?: BorderValueCreateOneInput,
  borderStartWidth?: BorderValueCreateOneInput,
  borderTopWidth?: BorderValueCreateOneInput,
  color?: ColorValueCreateOneInput
|}

 export type StyleCreateManyWithoutWebInput = {| 
  create?: Array< StyleCreateWithoutWebInput > | StyleCreateWithoutWebInput,
  connect?: Array< StyleWhereUniqueInput > | StyleWhereUniqueInput
|}

 export type StyleCreateOneInput = {| 
  create?: StyleCreateInput,
  connect?: StyleWhereUniqueInput
|}

 export type StyleCreateOneWithoutPropsInput = {| 
  create?: StyleCreateWithoutPropsInput,
  connect?: StyleWhereUniqueInput
|}

 export type StyleCreateWithoutPropsInput = {| 
  name: String,
  isText?: Boolean,
  display?: StyleDisplay,
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
  borderStyle?: StyleBorderStyle,
  opacity?: Int,
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
  web: WebCreateOneWithoutStylesInput,
  spreadStyles?: StyleSpreadCreateManyWithoutSpreadStyleInput,
  width?: DimensionValueCreateOneInput,
  height?: DimensionValueCreateOneInput,
  bottom?: DimensionValueCreateOneInput,
  end?: DimensionValueCreateOneInput,
  left?: DimensionValueCreateOneInput,
  right?: DimensionValueCreateOneInput,
  start?: DimensionValueCreateOneInput,
  top?: DimensionValueCreateOneInput,
  minWidth?: DimensionValueCreateOneInput,
  maxWidth?: DimensionValueCreateOneInput,
  minHeight?: DimensionValueCreateOneInput,
  maxHeight?: DimensionValueCreateOneInput,
  margin?: DimensionValueCreateOneInput,
  marginBottom?: DimensionValueCreateOneInput,
  marginEnd?: DimensionValueCreateOneInput,
  marginHorizontal?: DimensionValueCreateOneInput,
  marginLeft?: DimensionValueCreateOneInput,
  marginRight?: DimensionValueCreateOneInput,
  marginStart?: DimensionValueCreateOneInput,
  marginTop?: DimensionValueCreateOneInput,
  marginVertical?: DimensionValueCreateOneInput,
  padding?: DimensionValueCreateOneInput,
  paddingBottom?: DimensionValueCreateOneInput,
  paddingEnd?: DimensionValueCreateOneInput,
  paddingHorizontal?: DimensionValueCreateOneInput,
  paddingLeft?: DimensionValueCreateOneInput,
  paddingRight?: DimensionValueCreateOneInput,
  paddingStart?: DimensionValueCreateOneInput,
  paddingTop?: DimensionValueCreateOneInput,
  paddingVertical?: DimensionValueCreateOneInput,
  backgroundColor?: ColorValueCreateOneInput,
  borderColor?: ColorValueCreateOneInput,
  borderBottomColor?: ColorValueCreateOneInput,
  borderEndColor?: ColorValueCreateOneInput,
  borderLeftColor?: ColorValueCreateOneInput,
  borderRightColor?: ColorValueCreateOneInput,
  borderStartColor?: ColorValueCreateOneInput,
  borderTopColor?: ColorValueCreateOneInput,
  borderRadius?: BorderValueCreateOneInput,
  borderBottomEndRadius?: BorderValueCreateOneInput,
  borderBottomLeftRadius?: BorderValueCreateOneInput,
  borderBottomRightRadius?: BorderValueCreateOneInput,
  borderBottomStartRadius?: BorderValueCreateOneInput,
  borderTopEndRadius?: BorderValueCreateOneInput,
  borderTopLeftRadius?: BorderValueCreateOneInput,
  borderTopRightRadius?: BorderValueCreateOneInput,
  borderTopStartRadius?: BorderValueCreateOneInput,
  borderWidth?: BorderValueCreateOneInput,
  borderBottomWidth?: BorderValueCreateOneInput,
  borderEndWidth?: BorderValueCreateOneInput,
  borderLeftWidth?: BorderValueCreateOneInput,
  borderRightWidth?: BorderValueCreateOneInput,
  borderStartWidth?: BorderValueCreateOneInput,
  borderTopWidth?: BorderValueCreateOneInput,
  color?: ColorValueCreateOneInput
|}

 export type StyleCreateWithoutWebInput = {| 
  name: String,
  isText?: Boolean,
  display?: StyleDisplay,
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
  borderStyle?: StyleBorderStyle,
  opacity?: Int,
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
  props?: ElementPropCreateManyWithoutValueStyleInput,
  spreadStyles?: StyleSpreadCreateManyWithoutSpreadStyleInput,
  width?: DimensionValueCreateOneInput,
  height?: DimensionValueCreateOneInput,
  bottom?: DimensionValueCreateOneInput,
  end?: DimensionValueCreateOneInput,
  left?: DimensionValueCreateOneInput,
  right?: DimensionValueCreateOneInput,
  start?: DimensionValueCreateOneInput,
  top?: DimensionValueCreateOneInput,
  minWidth?: DimensionValueCreateOneInput,
  maxWidth?: DimensionValueCreateOneInput,
  minHeight?: DimensionValueCreateOneInput,
  maxHeight?: DimensionValueCreateOneInput,
  margin?: DimensionValueCreateOneInput,
  marginBottom?: DimensionValueCreateOneInput,
  marginEnd?: DimensionValueCreateOneInput,
  marginHorizontal?: DimensionValueCreateOneInput,
  marginLeft?: DimensionValueCreateOneInput,
  marginRight?: DimensionValueCreateOneInput,
  marginStart?: DimensionValueCreateOneInput,
  marginTop?: DimensionValueCreateOneInput,
  marginVertical?: DimensionValueCreateOneInput,
  padding?: DimensionValueCreateOneInput,
  paddingBottom?: DimensionValueCreateOneInput,
  paddingEnd?: DimensionValueCreateOneInput,
  paddingHorizontal?: DimensionValueCreateOneInput,
  paddingLeft?: DimensionValueCreateOneInput,
  paddingRight?: DimensionValueCreateOneInput,
  paddingStart?: DimensionValueCreateOneInput,
  paddingTop?: DimensionValueCreateOneInput,
  paddingVertical?: DimensionValueCreateOneInput,
  backgroundColor?: ColorValueCreateOneInput,
  borderColor?: ColorValueCreateOneInput,
  borderBottomColor?: ColorValueCreateOneInput,
  borderEndColor?: ColorValueCreateOneInput,
  borderLeftColor?: ColorValueCreateOneInput,
  borderRightColor?: ColorValueCreateOneInput,
  borderStartColor?: ColorValueCreateOneInput,
  borderTopColor?: ColorValueCreateOneInput,
  borderRadius?: BorderValueCreateOneInput,
  borderBottomEndRadius?: BorderValueCreateOneInput,
  borderBottomLeftRadius?: BorderValueCreateOneInput,
  borderBottomRightRadius?: BorderValueCreateOneInput,
  borderBottomStartRadius?: BorderValueCreateOneInput,
  borderTopEndRadius?: BorderValueCreateOneInput,
  borderTopLeftRadius?: BorderValueCreateOneInput,
  borderTopRightRadius?: BorderValueCreateOneInput,
  borderTopStartRadius?: BorderValueCreateOneInput,
  borderWidth?: BorderValueCreateOneInput,
  borderBottomWidth?: BorderValueCreateOneInput,
  borderEndWidth?: BorderValueCreateOneInput,
  borderLeftWidth?: BorderValueCreateOneInput,
  borderRightWidth?: BorderValueCreateOneInput,
  borderStartWidth?: BorderValueCreateOneInput,
  borderTopWidth?: BorderValueCreateOneInput,
  color?: ColorValueCreateOneInput
|}

 export type StyleSpreadCreateManyWithoutSpreadStyleInput = {| 
  create?: Array< StyleSpreadCreateWithoutSpreadStyleInput > | StyleSpreadCreateWithoutSpreadStyleInput,
  connect?: Array< StyleSpreadWhereUniqueInput > | StyleSpreadWhereUniqueInput
|}

 export type StyleSpreadCreateWithoutSpreadStyleInput = {| 
  index: Int,
  style: StyleCreateOneInput
|}

 export type StyleSpreadWhereInput = {| 
  AND?: Array< StyleSpreadWhereInput > | StyleSpreadWhereInput,
  OR?: Array< StyleSpreadWhereInput > | StyleSpreadWhereInput,
  NOT?: Array< StyleSpreadWhereInput > | StyleSpreadWhereInput,
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
  index?: Int,
  index_not?: Int,
  index_in?: Array< Int > | Int,
  index_not_in?: Array< Int > | Int,
  index_lt?: Int,
  index_lte?: Int,
  index_gt?: Int,
  index_gte?: Int,
  spreadStyle?: StyleWhereInput,
  style?: StyleWhereInput
|}

 export type StyleSpreadWhereUniqueInput = {| 
  id?: ID_Input
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
  isText?: Boolean,
  isText_not?: Boolean,
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
  props_every?: ElementPropWhereInput,
  props_some?: ElementPropWhereInput,
  props_none?: ElementPropWhereInput,
  spreadStyles_every?: StyleSpreadWhereInput,
  spreadStyles_some?: StyleSpreadWhereInput,
  spreadStyles_none?: StyleSpreadWhereInput,
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

 export type StyleWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type UserCreateInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput,
  components?: ComponentCreateManyWithoutCreatorInput
|}

 export type UserCreateOneInput = {| 
  create?: UserCreateInput,
  connect?: UserWhereUniqueInput
|}

 export type UserCreateOneWithoutComponentsInput = {| 
  create?: UserCreateWithoutComponentsInput,
  connect?: UserWhereUniqueInput
|}

 export type UserCreateOneWithoutWebsInput = {| 
  create?: UserCreateWithoutWebsInput,
  connect?: UserWhereUniqueInput
|}

 export type UserCreateWithoutComponentsInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput
|}

 export type UserCreateWithoutWebsInput = {| 
  email: String,
  password: String,
  themeName?: String,
  components?: ComponentCreateManyWithoutCreatorInput
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
  components_every?: ComponentWhereInput,
  components_some?: ComponentWhereInput,
  components_none?: ComponentWhereInput
|}

 export type UserWhereUniqueInput = {| 
  id?: ID_Input,
  email?: String
|}

 export type WebCreateManyWithoutCreatorInput = {| 
  create?: Array< WebCreateWithoutCreatorInput > | WebCreateWithoutCreatorInput,
  connect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput
|}

 export type WebCreateOneWithoutBorderValuesInput = {| 
  create?: WebCreateWithoutBorderValuesInput,
  connect?: WebWhereUniqueInput
|}

 export type WebCreateOneWithoutColorValuesInput = {| 
  create?: WebCreateWithoutColorValuesInput,
  connect?: WebWhereUniqueInput
|}

 export type WebCreateOneWithoutDimensionValuesInput = {| 
  create?: WebCreateWithoutDimensionValuesInput,
  connect?: WebWhereUniqueInput
|}

 export type WebCreateOneWithoutElementsInput = {| 
  create?: WebCreateWithoutElementsInput,
  connect?: WebWhereUniqueInput
|}

 export type WebCreateOneWithoutStylesInput = {| 
  create?: WebCreateWithoutStylesInput,
  connect?: WebWhereUniqueInput
|}

 export type WebCreateWithoutBorderValuesInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  pages?: PageCreateManyWithoutWebInput,
  elements?: ElementCreateManyWithoutWebInput,
  styles?: StyleCreateManyWithoutWebInput,
  dimensionValues?: DimensionValueCreateManyWithoutWebInput,
  colorValues?: ColorValueCreateManyWithoutWebInput
|}

 export type WebCreateWithoutColorValuesInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  pages?: PageCreateManyWithoutWebInput,
  elements?: ElementCreateManyWithoutWebInput,
  styles?: StyleCreateManyWithoutWebInput,
  dimensionValues?: DimensionValueCreateManyWithoutWebInput,
  borderValues?: BorderValueCreateManyWithoutWebInput
|}

 export type WebCreateWithoutCreatorInput = {| 
  name: String,
  pages?: PageCreateManyWithoutWebInput,
  elements?: ElementCreateManyWithoutWebInput,
  styles?: StyleCreateManyWithoutWebInput,
  dimensionValues?: DimensionValueCreateManyWithoutWebInput,
  colorValues?: ColorValueCreateManyWithoutWebInput,
  borderValues?: BorderValueCreateManyWithoutWebInput
|}

 export type WebCreateWithoutDimensionValuesInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  pages?: PageCreateManyWithoutWebInput,
  elements?: ElementCreateManyWithoutWebInput,
  styles?: StyleCreateManyWithoutWebInput,
  colorValues?: ColorValueCreateManyWithoutWebInput,
  borderValues?: BorderValueCreateManyWithoutWebInput
|}

 export type WebCreateWithoutElementsInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  pages?: PageCreateManyWithoutWebInput,
  styles?: StyleCreateManyWithoutWebInput,
  dimensionValues?: DimensionValueCreateManyWithoutWebInput,
  colorValues?: ColorValueCreateManyWithoutWebInput,
  borderValues?: BorderValueCreateManyWithoutWebInput
|}

 export type WebCreateWithoutStylesInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  pages?: PageCreateManyWithoutWebInput,
  elements?: ElementCreateManyWithoutWebInput,
  dimensionValues?: DimensionValueCreateManyWithoutWebInput,
  colorValues?: ColorValueCreateManyWithoutWebInput,
  borderValues?: BorderValueCreateManyWithoutWebInput
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
  pages_none?: PageWhereInput,
  elements_every?: ElementWhereInput,
  elements_some?: ElementWhereInput,
  elements_none?: ElementWhereInput,
  styles_every?: StyleWhereInput,
  styles_some?: StyleWhereInput,
  styles_none?: StyleWhereInput,
  dimensionValues_every?: DimensionValueWhereInput,
  dimensionValues_some?: DimensionValueWhereInput,
  dimensionValues_none?: DimensionValueWhereInput,
  colorValues_every?: ColorValueWhereInput,
  colorValues_some?: ColorValueWhereInput,
  colorValues_none?: ColorValueWhereInput,
  borderValues_every?: BorderValueWhereInput,
  borderValues_some?: BorderValueWhereInput,
  borderValues_none?: BorderValueWhereInput
|}

 export type WebWhereUniqueInput = {| 
  id?: ID_Input
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

 export type AuthPayload = {| 
   errors?: AuthErrors,
   token?: String,
   user?: User,
|}

 export type BorderValue = {| ...Node,
 
   id: ID_Output,
   web: Web,
   name?: String,
   unit: BorderValueUnit,
   value: Int,
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

 export type Component = {| ...Node,
 
   id: ID_Output,
   name: String,
   creator: User,
   props?: ComponentProp[],
|}

 export type ComponentProp = {| ...Node,
 
   id: ID_Output,
   component: Component,
   name: String,
   type: PropType,
|}

 export type CreateWebErrors = {| 
   name?: Max140CharsError,
   pageTitle?: Max140CharsError,
|}

 export type CreateWebPayload = {| 
   errors?: CreateWebErrors,
   pageId?: ID_Output,
|}

 export type DeletePagePayload = {| 
   page?: Page,
|}

 export type DeleteWebPayload = {| 
   web?: Web,
|}

 export type DimensionValue = {| ...Node,
 
   id: ID_Output,
   web: Web,
   name?: String,
   unit: DimensionValueUnit,
   value: Int,
|}

 export type Element = {| ...Node,
 
   id: ID_Output,
   type: ElementType,
   index: Int,
   web: Web,
   parent?: Element,
   textLeaves?: Json,
   children?: Element[],
   shared?: SharedElement,
   component: Component,
   props?: ElementProp[],
|}

 export type ElementProp = {| ...Node,
 
   id: ID_Output,
   element: Element,
   name: String,
   type: PropType,
   valueStyle?: Style,
   value?: String,
|}

 export type Page = {| ...Node,
 
   id: ID_Output,
   creator: User,
   web: Web,
   element: Element,
   createdAt: DateTime,
   updatedAt: DateTime,
   title: String,
|}

 export type SetPageElementPayload = {| 
   page?: Page,
|}

 export type SetPageTitleErrors = {| 
   title?: Max140CharsError,
|}

 export type SetPageTitlePayload = {| 
   errors?: SetPageTitleErrors,
   page?: Page,
|}

 export type SetThemePayload = {| 
   user?: User,
|}

 export type SetWebNameErrors = {| 
   name?: Max140CharsError,
|}

 export type SetWebNamePayload = {| 
   errors?: SetWebNameErrors,
   web?: Web,
|}

 export type SharedElement = {| ...Node,
 
   id: ID_Output,
   sharedBy?: Element[],
   name: String,
   element: Element,
|}

 export type Style = {| ...Node,
 
   id: ID_Output,
   web: Web,
   props?: ElementProp[],
   name: String,
   isText?: Boolean,
   spreadStyles?: StyleSpread[],
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

 export type StyleSpread = {| ...Node,
 
   id: ID_Output,
   spreadStyle: Style,
   index: Int,
   style: Style,
|}

 export type User = {| ...Node,
 
   id: ID_Output,
   webs?: Web[],
   createdAt: DateTime,
   updatedAt: DateTime,
   email: String,
   password: String,
   themeName?: String,
   components?: Component[],
|}

 export type Web = {| ...Node,
 
   id: ID_Output,
   creator: User,
   pages?: Page[],
   elements?: Element[],
   styles?: Style[],
   dimensionValues?: DimensionValue[],
   colorValues?: ColorValue[],
   borderValues?: BorderValue[],
   createdAt: DateTime,
   updatedAt: DateTime,
   name: String,
|}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
 export type Boolean = boolean 

 export type DateTime = Date | string 

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
 export type Float = number 

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
 export type ID_Input = string
export type ID_Output = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
 export type Int = number 

/*
Raw JSON value
*/
 export type Json = string 

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
 export type String = string 