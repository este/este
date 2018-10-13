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
    components(args: { where?: ComponentWhereInput, orderBy?: ComponentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Component[]>; 
    styles(args: { where?: StyleWhereInput, orderBy?: StyleOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Style[]>; 
    styleShadowOffsets(args: { where?: StyleShadowOffsetWhereInput, orderBy?: StyleShadowOffsetOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<StyleShadowOffset[]>; 
    documents(args: { where?: DocumentWhereInput, orderBy?: DocumentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Document[]>; 
    borderValues(args: { where?: BorderValueWhereInput, orderBy?: BorderValueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BorderValue[]>; 
    dimensionValues(args: { where?: DimensionValueWhereInput, orderBy?: DimensionValueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DimensionValue[]>; 
    colorValues(args: { where?: ColorValueWhereInput, orderBy?: ColorValueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ColorValue[]>; 
    user(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    web(args: { where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    page(args: { where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    element(args: { where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    component(args: { where: ComponentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Component | null>; 
    style(args: { where: StyleWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Style | null>; 
    document(args: { where: DocumentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Document | null>; 
    dimensionValue(args: { where: DimensionValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DimensionValue | null>; 
    colorValue(args: { where: ColorValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ColorValue | null>; 
    usersConnection(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<UserConnection>; 
    websConnection(args: { where?: WebWhereInput, orderBy?: WebOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<WebConnection>; 
    pagesConnection(args: { where?: PageWhereInput, orderBy?: PageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<PageConnection>; 
    elementsConnection(args: { where?: ElementWhereInput, orderBy?: ElementOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ElementConnection>; 
    componentsConnection(args: { where?: ComponentWhereInput, orderBy?: ComponentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ComponentConnection>; 
    stylesConnection(args: { where?: StyleWhereInput, orderBy?: StyleOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<StyleConnection>; 
    styleShadowOffsetsConnection(args: { where?: StyleShadowOffsetWhereInput, orderBy?: StyleShadowOffsetOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<StyleShadowOffsetConnection>; 
    documentsConnection(args: { where?: DocumentWhereInput, orderBy?: DocumentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DocumentConnection>; 
    borderValuesConnection(args: { where?: BorderValueWhereInput, orderBy?: BorderValueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BorderValueConnection>; 
    dimensionValuesConnection(args: { where?: DimensionValueWhereInput, orderBy?: DimensionValueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DimensionValueConnection>; 
    colorValuesConnection(args: { where?: ColorValueWhereInput, orderBy?: ColorValueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ColorValueConnection>; 
    node(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Node | null>; 
  }

export interface Mutation {
    createUser(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User>; 
    createWeb(args: { data: WebCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web>; 
    createPage(args: { data: PageCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page>; 
    createElement(args: { data: ElementCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element>; 
    createComponent(args: { data: ComponentCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Component>; 
    createStyle(args: { data: StyleCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Style>; 
    createStyleShadowOffset(args: { data: StyleShadowOffsetCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<StyleShadowOffset>; 
    createDocument(args: { data: DocumentCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Document>; 
    createBorderValue(args: { data: BorderValueCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BorderValue>; 
    createDimensionValue(args: { data: DimensionValueCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DimensionValue>; 
    createColorValue(args: { data: ColorValueCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ColorValue>; 
    updateUser(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    updateWeb(args: { data: WebUpdateInput, where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    updatePage(args: { data: PageUpdateInput, where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    updateElement(args: { data: ElementUpdateInput, where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    updateComponent(args: { data: ComponentUpdateInput, where: ComponentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Component | null>; 
    updateStyle(args: { data: StyleUpdateInput, where: StyleWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Style | null>; 
    updateDocument(args: { data: DocumentUpdateInput, where: DocumentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Document | null>; 
    updateDimensionValue(args: { data: DimensionValueUpdateInput, where: DimensionValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DimensionValue | null>; 
    updateColorValue(args: { data: ColorValueUpdateInput, where: ColorValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ColorValue | null>; 
    deleteUser(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    deleteWeb(args: { where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    deletePage(args: { where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    deleteElement(args: { where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    deleteComponent(args: { where: ComponentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Component | null>; 
    deleteStyle(args: { where: StyleWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Style | null>; 
    deleteDocument(args: { where: DocumentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Document | null>; 
    deleteDimensionValue(args: { where: DimensionValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DimensionValue | null>; 
    deleteColorValue(args: { where: ColorValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ColorValue | null>; 
    upsertUser(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User>; 
    upsertWeb(args: { where: WebWhereUniqueInput, create: WebCreateInput, update: WebUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web>; 
    upsertPage(args: { where: PageWhereUniqueInput, create: PageCreateInput, update: PageUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page>; 
    upsertElement(args: { where: ElementWhereUniqueInput, create: ElementCreateInput, update: ElementUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element>; 
    upsertComponent(args: { where: ComponentWhereUniqueInput, create: ComponentCreateInput, update: ComponentUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Component>; 
    upsertStyle(args: { where: StyleWhereUniqueInput, create: StyleCreateInput, update: StyleUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Style>; 
    upsertDocument(args: { where: DocumentWhereUniqueInput, create: DocumentCreateInput, update: DocumentUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Document>; 
    upsertDimensionValue(args: { where: DimensionValueWhereUniqueInput, create: DimensionValueCreateInput, update: DimensionValueUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DimensionValue>; 
    upsertColorValue(args: { where: ColorValueWhereUniqueInput, create: ColorValueCreateInput, update: ColorValueUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ColorValue>; 
    updateManyUsers(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyWebs(args: { data: WebUpdateInput, where?: WebWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyPages(args: { data: PageUpdateInput, where?: PageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyElements(args: { data: ElementUpdateInput, where?: ElementWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyComponents(args: { data: ComponentUpdateInput, where?: ComponentWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyStyles(args: { data: StyleUpdateInput, where?: StyleWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyStyleShadowOffsets(args: { data: StyleShadowOffsetUpdateInput, where?: StyleShadowOffsetWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyDocuments(args: { data: DocumentUpdateInput, where?: DocumentWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyBorderValues(args: { data: BorderValueUpdateInput, where?: BorderValueWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyDimensionValues(args: { data: DimensionValueUpdateInput, where?: DimensionValueWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyColorValues(args: { data: ColorValueUpdateInput, where?: ColorValueWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyUsers(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyWebs(args: { where?: WebWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyPages(args: { where?: PageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyElements(args: { where?: ElementWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyComponents(args: { where?: ComponentWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyStyles(args: { where?: StyleWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyStyleShadowOffsets(args: { where?: StyleShadowOffsetWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyDocuments(args: { where?: DocumentWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyBorderValues(args: { where?: BorderValueWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyDimensionValues(args: { where?: DimensionValueWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyColorValues(args: { where?: ColorValueWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    executeRaw(args: { database?: PrismaDatabase, query: String }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Json>; 
  }

export interface Subscription {
    user(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<UserSubscriptionPayload | null>>; 
    web(args: { where?: WebSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<WebSubscriptionPayload | null>>; 
    page(args: { where?: PageSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<PageSubscriptionPayload | null>>; 
    element(args: { where?: ElementSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ElementSubscriptionPayload | null>>; 
    component(args: { where?: ComponentSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ComponentSubscriptionPayload | null>>; 
    style(args: { where?: StyleSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<StyleSubscriptionPayload | null>>; 
    styleShadowOffset(args: { where?: StyleShadowOffsetSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<StyleShadowOffsetSubscriptionPayload | null>>; 
    document(args: { where?: DocumentSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<DocumentSubscriptionPayload | null>>; 
    borderValue(args: { where?: BorderValueSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<BorderValueSubscriptionPayload | null>>; 
    dimensionValue(args: { where?: DimensionValueSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<DimensionValueSubscriptionPayload | null>>; 
    colorValue(args: { where?: ColorValueSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ColorValueSubscriptionPayload | null>>; 
  }

export interface Exists {
User(where?: UserWhereInput): Promise<boolean>;
Web(where?: WebWhereInput): Promise<boolean>;
Page(where?: PageWhereInput): Promise<boolean>;
Element(where?: ElementWhereInput): Promise<boolean>;
Component(where?: ComponentWhereInput): Promise<boolean>;
Style(where?: StyleWhereInput): Promise<boolean>;
StyleShadowOffset(where?: StyleShadowOffsetWhereInput): Promise<boolean>;
Document(where?: DocumentWhereInput): Promise<boolean>;
BorderValue(where?: BorderValueWhereInput): Promise<boolean>;
DimensionValue(where?: DimensionValueWhereInput): Promise<boolean>;
ColorValue(where?: ColorValueWhereInput): Promise<boolean>;
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

const typeDefs = `type AggregateBorderValue {
  count: Int!
}

type AggregateColorValue {
  count: Int!
}

type AggregateComponent {
  count: Int!
}

type AggregateDimensionValue {
  count: Int!
}

type AggregateDocument {
  count: Int!
}

type AggregateElement {
  count: Int!
}

type AggregatePage {
  count: Int!
}

type AggregateStyle {
  count: Int!
}

type AggregateStyleShadowOffset {
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

type BorderValue {
  unit: BorderValueUnit!
  value: Int!
}

"""A connection to a list of items."""
type BorderValueConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [BorderValueEdge]!
  aggregate: AggregateBorderValue!
}

input BorderValueCreateInput {
  unit: BorderValueUnit!
  value: Int!
}

input BorderValueCreateOneInput {
  create: BorderValueCreateInput
}

"""An edge in a connection."""
type BorderValueEdge {
  """The item at the end of the edge."""
  node: BorderValue!

  """A cursor for use in pagination."""
  cursor: String!
}

enum BorderValueOrderByInput {
  unit_ASC
  unit_DESC
  value_ASC
  value_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type BorderValuePreviousValues {
  unit: BorderValueUnit!
  value: Int!
}

type BorderValueSubscriptionPayload {
  mutation: MutationType!
  node: BorderValue
  updatedFields: [String!]
  previousValues: BorderValuePreviousValues
}

input BorderValueSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [BorderValueSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [BorderValueSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [BorderValueSubscriptionWhereInput!]

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
  node: BorderValueWhereInput
}

enum BorderValueUnit {
  POINT
}

input BorderValueUpdateDataInput {
  unit: BorderValueUnit
  value: Int
}

input BorderValueUpdateInput {
  unit: BorderValueUnit
  value: Int
}

input BorderValueUpdateOneInput {
  create: BorderValueCreateInput
  disconnect: Boolean
  delete: Boolean
  update: BorderValueUpdateDataInput
  upsert: BorderValueUpsertNestedInput
}

input BorderValueUpsertNestedInput {
  update: BorderValueUpdateDataInput!
  create: BorderValueCreateInput!
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
  web: Web!
  name: String
  r: Int!
  g: Int!
  b: Int!
  a: Float
}

"""A connection to a list of items."""
type ColorValueConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ColorValueEdge]!
  aggregate: AggregateColorValue!
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

"""An edge in a connection."""
type ColorValueEdge {
  """The item at the end of the edge."""
  node: ColorValue!

  """A cursor for use in pagination."""
  cursor: String!
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

type ColorValuePreviousValues {
  id: ID!
  name: String
  r: Int!
  g: Int!
  b: Int!
  a: Float
}

type ColorValueSubscriptionPayload {
  mutation: MutationType!
  node: ColorValue
  updatedFields: [String!]
  previousValues: ColorValuePreviousValues
}

input ColorValueSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ColorValueSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ColorValueSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ColorValueSubscriptionWhereInput!]

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
  node: ColorValueWhereInput
}

input ColorValueUpdateDataInput {
  name: String
  r: Int
  g: Int
  b: Int
  a: Float
  web: WebUpdateOneRequiredWithoutColorValuesInput
}

input ColorValueUpdateInput {
  name: String
  r: Int
  g: Int
  b: Int
  a: Float
  web: WebUpdateOneRequiredWithoutColorValuesInput
}

input ColorValueUpdateManyWithoutWebInput {
  create: [ColorValueCreateWithoutWebInput!]
  connect: [ColorValueWhereUniqueInput!]
  disconnect: [ColorValueWhereUniqueInput!]
  delete: [ColorValueWhereUniqueInput!]
  update: [ColorValueUpdateWithWhereUniqueWithoutWebInput!]
  upsert: [ColorValueUpsertWithWhereUniqueWithoutWebInput!]
}

input ColorValueUpdateOneInput {
  create: ColorValueCreateInput
  connect: ColorValueWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ColorValueUpdateDataInput
  upsert: ColorValueUpsertNestedInput
}

input ColorValueUpdateWithoutWebDataInput {
  name: String
  r: Int
  g: Int
  b: Int
  a: Float
}

input ColorValueUpdateWithWhereUniqueWithoutWebInput {
  where: ColorValueWhereUniqueInput!
  data: ColorValueUpdateWithoutWebDataInput!
}

input ColorValueUpsertNestedInput {
  update: ColorValueUpdateDataInput!
  create: ColorValueCreateInput!
}

input ColorValueUpsertWithWhereUniqueWithoutWebInput {
  where: ColorValueWhereUniqueInput!
  update: ColorValueUpdateWithoutWebDataInput!
  create: ColorValueCreateWithoutWebInput!
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
  web: Web!
  name: String!
  document: Document
}

"""A connection to a list of items."""
type ComponentConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ComponentEdge]!
  aggregate: AggregateComponent!
}

input ComponentCreateInput {
  name: String!
  web: WebCreateOneWithoutComponentsInput!
  document: DocumentCreateOneInput
}

input ComponentCreateManyWithoutWebInput {
  create: [ComponentCreateWithoutWebInput!]
  connect: [ComponentWhereUniqueInput!]
}

input ComponentCreateOneInput {
  create: ComponentCreateInput
  connect: ComponentWhereUniqueInput
}

input ComponentCreateWithoutWebInput {
  name: String!
  document: DocumentCreateOneInput
}

"""An edge in a connection."""
type ComponentEdge {
  """The item at the end of the edge."""
  node: Component!

  """A cursor for use in pagination."""
  cursor: String!
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

type ComponentPreviousValues {
  id: ID!
  name: String!
}

type ComponentSubscriptionPayload {
  mutation: MutationType!
  node: Component
  updatedFields: [String!]
  previousValues: ComponentPreviousValues
}

input ComponentSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ComponentSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ComponentSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ComponentSubscriptionWhereInput!]

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
  node: ComponentWhereInput
}

input ComponentUpdateDataInput {
  name: String
  web: WebUpdateOneRequiredWithoutComponentsInput
  document: DocumentUpdateOneInput
}

input ComponentUpdateInput {
  name: String
  web: WebUpdateOneRequiredWithoutComponentsInput
  document: DocumentUpdateOneInput
}

input ComponentUpdateManyWithoutWebInput {
  create: [ComponentCreateWithoutWebInput!]
  connect: [ComponentWhereUniqueInput!]
  disconnect: [ComponentWhereUniqueInput!]
  delete: [ComponentWhereUniqueInput!]
  update: [ComponentUpdateWithWhereUniqueWithoutWebInput!]
  upsert: [ComponentUpsertWithWhereUniqueWithoutWebInput!]
}

input ComponentUpdateOneInput {
  create: ComponentCreateInput
  connect: ComponentWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ComponentUpdateDataInput
  upsert: ComponentUpsertNestedInput
}

input ComponentUpdateWithoutWebDataInput {
  name: String
  document: DocumentUpdateOneInput
}

input ComponentUpdateWithWhereUniqueWithoutWebInput {
  where: ComponentWhereUniqueInput!
  data: ComponentUpdateWithoutWebDataInput!
}

input ComponentUpsertNestedInput {
  update: ComponentUpdateDataInput!
  create: ComponentCreateInput!
}

input ComponentUpsertWithWhereUniqueWithoutWebInput {
  where: ComponentWhereUniqueInput!
  update: ComponentUpdateWithoutWebDataInput!
  create: ComponentCreateWithoutWebInput!
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
}

input ComponentWhereUniqueInput {
  id: ID
}

scalar DateTime

type DimensionValue implements Node {
  id: ID!
  web: Web!
  name: String
  unit: DimensionValueUnit!
  value: Int!
}

"""A connection to a list of items."""
type DimensionValueConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [DimensionValueEdge]!
  aggregate: AggregateDimensionValue!
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

"""An edge in a connection."""
type DimensionValueEdge {
  """The item at the end of the edge."""
  node: DimensionValue!

  """A cursor for use in pagination."""
  cursor: String!
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

type DimensionValuePreviousValues {
  id: ID!
  name: String
  unit: DimensionValueUnit!
  value: Int!
}

type DimensionValueSubscriptionPayload {
  mutation: MutationType!
  node: DimensionValue
  updatedFields: [String!]
  previousValues: DimensionValuePreviousValues
}

input DimensionValueSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [DimensionValueSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [DimensionValueSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DimensionValueSubscriptionWhereInput!]

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
  node: DimensionValueWhereInput
}

enum DimensionValueUnit {
  POINT
  PERCENTAGE
}

input DimensionValueUpdateDataInput {
  name: String
  unit: DimensionValueUnit
  value: Int
  web: WebUpdateOneRequiredWithoutDimensionValuesInput
}

input DimensionValueUpdateInput {
  name: String
  unit: DimensionValueUnit
  value: Int
  web: WebUpdateOneRequiredWithoutDimensionValuesInput
}

input DimensionValueUpdateManyWithoutWebInput {
  create: [DimensionValueCreateWithoutWebInput!]
  connect: [DimensionValueWhereUniqueInput!]
  disconnect: [DimensionValueWhereUniqueInput!]
  delete: [DimensionValueWhereUniqueInput!]
  update: [DimensionValueUpdateWithWhereUniqueWithoutWebInput!]
  upsert: [DimensionValueUpsertWithWhereUniqueWithoutWebInput!]
}

input DimensionValueUpdateOneInput {
  create: DimensionValueCreateInput
  connect: DimensionValueWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: DimensionValueUpdateDataInput
  upsert: DimensionValueUpsertNestedInput
}

input DimensionValueUpdateWithoutWebDataInput {
  name: String
  unit: DimensionValueUnit
  value: Int
}

input DimensionValueUpdateWithWhereUniqueWithoutWebInput {
  where: DimensionValueWhereUniqueInput!
  data: DimensionValueUpdateWithoutWebDataInput!
}

input DimensionValueUpsertNestedInput {
  update: DimensionValueUpdateDataInput!
  create: DimensionValueCreateInput!
}

input DimensionValueUpsertWithWhereUniqueWithoutWebInput {
  where: DimensionValueWhereUniqueInput!
  update: DimensionValueUpdateWithoutWebDataInput!
  create: DimensionValueCreateWithoutWebInput!
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

type Document implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  web: Web!
  elements(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Element!]
}

"""A connection to a list of items."""
type DocumentConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [DocumentEdge]!
  aggregate: AggregateDocument!
}

input DocumentCreateInput {
  web: WebCreateOneWithoutDocumentsInput!
  elements: ElementCreateManyWithoutDocumentInput
}

input DocumentCreateManyWithoutWebInput {
  create: [DocumentCreateWithoutWebInput!]
  connect: [DocumentWhereUniqueInput!]
}

input DocumentCreateOneInput {
  create: DocumentCreateInput
  connect: DocumentWhereUniqueInput
}

input DocumentCreateOneWithoutElementsInput {
  create: DocumentCreateWithoutElementsInput
  connect: DocumentWhereUniqueInput
}

input DocumentCreateWithoutElementsInput {
  web: WebCreateOneWithoutDocumentsInput!
}

input DocumentCreateWithoutWebInput {
  elements: ElementCreateManyWithoutDocumentInput
}

"""An edge in a connection."""
type DocumentEdge {
  """The item at the end of the edge."""
  node: Document!

  """A cursor for use in pagination."""
  cursor: String!
}

enum DocumentOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type DocumentPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type DocumentSubscriptionPayload {
  mutation: MutationType!
  node: Document
  updatedFields: [String!]
  previousValues: DocumentPreviousValues
}

input DocumentSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [DocumentSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [DocumentSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DocumentSubscriptionWhereInput!]

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
  node: DocumentWhereInput
}

input DocumentUpdateDataInput {
  web: WebUpdateOneRequiredWithoutDocumentsInput
  elements: ElementUpdateManyWithoutDocumentInput
}

input DocumentUpdateInput {
  web: WebUpdateOneRequiredWithoutDocumentsInput
  elements: ElementUpdateManyWithoutDocumentInput
}

input DocumentUpdateManyWithoutWebInput {
  create: [DocumentCreateWithoutWebInput!]
  connect: [DocumentWhereUniqueInput!]
  disconnect: [DocumentWhereUniqueInput!]
  delete: [DocumentWhereUniqueInput!]
  update: [DocumentUpdateWithWhereUniqueWithoutWebInput!]
  upsert: [DocumentUpsertWithWhereUniqueWithoutWebInput!]
}

input DocumentUpdateOneInput {
  create: DocumentCreateInput
  connect: DocumentWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: DocumentUpdateDataInput
  upsert: DocumentUpsertNestedInput
}

input DocumentUpdateOneRequiredWithoutElementsInput {
  create: DocumentCreateWithoutElementsInput
  connect: DocumentWhereUniqueInput
  update: DocumentUpdateWithoutElementsDataInput
  upsert: DocumentUpsertWithoutElementsInput
}

input DocumentUpdateWithoutElementsDataInput {
  web: WebUpdateOneRequiredWithoutDocumentsInput
}

input DocumentUpdateWithoutWebDataInput {
  elements: ElementUpdateManyWithoutDocumentInput
}

input DocumentUpdateWithWhereUniqueWithoutWebInput {
  where: DocumentWhereUniqueInput!
  data: DocumentUpdateWithoutWebDataInput!
}

input DocumentUpsertNestedInput {
  update: DocumentUpdateDataInput!
  create: DocumentCreateInput!
}

input DocumentUpsertWithoutElementsInput {
  update: DocumentUpdateWithoutElementsDataInput!
  create: DocumentCreateWithoutElementsInput!
}

input DocumentUpsertWithWhereUniqueWithoutWebInput {
  where: DocumentWhereUniqueInput!
  update: DocumentUpdateWithoutWebDataInput!
  create: DocumentCreateWithoutWebInput!
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
  web: WebWhereInput
  elements_every: ElementWhereInput
  elements_some: ElementWhereInput
  elements_none: ElementWhereInput
}

input DocumentWhereUniqueInput {
  id: ID
}

type Element implements Node {
  id: ID!
  type: ElementType!
  document: Document!
  path: [Int!]!
  component: Component
  style: Style
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
  type: ElementType!
  path: ElementCreatepathInput
  document: DocumentCreateOneWithoutElementsInput!
  component: ComponentCreateOneInput
  style: StyleCreateOneInput
}

input ElementCreateManyWithoutDocumentInput {
  create: [ElementCreateWithoutDocumentInput!]
  connect: [ElementWhereUniqueInput!]
}

input ElementCreatepathInput {
  set: [Int!]
}

input ElementCreateWithoutDocumentInput {
  type: ElementType!
  path: ElementCreatepathInput
  component: ComponentCreateOneInput
  style: StyleCreateOneInput
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
  document: DocumentUpdateOneRequiredWithoutElementsInput
  component: ComponentUpdateOneInput
  style: StyleUpdateOneInput
}

input ElementUpdateManyWithoutDocumentInput {
  create: [ElementCreateWithoutDocumentInput!]
  connect: [ElementWhereUniqueInput!]
  disconnect: [ElementWhereUniqueInput!]
  delete: [ElementWhereUniqueInput!]
  update: [ElementUpdateWithWhereUniqueWithoutDocumentInput!]
  upsert: [ElementUpsertWithWhereUniqueWithoutDocumentInput!]
}

input ElementUpdatepathInput {
  set: [Int!]
}

input ElementUpdateWithoutDocumentDataInput {
  type: ElementType
  path: ElementUpdatepathInput
  component: ComponentUpdateOneInput
  style: StyleUpdateOneInput
}

input ElementUpdateWithWhereUniqueWithoutDocumentInput {
  where: ElementWhereUniqueInput!
  data: ElementUpdateWithoutDocumentDataInput!
}

input ElementUpsertWithWhereUniqueWithoutDocumentInput {
  where: ElementWhereUniqueInput!
  update: ElementUpdateWithoutDocumentDataInput!
  create: ElementCreateWithoutDocumentInput!
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
  createComponent(data: ComponentCreateInput!): Component!
  createStyle(data: StyleCreateInput!): Style!
  createStyleShadowOffset(data: StyleShadowOffsetCreateInput!): StyleShadowOffset!
  createDocument(data: DocumentCreateInput!): Document!
  createBorderValue(data: BorderValueCreateInput!): BorderValue!
  createDimensionValue(data: DimensionValueCreateInput!): DimensionValue!
  createColorValue(data: ColorValueCreateInput!): ColorValue!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateWeb(data: WebUpdateInput!, where: WebWhereUniqueInput!): Web
  updatePage(data: PageUpdateInput!, where: PageWhereUniqueInput!): Page
  updateElement(data: ElementUpdateInput!, where: ElementWhereUniqueInput!): Element
  updateComponent(data: ComponentUpdateInput!, where: ComponentWhereUniqueInput!): Component
  updateStyle(data: StyleUpdateInput!, where: StyleWhereUniqueInput!): Style
  updateDocument(data: DocumentUpdateInput!, where: DocumentWhereUniqueInput!): Document
  updateDimensionValue(data: DimensionValueUpdateInput!, where: DimensionValueWhereUniqueInput!): DimensionValue
  updateColorValue(data: ColorValueUpdateInput!, where: ColorValueWhereUniqueInput!): ColorValue
  deleteUser(where: UserWhereUniqueInput!): User
  deleteWeb(where: WebWhereUniqueInput!): Web
  deletePage(where: PageWhereUniqueInput!): Page
  deleteElement(where: ElementWhereUniqueInput!): Element
  deleteComponent(where: ComponentWhereUniqueInput!): Component
  deleteStyle(where: StyleWhereUniqueInput!): Style
  deleteDocument(where: DocumentWhereUniqueInput!): Document
  deleteDimensionValue(where: DimensionValueWhereUniqueInput!): DimensionValue
  deleteColorValue(where: ColorValueWhereUniqueInput!): ColorValue
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertWeb(where: WebWhereUniqueInput!, create: WebCreateInput!, update: WebUpdateInput!): Web!
  upsertPage(where: PageWhereUniqueInput!, create: PageCreateInput!, update: PageUpdateInput!): Page!
  upsertElement(where: ElementWhereUniqueInput!, create: ElementCreateInput!, update: ElementUpdateInput!): Element!
  upsertComponent(where: ComponentWhereUniqueInput!, create: ComponentCreateInput!, update: ComponentUpdateInput!): Component!
  upsertStyle(where: StyleWhereUniqueInput!, create: StyleCreateInput!, update: StyleUpdateInput!): Style!
  upsertDocument(where: DocumentWhereUniqueInput!, create: DocumentCreateInput!, update: DocumentUpdateInput!): Document!
  upsertDimensionValue(where: DimensionValueWhereUniqueInput!, create: DimensionValueCreateInput!, update: DimensionValueUpdateInput!): DimensionValue!
  upsertColorValue(where: ColorValueWhereUniqueInput!, create: ColorValueCreateInput!, update: ColorValueUpdateInput!): ColorValue!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyWebs(data: WebUpdateInput!, where: WebWhereInput): BatchPayload!
  updateManyPages(data: PageUpdateInput!, where: PageWhereInput): BatchPayload!
  updateManyElements(data: ElementUpdateInput!, where: ElementWhereInput): BatchPayload!
  updateManyComponents(data: ComponentUpdateInput!, where: ComponentWhereInput): BatchPayload!
  updateManyStyles(data: StyleUpdateInput!, where: StyleWhereInput): BatchPayload!
  updateManyStyleShadowOffsets(data: StyleShadowOffsetUpdateInput!, where: StyleShadowOffsetWhereInput): BatchPayload!
  updateManyDocuments(data: DocumentUpdateInput!, where: DocumentWhereInput): BatchPayload!
  updateManyBorderValues(data: BorderValueUpdateInput!, where: BorderValueWhereInput): BatchPayload!
  updateManyDimensionValues(data: DimensionValueUpdateInput!, where: DimensionValueWhereInput): BatchPayload!
  updateManyColorValues(data: ColorValueUpdateInput!, where: ColorValueWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyWebs(where: WebWhereInput): BatchPayload!
  deleteManyPages(where: PageWhereInput): BatchPayload!
  deleteManyElements(where: ElementWhereInput): BatchPayload!
  deleteManyComponents(where: ComponentWhereInput): BatchPayload!
  deleteManyStyles(where: StyleWhereInput): BatchPayload!
  deleteManyStyleShadowOffsets(where: StyleShadowOffsetWhereInput): BatchPayload!
  deleteManyDocuments(where: DocumentWhereInput): BatchPayload!
  deleteManyBorderValues(where: BorderValueWhereInput): BatchPayload!
  deleteManyDimensionValues(where: DimensionValueWhereInput): BatchPayload!
  deleteManyColorValues(where: ColorValueWhereInput): BatchPayload!
  executeRaw(database: PrismaDatabase, query: String!): Json!
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
  creator: User!
  web: Web!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  content: Json
  document: Document
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
  document: DocumentCreateOneInput
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
  content: Json
  web: WebCreateOneWithoutPagesInput!
  document: DocumentCreateOneInput
}

input PageCreateWithoutWebInput {
  title: String!
  content: Json
  creator: UserCreateOneWithoutPagesInput!
  document: DocumentCreateOneInput
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
  creator: UserUpdateOneRequiredWithoutPagesInput
  web: WebUpdateOneRequiredWithoutPagesInput
  document: DocumentUpdateOneInput
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
  content: Json
  web: WebUpdateOneRequiredWithoutPagesInput
  document: DocumentUpdateOneInput
}

input PageUpdateWithoutWebDataInput {
  title: String
  content: Json
  creator: UserUpdateOneRequiredWithoutPagesInput
  document: DocumentUpdateOneInput
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
  document: DocumentWhereInput
}

input PageWhereUniqueInput {
  id: ID
}

enum PrismaDatabase {
  default
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  webs(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Web]!
  pages(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Page]!
  elements(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Element]!
  components(where: ComponentWhereInput, orderBy: ComponentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Component]!
  styles(where: StyleWhereInput, orderBy: StyleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Style]!
  styleShadowOffsets(where: StyleShadowOffsetWhereInput, orderBy: StyleShadowOffsetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StyleShadowOffset]!
  documents(where: DocumentWhereInput, orderBy: DocumentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Document]!
  borderValues(where: BorderValueWhereInput, orderBy: BorderValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [BorderValue]!
  dimensionValues(where: DimensionValueWhereInput, orderBy: DimensionValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DimensionValue]!
  colorValues(where: ColorValueWhereInput, orderBy: ColorValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ColorValue]!
  user(where: UserWhereUniqueInput!): User
  web(where: WebWhereUniqueInput!): Web
  page(where: PageWhereUniqueInput!): Page
  element(where: ElementWhereUniqueInput!): Element
  component(where: ComponentWhereUniqueInput!): Component
  style(where: StyleWhereUniqueInput!): Style
  document(where: DocumentWhereUniqueInput!): Document
  dimensionValue(where: DimensionValueWhereUniqueInput!): DimensionValue
  colorValue(where: ColorValueWhereUniqueInput!): ColorValue
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  websConnection(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WebConnection!
  pagesConnection(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PageConnection!
  elementsConnection(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ElementConnection!
  componentsConnection(where: ComponentWhereInput, orderBy: ComponentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ComponentConnection!
  stylesConnection(where: StyleWhereInput, orderBy: StyleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StyleConnection!
  styleShadowOffsetsConnection(where: StyleShadowOffsetWhereInput, orderBy: StyleShadowOffsetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StyleShadowOffsetConnection!
  documentsConnection(where: DocumentWhereInput, orderBy: DocumentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DocumentConnection!
  borderValuesConnection(where: BorderValueWhereInput, orderBy: BorderValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BorderValueConnection!
  dimensionValuesConnection(where: DimensionValueWhereInput, orderBy: DimensionValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DimensionValueConnection!
  colorValuesConnection(where: ColorValueWhereInput, orderBy: ColorValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ColorValueConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Style implements Node {
  id: ID!
  web: Web!
  type: StyleType!
  name: String!
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
  shadowColor: ColorValue
  shadowOffset: StyleShadowOffset
  shadowOpacity: Int
  shadowRadius: Int
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

"""A connection to a list of items."""
type StyleConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [StyleEdge]!
  aggregate: AggregateStyle!
}

input StyleCreateInput {
  type: StyleType!
  name: String!
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
  shadowOpacity: Int
  shadowRadius: Int
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
  shadowColor: ColorValueCreateOneInput
  shadowOffset: StyleShadowOffsetCreateOneInput
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

input StyleCreateWithoutWebInput {
  type: StyleType!
  name: String!
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
  shadowOpacity: Int
  shadowRadius: Int
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
  shadowColor: ColorValueCreateOneInput
  shadowOffset: StyleShadowOffsetCreateOneInput
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

"""An edge in a connection."""
type StyleEdge {
  """The item at the end of the edge."""
  node: Style!

  """A cursor for use in pagination."""
  cursor: String!
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

type StylePreviousValues {
  id: ID!
  type: StyleType!
  name: String!
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
  shadowOpacity: Int
  shadowRadius: Int
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
}

type StyleShadowOffset {
  width: Int!
  height: Int!
}

"""A connection to a list of items."""
type StyleShadowOffsetConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [StyleShadowOffsetEdge]!
  aggregate: AggregateStyleShadowOffset!
}

input StyleShadowOffsetCreateInput {
  width: Int!
  height: Int!
}

input StyleShadowOffsetCreateOneInput {
  create: StyleShadowOffsetCreateInput
}

"""An edge in a connection."""
type StyleShadowOffsetEdge {
  """The item at the end of the edge."""
  node: StyleShadowOffset!

  """A cursor for use in pagination."""
  cursor: String!
}

enum StyleShadowOffsetOrderByInput {
  width_ASC
  width_DESC
  height_ASC
  height_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type StyleShadowOffsetPreviousValues {
  width: Int!
  height: Int!
}

type StyleShadowOffsetSubscriptionPayload {
  mutation: MutationType!
  node: StyleShadowOffset
  updatedFields: [String!]
  previousValues: StyleShadowOffsetPreviousValues
}

input StyleShadowOffsetSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [StyleShadowOffsetSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [StyleShadowOffsetSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StyleShadowOffsetSubscriptionWhereInput!]

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
  node: StyleShadowOffsetWhereInput
}

input StyleShadowOffsetUpdateDataInput {
  width: Int
  height: Int
}

input StyleShadowOffsetUpdateInput {
  width: Int
  height: Int
}

input StyleShadowOffsetUpdateOneInput {
  create: StyleShadowOffsetCreateInput
  disconnect: Boolean
  delete: Boolean
  update: StyleShadowOffsetUpdateDataInput
  upsert: StyleShadowOffsetUpsertNestedInput
}

input StyleShadowOffsetUpsertNestedInput {
  update: StyleShadowOffsetUpdateDataInput!
  create: StyleShadowOffsetCreateInput!
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

type StyleSubscriptionPayload {
  mutation: MutationType!
  node: Style
  updatedFields: [String!]
  previousValues: StylePreviousValues
}

input StyleSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [StyleSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [StyleSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StyleSubscriptionWhereInput!]

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
  node: StyleWhereInput
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

input StyleUpdateDataInput {
  type: StyleType
  name: String
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
  shadowOpacity: Int
  shadowRadius: Int
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
  web: WebUpdateOneRequiredWithoutStylesInput
  width: DimensionValueUpdateOneInput
  height: DimensionValueUpdateOneInput
  bottom: DimensionValueUpdateOneInput
  end: DimensionValueUpdateOneInput
  left: DimensionValueUpdateOneInput
  right: DimensionValueUpdateOneInput
  start: DimensionValueUpdateOneInput
  top: DimensionValueUpdateOneInput
  minWidth: DimensionValueUpdateOneInput
  maxWidth: DimensionValueUpdateOneInput
  minHeight: DimensionValueUpdateOneInput
  maxHeight: DimensionValueUpdateOneInput
  margin: DimensionValueUpdateOneInput
  marginBottom: DimensionValueUpdateOneInput
  marginEnd: DimensionValueUpdateOneInput
  marginHorizontal: DimensionValueUpdateOneInput
  marginLeft: DimensionValueUpdateOneInput
  marginRight: DimensionValueUpdateOneInput
  marginStart: DimensionValueUpdateOneInput
  marginTop: DimensionValueUpdateOneInput
  marginVertical: DimensionValueUpdateOneInput
  padding: DimensionValueUpdateOneInput
  paddingBottom: DimensionValueUpdateOneInput
  paddingEnd: DimensionValueUpdateOneInput
  paddingHorizontal: DimensionValueUpdateOneInput
  paddingLeft: DimensionValueUpdateOneInput
  paddingRight: DimensionValueUpdateOneInput
  paddingStart: DimensionValueUpdateOneInput
  paddingTop: DimensionValueUpdateOneInput
  paddingVertical: DimensionValueUpdateOneInput
  shadowColor: ColorValueUpdateOneInput
  shadowOffset: StyleShadowOffsetUpdateOneInput
  backgroundColor: ColorValueUpdateOneInput
  borderColor: ColorValueUpdateOneInput
  borderBottomColor: ColorValueUpdateOneInput
  borderEndColor: ColorValueUpdateOneInput
  borderLeftColor: ColorValueUpdateOneInput
  borderRightColor: ColorValueUpdateOneInput
  borderStartColor: ColorValueUpdateOneInput
  borderTopColor: ColorValueUpdateOneInput
  borderRadius: BorderValueUpdateOneInput
  borderBottomEndRadius: BorderValueUpdateOneInput
  borderBottomLeftRadius: BorderValueUpdateOneInput
  borderBottomRightRadius: BorderValueUpdateOneInput
  borderBottomStartRadius: BorderValueUpdateOneInput
  borderTopEndRadius: BorderValueUpdateOneInput
  borderTopLeftRadius: BorderValueUpdateOneInput
  borderTopRightRadius: BorderValueUpdateOneInput
  borderTopStartRadius: BorderValueUpdateOneInput
  borderWidth: BorderValueUpdateOneInput
  borderBottomWidth: BorderValueUpdateOneInput
  borderEndWidth: BorderValueUpdateOneInput
  borderLeftWidth: BorderValueUpdateOneInput
  borderRightWidth: BorderValueUpdateOneInput
  borderStartWidth: BorderValueUpdateOneInput
  borderTopWidth: BorderValueUpdateOneInput
  color: ColorValueUpdateOneInput
}

input StyleUpdateInput {
  type: StyleType
  name: String
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
  shadowOpacity: Int
  shadowRadius: Int
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
  web: WebUpdateOneRequiredWithoutStylesInput
  width: DimensionValueUpdateOneInput
  height: DimensionValueUpdateOneInput
  bottom: DimensionValueUpdateOneInput
  end: DimensionValueUpdateOneInput
  left: DimensionValueUpdateOneInput
  right: DimensionValueUpdateOneInput
  start: DimensionValueUpdateOneInput
  top: DimensionValueUpdateOneInput
  minWidth: DimensionValueUpdateOneInput
  maxWidth: DimensionValueUpdateOneInput
  minHeight: DimensionValueUpdateOneInput
  maxHeight: DimensionValueUpdateOneInput
  margin: DimensionValueUpdateOneInput
  marginBottom: DimensionValueUpdateOneInput
  marginEnd: DimensionValueUpdateOneInput
  marginHorizontal: DimensionValueUpdateOneInput
  marginLeft: DimensionValueUpdateOneInput
  marginRight: DimensionValueUpdateOneInput
  marginStart: DimensionValueUpdateOneInput
  marginTop: DimensionValueUpdateOneInput
  marginVertical: DimensionValueUpdateOneInput
  padding: DimensionValueUpdateOneInput
  paddingBottom: DimensionValueUpdateOneInput
  paddingEnd: DimensionValueUpdateOneInput
  paddingHorizontal: DimensionValueUpdateOneInput
  paddingLeft: DimensionValueUpdateOneInput
  paddingRight: DimensionValueUpdateOneInput
  paddingStart: DimensionValueUpdateOneInput
  paddingTop: DimensionValueUpdateOneInput
  paddingVertical: DimensionValueUpdateOneInput
  shadowColor: ColorValueUpdateOneInput
  shadowOffset: StyleShadowOffsetUpdateOneInput
  backgroundColor: ColorValueUpdateOneInput
  borderColor: ColorValueUpdateOneInput
  borderBottomColor: ColorValueUpdateOneInput
  borderEndColor: ColorValueUpdateOneInput
  borderLeftColor: ColorValueUpdateOneInput
  borderRightColor: ColorValueUpdateOneInput
  borderStartColor: ColorValueUpdateOneInput
  borderTopColor: ColorValueUpdateOneInput
  borderRadius: BorderValueUpdateOneInput
  borderBottomEndRadius: BorderValueUpdateOneInput
  borderBottomLeftRadius: BorderValueUpdateOneInput
  borderBottomRightRadius: BorderValueUpdateOneInput
  borderBottomStartRadius: BorderValueUpdateOneInput
  borderTopEndRadius: BorderValueUpdateOneInput
  borderTopLeftRadius: BorderValueUpdateOneInput
  borderTopRightRadius: BorderValueUpdateOneInput
  borderTopStartRadius: BorderValueUpdateOneInput
  borderWidth: BorderValueUpdateOneInput
  borderBottomWidth: BorderValueUpdateOneInput
  borderEndWidth: BorderValueUpdateOneInput
  borderLeftWidth: BorderValueUpdateOneInput
  borderRightWidth: BorderValueUpdateOneInput
  borderStartWidth: BorderValueUpdateOneInput
  borderTopWidth: BorderValueUpdateOneInput
  color: ColorValueUpdateOneInput
}

input StyleUpdateManyWithoutWebInput {
  create: [StyleCreateWithoutWebInput!]
  connect: [StyleWhereUniqueInput!]
  disconnect: [StyleWhereUniqueInput!]
  delete: [StyleWhereUniqueInput!]
  update: [StyleUpdateWithWhereUniqueWithoutWebInput!]
  upsert: [StyleUpsertWithWhereUniqueWithoutWebInput!]
}

input StyleUpdateOneInput {
  create: StyleCreateInput
  connect: StyleWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: StyleUpdateDataInput
  upsert: StyleUpsertNestedInput
}

input StyleUpdateWithoutWebDataInput {
  type: StyleType
  name: String
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
  shadowOpacity: Int
  shadowRadius: Int
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
  width: DimensionValueUpdateOneInput
  height: DimensionValueUpdateOneInput
  bottom: DimensionValueUpdateOneInput
  end: DimensionValueUpdateOneInput
  left: DimensionValueUpdateOneInput
  right: DimensionValueUpdateOneInput
  start: DimensionValueUpdateOneInput
  top: DimensionValueUpdateOneInput
  minWidth: DimensionValueUpdateOneInput
  maxWidth: DimensionValueUpdateOneInput
  minHeight: DimensionValueUpdateOneInput
  maxHeight: DimensionValueUpdateOneInput
  margin: DimensionValueUpdateOneInput
  marginBottom: DimensionValueUpdateOneInput
  marginEnd: DimensionValueUpdateOneInput
  marginHorizontal: DimensionValueUpdateOneInput
  marginLeft: DimensionValueUpdateOneInput
  marginRight: DimensionValueUpdateOneInput
  marginStart: DimensionValueUpdateOneInput
  marginTop: DimensionValueUpdateOneInput
  marginVertical: DimensionValueUpdateOneInput
  padding: DimensionValueUpdateOneInput
  paddingBottom: DimensionValueUpdateOneInput
  paddingEnd: DimensionValueUpdateOneInput
  paddingHorizontal: DimensionValueUpdateOneInput
  paddingLeft: DimensionValueUpdateOneInput
  paddingRight: DimensionValueUpdateOneInput
  paddingStart: DimensionValueUpdateOneInput
  paddingTop: DimensionValueUpdateOneInput
  paddingVertical: DimensionValueUpdateOneInput
  shadowColor: ColorValueUpdateOneInput
  shadowOffset: StyleShadowOffsetUpdateOneInput
  backgroundColor: ColorValueUpdateOneInput
  borderColor: ColorValueUpdateOneInput
  borderBottomColor: ColorValueUpdateOneInput
  borderEndColor: ColorValueUpdateOneInput
  borderLeftColor: ColorValueUpdateOneInput
  borderRightColor: ColorValueUpdateOneInput
  borderStartColor: ColorValueUpdateOneInput
  borderTopColor: ColorValueUpdateOneInput
  borderRadius: BorderValueUpdateOneInput
  borderBottomEndRadius: BorderValueUpdateOneInput
  borderBottomLeftRadius: BorderValueUpdateOneInput
  borderBottomRightRadius: BorderValueUpdateOneInput
  borderBottomStartRadius: BorderValueUpdateOneInput
  borderTopEndRadius: BorderValueUpdateOneInput
  borderTopLeftRadius: BorderValueUpdateOneInput
  borderTopRightRadius: BorderValueUpdateOneInput
  borderTopStartRadius: BorderValueUpdateOneInput
  borderWidth: BorderValueUpdateOneInput
  borderBottomWidth: BorderValueUpdateOneInput
  borderEndWidth: BorderValueUpdateOneInput
  borderLeftWidth: BorderValueUpdateOneInput
  borderRightWidth: BorderValueUpdateOneInput
  borderStartWidth: BorderValueUpdateOneInput
  borderTopWidth: BorderValueUpdateOneInput
  color: ColorValueUpdateOneInput
}

input StyleUpdateWithWhereUniqueWithoutWebInput {
  where: StyleWhereUniqueInput!
  data: StyleUpdateWithoutWebDataInput!
}

input StyleUpsertNestedInput {
  update: StyleUpdateDataInput!
  create: StyleCreateInput!
}

input StyleUpsertWithWhereUniqueWithoutWebInput {
  where: StyleWhereUniqueInput!
  update: StyleUpdateWithoutWebDataInput!
  create: StyleCreateWithoutWebInput!
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

input StyleWhereUniqueInput {
  id: ID
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  web(where: WebSubscriptionWhereInput): WebSubscriptionPayload
  page(where: PageSubscriptionWhereInput): PageSubscriptionPayload
  element(where: ElementSubscriptionWhereInput): ElementSubscriptionPayload
  component(where: ComponentSubscriptionWhereInput): ComponentSubscriptionPayload
  style(where: StyleSubscriptionWhereInput): StyleSubscriptionPayload
  styleShadowOffset(where: StyleShadowOffsetSubscriptionWhereInput): StyleShadowOffsetSubscriptionPayload
  document(where: DocumentSubscriptionWhereInput): DocumentSubscriptionPayload
  borderValue(where: BorderValueSubscriptionWhereInput): BorderValueSubscriptionPayload
  dimensionValue(where: DimensionValueSubscriptionWhereInput): DimensionValueSubscriptionPayload
  colorValue(where: ColorValueSubscriptionWhereInput): ColorValueSubscriptionPayload
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

input UserUpdateOneRequiredWithoutPagesInput {
  create: UserCreateWithoutPagesInput
  connect: UserWhereUniqueInput
  update: UserUpdateWithoutPagesDataInput
  upsert: UserUpsertWithoutPagesInput
}

input UserUpdateOneRequiredWithoutWebsInput {
  create: UserCreateWithoutWebsInput
  connect: UserWhereUniqueInput
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
  creator: User!
  pages(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Page!]
  documents(where: DocumentWhereInput, orderBy: DocumentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Document!]
  components(where: ComponentWhereInput, orderBy: ComponentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Component!]
  styles(where: StyleWhereInput, orderBy: StyleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Style!]
  dimensionValues(where: DimensionValueWhereInput, orderBy: DimensionValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DimensionValue!]
  colorValues(where: ColorValueWhereInput, orderBy: ColorValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ColorValue!]
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
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
  documents: DocumentCreateManyWithoutWebInput
  components: ComponentCreateManyWithoutWebInput
  styles: StyleCreateManyWithoutWebInput
  dimensionValues: DimensionValueCreateManyWithoutWebInput
  colorValues: ColorValueCreateManyWithoutWebInput
}

input WebCreateManyWithoutCreatorInput {
  create: [WebCreateWithoutCreatorInput!]
  connect: [WebWhereUniqueInput!]
}

input WebCreateOneWithoutColorValuesInput {
  create: WebCreateWithoutColorValuesInput
  connect: WebWhereUniqueInput
}

input WebCreateOneWithoutComponentsInput {
  create: WebCreateWithoutComponentsInput
  connect: WebWhereUniqueInput
}

input WebCreateOneWithoutDimensionValuesInput {
  create: WebCreateWithoutDimensionValuesInput
  connect: WebWhereUniqueInput
}

input WebCreateOneWithoutDocumentsInput {
  create: WebCreateWithoutDocumentsInput
  connect: WebWhereUniqueInput
}

input WebCreateOneWithoutPagesInput {
  create: WebCreateWithoutPagesInput
  connect: WebWhereUniqueInput
}

input WebCreateOneWithoutStylesInput {
  create: WebCreateWithoutStylesInput
  connect: WebWhereUniqueInput
}

input WebCreateWithoutColorValuesInput {
  name: String!
  creator: UserCreateOneWithoutWebsInput!
  pages: PageCreateManyWithoutWebInput
  documents: DocumentCreateManyWithoutWebInput
  components: ComponentCreateManyWithoutWebInput
  styles: StyleCreateManyWithoutWebInput
  dimensionValues: DimensionValueCreateManyWithoutWebInput
}

input WebCreateWithoutComponentsInput {
  name: String!
  creator: UserCreateOneWithoutWebsInput!
  pages: PageCreateManyWithoutWebInput
  documents: DocumentCreateManyWithoutWebInput
  styles: StyleCreateManyWithoutWebInput
  dimensionValues: DimensionValueCreateManyWithoutWebInput
  colorValues: ColorValueCreateManyWithoutWebInput
}

input WebCreateWithoutCreatorInput {
  name: String!
  pages: PageCreateManyWithoutWebInput
  documents: DocumentCreateManyWithoutWebInput
  components: ComponentCreateManyWithoutWebInput
  styles: StyleCreateManyWithoutWebInput
  dimensionValues: DimensionValueCreateManyWithoutWebInput
  colorValues: ColorValueCreateManyWithoutWebInput
}

input WebCreateWithoutDimensionValuesInput {
  name: String!
  creator: UserCreateOneWithoutWebsInput!
  pages: PageCreateManyWithoutWebInput
  documents: DocumentCreateManyWithoutWebInput
  components: ComponentCreateManyWithoutWebInput
  styles: StyleCreateManyWithoutWebInput
  colorValues: ColorValueCreateManyWithoutWebInput
}

input WebCreateWithoutDocumentsInput {
  name: String!
  creator: UserCreateOneWithoutWebsInput!
  pages: PageCreateManyWithoutWebInput
  components: ComponentCreateManyWithoutWebInput
  styles: StyleCreateManyWithoutWebInput
  dimensionValues: DimensionValueCreateManyWithoutWebInput
  colorValues: ColorValueCreateManyWithoutWebInput
}

input WebCreateWithoutPagesInput {
  name: String!
  creator: UserCreateOneWithoutWebsInput!
  documents: DocumentCreateManyWithoutWebInput
  components: ComponentCreateManyWithoutWebInput
  styles: StyleCreateManyWithoutWebInput
  dimensionValues: DimensionValueCreateManyWithoutWebInput
  colorValues: ColorValueCreateManyWithoutWebInput
}

input WebCreateWithoutStylesInput {
  name: String!
  creator: UserCreateOneWithoutWebsInput!
  pages: PageCreateManyWithoutWebInput
  documents: DocumentCreateManyWithoutWebInput
  components: ComponentCreateManyWithoutWebInput
  dimensionValues: DimensionValueCreateManyWithoutWebInput
  colorValues: ColorValueCreateManyWithoutWebInput
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
  creator: UserUpdateOneRequiredWithoutWebsInput
  pages: PageUpdateManyWithoutWebInput
  documents: DocumentUpdateManyWithoutWebInput
  components: ComponentUpdateManyWithoutWebInput
  styles: StyleUpdateManyWithoutWebInput
  dimensionValues: DimensionValueUpdateManyWithoutWebInput
  colorValues: ColorValueUpdateManyWithoutWebInput
}

input WebUpdateManyWithoutCreatorInput {
  create: [WebCreateWithoutCreatorInput!]
  connect: [WebWhereUniqueInput!]
  disconnect: [WebWhereUniqueInput!]
  delete: [WebWhereUniqueInput!]
  update: [WebUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [WebUpsertWithWhereUniqueWithoutCreatorInput!]
}

input WebUpdateOneRequiredWithoutColorValuesInput {
  create: WebCreateWithoutColorValuesInput
  connect: WebWhereUniqueInput
  update: WebUpdateWithoutColorValuesDataInput
  upsert: WebUpsertWithoutColorValuesInput
}

input WebUpdateOneRequiredWithoutComponentsInput {
  create: WebCreateWithoutComponentsInput
  connect: WebWhereUniqueInput
  update: WebUpdateWithoutComponentsDataInput
  upsert: WebUpsertWithoutComponentsInput
}

input WebUpdateOneRequiredWithoutDimensionValuesInput {
  create: WebCreateWithoutDimensionValuesInput
  connect: WebWhereUniqueInput
  update: WebUpdateWithoutDimensionValuesDataInput
  upsert: WebUpsertWithoutDimensionValuesInput
}

input WebUpdateOneRequiredWithoutDocumentsInput {
  create: WebCreateWithoutDocumentsInput
  connect: WebWhereUniqueInput
  update: WebUpdateWithoutDocumentsDataInput
  upsert: WebUpsertWithoutDocumentsInput
}

input WebUpdateOneRequiredWithoutPagesInput {
  create: WebCreateWithoutPagesInput
  connect: WebWhereUniqueInput
  update: WebUpdateWithoutPagesDataInput
  upsert: WebUpsertWithoutPagesInput
}

input WebUpdateOneRequiredWithoutStylesInput {
  create: WebCreateWithoutStylesInput
  connect: WebWhereUniqueInput
  update: WebUpdateWithoutStylesDataInput
  upsert: WebUpsertWithoutStylesInput
}

input WebUpdateWithoutColorValuesDataInput {
  name: String
  creator: UserUpdateOneRequiredWithoutWebsInput
  pages: PageUpdateManyWithoutWebInput
  documents: DocumentUpdateManyWithoutWebInput
  components: ComponentUpdateManyWithoutWebInput
  styles: StyleUpdateManyWithoutWebInput
  dimensionValues: DimensionValueUpdateManyWithoutWebInput
}

input WebUpdateWithoutComponentsDataInput {
  name: String
  creator: UserUpdateOneRequiredWithoutWebsInput
  pages: PageUpdateManyWithoutWebInput
  documents: DocumentUpdateManyWithoutWebInput
  styles: StyleUpdateManyWithoutWebInput
  dimensionValues: DimensionValueUpdateManyWithoutWebInput
  colorValues: ColorValueUpdateManyWithoutWebInput
}

input WebUpdateWithoutCreatorDataInput {
  name: String
  pages: PageUpdateManyWithoutWebInput
  documents: DocumentUpdateManyWithoutWebInput
  components: ComponentUpdateManyWithoutWebInput
  styles: StyleUpdateManyWithoutWebInput
  dimensionValues: DimensionValueUpdateManyWithoutWebInput
  colorValues: ColorValueUpdateManyWithoutWebInput
}

input WebUpdateWithoutDimensionValuesDataInput {
  name: String
  creator: UserUpdateOneRequiredWithoutWebsInput
  pages: PageUpdateManyWithoutWebInput
  documents: DocumentUpdateManyWithoutWebInput
  components: ComponentUpdateManyWithoutWebInput
  styles: StyleUpdateManyWithoutWebInput
  colorValues: ColorValueUpdateManyWithoutWebInput
}

input WebUpdateWithoutDocumentsDataInput {
  name: String
  creator: UserUpdateOneRequiredWithoutWebsInput
  pages: PageUpdateManyWithoutWebInput
  components: ComponentUpdateManyWithoutWebInput
  styles: StyleUpdateManyWithoutWebInput
  dimensionValues: DimensionValueUpdateManyWithoutWebInput
  colorValues: ColorValueUpdateManyWithoutWebInput
}

input WebUpdateWithoutPagesDataInput {
  name: String
  creator: UserUpdateOneRequiredWithoutWebsInput
  documents: DocumentUpdateManyWithoutWebInput
  components: ComponentUpdateManyWithoutWebInput
  styles: StyleUpdateManyWithoutWebInput
  dimensionValues: DimensionValueUpdateManyWithoutWebInput
  colorValues: ColorValueUpdateManyWithoutWebInput
}

input WebUpdateWithoutStylesDataInput {
  name: String
  creator: UserUpdateOneRequiredWithoutWebsInput
  pages: PageUpdateManyWithoutWebInput
  documents: DocumentUpdateManyWithoutWebInput
  components: ComponentUpdateManyWithoutWebInput
  dimensionValues: DimensionValueUpdateManyWithoutWebInput
  colorValues: ColorValueUpdateManyWithoutWebInput
}

input WebUpdateWithWhereUniqueWithoutCreatorInput {
  where: WebWhereUniqueInput!
  data: WebUpdateWithoutCreatorDataInput!
}

input WebUpsertWithoutColorValuesInput {
  update: WebUpdateWithoutColorValuesDataInput!
  create: WebCreateWithoutColorValuesInput!
}

input WebUpsertWithoutComponentsInput {
  update: WebUpdateWithoutComponentsDataInput!
  create: WebCreateWithoutComponentsInput!
}

input WebUpsertWithoutDimensionValuesInput {
  update: WebUpdateWithoutDimensionValuesDataInput!
  create: WebCreateWithoutDimensionValuesInput!
}

input WebUpsertWithoutDocumentsInput {
  update: WebUpdateWithoutDocumentsDataInput!
  create: WebCreateWithoutDocumentsInput!
}

input WebUpsertWithoutPagesInput {
  update: WebUpdateWithoutPagesDataInput!
  create: WebCreateWithoutPagesInput!
}

input WebUpsertWithoutStylesInput {
  update: WebUpdateWithoutStylesDataInput!
  create: WebCreateWithoutStylesInput!
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
  documents_every: DocumentWhereInput
  documents_some: DocumentWhereInput
  documents_none: DocumentWhereInput
  components_every: ComponentWhereInput
  components_some: ComponentWhereInput
  components_none: ComponentWhereInput
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

input WebWhereUniqueInput {
  id: ID
}
`

const prisma: BindingConstructor<Prisma> = makePrismaBindingClass({typeDefs})
 


/**
 * Types
*/

 export type StyleAlignContent =
    | 'FLEX_START'
    | 'FLEX_END'
    | 'CENTER'
    | 'STRETCH'
    | 'SPACE_BETWEEN'
    | 'SPACE_AROUND'
  

 export type BorderValueUnit =
    | 'POINT'
  

 export type StyleOverflow =
    | 'VISIBLE'
    | 'HIDDEN'
    | 'SCROLL'
  

 export type PrismaDatabase =
    | 'default'
  

 export type DocumentOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
  

 export type StyleShadowOffsetOrderByInput =
    | 'width_ASC'
    | 'width_DESC'
    | 'height_ASC'
    | 'height_DESC'
    | 'id_ASC'
    | 'id_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

 export type StyleDirection =
    | 'INHERIT'
    | 'LTR'
    | 'RTL'
  

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
  

 export type StyleBorderStyle =
    | 'SOLID'
    | 'DOTTED'
    | 'DASHED'
  

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
  

 export type StyleFontStyle =
    | 'NORMAL'
    | 'ITALIC'
  

 export type StyleType =
    | 'VIEW'
    | 'TEXT'
  

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
  

 export type StylePosition =
    | 'ABSOLUTE'
    | 'RELATIVE'
  

 export type StyleFontVariant =
    | 'SMALL_CAPS'
  

 export type StyleFlexWrap =
    | 'WRAP'
    | 'NOWRAP'
    | 'WRAP_REVERSE'
  

 export type StyleTextAlign =
    | 'AUTO'
    | 'LEFT'
    | 'RIGHT'
    | 'CENTER'
    | 'JUSTIFY'
  

 export type StyleAlignItems =
    | 'FLEX_START'
    | 'FLEX_END'
    | 'CENTER'
    | 'STRETCH'
    | 'BASELINE'
  

 export type StyleTextAlignVertical =
    | 'AUTO'
    | 'TOP'
    | 'BOTTOM'
    | 'CENTER'
  

 export type MutationType =
    | 'CREATED'
    | 'UPDATED'
    | 'DELETED'
  

 export type StyleTextDecorationLine =
    | 'NONE'
    | 'UNDERLINE'
    | 'LINE_THROUGH'
    | 'UNDERLINE_LINE_THROUGH'
  

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
  

 export type StyleTextTransform =
    | 'NONE'
    | 'CAPITALIZE'
    | 'UPPERCASE'
    | 'LOWERCASE'
  

 export type ComponentOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

 export type ElementOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'type_ASC'
    | 'type_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

 export type StyleFlexDirection =
    | 'ROW'
    | 'ROW_REVERSE'
    | 'COLUMN'
    | 'COLUMN_REVERSE'
  

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
  

 export type DimensionValueUnit =
    | 'POINT'
    | 'PERCENTAGE'
  

 export type StyleJustifyContent =
    | 'FLEX_START'
    | 'FLEX_END'
    | 'CENTER'
    | 'SPACE_BETWEEN'
    | 'SPACE_AROUND'
    | 'SPACE_EVENLY'
  

 export type StyleDisplay =
    | 'NONE'
    | 'FLEX'
  

 export type ElementType =
    | 'DOCUMENT'
    | 'BLOCK'
    | 'TEXT'
  

 export type BorderValueOrderByInput =
    | 'unit_ASC'
    | 'unit_DESC'
    | 'value_ASC'
    | 'value_DESC'
    | 'id_ASC'
    | 'id_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

 export type StyleAlignSelf =
    | 'AUTO'
    | 'FLEX_START'
    | 'FLEX_END'
    | 'CENTER'
    | 'STRETCH'
    | 'BASELINE'
  

 export type DimensionValueCreateWithoutWebInput = {| 
  name?: String,
  unit: DimensionValueUnit,
  value: Int
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

 export type PageUpdateManyWithoutWebInput = {| 
  create?: Array< PageCreateWithoutWebInput > | PageCreateWithoutWebInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  disconnect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  delete?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  update?: Array< PageUpdateWithWhereUniqueWithoutWebInput > | PageUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< PageUpsertWithWhereUniqueWithoutWebInput > | PageUpsertWithWhereUniqueWithoutWebInput
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

 export type ComponentCreateInput = {| 
  name: String,
  web: WebCreateOneWithoutComponentsInput,
  document?: DocumentCreateOneInput
|}

 export type WebUpsertWithoutColorValuesInput = {| 
  update: WebUpdateWithoutColorValuesDataInput,
  create: WebCreateWithoutColorValuesInput
|}

 export type WebCreateOneWithoutComponentsInput = {| 
  create?: WebCreateWithoutComponentsInput,
  connect?: WebWhereUniqueInput
|}

 export type PageUpdateWithWhereUniqueWithoutWebInput = {| 
  where: PageWhereUniqueInput,
  data: PageUpdateWithoutWebDataInput
|}

 export type WebCreateWithoutComponentsInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  pages?: PageCreateManyWithoutWebInput,
  documents?: DocumentCreateManyWithoutWebInput,
  styles?: StyleCreateManyWithoutWebInput,
  dimensionValues?: DimensionValueCreateManyWithoutWebInput,
  colorValues?: ColorValueCreateManyWithoutWebInput
|}

 export type DimensionValueSubscriptionWhereInput = {| 
  AND?: Array< DimensionValueSubscriptionWhereInput > | DimensionValueSubscriptionWhereInput,
  OR?: Array< DimensionValueSubscriptionWhereInput > | DimensionValueSubscriptionWhereInput,
  NOT?: Array< DimensionValueSubscriptionWhereInput > | DimensionValueSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: DimensionValueWhereInput
|}

 export type StyleCreateManyWithoutWebInput = {| 
  create?: Array< StyleCreateWithoutWebInput > | StyleCreateWithoutWebInput,
  connect?: Array< StyleWhereUniqueInput > | StyleWhereUniqueInput
|}

 export type BorderValueSubscriptionWhereInput = {| 
  AND?: Array< BorderValueSubscriptionWhereInput > | BorderValueSubscriptionWhereInput,
  OR?: Array< BorderValueSubscriptionWhereInput > | BorderValueSubscriptionWhereInput,
  NOT?: Array< BorderValueSubscriptionWhereInput > | BorderValueSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: BorderValueWhereInput
|}

 export type StyleCreateWithoutWebInput = {| 
  type: StyleType,
  name: String,
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
  shadowOpacity?: Int,
  shadowRadius?: Int,
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
  shadowColor?: ColorValueCreateOneInput,
  shadowOffset?: StyleShadowOffsetCreateOneInput,
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

 export type StyleShadowOffsetSubscriptionWhereInput = {| 
  AND?: Array< StyleShadowOffsetSubscriptionWhereInput > | StyleShadowOffsetSubscriptionWhereInput,
  OR?: Array< StyleShadowOffsetSubscriptionWhereInput > | StyleShadowOffsetSubscriptionWhereInput,
  NOT?: Array< StyleShadowOffsetSubscriptionWhereInput > | StyleShadowOffsetSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: StyleShadowOffsetWhereInput
|}

 export type DimensionValueCreateOneInput = {| 
  create?: DimensionValueCreateInput,
  connect?: DimensionValueWhereUniqueInput
|}

 export type StyleSubscriptionWhereInput = {| 
  AND?: Array< StyleSubscriptionWhereInput > | StyleSubscriptionWhereInput,
  OR?: Array< StyleSubscriptionWhereInput > | StyleSubscriptionWhereInput,
  NOT?: Array< StyleSubscriptionWhereInput > | StyleSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: StyleWhereInput
|}

 export type DimensionValueCreateInput = {| 
  name?: String,
  unit: DimensionValueUnit,
  value: Int,
  web: WebCreateOneWithoutDimensionValuesInput
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

 export type WebCreateOneWithoutDimensionValuesInput = {| 
  create?: WebCreateWithoutDimensionValuesInput,
  connect?: WebWhereUniqueInput
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

 export type WebCreateWithoutDimensionValuesInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  pages?: PageCreateManyWithoutWebInput,
  documents?: DocumentCreateManyWithoutWebInput,
  components?: ComponentCreateManyWithoutWebInput,
  styles?: StyleCreateManyWithoutWebInput,
  colorValues?: ColorValueCreateManyWithoutWebInput
|}

 export type BorderValueUpdateInput = {| 
  unit?: BorderValueUnit,
  value?: Int
|}

 export type ComponentCreateManyWithoutWebInput = {| 
  create?: Array< ComponentCreateWithoutWebInput > | ComponentCreateWithoutWebInput,
  connect?: Array< ComponentWhereUniqueInput > | ComponentWhereUniqueInput
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

 export type ComponentCreateWithoutWebInput = {| 
  name: String,
  document?: DocumentCreateOneInput
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

 export type ColorValueCreateManyWithoutWebInput = {| 
  create?: Array< ColorValueCreateWithoutWebInput > | ColorValueCreateWithoutWebInput,
  connect?: Array< ColorValueWhereUniqueInput > | ColorValueWhereUniqueInput
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

 export type ColorValueCreateWithoutWebInput = {| 
  name?: String,
  r: Int,
  g: Int,
  b: Int,
  a?: Float
|}

 export type UserWhereUniqueInput = {| 
  id?: ID_Input,
  email?: String
|}

 export type ColorValueCreateOneInput = {| 
  create?: ColorValueCreateInput,
  connect?: ColorValueWhereUniqueInput
|}

 export type PageWhereUniqueInput = {| 
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

 export type ComponentWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type WebCreateOneWithoutColorValuesInput = {| 
  create?: WebCreateWithoutColorValuesInput,
  connect?: WebWhereUniqueInput
|}

 export type DocumentWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type WebCreateWithoutColorValuesInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  pages?: PageCreateManyWithoutWebInput,
  documents?: DocumentCreateManyWithoutWebInput,
  components?: ComponentCreateManyWithoutWebInput,
  styles?: StyleCreateManyWithoutWebInput,
  dimensionValues?: DimensionValueCreateManyWithoutWebInput
|}

 export type ColorValueWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type DimensionValueCreateManyWithoutWebInput = {| 
  create?: Array< DimensionValueCreateWithoutWebInput > | DimensionValueCreateWithoutWebInput,
  connect?: Array< DimensionValueWhereUniqueInput > | DimensionValueWhereUniqueInput
|}

 export type DimensionValueUpdateInput = {| 
  name?: String,
  unit?: DimensionValueUnit,
  value?: Int,
  web?: WebUpdateOneRequiredWithoutDimensionValuesInput
|}

 export type ColorValueUpsertNestedInput = {| 
  update: ColorValueUpdateDataInput,
  create: ColorValueCreateInput
|}

 export type StyleUpdateInput = {| 
  type?: StyleType,
  name?: String,
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
  shadowOpacity?: Int,
  shadowRadius?: Int,
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
  web?: WebUpdateOneRequiredWithoutStylesInput,
  width?: DimensionValueUpdateOneInput,
  height?: DimensionValueUpdateOneInput,
  bottom?: DimensionValueUpdateOneInput,
  end?: DimensionValueUpdateOneInput,
  left?: DimensionValueUpdateOneInput,
  right?: DimensionValueUpdateOneInput,
  start?: DimensionValueUpdateOneInput,
  top?: DimensionValueUpdateOneInput,
  minWidth?: DimensionValueUpdateOneInput,
  maxWidth?: DimensionValueUpdateOneInput,
  minHeight?: DimensionValueUpdateOneInput,
  maxHeight?: DimensionValueUpdateOneInput,
  margin?: DimensionValueUpdateOneInput,
  marginBottom?: DimensionValueUpdateOneInput,
  marginEnd?: DimensionValueUpdateOneInput,
  marginHorizontal?: DimensionValueUpdateOneInput,
  marginLeft?: DimensionValueUpdateOneInput,
  marginRight?: DimensionValueUpdateOneInput,
  marginStart?: DimensionValueUpdateOneInput,
  marginTop?: DimensionValueUpdateOneInput,
  marginVertical?: DimensionValueUpdateOneInput,
  padding?: DimensionValueUpdateOneInput,
  paddingBottom?: DimensionValueUpdateOneInput,
  paddingEnd?: DimensionValueUpdateOneInput,
  paddingHorizontal?: DimensionValueUpdateOneInput,
  paddingLeft?: DimensionValueUpdateOneInput,
  paddingRight?: DimensionValueUpdateOneInput,
  paddingStart?: DimensionValueUpdateOneInput,
  paddingTop?: DimensionValueUpdateOneInput,
  paddingVertical?: DimensionValueUpdateOneInput,
  shadowColor?: ColorValueUpdateOneInput,
  shadowOffset?: StyleShadowOffsetUpdateOneInput,
  backgroundColor?: ColorValueUpdateOneInput,
  borderColor?: ColorValueUpdateOneInput,
  borderBottomColor?: ColorValueUpdateOneInput,
  borderEndColor?: ColorValueUpdateOneInput,
  borderLeftColor?: ColorValueUpdateOneInput,
  borderRightColor?: ColorValueUpdateOneInput,
  borderStartColor?: ColorValueUpdateOneInput,
  borderTopColor?: ColorValueUpdateOneInput,
  borderRadius?: BorderValueUpdateOneInput,
  borderBottomEndRadius?: BorderValueUpdateOneInput,
  borderBottomLeftRadius?: BorderValueUpdateOneInput,
  borderBottomRightRadius?: BorderValueUpdateOneInput,
  borderBottomStartRadius?: BorderValueUpdateOneInput,
  borderTopEndRadius?: BorderValueUpdateOneInput,
  borderTopLeftRadius?: BorderValueUpdateOneInput,
  borderTopRightRadius?: BorderValueUpdateOneInput,
  borderTopStartRadius?: BorderValueUpdateOneInput,
  borderWidth?: BorderValueUpdateOneInput,
  borderBottomWidth?: BorderValueUpdateOneInput,
  borderEndWidth?: BorderValueUpdateOneInput,
  borderLeftWidth?: BorderValueUpdateOneInput,
  borderRightWidth?: BorderValueUpdateOneInput,
  borderStartWidth?: BorderValueUpdateOneInput,
  borderTopWidth?: BorderValueUpdateOneInput,
  color?: ColorValueUpdateOneInput
|}

 export type StyleShadowOffsetCreateOneInput = {| 
  create?: StyleShadowOffsetCreateInput
|}

 export type DocumentUpsertWithoutElementsInput = {| 
  update: DocumentUpdateWithoutElementsDataInput,
  create: DocumentCreateWithoutElementsInput
|}

 export type StyleShadowOffsetCreateInput = {| 
  width: Int,
  height: Int
|}

 export type DocumentUpdateOneRequiredWithoutElementsInput = {| 
  create?: DocumentCreateWithoutElementsInput,
  connect?: DocumentWhereUniqueInput,
  update?: DocumentUpdateWithoutElementsDataInput,
  upsert?: DocumentUpsertWithoutElementsInput
|}

 export type BorderValueCreateOneInput = {| 
  create?: BorderValueCreateInput
|}

 export type PageUpdateInput = {| 
  title?: String,
  content?: Json,
  creator?: UserUpdateOneRequiredWithoutPagesInput,
  web?: WebUpdateOneRequiredWithoutPagesInput,
  document?: DocumentUpdateOneInput
|}

 export type BorderValueCreateInput = {| 
  unit: BorderValueUnit,
  value: Int
|}

 export type WebUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: WebWhereUniqueInput,
  update: WebUpdateWithoutCreatorDataInput,
  create: WebCreateWithoutCreatorInput
|}

 export type StyleCreateOneInput = {| 
  create?: StyleCreateInput,
  connect?: StyleWhereUniqueInput
|}

 export type DocumentUpsertNestedInput = {| 
  update: DocumentUpdateDataInput,
  create: DocumentCreateInput
|}

 export type StyleCreateInput = {| 
  type: StyleType,
  name: String,
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
  shadowOpacity?: Int,
  shadowRadius?: Int,
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
  shadowColor?: ColorValueCreateOneInput,
  shadowOffset?: StyleShadowOffsetCreateOneInput,
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

 export type UserUpsertWithoutWebsInput = {| 
  update: UserUpdateWithoutWebsDataInput,
  create: UserCreateWithoutWebsInput
|}

 export type WebCreateOneWithoutStylesInput = {| 
  create?: WebCreateWithoutStylesInput,
  connect?: WebWhereUniqueInput
|}

 export type WebUpsertWithoutPagesInput = {| 
  update: WebUpdateWithoutPagesDataInput,
  create: WebCreateWithoutPagesInput
|}

 export type WebCreateWithoutStylesInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  pages?: PageCreateManyWithoutWebInput,
  documents?: DocumentCreateManyWithoutWebInput,
  components?: ComponentCreateManyWithoutWebInput,
  dimensionValues?: DimensionValueCreateManyWithoutWebInput,
  colorValues?: ColorValueCreateManyWithoutWebInput
|}

 export type ElementUpsertWithWhereUniqueWithoutDocumentInput = {| 
  where: ElementWhereUniqueInput,
  update: ElementUpdateWithoutDocumentDataInput,
  create: ElementCreateWithoutDocumentInput
|}

 export type WebCreateInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  pages?: PageCreateManyWithoutWebInput,
  documents?: DocumentCreateManyWithoutWebInput,
  components?: ComponentCreateManyWithoutWebInput,
  styles?: StyleCreateManyWithoutWebInput,
  dimensionValues?: DimensionValueCreateManyWithoutWebInput,
  colorValues?: ColorValueCreateManyWithoutWebInput
|}

 export type WebUpsertWithoutStylesInput = {| 
  update: WebUpdateWithoutStylesDataInput,
  create: WebCreateWithoutStylesInput
|}

 export type PageCreateInput = {| 
  title: String,
  content?: Json,
  creator: UserCreateOneWithoutPagesInput,
  web: WebCreateOneWithoutPagesInput,
  document?: DocumentCreateOneInput
|}

 export type WebUpdateOneRequiredWithoutStylesInput = {| 
  create?: WebCreateWithoutStylesInput,
  connect?: WebWhereUniqueInput,
  update?: WebUpdateWithoutStylesDataInput,
  upsert?: WebUpsertWithoutStylesInput
|}

 export type ElementCreateInput = {| 
  type: ElementType,
  path?: ElementCreatepathInput,
  document: DocumentCreateOneWithoutElementsInput,
  component?: ComponentCreateOneInput,
  style?: StyleCreateOneInput
|}

 export type StyleUpdateOneInput = {| 
  create?: StyleCreateInput,
  connect?: StyleWhereUniqueInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: StyleUpdateDataInput,
  upsert?: StyleUpsertNestedInput
|}

 export type DocumentCreateOneWithoutElementsInput = {| 
  create?: DocumentCreateWithoutElementsInput,
  connect?: DocumentWhereUniqueInput
|}

 export type WebUpsertWithoutComponentsInput = {| 
  update: WebUpdateWithoutComponentsDataInput,
  create: WebCreateWithoutComponentsInput
|}

 export type DocumentCreateWithoutElementsInput = {| 
  web: WebCreateOneWithoutDocumentsInput
|}

 export type BorderValueUpsertNestedInput = {| 
  update: BorderValueUpdateDataInput,
  create: BorderValueCreateInput
|}

 export type UserUpdateInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput,
  pages?: PageUpdateManyWithoutCreatorInput
|}

 export type BorderValueUpdateOneInput = {| 
  create?: BorderValueCreateInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: BorderValueUpdateDataInput,
  upsert?: BorderValueUpsertNestedInput
|}

 export type WebUpdateManyWithoutCreatorInput = {| 
  create?: Array< WebCreateWithoutCreatorInput > | WebCreateWithoutCreatorInput,
  connect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  disconnect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  delete?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  update?: Array< WebUpdateWithWhereUniqueWithoutCreatorInput > | WebUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< WebUpsertWithWhereUniqueWithoutCreatorInput > | WebUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type StyleShadowOffsetUpdateDataInput = {| 
  width?: Int,
  height?: Int
|}

 export type WebUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: WebWhereUniqueInput,
  data: WebUpdateWithoutCreatorDataInput
|}

 export type UserCreateInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput,
  pages?: PageCreateManyWithoutCreatorInput
|}

 export type WebUpdateWithoutCreatorDataInput = {| 
  name?: String,
  pages?: PageUpdateManyWithoutWebInput,
  documents?: DocumentUpdateManyWithoutWebInput,
  components?: ComponentUpdateManyWithoutWebInput,
  styles?: StyleUpdateManyWithoutWebInput,
  dimensionValues?: DimensionValueUpdateManyWithoutWebInput,
  colorValues?: ColorValueUpdateManyWithoutWebInput
|}

 export type WebCreateWithoutCreatorInput = {| 
  name: String,
  pages?: PageCreateManyWithoutWebInput,
  documents?: DocumentCreateManyWithoutWebInput,
  components?: ComponentCreateManyWithoutWebInput,
  styles?: StyleCreateManyWithoutWebInput,
  dimensionValues?: DimensionValueCreateManyWithoutWebInput,
  colorValues?: ColorValueCreateManyWithoutWebInput
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

 export type PageCreateWithoutWebInput = {| 
  title: String,
  content?: Json,
  creator: UserCreateOneWithoutPagesInput,
  document?: DocumentCreateOneInput
|}

 export type UserCreateWithoutPagesInput = {| 
  email: String,
  password: String,
  themeName?: String,
  webs?: WebCreateManyWithoutCreatorInput
|}

 export type DocumentCreateInput = {| 
  web: WebCreateOneWithoutDocumentsInput,
  elements?: ElementCreateManyWithoutDocumentInput
|}

 export type PageUpdateWithoutWebDataInput = {| 
  title?: String,
  content?: Json,
  creator?: UserUpdateOneRequiredWithoutPagesInput,
  document?: DocumentUpdateOneInput
|}

 export type WebCreateWithoutDocumentsInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  pages?: PageCreateManyWithoutWebInput,
  components?: ComponentCreateManyWithoutWebInput,
  styles?: StyleCreateManyWithoutWebInput,
  dimensionValues?: DimensionValueCreateManyWithoutWebInput,
  colorValues?: ColorValueCreateManyWithoutWebInput
|}

 export type UserUpdateOneRequiredWithoutPagesInput = {| 
  create?: UserCreateWithoutPagesInput,
  connect?: UserWhereUniqueInput,
  update?: UserUpdateWithoutPagesDataInput,
  upsert?: UserUpsertWithoutPagesInput
|}

 export type UserCreateWithoutWebsInput = {| 
  email: String,
  password: String,
  themeName?: String,
  pages?: PageCreateManyWithoutCreatorInput
|}

 export type UserUpdateWithoutPagesDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput
|}

 export type PageCreateWithoutCreatorInput = {| 
  title: String,
  content?: Json,
  web: WebCreateOneWithoutPagesInput,
  document?: DocumentCreateOneInput
|}

 export type UserUpsertWithoutPagesInput = {| 
  update: UserUpdateWithoutPagesDataInput,
  create: UserCreateWithoutPagesInput
|}

 export type WebCreateWithoutPagesInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  documents?: DocumentCreateManyWithoutWebInput,
  components?: ComponentCreateManyWithoutWebInput,
  styles?: StyleCreateManyWithoutWebInput,
  dimensionValues?: DimensionValueCreateManyWithoutWebInput,
  colorValues?: ColorValueCreateManyWithoutWebInput
|}

 export type DocumentUpdateOneInput = {| 
  create?: DocumentCreateInput,
  connect?: DocumentWhereUniqueInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: DocumentUpdateDataInput,
  upsert?: DocumentUpsertNestedInput
|}

 export type DocumentCreateWithoutWebInput = {| 
  elements?: ElementCreateManyWithoutDocumentInput
|}

 export type DocumentUpdateDataInput = {| 
  web?: WebUpdateOneRequiredWithoutDocumentsInput,
  elements?: ElementUpdateManyWithoutDocumentInput
|}

 export type ElementCreateWithoutDocumentInput = {| 
  type: ElementType,
  path?: ElementCreatepathInput,
  component?: ComponentCreateOneInput,
  style?: StyleCreateOneInput
|}

 export type WebUpdateOneRequiredWithoutDocumentsInput = {| 
  create?: WebCreateWithoutDocumentsInput,
  connect?: WebWhereUniqueInput,
  update?: WebUpdateWithoutDocumentsDataInput,
  upsert?: WebUpsertWithoutDocumentsInput
|}

 export type ComponentCreateOneInput = {| 
  create?: ComponentCreateInput,
  connect?: ComponentWhereUniqueInput
|}

 export type WebUpdateWithoutDocumentsDataInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput,
  components?: ComponentUpdateManyWithoutWebInput,
  styles?: StyleUpdateManyWithoutWebInput,
  dimensionValues?: DimensionValueUpdateManyWithoutWebInput,
  colorValues?: ColorValueUpdateManyWithoutWebInput
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

 export type UserUpdateOneRequiredWithoutWebsInput = {| 
  create?: UserCreateWithoutWebsInput,
  connect?: UserWhereUniqueInput,
  update?: UserUpdateWithoutWebsDataInput,
  upsert?: UserUpsertWithoutWebsInput
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

 export type UserUpdateWithoutWebsDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  pages?: PageUpdateManyWithoutCreatorInput
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

 export type PageUpdateManyWithoutCreatorInput = {| 
  create?: Array< PageCreateWithoutCreatorInput > | PageCreateWithoutCreatorInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  disconnect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  delete?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  update?: Array< PageUpdateWithWhereUniqueWithoutCreatorInput > | PageUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< PageUpsertWithWhereUniqueWithoutCreatorInput > | PageUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type StyleShadowOffsetUpdateInput = {| 
  width?: Int,
  height?: Int
|}

 export type PageUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: PageWhereUniqueInput,
  data: PageUpdateWithoutCreatorDataInput
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
  web?: WebWhereInput,
  elements_every?: ElementWhereInput,
  elements_some?: ElementWhereInput,
  elements_none?: ElementWhereInput
|}

 export type PageUpdateWithoutCreatorDataInput = {| 
  title?: String,
  content?: Json,
  web?: WebUpdateOneRequiredWithoutPagesInput,
  document?: DocumentUpdateOneInput
|}

 export type WebWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type WebUpdateOneRequiredWithoutPagesInput = {| 
  create?: WebCreateWithoutPagesInput,
  connect?: WebWhereUniqueInput,
  update?: WebUpdateWithoutPagesDataInput,
  upsert?: WebUpsertWithoutPagesInput
|}

 export type StyleWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type WebUpdateWithoutPagesDataInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutWebsInput,
  documents?: DocumentUpdateManyWithoutWebInput,
  components?: ComponentUpdateManyWithoutWebInput,
  styles?: StyleUpdateManyWithoutWebInput,
  dimensionValues?: DimensionValueUpdateManyWithoutWebInput,
  colorValues?: ColorValueUpdateManyWithoutWebInput
|}

 export type ColorValueUpdateInput = {| 
  name?: String,
  r?: Int,
  g?: Int,
  b?: Int,
  a?: Float,
  web?: WebUpdateOneRequiredWithoutColorValuesInput
|}

 export type DocumentUpdateManyWithoutWebInput = {| 
  create?: Array< DocumentCreateWithoutWebInput > | DocumentCreateWithoutWebInput,
  connect?: Array< DocumentWhereUniqueInput > | DocumentWhereUniqueInput,
  disconnect?: Array< DocumentWhereUniqueInput > | DocumentWhereUniqueInput,
  delete?: Array< DocumentWhereUniqueInput > | DocumentWhereUniqueInput,
  update?: Array< DocumentUpdateWithWhereUniqueWithoutWebInput > | DocumentUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< DocumentUpsertWithWhereUniqueWithoutWebInput > | DocumentUpsertWithWhereUniqueWithoutWebInput
|}

 export type ComponentUpdateInput = {| 
  name?: String,
  web?: WebUpdateOneRequiredWithoutComponentsInput,
  document?: DocumentUpdateOneInput
|}

 export type DocumentUpdateWithWhereUniqueWithoutWebInput = {| 
  where: DocumentWhereUniqueInput,
  data: DocumentUpdateWithoutWebDataInput
|}

 export type ElementUpdateInput = {| 
  type?: ElementType,
  path?: ElementUpdatepathInput,
  document?: DocumentUpdateOneRequiredWithoutElementsInput,
  component?: ComponentUpdateOneInput,
  style?: StyleUpdateOneInput
|}

 export type DocumentUpdateWithoutWebDataInput = {| 
  elements?: ElementUpdateManyWithoutDocumentInput
|}

 export type PageUpsertWithWhereUniqueWithoutWebInput = {| 
  where: PageWhereUniqueInput,
  update: PageUpdateWithoutWebDataInput,
  create: PageCreateWithoutWebInput
|}

 export type ElementUpdateManyWithoutDocumentInput = {| 
  create?: Array< ElementCreateWithoutDocumentInput > | ElementCreateWithoutDocumentInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  disconnect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  delete?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  update?: Array< ElementUpdateWithWhereUniqueWithoutDocumentInput > | ElementUpdateWithWhereUniqueWithoutDocumentInput,
  upsert?: Array< ElementUpsertWithWhereUniqueWithoutDocumentInput > | ElementUpsertWithWhereUniqueWithoutDocumentInput
|}

 export type PageUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: PageWhereUniqueInput,
  update: PageUpdateWithoutCreatorDataInput,
  create: PageCreateWithoutCreatorInput
|}

 export type ElementUpdateWithWhereUniqueWithoutDocumentInput = {| 
  where: ElementWhereUniqueInput,
  data: ElementUpdateWithoutDocumentDataInput
|}

 export type StyleUpsertNestedInput = {| 
  update: StyleUpdateDataInput,
  create: StyleCreateInput
|}

 export type ElementUpdateWithoutDocumentDataInput = {| 
  type?: ElementType,
  path?: ElementUpdatepathInput,
  component?: ComponentUpdateOneInput,
  style?: StyleUpdateOneInput
|}

 export type StyleUpdateDataInput = {| 
  type?: StyleType,
  name?: String,
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
  shadowOpacity?: Int,
  shadowRadius?: Int,
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
  web?: WebUpdateOneRequiredWithoutStylesInput,
  width?: DimensionValueUpdateOneInput,
  height?: DimensionValueUpdateOneInput,
  bottom?: DimensionValueUpdateOneInput,
  end?: DimensionValueUpdateOneInput,
  left?: DimensionValueUpdateOneInput,
  right?: DimensionValueUpdateOneInput,
  start?: DimensionValueUpdateOneInput,
  top?: DimensionValueUpdateOneInput,
  minWidth?: DimensionValueUpdateOneInput,
  maxWidth?: DimensionValueUpdateOneInput,
  minHeight?: DimensionValueUpdateOneInput,
  maxHeight?: DimensionValueUpdateOneInput,
  margin?: DimensionValueUpdateOneInput,
  marginBottom?: DimensionValueUpdateOneInput,
  marginEnd?: DimensionValueUpdateOneInput,
  marginHorizontal?: DimensionValueUpdateOneInput,
  marginLeft?: DimensionValueUpdateOneInput,
  marginRight?: DimensionValueUpdateOneInput,
  marginStart?: DimensionValueUpdateOneInput,
  marginTop?: DimensionValueUpdateOneInput,
  marginVertical?: DimensionValueUpdateOneInput,
  padding?: DimensionValueUpdateOneInput,
  paddingBottom?: DimensionValueUpdateOneInput,
  paddingEnd?: DimensionValueUpdateOneInput,
  paddingHorizontal?: DimensionValueUpdateOneInput,
  paddingLeft?: DimensionValueUpdateOneInput,
  paddingRight?: DimensionValueUpdateOneInput,
  paddingStart?: DimensionValueUpdateOneInput,
  paddingTop?: DimensionValueUpdateOneInput,
  paddingVertical?: DimensionValueUpdateOneInput,
  shadowColor?: ColorValueUpdateOneInput,
  shadowOffset?: StyleShadowOffsetUpdateOneInput,
  backgroundColor?: ColorValueUpdateOneInput,
  borderColor?: ColorValueUpdateOneInput,
  borderBottomColor?: ColorValueUpdateOneInput,
  borderEndColor?: ColorValueUpdateOneInput,
  borderLeftColor?: ColorValueUpdateOneInput,
  borderRightColor?: ColorValueUpdateOneInput,
  borderStartColor?: ColorValueUpdateOneInput,
  borderTopColor?: ColorValueUpdateOneInput,
  borderRadius?: BorderValueUpdateOneInput,
  borderBottomEndRadius?: BorderValueUpdateOneInput,
  borderBottomLeftRadius?: BorderValueUpdateOneInput,
  borderBottomRightRadius?: BorderValueUpdateOneInput,
  borderBottomStartRadius?: BorderValueUpdateOneInput,
  borderTopEndRadius?: BorderValueUpdateOneInput,
  borderTopLeftRadius?: BorderValueUpdateOneInput,
  borderTopRightRadius?: BorderValueUpdateOneInput,
  borderTopStartRadius?: BorderValueUpdateOneInput,
  borderWidth?: BorderValueUpdateOneInput,
  borderBottomWidth?: BorderValueUpdateOneInput,
  borderEndWidth?: BorderValueUpdateOneInput,
  borderLeftWidth?: BorderValueUpdateOneInput,
  borderRightWidth?: BorderValueUpdateOneInput,
  borderStartWidth?: BorderValueUpdateOneInput,
  borderTopWidth?: BorderValueUpdateOneInput,
  color?: ColorValueUpdateOneInput
|}

 export type ElementUpdatepathInput = {| 
  set?: Array< Int > | Int
|}

 export type StyleUpsertWithWhereUniqueWithoutWebInput = {| 
  where: StyleWhereUniqueInput,
  update: StyleUpdateWithoutWebDataInput,
  create: StyleCreateWithoutWebInput
|}

 export type ComponentUpdateOneInput = {| 
  create?: ComponentCreateInput,
  connect?: ComponentWhereUniqueInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: ComponentUpdateDataInput,
  upsert?: ComponentUpsertNestedInput
|}

 export type StyleShadowOffsetUpsertNestedInput = {| 
  update: StyleShadowOffsetUpdateDataInput,
  create: StyleShadowOffsetCreateInput
|}

 export type ComponentUpdateDataInput = {| 
  name?: String,
  web?: WebUpdateOneRequiredWithoutComponentsInput,
  document?: DocumentUpdateOneInput
|}

 export type WebCreateManyWithoutCreatorInput = {| 
  create?: Array< WebCreateWithoutCreatorInput > | WebCreateWithoutCreatorInput,
  connect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput
|}

 export type WebUpdateOneRequiredWithoutComponentsInput = {| 
  create?: WebCreateWithoutComponentsInput,
  connect?: WebWhereUniqueInput,
  update?: WebUpdateWithoutComponentsDataInput,
  upsert?: WebUpsertWithoutComponentsInput
|}

 export type UserCreateOneWithoutPagesInput = {| 
  create?: UserCreateWithoutPagesInput,
  connect?: UserWhereUniqueInput
|}

 export type WebUpdateWithoutComponentsDataInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput,
  documents?: DocumentUpdateManyWithoutWebInput,
  styles?: StyleUpdateManyWithoutWebInput,
  dimensionValues?: DimensionValueUpdateManyWithoutWebInput,
  colorValues?: ColorValueUpdateManyWithoutWebInput
|}

 export type WebCreateOneWithoutDocumentsInput = {| 
  create?: WebCreateWithoutDocumentsInput,
  connect?: WebWhereUniqueInput
|}

 export type StyleUpdateManyWithoutWebInput = {| 
  create?: Array< StyleCreateWithoutWebInput > | StyleCreateWithoutWebInput,
  connect?: Array< StyleWhereUniqueInput > | StyleWhereUniqueInput,
  disconnect?: Array< StyleWhereUniqueInput > | StyleWhereUniqueInput,
  delete?: Array< StyleWhereUniqueInput > | StyleWhereUniqueInput,
  update?: Array< StyleUpdateWithWhereUniqueWithoutWebInput > | StyleUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< StyleUpsertWithWhereUniqueWithoutWebInput > | StyleUpsertWithWhereUniqueWithoutWebInput
|}

 export type PageCreateManyWithoutCreatorInput = {| 
  create?: Array< PageCreateWithoutCreatorInput > | PageCreateWithoutCreatorInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput
|}

 export type StyleUpdateWithWhereUniqueWithoutWebInput = {| 
  where: StyleWhereUniqueInput,
  data: StyleUpdateWithoutWebDataInput
|}

 export type DocumentCreateManyWithoutWebInput = {| 
  create?: Array< DocumentCreateWithoutWebInput > | DocumentCreateWithoutWebInput,
  connect?: Array< DocumentWhereUniqueInput > | DocumentWhereUniqueInput
|}

 export type StyleUpdateWithoutWebDataInput = {| 
  type?: StyleType,
  name?: String,
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
  shadowOpacity?: Int,
  shadowRadius?: Int,
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
  width?: DimensionValueUpdateOneInput,
  height?: DimensionValueUpdateOneInput,
  bottom?: DimensionValueUpdateOneInput,
  end?: DimensionValueUpdateOneInput,
  left?: DimensionValueUpdateOneInput,
  right?: DimensionValueUpdateOneInput,
  start?: DimensionValueUpdateOneInput,
  top?: DimensionValueUpdateOneInput,
  minWidth?: DimensionValueUpdateOneInput,
  maxWidth?: DimensionValueUpdateOneInput,
  minHeight?: DimensionValueUpdateOneInput,
  maxHeight?: DimensionValueUpdateOneInput,
  margin?: DimensionValueUpdateOneInput,
  marginBottom?: DimensionValueUpdateOneInput,
  marginEnd?: DimensionValueUpdateOneInput,
  marginHorizontal?: DimensionValueUpdateOneInput,
  marginLeft?: DimensionValueUpdateOneInput,
  marginRight?: DimensionValueUpdateOneInput,
  marginStart?: DimensionValueUpdateOneInput,
  marginTop?: DimensionValueUpdateOneInput,
  marginVertical?: DimensionValueUpdateOneInput,
  padding?: DimensionValueUpdateOneInput,
  paddingBottom?: DimensionValueUpdateOneInput,
  paddingEnd?: DimensionValueUpdateOneInput,
  paddingHorizontal?: DimensionValueUpdateOneInput,
  paddingLeft?: DimensionValueUpdateOneInput,
  paddingRight?: DimensionValueUpdateOneInput,
  paddingStart?: DimensionValueUpdateOneInput,
  paddingTop?: DimensionValueUpdateOneInput,
  paddingVertical?: DimensionValueUpdateOneInput,
  shadowColor?: ColorValueUpdateOneInput,
  shadowOffset?: StyleShadowOffsetUpdateOneInput,
  backgroundColor?: ColorValueUpdateOneInput,
  borderColor?: ColorValueUpdateOneInput,
  borderBottomColor?: ColorValueUpdateOneInput,
  borderEndColor?: ColorValueUpdateOneInput,
  borderLeftColor?: ColorValueUpdateOneInput,
  borderRightColor?: ColorValueUpdateOneInput,
  borderStartColor?: ColorValueUpdateOneInput,
  borderTopColor?: ColorValueUpdateOneInput,
  borderRadius?: BorderValueUpdateOneInput,
  borderBottomEndRadius?: BorderValueUpdateOneInput,
  borderBottomLeftRadius?: BorderValueUpdateOneInput,
  borderBottomRightRadius?: BorderValueUpdateOneInput,
  borderBottomStartRadius?: BorderValueUpdateOneInput,
  borderTopEndRadius?: BorderValueUpdateOneInput,
  borderTopLeftRadius?: BorderValueUpdateOneInput,
  borderTopRightRadius?: BorderValueUpdateOneInput,
  borderTopStartRadius?: BorderValueUpdateOneInput,
  borderWidth?: BorderValueUpdateOneInput,
  borderBottomWidth?: BorderValueUpdateOneInput,
  borderEndWidth?: BorderValueUpdateOneInput,
  borderLeftWidth?: BorderValueUpdateOneInput,
  borderRightWidth?: BorderValueUpdateOneInput,
  borderStartWidth?: BorderValueUpdateOneInput,
  borderTopWidth?: BorderValueUpdateOneInput,
  color?: ColorValueUpdateOneInput
|}

 export type ElementCreatepathInput = {| 
  set?: Array< Int > | Int
|}

 export type DimensionValueUpdateOneInput = {| 
  create?: DimensionValueCreateInput,
  connect?: DimensionValueWhereUniqueInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: DimensionValueUpdateDataInput,
  upsert?: DimensionValueUpsertNestedInput
|}

 export type DocumentSubscriptionWhereInput = {| 
  AND?: Array< DocumentSubscriptionWhereInput > | DocumentSubscriptionWhereInput,
  OR?: Array< DocumentSubscriptionWhereInput > | DocumentSubscriptionWhereInput,
  NOT?: Array< DocumentSubscriptionWhereInput > | DocumentSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: DocumentWhereInput
|}

 export type DimensionValueUpdateDataInput = {| 
  name?: String,
  unit?: DimensionValueUnit,
  value?: Int,
  web?: WebUpdateOneRequiredWithoutDimensionValuesInput
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

 export type WebUpdateOneRequiredWithoutDimensionValuesInput = {| 
  create?: WebCreateWithoutDimensionValuesInput,
  connect?: WebWhereUniqueInput,
  update?: WebUpdateWithoutDimensionValuesDataInput,
  upsert?: WebUpsertWithoutDimensionValuesInput
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
  documents_every?: DocumentWhereInput,
  documents_some?: DocumentWhereInput,
  documents_none?: DocumentWhereInput,
  components_every?: ComponentWhereInput,
  components_some?: ComponentWhereInput,
  components_none?: ComponentWhereInput,
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

 export type WebUpdateWithoutDimensionValuesDataInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput,
  documents?: DocumentUpdateManyWithoutWebInput,
  components?: ComponentUpdateManyWithoutWebInput,
  styles?: StyleUpdateManyWithoutWebInput,
  colorValues?: ColorValueUpdateManyWithoutWebInput
|}

 export type DimensionValueWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type ComponentUpdateManyWithoutWebInput = {| 
  create?: Array< ComponentCreateWithoutWebInput > | ComponentCreateWithoutWebInput,
  connect?: Array< ComponentWhereUniqueInput > | ComponentWhereUniqueInput,
  disconnect?: Array< ComponentWhereUniqueInput > | ComponentWhereUniqueInput,
  delete?: Array< ComponentWhereUniqueInput > | ComponentWhereUniqueInput,
  update?: Array< ComponentUpdateWithWhereUniqueWithoutWebInput > | ComponentUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< ComponentUpsertWithWhereUniqueWithoutWebInput > | ComponentUpsertWithWhereUniqueWithoutWebInput
|}

 export type DocumentUpdateWithoutElementsDataInput = {| 
  web?: WebUpdateOneRequiredWithoutDocumentsInput
|}

 export type ComponentUpdateWithWhereUniqueWithoutWebInput = {| 
  where: ComponentWhereUniqueInput,
  data: ComponentUpdateWithoutWebDataInput
|}

 export type WebUpsertWithoutDocumentsInput = {| 
  update: WebUpdateWithoutDocumentsDataInput,
  create: WebCreateWithoutDocumentsInput
|}

 export type ComponentUpdateWithoutWebDataInput = {| 
  name?: String,
  document?: DocumentUpdateOneInput
|}

 export type WebUpdateWithoutStylesDataInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput,
  documents?: DocumentUpdateManyWithoutWebInput,
  components?: ComponentUpdateManyWithoutWebInput,
  dimensionValues?: DimensionValueUpdateManyWithoutWebInput,
  colorValues?: ColorValueUpdateManyWithoutWebInput
|}

 export type ComponentUpsertWithWhereUniqueWithoutWebInput = {| 
  where: ComponentWhereUniqueInput,
  update: ComponentUpdateWithoutWebDataInput,
  create: ComponentCreateWithoutWebInput
|}

 export type BorderValueUpdateDataInput = {| 
  unit?: BorderValueUnit,
  value?: Int
|}

 export type ColorValueUpdateManyWithoutWebInput = {| 
  create?: Array< ColorValueCreateWithoutWebInput > | ColorValueCreateWithoutWebInput,
  connect?: Array< ColorValueWhereUniqueInput > | ColorValueWhereUniqueInput,
  disconnect?: Array< ColorValueWhereUniqueInput > | ColorValueWhereUniqueInput,
  delete?: Array< ColorValueWhereUniqueInput > | ColorValueWhereUniqueInput,
  update?: Array< ColorValueUpdateWithWhereUniqueWithoutWebInput > | ColorValueUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< ColorValueUpsertWithWhereUniqueWithoutWebInput > | ColorValueUpsertWithWhereUniqueWithoutWebInput
|}

 export type PageCreateManyWithoutWebInput = {| 
  create?: Array< PageCreateWithoutWebInput > | PageCreateWithoutWebInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput
|}

 export type ColorValueUpdateWithWhereUniqueWithoutWebInput = {| 
  where: ColorValueWhereUniqueInput,
  data: ColorValueUpdateWithoutWebDataInput
|}

 export type UserCreateOneWithoutWebsInput = {| 
  create?: UserCreateWithoutWebsInput,
  connect?: UserWhereUniqueInput
|}

 export type ColorValueUpdateWithoutWebDataInput = {| 
  name?: String,
  r?: Int,
  g?: Int,
  b?: Int,
  a?: Float
|}

 export type ElementCreateManyWithoutDocumentInput = {| 
  create?: Array< ElementCreateWithoutDocumentInput > | ElementCreateWithoutDocumentInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput
|}

 export type ColorValueUpsertWithWhereUniqueWithoutWebInput = {| 
  where: ColorValueWhereUniqueInput,
  update: ColorValueUpdateWithoutWebDataInput,
  create: ColorValueCreateWithoutWebInput
|}

 export type ComponentSubscriptionWhereInput = {| 
  AND?: Array< ComponentSubscriptionWhereInput > | ComponentSubscriptionWhereInput,
  OR?: Array< ComponentSubscriptionWhereInput > | ComponentSubscriptionWhereInput,
  NOT?: Array< ComponentSubscriptionWhereInput > | ComponentSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: ComponentWhereInput
|}

 export type WebUpsertWithoutDimensionValuesInput = {| 
  update: WebUpdateWithoutDimensionValuesDataInput,
  create: WebCreateWithoutDimensionValuesInput
|}

 export type ElementWhereUniqueInput = {| 
  id?: ID_Input
|}

 export type DimensionValueUpsertNestedInput = {| 
  update: DimensionValueUpdateDataInput,
  create: DimensionValueCreateInput
|}

 export type WebUpdateInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput,
  documents?: DocumentUpdateManyWithoutWebInput,
  components?: ComponentUpdateManyWithoutWebInput,
  styles?: StyleUpdateManyWithoutWebInput,
  dimensionValues?: DimensionValueUpdateManyWithoutWebInput,
  colorValues?: ColorValueUpdateManyWithoutWebInput
|}

 export type ColorValueUpdateOneInput = {| 
  create?: ColorValueCreateInput,
  connect?: ColorValueWhereUniqueInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: ColorValueUpdateDataInput,
  upsert?: ColorValueUpsertNestedInput
|}

 export type ComponentUpsertNestedInput = {| 
  update: ComponentUpdateDataInput,
  create: ComponentCreateInput
|}

 export type ColorValueUpdateDataInput = {| 
  name?: String,
  r?: Int,
  g?: Int,
  b?: Int,
  a?: Float,
  web?: WebUpdateOneRequiredWithoutColorValuesInput
|}

 export type DocumentCreateOneInput = {| 
  create?: DocumentCreateInput,
  connect?: DocumentWhereUniqueInput
|}

 export type WebUpdateOneRequiredWithoutColorValuesInput = {| 
  create?: WebCreateWithoutColorValuesInput,
  connect?: WebWhereUniqueInput,
  update?: WebUpdateWithoutColorValuesDataInput,
  upsert?: WebUpsertWithoutColorValuesInput
|}

 export type ColorValueSubscriptionWhereInput = {| 
  AND?: Array< ColorValueSubscriptionWhereInput > | ColorValueSubscriptionWhereInput,
  OR?: Array< ColorValueSubscriptionWhereInput > | ColorValueSubscriptionWhereInput,
  NOT?: Array< ColorValueSubscriptionWhereInput > | ColorValueSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: ColorValueWhereInput
|}

 export type WebUpdateWithoutColorValuesDataInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput,
  documents?: DocumentUpdateManyWithoutWebInput,
  components?: ComponentUpdateManyWithoutWebInput,
  styles?: StyleUpdateManyWithoutWebInput,
  dimensionValues?: DimensionValueUpdateManyWithoutWebInput
|}

 export type DocumentUpdateInput = {| 
  web?: WebUpdateOneRequiredWithoutDocumentsInput,
  elements?: ElementUpdateManyWithoutDocumentInput
|}

 export type DimensionValueUpsertWithWhereUniqueWithoutWebInput = {| 
  where: DimensionValueWhereUniqueInput,
  update: DimensionValueUpdateWithoutWebDataInput,
  create: DimensionValueCreateWithoutWebInput
|}

 export type DimensionValueUpdateWithoutWebDataInput = {| 
  name?: String,
  unit?: DimensionValueUnit,
  value?: Int
|}

 export type DimensionValueUpdateWithWhereUniqueWithoutWebInput = {| 
  where: DimensionValueWhereUniqueInput,
  data: DimensionValueUpdateWithoutWebDataInput
|}

 export type DimensionValueUpdateManyWithoutWebInput = {| 
  create?: Array< DimensionValueCreateWithoutWebInput > | DimensionValueCreateWithoutWebInput,
  connect?: Array< DimensionValueWhereUniqueInput > | DimensionValueWhereUniqueInput,
  disconnect?: Array< DimensionValueWhereUniqueInput > | DimensionValueWhereUniqueInput,
  delete?: Array< DimensionValueWhereUniqueInput > | DimensionValueWhereUniqueInput,
  update?: Array< DimensionValueUpdateWithWhereUniqueWithoutWebInput > | DimensionValueUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< DimensionValueUpsertWithWhereUniqueWithoutWebInput > | DimensionValueUpsertWithWhereUniqueWithoutWebInput
|}

 export type DocumentUpsertWithWhereUniqueWithoutWebInput = {| 
  where: DocumentWhereUniqueInput,
  update: DocumentUpdateWithoutWebDataInput,
  create: DocumentCreateWithoutWebInput
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
  document?: DocumentWhereInput
|}

 export type WebCreateOneWithoutPagesInput = {| 
  create?: WebCreateWithoutPagesInput,
  connect?: WebWhereUniqueInput
|}

 export type StyleShadowOffsetUpdateOneInput = {| 
  create?: StyleShadowOffsetCreateInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: StyleShadowOffsetUpdateDataInput,
  upsert?: StyleShadowOffsetUpsertNestedInput
|}

/*
 * An object with an ID

*/
 export type Node = {| 
   id: ID_Output,
|}

 export type ColorValuePreviousValues = {| 
   id: ID_Output,
   name?: String,
   r: Int,
   g: Int,
   b: Int,
   a?: Float,
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

 export type BorderValueSubscriptionPayload = {| 
   mutation: MutationType,
   node?: BorderValue,
   updatedFields?: String[],
   previousValues?: BorderValuePreviousValues,
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
   webs?: Web[],
   pages?: Page[],
   createdAt: DateTime,
   updatedAt: DateTime,
   email: String,
   password: String,
   themeName?: String,
|}

 export type BatchPayload = {| 
   count: Long,
|}

/*
 * A connection to a list of items.

*/
 export type ColorValueConnection = {| 
   pageInfo: PageInfo,
   edges: ColorValueEdge[],
   aggregate: AggregateColorValue,
|}

 export type AggregateColorValue = {| 
   count: Int,
|}

/*
 * An edge in a connection.

*/
 export type DimensionValueEdge = {| 
   node: DimensionValue,
   cursor: String,
|}

 export type DimensionValuePreviousValues = {| 
   id: ID_Output,
   name?: String,
   unit: DimensionValueUnit,
   value: Int,
|}

 export type AggregateBorderValue = {| 
   count: Int,
|}

 export type BorderValue = {| 
   unit: BorderValueUnit,
   value: Int,
|}

/*
 * A connection to a list of items.

*/
 export type BorderValueConnection = {| 
   pageInfo: PageInfo,
   edges: BorderValueEdge[],
   aggregate: AggregateBorderValue,
|}

 export type DimensionValueSubscriptionPayload = {| 
   mutation: MutationType,
   node?: DimensionValue,
   updatedFields?: String[],
   previousValues?: DimensionValuePreviousValues,
|}

/*
 * An edge in a connection.

*/
 export type DocumentEdge = {| 
   node: Document,
   cursor: String,
|}

 export type StyleShadowOffset = {| 
   width: Int,
   height: Int,
|}

 export type AggregateStyleShadowOffset = {| 
   count: Int,
|}

 export type Web = {| ...Node,
 
   id: ID_Output,
   creator: User,
   pages?: Page[],
   documents?: Document[],
   components?: Component[],
   styles?: Style[],
   dimensionValues?: DimensionValue[],
   colorValues?: ColorValue[],
   createdAt: DateTime,
   updatedAt: DateTime,
   name: String,
|}

/*
 * A connection to a list of items.

*/
 export type StyleShadowOffsetConnection = {| 
   pageInfo: PageInfo,
   edges: StyleShadowOffsetEdge[],
   aggregate: AggregateStyleShadowOffset,
|}

 export type UserSubscriptionPayload = {| 
   mutation: MutationType,
   node?: User,
   updatedFields?: String[],
   previousValues?: UserPreviousValues,
|}

/*
 * An edge in a connection.

*/
 export type StyleEdge = {| 
   node: Style,
   cursor: String,
|}

 export type UserPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   email: String,
   password: String,
   themeName?: String,
|}

 export type AggregateComponent = {| 
   count: Int,
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

/*
 * A connection to a list of items.

*/
 export type ComponentConnection = {| 
   pageInfo: PageInfo,
   edges: ComponentEdge[],
   aggregate: AggregateComponent,
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
 export type ElementEdge = {| 
   node: Element,
   cursor: String,
|}

 export type WebPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   name: String,
|}

 export type AggregatePage = {| 
   count: Int,
|}

 export type DimensionValue = {| ...Node,
 
   id: ID_Output,
   web: Web,
   name?: String,
   unit: DimensionValueUnit,
   value: Int,
|}

/*
 * A connection to a list of items.

*/
 export type PageConnection = {| 
   pageInfo: PageInfo,
   edges: PageEdge[],
   aggregate: AggregatePage,
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

 export type Style = {| ...Node,
 
   id: ID_Output,
   web: Web,
   type: StyleType,
   name: String,
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

 export type ColorValueSubscriptionPayload = {| 
   mutation: MutationType,
   node?: ColorValue,
   updatedFields?: String[],
   previousValues?: ColorValuePreviousValues,
|}

 export type ElementSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Element,
   updatedFields?: String[],
   previousValues?: ElementPreviousValues,
|}

 export type AggregateDimensionValue = {| 
   count: Int,
|}

 export type ElementPreviousValues = {| 
   id: ID_Output,
   type: ElementType,
   path: Int[],
|}

/*
 * An edge in a connection.

*/
 export type BorderValueEdge = {| 
   node: BorderValue,
   cursor: String,
|}

 export type Component = {| ...Node,
 
   id: ID_Output,
   web: Web,
   name: String,
   document?: Document,
|}

/*
 * A connection to a list of items.

*/
 export type DocumentConnection = {| 
   pageInfo: PageInfo,
   edges: DocumentEdge[],
   aggregate: AggregateDocument,
|}

 export type ComponentSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Component,
   updatedFields?: String[],
   previousValues?: ComponentPreviousValues,
|}

 export type AggregateStyle = {| 
   count: Int,
|}

 export type ComponentPreviousValues = {| 
   id: ID_Output,
   name: String,
|}

/*
 * An edge in a connection.

*/
 export type ComponentEdge = {| 
   node: Component,
   cursor: String,
|}

 export type Element = {| ...Node,
 
   id: ID_Output,
   type: ElementType,
   document: Document,
   path: Int[],
   component?: Component,
   style?: Style,
|}

/*
 * A connection to a list of items.

*/
 export type ElementConnection = {| 
   pageInfo: PageInfo,
   edges: ElementEdge[],
   aggregate: AggregateElement,
|}

 export type StyleSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Style,
   updatedFields?: String[],
   previousValues?: StylePreviousValues,
|}

 export type AggregateWeb = {| 
   count: Int,
|}

 export type StylePreviousValues = {| 
   id: ID_Output,
   type: StyleType,
   name: String,
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
   shadowOpacity?: Int,
   shadowRadius?: Int,
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
|}

/*
 * An edge in a connection.

*/
 export type UserEdge = {| 
   node: User,
   cursor: String,
|}

 export type Document = {| ...Node,
 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   web: Web,
   elements?: Element[],
|}

/*
 * A connection to a list of items.

*/
 export type DimensionValueConnection = {| 
   pageInfo: PageInfo,
   edges: DimensionValueEdge[],
   aggregate: AggregateDimensionValue,
|}

 export type StyleShadowOffsetSubscriptionPayload = {| 
   mutation: MutationType,
   node?: StyleShadowOffset,
   updatedFields?: String[],
   previousValues?: StyleShadowOffsetPreviousValues,
|}

/*
 * An edge in a connection.

*/
 export type StyleShadowOffsetEdge = {| 
   node: StyleShadowOffset,
   cursor: String,
|}

 export type StyleShadowOffsetPreviousValues = {| 
   width: Int,
   height: Int,
|}

 export type AggregateElement = {| 
   count: Int,
|}

/*
 * A connection to a list of items.

*/
 export type WebConnection = {| 
   pageInfo: PageInfo,
   edges: WebEdge[],
   aggregate: AggregateWeb,
|}

 export type Page = {| ...Node,
 
   id: ID_Output,
   creator: User,
   web: Web,
   createdAt: DateTime,
   updatedAt: DateTime,
   title: String,
   content?: Json,
   document?: Document,
|}

 export type DocumentPreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
|}

 export type DocumentSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Document,
   updatedFields?: String[],
   previousValues?: DocumentPreviousValues,
|}

 export type BorderValuePreviousValues = {| 
   unit: BorderValueUnit,
   value: Int,
|}

/*
 * An edge in a connection.

*/
 export type ColorValueEdge = {| 
   node: ColorValue,
   cursor: String,
|}

/*
 * An edge in a connection.

*/
 export type PageEdge = {| 
   node: Page,
   cursor: String,
|}

/*
 * A connection to a list of items.

*/
 export type StyleConnection = {| 
   pageInfo: PageInfo,
   edges: StyleEdge[],
   aggregate: AggregateStyle,
|}

 export type AggregateDocument = {| 
   count: Int,
|}

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
 export type Long = string 

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
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
 export type Float = number 

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
 export type Int = number 

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
 export type String = string 

 export type DateTime = Date | string 

/*
Raw JSON value
*/
 export type Json = string 