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
    webs(args: { where?: WebWhereInput, orderBy?: WebOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web[]>; 
    pages(args: { where?: PageWhereInput, orderBy?: PageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page[]>; 
    sharedElements(args: { where?: SharedElementWhereInput, orderBy?: SharedElementOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<SharedElement[]>; 
    componentProps(args: { where?: ComponentPropWhereInput, orderBy?: ComponentPropOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ComponentProp[]>; 
    elementProps(args: { where?: ElementPropWhereInput, orderBy?: ElementPropOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ElementProp[]>; 
    styleSpreads(args: { where?: StyleSpreadWhereInput, orderBy?: StyleSpreadOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<StyleSpread[]>; 
    components(args: { where?: ComponentWhereInput, orderBy?: ComponentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Component[]>; 
    users(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User[]>; 
    elements(args: { where?: ElementWhereInput, orderBy?: ElementOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element[]>; 
    borderValues(args: { where?: BorderValueWhereInput, orderBy?: BorderValueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BorderValue[]>; 
    dimensionValues(args: { where?: DimensionValueWhereInput, orderBy?: DimensionValueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DimensionValue[]>; 
    colorValues(args: { where?: ColorValueWhereInput, orderBy?: ColorValueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ColorValue[]>; 
    styles(args: { where?: StyleWhereInput, orderBy?: StyleOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Style[]>; 
    web(args: { where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    page(args: { where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    sharedElement(args: { where: SharedElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<SharedElement | null>; 
    componentProp(args: { where: ComponentPropWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ComponentProp | null>; 
    elementProp(args: { where: ElementPropWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ElementProp | null>; 
    styleSpread(args: { where: StyleSpreadWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<StyleSpread | null>; 
    component(args: { where: ComponentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Component | null>; 
    user(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    element(args: { where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    borderValue(args: { where: BorderValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BorderValue | null>; 
    dimensionValue(args: { where: DimensionValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DimensionValue | null>; 
    colorValue(args: { where: ColorValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ColorValue | null>; 
    style(args: { where: StyleWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Style | null>; 
    websConnection(args: { where?: WebWhereInput, orderBy?: WebOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<WebConnection>; 
    pagesConnection(args: { where?: PageWhereInput, orderBy?: PageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<PageConnection>; 
    sharedElementsConnection(args: { where?: SharedElementWhereInput, orderBy?: SharedElementOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<SharedElementConnection>; 
    componentPropsConnection(args: { where?: ComponentPropWhereInput, orderBy?: ComponentPropOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ComponentPropConnection>; 
    elementPropsConnection(args: { where?: ElementPropWhereInput, orderBy?: ElementPropOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ElementPropConnection>; 
    styleSpreadsConnection(args: { where?: StyleSpreadWhereInput, orderBy?: StyleSpreadOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<StyleSpreadConnection>; 
    componentsConnection(args: { where?: ComponentWhereInput, orderBy?: ComponentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ComponentConnection>; 
    usersConnection(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<UserConnection>; 
    elementsConnection(args: { where?: ElementWhereInput, orderBy?: ElementOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ElementConnection>; 
    borderValuesConnection(args: { where?: BorderValueWhereInput, orderBy?: BorderValueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BorderValueConnection>; 
    dimensionValuesConnection(args: { where?: DimensionValueWhereInput, orderBy?: DimensionValueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DimensionValueConnection>; 
    colorValuesConnection(args: { where?: ColorValueWhereInput, orderBy?: ColorValueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ColorValueConnection>; 
    stylesConnection(args: { where?: StyleWhereInput, orderBy?: StyleOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options): Promise<StyleConnection>; 
    node(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Node | null>; 
  }

export interface Mutation {
    createWeb(args: { data: WebCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web>; 
    createPage(args: { data: PageCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page>; 
    createSharedElement(args: { data: SharedElementCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<SharedElement>; 
    createComponentProp(args: { data: ComponentPropCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ComponentProp>; 
    createElementProp(args: { data: ElementPropCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ElementProp>; 
    createStyleSpread(args: { data: StyleSpreadCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<StyleSpread>; 
    createComponent(args: { data: ComponentCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Component>; 
    createUser(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User>; 
    createElement(args: { data: ElementCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element>; 
    createBorderValue(args: { data: BorderValueCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BorderValue>; 
    createDimensionValue(args: { data: DimensionValueCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DimensionValue>; 
    createColorValue(args: { data: ColorValueCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ColorValue>; 
    createStyle(args: { data: StyleCreateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Style>; 
    updateWeb(args: { data: WebUpdateInput, where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    updatePage(args: { data: PageUpdateInput, where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    updateSharedElement(args: { data: SharedElementUpdateInput, where: SharedElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<SharedElement | null>; 
    updateComponentProp(args: { data: ComponentPropUpdateInput, where: ComponentPropWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ComponentProp | null>; 
    updateElementProp(args: { data: ElementPropUpdateInput, where: ElementPropWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ElementProp | null>; 
    updateStyleSpread(args: { data: StyleSpreadUpdateInput, where: StyleSpreadWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<StyleSpread | null>; 
    updateComponent(args: { data: ComponentUpdateInput, where: ComponentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Component | null>; 
    updateUser(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    updateElement(args: { data: ElementUpdateInput, where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    updateBorderValue(args: { data: BorderValueUpdateInput, where: BorderValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BorderValue | null>; 
    updateDimensionValue(args: { data: DimensionValueUpdateInput, where: DimensionValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DimensionValue | null>; 
    updateColorValue(args: { data: ColorValueUpdateInput, where: ColorValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ColorValue | null>; 
    updateStyle(args: { data: StyleUpdateInput, where: StyleWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Style | null>; 
    deleteWeb(args: { where: WebWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web | null>; 
    deletePage(args: { where: PageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page | null>; 
    deleteSharedElement(args: { where: SharedElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<SharedElement | null>; 
    deleteComponentProp(args: { where: ComponentPropWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ComponentProp | null>; 
    deleteElementProp(args: { where: ElementPropWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ElementProp | null>; 
    deleteStyleSpread(args: { where: StyleSpreadWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<StyleSpread | null>; 
    deleteComponent(args: { where: ComponentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Component | null>; 
    deleteUser(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User | null>; 
    deleteElement(args: { where: ElementWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element | null>; 
    deleteBorderValue(args: { where: BorderValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BorderValue | null>; 
    deleteDimensionValue(args: { where: DimensionValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DimensionValue | null>; 
    deleteColorValue(args: { where: ColorValueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ColorValue | null>; 
    deleteStyle(args: { where: StyleWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Style | null>; 
    upsertWeb(args: { where: WebWhereUniqueInput, create: WebCreateInput, update: WebUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Web>; 
    upsertPage(args: { where: PageWhereUniqueInput, create: PageCreateInput, update: PageUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Page>; 
    upsertSharedElement(args: { where: SharedElementWhereUniqueInput, create: SharedElementCreateInput, update: SharedElementUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<SharedElement>; 
    upsertComponentProp(args: { where: ComponentPropWhereUniqueInput, create: ComponentPropCreateInput, update: ComponentPropUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ComponentProp>; 
    upsertElementProp(args: { where: ElementPropWhereUniqueInput, create: ElementPropCreateInput, update: ElementPropUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ElementProp>; 
    upsertStyleSpread(args: { where: StyleSpreadWhereUniqueInput, create: StyleSpreadCreateInput, update: StyleSpreadUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<StyleSpread>; 
    upsertComponent(args: { where: ComponentWhereUniqueInput, create: ComponentCreateInput, update: ComponentUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Component>; 
    upsertUser(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<User>; 
    upsertElement(args: { where: ElementWhereUniqueInput, create: ElementCreateInput, update: ElementUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Element>; 
    upsertBorderValue(args: { where: BorderValueWhereUniqueInput, create: BorderValueCreateInput, update: BorderValueUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BorderValue>; 
    upsertDimensionValue(args: { where: DimensionValueWhereUniqueInput, create: DimensionValueCreateInput, update: DimensionValueUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<DimensionValue>; 
    upsertColorValue(args: { where: ColorValueWhereUniqueInput, create: ColorValueCreateInput, update: ColorValueUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<ColorValue>; 
    upsertStyle(args: { where: StyleWhereUniqueInput, create: StyleCreateInput, update: StyleUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Style>; 
    updateManyWebs(args: { data: WebUpdateManyMutationInput, where?: WebWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyPages(args: { data: PageUpdateManyMutationInput, where?: PageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManySharedElements(args: { data: SharedElementUpdateManyMutationInput, where?: SharedElementWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyComponentProps(args: { data: ComponentPropUpdateManyMutationInput, where?: ComponentPropWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyElementProps(args: { data: ElementPropUpdateManyMutationInput, where?: ElementPropWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyStyleSpreads(args: { data: StyleSpreadUpdateManyMutationInput, where?: StyleSpreadWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyComponents(args: { data: ComponentUpdateManyMutationInput, where?: ComponentWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyUsers(args: { data: UserUpdateManyMutationInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyElements(args: { data: ElementUpdateManyMutationInput, where?: ElementWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyBorderValues(args: { data: BorderValueUpdateManyMutationInput, where?: BorderValueWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyDimensionValues(args: { data: DimensionValueUpdateManyMutationInput, where?: DimensionValueWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyColorValues(args: { data: ColorValueUpdateManyMutationInput, where?: ColorValueWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    updateManyStyles(args: { data: StyleUpdateManyMutationInput, where?: StyleWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyWebs(args: { where?: WebWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyPages(args: { where?: PageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManySharedElements(args: { where?: SharedElementWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyComponentProps(args: { where?: ComponentPropWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyElementProps(args: { where?: ElementPropWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyStyleSpreads(args: { where?: StyleSpreadWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyComponents(args: { where?: ComponentWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyUsers(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyElements(args: { where?: ElementWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyBorderValues(args: { where?: BorderValueWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyDimensionValues(args: { where?: DimensionValueWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyColorValues(args: { where?: ColorValueWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    deleteManyStyles(args: { where?: StyleWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<BatchPayload>; 
    executeRaw(args: { database?: PrismaDatabase, query: String }, info?: GraphQLResolveInfo | string, options?: Options): Promise<Json>; 
  }

export interface Subscription {
    web(args: { where?: WebSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<WebSubscriptionPayload | null>>; 
    page(args: { where?: PageSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<PageSubscriptionPayload | null>>; 
    sharedElement(args: { where?: SharedElementSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<SharedElementSubscriptionPayload | null>>; 
    componentProp(args: { where?: ComponentPropSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ComponentPropSubscriptionPayload | null>>; 
    elementProp(args: { where?: ElementPropSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ElementPropSubscriptionPayload | null>>; 
    styleSpread(args: { where?: StyleSpreadSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<StyleSpreadSubscriptionPayload | null>>; 
    component(args: { where?: ComponentSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ComponentSubscriptionPayload | null>>; 
    user(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<UserSubscriptionPayload | null>>; 
    element(args: { where?: ElementSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ElementSubscriptionPayload | null>>; 
    borderValue(args: { where?: BorderValueSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<BorderValueSubscriptionPayload | null>>; 
    dimensionValue(args: { where?: DimensionValueSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<DimensionValueSubscriptionPayload | null>>; 
    colorValue(args: { where?: ColorValueSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<ColorValueSubscriptionPayload | null>>; 
    style(args: { where?: StyleSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<StyleSubscriptionPayload | null>>; 
  }

export interface Exists {
Web(where?: WebWhereInput): Promise<boolean>;
Page(where?: PageWhereInput): Promise<boolean>;
SharedElement(where?: SharedElementWhereInput): Promise<boolean>;
ComponentProp(where?: ComponentPropWhereInput): Promise<boolean>;
ElementProp(where?: ElementPropWhereInput): Promise<boolean>;
StyleSpread(where?: StyleSpreadWhereInput): Promise<boolean>;
Component(where?: ComponentWhereInput): Promise<boolean>;
User(where?: UserWhereInput): Promise<boolean>;
Element(where?: ElementWhereInput): Promise<boolean>;
BorderValue(where?: BorderValueWhereInput): Promise<boolean>;
DimensionValue(where?: DimensionValueWhereInput): Promise<boolean>;
ColorValue(where?: ColorValueWhereInput): Promise<boolean>;
Style(where?: StyleWhereInput): Promise<boolean>;
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

type AggregateComponentProp {
  count: Int!
}

type AggregateDimensionValue {
  count: Int!
}

type AggregateElement {
  count: Int!
}

type AggregateElementProp {
  count: Int!
}

type AggregatePage {
  count: Int!
}

type AggregateSharedElement {
  count: Int!
}

type AggregateStyle {
  count: Int!
}

type AggregateStyleSpread {
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

type BorderValue implements Node {
  id: ID!
  web: Web!
  name: String
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

"""An edge in a connection."""
type BorderValueEdge {
  """The item at the end of the edge."""
  node: BorderValue!

  """A cursor for use in pagination."""
  cursor: String!
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

type BorderValuePreviousValues {
  id: ID!
  name: String
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
  name: String
  unit: BorderValueUnit
  value: Int
  web: WebUpdateOneRequiredWithoutBorderValuesInput
}

input BorderValueUpdateInput {
  name: String
  unit: BorderValueUnit
  value: Int
  web: WebUpdateOneRequiredWithoutBorderValuesInput
}

input BorderValueUpdateManyMutationInput {
  name: String
  unit: BorderValueUnit
  value: Int
}

input BorderValueUpdateManyWithoutWebInput {
  create: [BorderValueCreateWithoutWebInput!]
  connect: [BorderValueWhereUniqueInput!]
  disconnect: [BorderValueWhereUniqueInput!]
  delete: [BorderValueWhereUniqueInput!]
  update: [BorderValueUpdateWithWhereUniqueWithoutWebInput!]
  upsert: [BorderValueUpsertWithWhereUniqueWithoutWebInput!]
}

input BorderValueUpdateOneInput {
  create: BorderValueCreateInput
  connect: BorderValueWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: BorderValueUpdateDataInput
  upsert: BorderValueUpsertNestedInput
}

input BorderValueUpdateWithoutWebDataInput {
  name: String
  unit: BorderValueUnit
  value: Int
}

input BorderValueUpdateWithWhereUniqueWithoutWebInput {
  where: BorderValueWhereUniqueInput!
  data: BorderValueUpdateWithoutWebDataInput!
}

input BorderValueUpsertNestedInput {
  update: BorderValueUpdateDataInput!
  create: BorderValueCreateInput!
}

input BorderValueUpsertWithWhereUniqueWithoutWebInput {
  where: BorderValueWhereUniqueInput!
  update: BorderValueUpdateWithoutWebDataInput!
  create: BorderValueCreateWithoutWebInput!
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

input ColorValueUpdateManyMutationInput {
  name: String
  r: Int
  g: Int
  b: Int
  a: Float
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
  name: String!
  creator: User!
  props(where: ComponentPropWhereInput, orderBy: ComponentPropOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ComponentProp!]
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

input ComponentCreateOneWithoutPropsInput {
  create: ComponentCreateWithoutPropsInput
  connect: ComponentWhereUniqueInput
}

input ComponentCreateWithoutCreatorInput {
  name: String!
  props: ComponentPropCreateManyWithoutComponentInput
}

input ComponentCreateWithoutPropsInput {
  name: String!
  creator: UserCreateOneWithoutComponentsInput!
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

type ComponentProp implements Node {
  id: ID!
  component: Component!
  name: String!
  type: PropType!
}

"""A connection to a list of items."""
type ComponentPropConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ComponentPropEdge]!
  aggregate: AggregateComponentProp!
}

input ComponentPropCreateInput {
  name: String!
  type: PropType!
  component: ComponentCreateOneWithoutPropsInput!
}

input ComponentPropCreateManyWithoutComponentInput {
  create: [ComponentPropCreateWithoutComponentInput!]
  connect: [ComponentPropWhereUniqueInput!]
}

input ComponentPropCreateWithoutComponentInput {
  name: String!
  type: PropType!
}

"""An edge in a connection."""
type ComponentPropEdge {
  """The item at the end of the edge."""
  node: ComponentProp!

  """A cursor for use in pagination."""
  cursor: String!
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

type ComponentPropPreviousValues {
  id: ID!
  name: String!
  type: PropType!
}

type ComponentPropSubscriptionPayload {
  mutation: MutationType!
  node: ComponentProp
  updatedFields: [String!]
  previousValues: ComponentPropPreviousValues
}

input ComponentPropSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ComponentPropSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ComponentPropSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ComponentPropSubscriptionWhereInput!]

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
  node: ComponentPropWhereInput
}

input ComponentPropUpdateInput {
  name: String
  type: PropType
  component: ComponentUpdateOneRequiredWithoutPropsInput
}

input ComponentPropUpdateManyMutationInput {
  name: String
  type: PropType
}

input ComponentPropUpdateManyWithoutComponentInput {
  create: [ComponentPropCreateWithoutComponentInput!]
  connect: [ComponentPropWhereUniqueInput!]
  disconnect: [ComponentPropWhereUniqueInput!]
  delete: [ComponentPropWhereUniqueInput!]
  update: [ComponentPropUpdateWithWhereUniqueWithoutComponentInput!]
  upsert: [ComponentPropUpsertWithWhereUniqueWithoutComponentInput!]
}

input ComponentPropUpdateWithoutComponentDataInput {
  name: String
  type: PropType
}

input ComponentPropUpdateWithWhereUniqueWithoutComponentInput {
  where: ComponentPropWhereUniqueInput!
  data: ComponentPropUpdateWithoutComponentDataInput!
}

input ComponentPropUpsertWithWhereUniqueWithoutComponentInput {
  where: ComponentPropWhereUniqueInput!
  update: ComponentPropUpdateWithoutComponentDataInput!
  create: ComponentPropCreateWithoutComponentInput!
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
  creator: UserUpdateOneRequiredWithoutComponentsInput
  props: ComponentPropUpdateManyWithoutComponentInput
}

input ComponentUpdateInput {
  name: String
  creator: UserUpdateOneRequiredWithoutComponentsInput
  props: ComponentPropUpdateManyWithoutComponentInput
}

input ComponentUpdateManyMutationInput {
  name: String
}

input ComponentUpdateManyWithoutCreatorInput {
  create: [ComponentCreateWithoutCreatorInput!]
  connect: [ComponentWhereUniqueInput!]
  disconnect: [ComponentWhereUniqueInput!]
  delete: [ComponentWhereUniqueInput!]
  update: [ComponentUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [ComponentUpsertWithWhereUniqueWithoutCreatorInput!]
}

input ComponentUpdateOneRequiredInput {
  create: ComponentCreateInput
  connect: ComponentWhereUniqueInput
  update: ComponentUpdateDataInput
  upsert: ComponentUpsertNestedInput
}

input ComponentUpdateOneRequiredWithoutPropsInput {
  create: ComponentCreateWithoutPropsInput
  connect: ComponentWhereUniqueInput
  update: ComponentUpdateWithoutPropsDataInput
  upsert: ComponentUpsertWithoutPropsInput
}

input ComponentUpdateWithoutCreatorDataInput {
  name: String
  props: ComponentPropUpdateManyWithoutComponentInput
}

input ComponentUpdateWithoutPropsDataInput {
  name: String
  creator: UserUpdateOneRequiredWithoutComponentsInput
}

input ComponentUpdateWithWhereUniqueWithoutCreatorInput {
  where: ComponentWhereUniqueInput!
  data: ComponentUpdateWithoutCreatorDataInput!
}

input ComponentUpsertNestedInput {
  update: ComponentUpdateDataInput!
  create: ComponentCreateInput!
}

input ComponentUpsertWithoutPropsInput {
  update: ComponentUpdateWithoutPropsDataInput!
  create: ComponentCreateWithoutPropsInput!
}

input ComponentUpsertWithWhereUniqueWithoutCreatorInput {
  where: ComponentWhereUniqueInput!
  update: ComponentUpdateWithoutCreatorDataInput!
  create: ComponentCreateWithoutCreatorInput!
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
  KEYWORD
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

input DimensionValueUpdateManyMutationInput {
  name: String
  unit: DimensionValueUnit
  value: Int
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

input ElementCreateManyWithoutSharedInput {
  create: [ElementCreateWithoutSharedInput!]
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

input ElementCreateWithoutSharedInput {
  type: ElementType!
  index: Int!
  textLeaves: Json
  web: WebCreateOneWithoutElementsInput!
  parent: ElementCreateOneWithoutChildrenInput
  children: ElementCreateManyWithoutParentInput
  component: ComponentCreateOneInput!
  props: ElementPropCreateManyWithoutElementInput
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
  index_ASC
  index_DESC
  textLeaves_ASC
  textLeaves_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ElementPreviousValues {
  id: ID!
  type: ElementType!
  index: Int!
  textLeaves: Json
}

type ElementProp implements Node {
  id: ID!
  element: Element!
  name: String!
  type: PropType!
  valueStyle: Style
  value: String
}

"""A connection to a list of items."""
type ElementPropConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ElementPropEdge]!
  aggregate: AggregateElementProp!
}

input ElementPropCreateInput {
  name: String!
  type: PropType!
  value: String
  element: ElementCreateOneWithoutPropsInput!
  valueStyle: StyleCreateOneWithoutPropsInput
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

"""An edge in a connection."""
type ElementPropEdge {
  """The item at the end of the edge."""
  node: ElementProp!

  """A cursor for use in pagination."""
  cursor: String!
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

type ElementPropPreviousValues {
  id: ID!
  name: String!
  type: PropType!
  value: String
}

type ElementPropSubscriptionPayload {
  mutation: MutationType!
  node: ElementProp
  updatedFields: [String!]
  previousValues: ElementPropPreviousValues
}

input ElementPropSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ElementPropSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ElementPropSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ElementPropSubscriptionWhereInput!]

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
  node: ElementPropWhereInput
}

input ElementPropUpdateInput {
  name: String
  type: PropType
  value: String
  element: ElementUpdateOneRequiredWithoutPropsInput
  valueStyle: StyleUpdateOneWithoutPropsInput
}

input ElementPropUpdateManyMutationInput {
  name: String
  type: PropType
  value: String
}

input ElementPropUpdateManyWithoutElementInput {
  create: [ElementPropCreateWithoutElementInput!]
  connect: [ElementPropWhereUniqueInput!]
  disconnect: [ElementPropWhereUniqueInput!]
  delete: [ElementPropWhereUniqueInput!]
  update: [ElementPropUpdateWithWhereUniqueWithoutElementInput!]
  upsert: [ElementPropUpsertWithWhereUniqueWithoutElementInput!]
}

input ElementPropUpdateManyWithoutValueStyleInput {
  create: [ElementPropCreateWithoutValueStyleInput!]
  connect: [ElementPropWhereUniqueInput!]
  disconnect: [ElementPropWhereUniqueInput!]
  delete: [ElementPropWhereUniqueInput!]
  update: [ElementPropUpdateWithWhereUniqueWithoutValueStyleInput!]
  upsert: [ElementPropUpsertWithWhereUniqueWithoutValueStyleInput!]
}

input ElementPropUpdateWithoutElementDataInput {
  name: String
  type: PropType
  value: String
  valueStyle: StyleUpdateOneWithoutPropsInput
}

input ElementPropUpdateWithoutValueStyleDataInput {
  name: String
  type: PropType
  value: String
  element: ElementUpdateOneRequiredWithoutPropsInput
}

input ElementPropUpdateWithWhereUniqueWithoutElementInput {
  where: ElementPropWhereUniqueInput!
  data: ElementPropUpdateWithoutElementDataInput!
}

input ElementPropUpdateWithWhereUniqueWithoutValueStyleInput {
  where: ElementPropWhereUniqueInput!
  data: ElementPropUpdateWithoutValueStyleDataInput!
}

input ElementPropUpsertWithWhereUniqueWithoutElementInput {
  where: ElementPropWhereUniqueInput!
  update: ElementPropUpdateWithoutElementDataInput!
  create: ElementPropCreateWithoutElementInput!
}

input ElementPropUpsertWithWhereUniqueWithoutValueStyleInput {
  where: ElementPropWhereUniqueInput!
  update: ElementPropUpdateWithoutValueStyleDataInput!
  create: ElementPropCreateWithoutValueStyleInput!
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
  BLOCK
  INLINE
  TEXT
}

input ElementUpdateDataInput {
  type: ElementType
  index: Int
  textLeaves: Json
  web: WebUpdateOneRequiredWithoutElementsInput
  parent: ElementUpdateOneWithoutChildrenInput
  children: ElementUpdateManyWithoutParentInput
  shared: SharedElementUpdateOneWithoutSharedByInput
  component: ComponentUpdateOneRequiredInput
  props: ElementPropUpdateManyWithoutElementInput
}

input ElementUpdateInput {
  type: ElementType
  index: Int
  textLeaves: Json
  web: WebUpdateOneRequiredWithoutElementsInput
  parent: ElementUpdateOneWithoutChildrenInput
  children: ElementUpdateManyWithoutParentInput
  shared: SharedElementUpdateOneWithoutSharedByInput
  component: ComponentUpdateOneRequiredInput
  props: ElementPropUpdateManyWithoutElementInput
}

input ElementUpdateManyMutationInput {
  type: ElementType
  index: Int
  textLeaves: Json
}

input ElementUpdateManyWithoutParentInput {
  create: [ElementCreateWithoutParentInput!]
  connect: [ElementWhereUniqueInput!]
  disconnect: [ElementWhereUniqueInput!]
  delete: [ElementWhereUniqueInput!]
  update: [ElementUpdateWithWhereUniqueWithoutParentInput!]
  upsert: [ElementUpsertWithWhereUniqueWithoutParentInput!]
}

input ElementUpdateManyWithoutSharedInput {
  create: [ElementCreateWithoutSharedInput!]
  connect: [ElementWhereUniqueInput!]
  disconnect: [ElementWhereUniqueInput!]
  delete: [ElementWhereUniqueInput!]
  update: [ElementUpdateWithWhereUniqueWithoutSharedInput!]
  upsert: [ElementUpsertWithWhereUniqueWithoutSharedInput!]
}

input ElementUpdateManyWithoutWebInput {
  create: [ElementCreateWithoutWebInput!]
  connect: [ElementWhereUniqueInput!]
  disconnect: [ElementWhereUniqueInput!]
  delete: [ElementWhereUniqueInput!]
  update: [ElementUpdateWithWhereUniqueWithoutWebInput!]
  upsert: [ElementUpsertWithWhereUniqueWithoutWebInput!]
}

input ElementUpdateOneRequiredInput {
  create: ElementCreateInput
  connect: ElementWhereUniqueInput
  update: ElementUpdateDataInput
  upsert: ElementUpsertNestedInput
}

input ElementUpdateOneRequiredWithoutPropsInput {
  create: ElementCreateWithoutPropsInput
  connect: ElementWhereUniqueInput
  update: ElementUpdateWithoutPropsDataInput
  upsert: ElementUpsertWithoutPropsInput
}

input ElementUpdateOneWithoutChildrenInput {
  create: ElementCreateWithoutChildrenInput
  connect: ElementWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ElementUpdateWithoutChildrenDataInput
  upsert: ElementUpsertWithoutChildrenInput
}

input ElementUpdateWithoutChildrenDataInput {
  type: ElementType
  index: Int
  textLeaves: Json
  web: WebUpdateOneRequiredWithoutElementsInput
  parent: ElementUpdateOneWithoutChildrenInput
  shared: SharedElementUpdateOneWithoutSharedByInput
  component: ComponentUpdateOneRequiredInput
  props: ElementPropUpdateManyWithoutElementInput
}

input ElementUpdateWithoutParentDataInput {
  type: ElementType
  index: Int
  textLeaves: Json
  web: WebUpdateOneRequiredWithoutElementsInput
  children: ElementUpdateManyWithoutParentInput
  shared: SharedElementUpdateOneWithoutSharedByInput
  component: ComponentUpdateOneRequiredInput
  props: ElementPropUpdateManyWithoutElementInput
}

input ElementUpdateWithoutPropsDataInput {
  type: ElementType
  index: Int
  textLeaves: Json
  web: WebUpdateOneRequiredWithoutElementsInput
  parent: ElementUpdateOneWithoutChildrenInput
  children: ElementUpdateManyWithoutParentInput
  shared: SharedElementUpdateOneWithoutSharedByInput
  component: ComponentUpdateOneRequiredInput
}

input ElementUpdateWithoutSharedDataInput {
  type: ElementType
  index: Int
  textLeaves: Json
  web: WebUpdateOneRequiredWithoutElementsInput
  parent: ElementUpdateOneWithoutChildrenInput
  children: ElementUpdateManyWithoutParentInput
  component: ComponentUpdateOneRequiredInput
  props: ElementPropUpdateManyWithoutElementInput
}

input ElementUpdateWithoutWebDataInput {
  type: ElementType
  index: Int
  textLeaves: Json
  parent: ElementUpdateOneWithoutChildrenInput
  children: ElementUpdateManyWithoutParentInput
  shared: SharedElementUpdateOneWithoutSharedByInput
  component: ComponentUpdateOneRequiredInput
  props: ElementPropUpdateManyWithoutElementInput
}

input ElementUpdateWithWhereUniqueWithoutParentInput {
  where: ElementWhereUniqueInput!
  data: ElementUpdateWithoutParentDataInput!
}

input ElementUpdateWithWhereUniqueWithoutSharedInput {
  where: ElementWhereUniqueInput!
  data: ElementUpdateWithoutSharedDataInput!
}

input ElementUpdateWithWhereUniqueWithoutWebInput {
  where: ElementWhereUniqueInput!
  data: ElementUpdateWithoutWebDataInput!
}

input ElementUpsertNestedInput {
  update: ElementUpdateDataInput!
  create: ElementCreateInput!
}

input ElementUpsertWithoutChildrenInput {
  update: ElementUpdateWithoutChildrenDataInput!
  create: ElementCreateWithoutChildrenInput!
}

input ElementUpsertWithoutPropsInput {
  update: ElementUpdateWithoutPropsDataInput!
  create: ElementCreateWithoutPropsInput!
}

input ElementUpsertWithWhereUniqueWithoutParentInput {
  where: ElementWhereUniqueInput!
  update: ElementUpdateWithoutParentDataInput!
  create: ElementCreateWithoutParentInput!
}

input ElementUpsertWithWhereUniqueWithoutSharedInput {
  where: ElementWhereUniqueInput!
  update: ElementUpdateWithoutSharedDataInput!
  create: ElementCreateWithoutSharedInput!
}

input ElementUpsertWithWhereUniqueWithoutWebInput {
  where: ElementWhereUniqueInput!
  update: ElementUpdateWithoutWebDataInput!
  create: ElementCreateWithoutWebInput!
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

"""Raw JSON value"""
scalar Json

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createWeb(data: WebCreateInput!): Web!
  createPage(data: PageCreateInput!): Page!
  createSharedElement(data: SharedElementCreateInput!): SharedElement!
  createComponentProp(data: ComponentPropCreateInput!): ComponentProp!
  createElementProp(data: ElementPropCreateInput!): ElementProp!
  createStyleSpread(data: StyleSpreadCreateInput!): StyleSpread!
  createComponent(data: ComponentCreateInput!): Component!
  createUser(data: UserCreateInput!): User!
  createElement(data: ElementCreateInput!): Element!
  createBorderValue(data: BorderValueCreateInput!): BorderValue!
  createDimensionValue(data: DimensionValueCreateInput!): DimensionValue!
  createColorValue(data: ColorValueCreateInput!): ColorValue!
  createStyle(data: StyleCreateInput!): Style!
  updateWeb(data: WebUpdateInput!, where: WebWhereUniqueInput!): Web
  updatePage(data: PageUpdateInput!, where: PageWhereUniqueInput!): Page
  updateSharedElement(data: SharedElementUpdateInput!, where: SharedElementWhereUniqueInput!): SharedElement
  updateComponentProp(data: ComponentPropUpdateInput!, where: ComponentPropWhereUniqueInput!): ComponentProp
  updateElementProp(data: ElementPropUpdateInput!, where: ElementPropWhereUniqueInput!): ElementProp
  updateStyleSpread(data: StyleSpreadUpdateInput!, where: StyleSpreadWhereUniqueInput!): StyleSpread
  updateComponent(data: ComponentUpdateInput!, where: ComponentWhereUniqueInput!): Component
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateElement(data: ElementUpdateInput!, where: ElementWhereUniqueInput!): Element
  updateBorderValue(data: BorderValueUpdateInput!, where: BorderValueWhereUniqueInput!): BorderValue
  updateDimensionValue(data: DimensionValueUpdateInput!, where: DimensionValueWhereUniqueInput!): DimensionValue
  updateColorValue(data: ColorValueUpdateInput!, where: ColorValueWhereUniqueInput!): ColorValue
  updateStyle(data: StyleUpdateInput!, where: StyleWhereUniqueInput!): Style
  deleteWeb(where: WebWhereUniqueInput!): Web
  deletePage(where: PageWhereUniqueInput!): Page
  deleteSharedElement(where: SharedElementWhereUniqueInput!): SharedElement
  deleteComponentProp(where: ComponentPropWhereUniqueInput!): ComponentProp
  deleteElementProp(where: ElementPropWhereUniqueInput!): ElementProp
  deleteStyleSpread(where: StyleSpreadWhereUniqueInput!): StyleSpread
  deleteComponent(where: ComponentWhereUniqueInput!): Component
  deleteUser(where: UserWhereUniqueInput!): User
  deleteElement(where: ElementWhereUniqueInput!): Element
  deleteBorderValue(where: BorderValueWhereUniqueInput!): BorderValue
  deleteDimensionValue(where: DimensionValueWhereUniqueInput!): DimensionValue
  deleteColorValue(where: ColorValueWhereUniqueInput!): ColorValue
  deleteStyle(where: StyleWhereUniqueInput!): Style
  upsertWeb(where: WebWhereUniqueInput!, create: WebCreateInput!, update: WebUpdateInput!): Web!
  upsertPage(where: PageWhereUniqueInput!, create: PageCreateInput!, update: PageUpdateInput!): Page!
  upsertSharedElement(where: SharedElementWhereUniqueInput!, create: SharedElementCreateInput!, update: SharedElementUpdateInput!): SharedElement!
  upsertComponentProp(where: ComponentPropWhereUniqueInput!, create: ComponentPropCreateInput!, update: ComponentPropUpdateInput!): ComponentProp!
  upsertElementProp(where: ElementPropWhereUniqueInput!, create: ElementPropCreateInput!, update: ElementPropUpdateInput!): ElementProp!
  upsertStyleSpread(where: StyleSpreadWhereUniqueInput!, create: StyleSpreadCreateInput!, update: StyleSpreadUpdateInput!): StyleSpread!
  upsertComponent(where: ComponentWhereUniqueInput!, create: ComponentCreateInput!, update: ComponentUpdateInput!): Component!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertElement(where: ElementWhereUniqueInput!, create: ElementCreateInput!, update: ElementUpdateInput!): Element!
  upsertBorderValue(where: BorderValueWhereUniqueInput!, create: BorderValueCreateInput!, update: BorderValueUpdateInput!): BorderValue!
  upsertDimensionValue(where: DimensionValueWhereUniqueInput!, create: DimensionValueCreateInput!, update: DimensionValueUpdateInput!): DimensionValue!
  upsertColorValue(where: ColorValueWhereUniqueInput!, create: ColorValueCreateInput!, update: ColorValueUpdateInput!): ColorValue!
  upsertStyle(where: StyleWhereUniqueInput!, create: StyleCreateInput!, update: StyleUpdateInput!): Style!
  updateManyWebs(data: WebUpdateManyMutationInput!, where: WebWhereInput): BatchPayload!
  updateManyPages(data: PageUpdateManyMutationInput!, where: PageWhereInput): BatchPayload!
  updateManySharedElements(data: SharedElementUpdateManyMutationInput!, where: SharedElementWhereInput): BatchPayload!
  updateManyComponentProps(data: ComponentPropUpdateManyMutationInput!, where: ComponentPropWhereInput): BatchPayload!
  updateManyElementProps(data: ElementPropUpdateManyMutationInput!, where: ElementPropWhereInput): BatchPayload!
  updateManyStyleSpreads(data: StyleSpreadUpdateManyMutationInput!, where: StyleSpreadWhereInput): BatchPayload!
  updateManyComponents(data: ComponentUpdateManyMutationInput!, where: ComponentWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  updateManyElements(data: ElementUpdateManyMutationInput!, where: ElementWhereInput): BatchPayload!
  updateManyBorderValues(data: BorderValueUpdateManyMutationInput!, where: BorderValueWhereInput): BatchPayload!
  updateManyDimensionValues(data: DimensionValueUpdateManyMutationInput!, where: DimensionValueWhereInput): BatchPayload!
  updateManyColorValues(data: ColorValueUpdateManyMutationInput!, where: ColorValueWhereInput): BatchPayload!
  updateManyStyles(data: StyleUpdateManyMutationInput!, where: StyleWhereInput): BatchPayload!
  deleteManyWebs(where: WebWhereInput): BatchPayload!
  deleteManyPages(where: PageWhereInput): BatchPayload!
  deleteManySharedElements(where: SharedElementWhereInput): BatchPayload!
  deleteManyComponentProps(where: ComponentPropWhereInput): BatchPayload!
  deleteManyElementProps(where: ElementPropWhereInput): BatchPayload!
  deleteManyStyleSpreads(where: StyleSpreadWhereInput): BatchPayload!
  deleteManyComponents(where: ComponentWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyElements(where: ElementWhereInput): BatchPayload!
  deleteManyBorderValues(where: BorderValueWhereInput): BatchPayload!
  deleteManyDimensionValues(where: DimensionValueWhereInput): BatchPayload!
  deleteManyColorValues(where: ColorValueWhereInput): BatchPayload!
  deleteManyStyles(where: StyleWhereInput): BatchPayload!
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
  element: Element!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
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
  creator: UserCreateOneInput!
  web: WebCreateOneWithoutPagesInput!
  element: ElementCreateOneInput!
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
  creator: UserUpdateOneRequiredInput
  web: WebUpdateOneRequiredWithoutPagesInput
  element: ElementUpdateOneRequiredInput
}

input PageUpdateManyMutationInput {
  title: String
}

input PageUpdateManyWithoutWebInput {
  create: [PageCreateWithoutWebInput!]
  connect: [PageWhereUniqueInput!]
  disconnect: [PageWhereUniqueInput!]
  delete: [PageWhereUniqueInput!]
  update: [PageUpdateWithWhereUniqueWithoutWebInput!]
  upsert: [PageUpsertWithWhereUniqueWithoutWebInput!]
}

input PageUpdateWithoutWebDataInput {
  title: String
  creator: UserUpdateOneRequiredInput
  element: ElementUpdateOneRequiredInput
}

input PageUpdateWithWhereUniqueWithoutWebInput {
  where: PageWhereUniqueInput!
  data: PageUpdateWithoutWebDataInput!
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

enum PrismaDatabase {
  default
}

enum PropType {
  BOOLEAN
  NUMBER
  STRING
  VIEW_STYLE
  TEXT_STYLE
}

type Query {
  webs(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Web]!
  pages(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Page]!
  sharedElements(where: SharedElementWhereInput, orderBy: SharedElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SharedElement]!
  componentProps(where: ComponentPropWhereInput, orderBy: ComponentPropOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ComponentProp]!
  elementProps(where: ElementPropWhereInput, orderBy: ElementPropOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ElementProp]!
  styleSpreads(where: StyleSpreadWhereInput, orderBy: StyleSpreadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StyleSpread]!
  components(where: ComponentWhereInput, orderBy: ComponentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Component]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  elements(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Element]!
  borderValues(where: BorderValueWhereInput, orderBy: BorderValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [BorderValue]!
  dimensionValues(where: DimensionValueWhereInput, orderBy: DimensionValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DimensionValue]!
  colorValues(where: ColorValueWhereInput, orderBy: ColorValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ColorValue]!
  styles(where: StyleWhereInput, orderBy: StyleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Style]!
  web(where: WebWhereUniqueInput!): Web
  page(where: PageWhereUniqueInput!): Page
  sharedElement(where: SharedElementWhereUniqueInput!): SharedElement
  componentProp(where: ComponentPropWhereUniqueInput!): ComponentProp
  elementProp(where: ElementPropWhereUniqueInput!): ElementProp
  styleSpread(where: StyleSpreadWhereUniqueInput!): StyleSpread
  component(where: ComponentWhereUniqueInput!): Component
  user(where: UserWhereUniqueInput!): User
  element(where: ElementWhereUniqueInput!): Element
  borderValue(where: BorderValueWhereUniqueInput!): BorderValue
  dimensionValue(where: DimensionValueWhereUniqueInput!): DimensionValue
  colorValue(where: ColorValueWhereUniqueInput!): ColorValue
  style(where: StyleWhereUniqueInput!): Style
  websConnection(where: WebWhereInput, orderBy: WebOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WebConnection!
  pagesConnection(where: PageWhereInput, orderBy: PageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PageConnection!
  sharedElementsConnection(where: SharedElementWhereInput, orderBy: SharedElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SharedElementConnection!
  componentPropsConnection(where: ComponentPropWhereInput, orderBy: ComponentPropOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ComponentPropConnection!
  elementPropsConnection(where: ElementPropWhereInput, orderBy: ElementPropOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ElementPropConnection!
  styleSpreadsConnection(where: StyleSpreadWhereInput, orderBy: StyleSpreadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StyleSpreadConnection!
  componentsConnection(where: ComponentWhereInput, orderBy: ComponentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ComponentConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  elementsConnection(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ElementConnection!
  borderValuesConnection(where: BorderValueWhereInput, orderBy: BorderValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BorderValueConnection!
  dimensionValuesConnection(where: DimensionValueWhereInput, orderBy: DimensionValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DimensionValueConnection!
  colorValuesConnection(where: ColorValueWhereInput, orderBy: ColorValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ColorValueConnection!
  stylesConnection(where: StyleWhereInput, orderBy: StyleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StyleConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type SharedElement implements Node {
  id: ID!
  sharedBy(where: ElementWhereInput, orderBy: ElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Element!]
  name: String!
  element: Element!
}

"""A connection to a list of items."""
type SharedElementConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [SharedElementEdge]!
  aggregate: AggregateSharedElement!
}

input SharedElementCreateInput {
  name: String!
  sharedBy: ElementCreateManyWithoutSharedInput
  element: ElementCreateOneInput!
}

input SharedElementCreateOneWithoutSharedByInput {
  create: SharedElementCreateWithoutSharedByInput
  connect: SharedElementWhereUniqueInput
}

input SharedElementCreateWithoutSharedByInput {
  name: String!
  element: ElementCreateOneInput!
}

"""An edge in a connection."""
type SharedElementEdge {
  """The item at the end of the edge."""
  node: SharedElement!

  """A cursor for use in pagination."""
  cursor: String!
}

enum SharedElementOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type SharedElementPreviousValues {
  id: ID!
  name: String!
}

type SharedElementSubscriptionPayload {
  mutation: MutationType!
  node: SharedElement
  updatedFields: [String!]
  previousValues: SharedElementPreviousValues
}

input SharedElementSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [SharedElementSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [SharedElementSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SharedElementSubscriptionWhereInput!]

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
  node: SharedElementWhereInput
}

input SharedElementUpdateInput {
  name: String
  sharedBy: ElementUpdateManyWithoutSharedInput
  element: ElementUpdateOneRequiredInput
}

input SharedElementUpdateManyMutationInput {
  name: String
}

input SharedElementUpdateOneWithoutSharedByInput {
  create: SharedElementCreateWithoutSharedByInput
  connect: SharedElementWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: SharedElementUpdateWithoutSharedByDataInput
  upsert: SharedElementUpsertWithoutSharedByInput
}

input SharedElementUpdateWithoutSharedByDataInput {
  name: String
  element: ElementUpdateOneRequiredInput
}

input SharedElementUpsertWithoutSharedByInput {
  update: SharedElementUpdateWithoutSharedByDataInput!
  create: SharedElementCreateWithoutSharedByInput!
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

"""A connection to a list of items."""
type StyleConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [StyleEdge]!
  aggregate: AggregateStyle!
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

input StyleCreateOneWithoutSpreadStylesInput {
  create: StyleCreateWithoutSpreadStylesInput
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

input StyleCreateWithoutSpreadStylesInput {
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

type StylePreviousValues {
  id: ID!
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
}

type StyleSpread implements Node {
  id: ID!
  spreadStyle: Style!
  index: Int!
  style: Style!
}

"""A connection to a list of items."""
type StyleSpreadConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [StyleSpreadEdge]!
  aggregate: AggregateStyleSpread!
}

input StyleSpreadCreateInput {
  index: Int!
  spreadStyle: StyleCreateOneWithoutSpreadStylesInput!
  style: StyleCreateOneInput!
}

input StyleSpreadCreateManyWithoutSpreadStyleInput {
  create: [StyleSpreadCreateWithoutSpreadStyleInput!]
  connect: [StyleSpreadWhereUniqueInput!]
}

input StyleSpreadCreateWithoutSpreadStyleInput {
  index: Int!
  style: StyleCreateOneInput!
}

"""An edge in a connection."""
type StyleSpreadEdge {
  """The item at the end of the edge."""
  node: StyleSpread!

  """A cursor for use in pagination."""
  cursor: String!
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

type StyleSpreadPreviousValues {
  id: ID!
  index: Int!
}

type StyleSpreadSubscriptionPayload {
  mutation: MutationType!
  node: StyleSpread
  updatedFields: [String!]
  previousValues: StyleSpreadPreviousValues
}

input StyleSpreadSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [StyleSpreadSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [StyleSpreadSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StyleSpreadSubscriptionWhereInput!]

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
  node: StyleSpreadWhereInput
}

input StyleSpreadUpdateInput {
  index: Int
  spreadStyle: StyleUpdateOneRequiredWithoutSpreadStylesInput
  style: StyleUpdateOneRequiredInput
}

input StyleSpreadUpdateManyMutationInput {
  index: Int
}

input StyleSpreadUpdateManyWithoutSpreadStyleInput {
  create: [StyleSpreadCreateWithoutSpreadStyleInput!]
  connect: [StyleSpreadWhereUniqueInput!]
  disconnect: [StyleSpreadWhereUniqueInput!]
  delete: [StyleSpreadWhereUniqueInput!]
  update: [StyleSpreadUpdateWithWhereUniqueWithoutSpreadStyleInput!]
  upsert: [StyleSpreadUpsertWithWhereUniqueWithoutSpreadStyleInput!]
}

input StyleSpreadUpdateWithoutSpreadStyleDataInput {
  index: Int
  style: StyleUpdateOneRequiredInput
}

input StyleSpreadUpdateWithWhereUniqueWithoutSpreadStyleInput {
  where: StyleSpreadWhereUniqueInput!
  data: StyleSpreadUpdateWithoutSpreadStyleDataInput!
}

input StyleSpreadUpsertWithWhereUniqueWithoutSpreadStyleInput {
  where: StyleSpreadWhereUniqueInput!
  update: StyleSpreadUpdateWithoutSpreadStyleDataInput!
  create: StyleSpreadCreateWithoutSpreadStyleInput!
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

input StyleUpdateDataInput {
  name: String
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
  web: WebUpdateOneRequiredWithoutStylesInput
  props: ElementPropUpdateManyWithoutValueStyleInput
  spreadStyles: StyleSpreadUpdateManyWithoutSpreadStyleInput
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
  name: String
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
  web: WebUpdateOneRequiredWithoutStylesInput
  props: ElementPropUpdateManyWithoutValueStyleInput
  spreadStyles: StyleSpreadUpdateManyWithoutSpreadStyleInput
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

input StyleUpdateManyMutationInput {
  name: String
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
}

input StyleUpdateManyWithoutWebInput {
  create: [StyleCreateWithoutWebInput!]
  connect: [StyleWhereUniqueInput!]
  disconnect: [StyleWhereUniqueInput!]
  delete: [StyleWhereUniqueInput!]
  update: [StyleUpdateWithWhereUniqueWithoutWebInput!]
  upsert: [StyleUpsertWithWhereUniqueWithoutWebInput!]
}

input StyleUpdateOneRequiredInput {
  create: StyleCreateInput
  connect: StyleWhereUniqueInput
  update: StyleUpdateDataInput
  upsert: StyleUpsertNestedInput
}

input StyleUpdateOneRequiredWithoutSpreadStylesInput {
  create: StyleCreateWithoutSpreadStylesInput
  connect: StyleWhereUniqueInput
  update: StyleUpdateWithoutSpreadStylesDataInput
  upsert: StyleUpsertWithoutSpreadStylesInput
}

input StyleUpdateOneWithoutPropsInput {
  create: StyleCreateWithoutPropsInput
  connect: StyleWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: StyleUpdateWithoutPropsDataInput
  upsert: StyleUpsertWithoutPropsInput
}

input StyleUpdateWithoutPropsDataInput {
  name: String
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
  web: WebUpdateOneRequiredWithoutStylesInput
  spreadStyles: StyleSpreadUpdateManyWithoutSpreadStyleInput
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

input StyleUpdateWithoutSpreadStylesDataInput {
  name: String
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
  web: WebUpdateOneRequiredWithoutStylesInput
  props: ElementPropUpdateManyWithoutValueStyleInput
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

input StyleUpdateWithoutWebDataInput {
  name: String
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
  props: ElementPropUpdateManyWithoutValueStyleInput
  spreadStyles: StyleSpreadUpdateManyWithoutSpreadStyleInput
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

input StyleUpsertWithoutPropsInput {
  update: StyleUpdateWithoutPropsDataInput!
  create: StyleCreateWithoutPropsInput!
}

input StyleUpsertWithoutSpreadStylesInput {
  update: StyleUpdateWithoutSpreadStylesDataInput!
  create: StyleCreateWithoutSpreadStylesInput!
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

type Subscription {
  web(where: WebSubscriptionWhereInput): WebSubscriptionPayload
  page(where: PageSubscriptionWhereInput): PageSubscriptionPayload
  sharedElement(where: SharedElementSubscriptionWhereInput): SharedElementSubscriptionPayload
  componentProp(where: ComponentPropSubscriptionWhereInput): ComponentPropSubscriptionPayload
  elementProp(where: ElementPropSubscriptionWhereInput): ElementPropSubscriptionPayload
  styleSpread(where: StyleSpreadSubscriptionWhereInput): StyleSpreadSubscriptionPayload
  component(where: ComponentSubscriptionWhereInput): ComponentSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  element(where: ElementSubscriptionWhereInput): ElementSubscriptionPayload
  borderValue(where: BorderValueSubscriptionWhereInput): BorderValueSubscriptionPayload
  dimensionValue(where: DimensionValueSubscriptionWhereInput): DimensionValueSubscriptionPayload
  colorValue(where: ColorValueSubscriptionWhereInput): ColorValueSubscriptionPayload
  style(where: StyleSubscriptionWhereInput): StyleSubscriptionPayload
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

input UserUpdateDataInput {
  email: String
  password: String
  themeName: String
  webs: WebUpdateManyWithoutCreatorInput
  components: ComponentUpdateManyWithoutCreatorInput
}

input UserUpdateInput {
  email: String
  password: String
  themeName: String
  webs: WebUpdateManyWithoutCreatorInput
  components: ComponentUpdateManyWithoutCreatorInput
}

input UserUpdateManyMutationInput {
  email: String
  password: String
  themeName: String
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
}

input UserUpdateOneRequiredWithoutComponentsInput {
  create: UserCreateWithoutComponentsInput
  connect: UserWhereUniqueInput
  update: UserUpdateWithoutComponentsDataInput
  upsert: UserUpsertWithoutComponentsInput
}

input UserUpdateOneRequiredWithoutWebsInput {
  create: UserCreateWithoutWebsInput
  connect: UserWhereUniqueInput
  update: UserUpdateWithoutWebsDataInput
  upsert: UserUpsertWithoutWebsInput
}

input UserUpdateWithoutComponentsDataInput {
  email: String
  password: String
  themeName: String
  webs: WebUpdateManyWithoutCreatorInput
}

input UserUpdateWithoutWebsDataInput {
  email: String
  password: String
  themeName: String
  components: ComponentUpdateManyWithoutCreatorInput
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutComponentsInput {
  update: UserUpdateWithoutComponentsDataInput!
  create: UserCreateWithoutComponentsInput!
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
  elements: ElementCreateManyWithoutWebInput
  styles: StyleCreateManyWithoutWebInput
  dimensionValues: DimensionValueCreateManyWithoutWebInput
  colorValues: ColorValueCreateManyWithoutWebInput
  borderValues: BorderValueCreateManyWithoutWebInput
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

input WebCreateOneWithoutPagesInput {
  create: WebCreateWithoutPagesInput
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

input WebCreateWithoutPagesInput {
  name: String!
  creator: UserCreateOneWithoutWebsInput!
  elements: ElementCreateManyWithoutWebInput
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
  elements: ElementUpdateManyWithoutWebInput
  styles: StyleUpdateManyWithoutWebInput
  dimensionValues: DimensionValueUpdateManyWithoutWebInput
  colorValues: ColorValueUpdateManyWithoutWebInput
  borderValues: BorderValueUpdateManyWithoutWebInput
}

input WebUpdateManyMutationInput {
  name: String
}

input WebUpdateManyWithoutCreatorInput {
  create: [WebCreateWithoutCreatorInput!]
  connect: [WebWhereUniqueInput!]
  disconnect: [WebWhereUniqueInput!]
  delete: [WebWhereUniqueInput!]
  update: [WebUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [WebUpsertWithWhereUniqueWithoutCreatorInput!]
}

input WebUpdateOneRequiredWithoutBorderValuesInput {
  create: WebCreateWithoutBorderValuesInput
  connect: WebWhereUniqueInput
  update: WebUpdateWithoutBorderValuesDataInput
  upsert: WebUpsertWithoutBorderValuesInput
}

input WebUpdateOneRequiredWithoutColorValuesInput {
  create: WebCreateWithoutColorValuesInput
  connect: WebWhereUniqueInput
  update: WebUpdateWithoutColorValuesDataInput
  upsert: WebUpsertWithoutColorValuesInput
}

input WebUpdateOneRequiredWithoutDimensionValuesInput {
  create: WebCreateWithoutDimensionValuesInput
  connect: WebWhereUniqueInput
  update: WebUpdateWithoutDimensionValuesDataInput
  upsert: WebUpsertWithoutDimensionValuesInput
}

input WebUpdateOneRequiredWithoutElementsInput {
  create: WebCreateWithoutElementsInput
  connect: WebWhereUniqueInput
  update: WebUpdateWithoutElementsDataInput
  upsert: WebUpsertWithoutElementsInput
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

input WebUpdateWithoutBorderValuesDataInput {
  name: String
  creator: UserUpdateOneRequiredWithoutWebsInput
  pages: PageUpdateManyWithoutWebInput
  elements: ElementUpdateManyWithoutWebInput
  styles: StyleUpdateManyWithoutWebInput
  dimensionValues: DimensionValueUpdateManyWithoutWebInput
  colorValues: ColorValueUpdateManyWithoutWebInput
}

input WebUpdateWithoutColorValuesDataInput {
  name: String
  creator: UserUpdateOneRequiredWithoutWebsInput
  pages: PageUpdateManyWithoutWebInput
  elements: ElementUpdateManyWithoutWebInput
  styles: StyleUpdateManyWithoutWebInput
  dimensionValues: DimensionValueUpdateManyWithoutWebInput
  borderValues: BorderValueUpdateManyWithoutWebInput
}

input WebUpdateWithoutCreatorDataInput {
  name: String
  pages: PageUpdateManyWithoutWebInput
  elements: ElementUpdateManyWithoutWebInput
  styles: StyleUpdateManyWithoutWebInput
  dimensionValues: DimensionValueUpdateManyWithoutWebInput
  colorValues: ColorValueUpdateManyWithoutWebInput
  borderValues: BorderValueUpdateManyWithoutWebInput
}

input WebUpdateWithoutDimensionValuesDataInput {
  name: String
  creator: UserUpdateOneRequiredWithoutWebsInput
  pages: PageUpdateManyWithoutWebInput
  elements: ElementUpdateManyWithoutWebInput
  styles: StyleUpdateManyWithoutWebInput
  colorValues: ColorValueUpdateManyWithoutWebInput
  borderValues: BorderValueUpdateManyWithoutWebInput
}

input WebUpdateWithoutElementsDataInput {
  name: String
  creator: UserUpdateOneRequiredWithoutWebsInput
  pages: PageUpdateManyWithoutWebInput
  styles: StyleUpdateManyWithoutWebInput
  dimensionValues: DimensionValueUpdateManyWithoutWebInput
  colorValues: ColorValueUpdateManyWithoutWebInput
  borderValues: BorderValueUpdateManyWithoutWebInput
}

input WebUpdateWithoutPagesDataInput {
  name: String
  creator: UserUpdateOneRequiredWithoutWebsInput
  elements: ElementUpdateManyWithoutWebInput
  styles: StyleUpdateManyWithoutWebInput
  dimensionValues: DimensionValueUpdateManyWithoutWebInput
  colorValues: ColorValueUpdateManyWithoutWebInput
  borderValues: BorderValueUpdateManyWithoutWebInput
}

input WebUpdateWithoutStylesDataInput {
  name: String
  creator: UserUpdateOneRequiredWithoutWebsInput
  pages: PageUpdateManyWithoutWebInput
  elements: ElementUpdateManyWithoutWebInput
  dimensionValues: DimensionValueUpdateManyWithoutWebInput
  colorValues: ColorValueUpdateManyWithoutWebInput
  borderValues: BorderValueUpdateManyWithoutWebInput
}

input WebUpdateWithWhereUniqueWithoutCreatorInput {
  where: WebWhereUniqueInput!
  data: WebUpdateWithoutCreatorDataInput!
}

input WebUpsertWithoutBorderValuesInput {
  update: WebUpdateWithoutBorderValuesDataInput!
  create: WebCreateWithoutBorderValuesInput!
}

input WebUpsertWithoutColorValuesInput {
  update: WebUpdateWithoutColorValuesDataInput!
  create: WebCreateWithoutColorValuesInput!
}

input WebUpsertWithoutDimensionValuesInput {
  update: WebUpdateWithoutDimensionValuesDataInput!
  create: WebCreateWithoutDimensionValuesInput!
}

input WebUpsertWithoutElementsInput {
  update: WebUpdateWithoutElementsDataInput!
  create: WebCreateWithoutElementsInput!
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
  

 export type MutationType =
    | 'CREATED'
    | 'UPDATED'
    | 'DELETED'
  

 export type PageOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'title_ASC'
    | 'title_DESC'
  

 export type PrismaDatabase =
    | 'default'
  

 export type PropType =
    | 'BOOLEAN'
    | 'NUMBER'
    | 'STRING'
    | 'VIEW_STYLE'
    | 'TEXT_STYLE'
  

 export type SharedElementOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
  

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

 export type BorderValueUpdateDataInput = {| 
  name?: String,
  unit?: BorderValueUnit,
  value?: Int,
  web?: WebUpdateOneRequiredWithoutBorderValuesInput
|}

 export type BorderValueUpdateInput = {| 
  name?: String,
  unit?: BorderValueUnit,
  value?: Int,
  web?: WebUpdateOneRequiredWithoutBorderValuesInput
|}

 export type BorderValueUpdateManyMutationInput = {| 
  name?: String,
  unit?: BorderValueUnit,
  value?: Int
|}

 export type BorderValueUpdateManyWithoutWebInput = {| 
  create?: Array< BorderValueCreateWithoutWebInput > | BorderValueCreateWithoutWebInput,
  connect?: Array< BorderValueWhereUniqueInput > | BorderValueWhereUniqueInput,
  disconnect?: Array< BorderValueWhereUniqueInput > | BorderValueWhereUniqueInput,
  delete?: Array< BorderValueWhereUniqueInput > | BorderValueWhereUniqueInput,
  update?: Array< BorderValueUpdateWithWhereUniqueWithoutWebInput > | BorderValueUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< BorderValueUpsertWithWhereUniqueWithoutWebInput > | BorderValueUpsertWithWhereUniqueWithoutWebInput
|}

 export type BorderValueUpdateOneInput = {| 
  create?: BorderValueCreateInput,
  connect?: BorderValueWhereUniqueInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: BorderValueUpdateDataInput,
  upsert?: BorderValueUpsertNestedInput
|}

 export type BorderValueUpdateWithoutWebDataInput = {| 
  name?: String,
  unit?: BorderValueUnit,
  value?: Int
|}

 export type BorderValueUpdateWithWhereUniqueWithoutWebInput = {| 
  where: BorderValueWhereUniqueInput,
  data: BorderValueUpdateWithoutWebDataInput
|}

 export type BorderValueUpsertNestedInput = {| 
  update: BorderValueUpdateDataInput,
  create: BorderValueCreateInput
|}

 export type BorderValueUpsertWithWhereUniqueWithoutWebInput = {| 
  where: BorderValueWhereUniqueInput,
  update: BorderValueUpdateWithoutWebDataInput,
  create: BorderValueCreateWithoutWebInput
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

 export type ColorValueUpdateDataInput = {| 
  name?: String,
  r?: Int,
  g?: Int,
  b?: Int,
  a?: Float,
  web?: WebUpdateOneRequiredWithoutColorValuesInput
|}

 export type ColorValueUpdateInput = {| 
  name?: String,
  r?: Int,
  g?: Int,
  b?: Int,
  a?: Float,
  web?: WebUpdateOneRequiredWithoutColorValuesInput
|}

 export type ColorValueUpdateManyMutationInput = {| 
  name?: String,
  r?: Int,
  g?: Int,
  b?: Int,
  a?: Float
|}

 export type ColorValueUpdateManyWithoutWebInput = {| 
  create?: Array< ColorValueCreateWithoutWebInput > | ColorValueCreateWithoutWebInput,
  connect?: Array< ColorValueWhereUniqueInput > | ColorValueWhereUniqueInput,
  disconnect?: Array< ColorValueWhereUniqueInput > | ColorValueWhereUniqueInput,
  delete?: Array< ColorValueWhereUniqueInput > | ColorValueWhereUniqueInput,
  update?: Array< ColorValueUpdateWithWhereUniqueWithoutWebInput > | ColorValueUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< ColorValueUpsertWithWhereUniqueWithoutWebInput > | ColorValueUpsertWithWhereUniqueWithoutWebInput
|}

 export type ColorValueUpdateOneInput = {| 
  create?: ColorValueCreateInput,
  connect?: ColorValueWhereUniqueInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: ColorValueUpdateDataInput,
  upsert?: ColorValueUpsertNestedInput
|}

 export type ColorValueUpdateWithoutWebDataInput = {| 
  name?: String,
  r?: Int,
  g?: Int,
  b?: Int,
  a?: Float
|}

 export type ColorValueUpdateWithWhereUniqueWithoutWebInput = {| 
  where: ColorValueWhereUniqueInput,
  data: ColorValueUpdateWithoutWebDataInput
|}

 export type ColorValueUpsertNestedInput = {| 
  update: ColorValueUpdateDataInput,
  create: ColorValueCreateInput
|}

 export type ColorValueUpsertWithWhereUniqueWithoutWebInput = {| 
  where: ColorValueWhereUniqueInput,
  update: ColorValueUpdateWithoutWebDataInput,
  create: ColorValueCreateWithoutWebInput
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

 export type ComponentCreateOneWithoutPropsInput = {| 
  create?: ComponentCreateWithoutPropsInput,
  connect?: ComponentWhereUniqueInput
|}

 export type ComponentCreateWithoutCreatorInput = {| 
  name: String,
  props?: ComponentPropCreateManyWithoutComponentInput
|}

 export type ComponentCreateWithoutPropsInput = {| 
  name: String,
  creator: UserCreateOneWithoutComponentsInput
|}

 export type ComponentPropCreateInput = {| 
  name: String,
  type: PropType,
  component: ComponentCreateOneWithoutPropsInput
|}

 export type ComponentPropCreateManyWithoutComponentInput = {| 
  create?: Array< ComponentPropCreateWithoutComponentInput > | ComponentPropCreateWithoutComponentInput,
  connect?: Array< ComponentPropWhereUniqueInput > | ComponentPropWhereUniqueInput
|}

 export type ComponentPropCreateWithoutComponentInput = {| 
  name: String,
  type: PropType
|}

 export type ComponentPropSubscriptionWhereInput = {| 
  AND?: Array< ComponentPropSubscriptionWhereInput > | ComponentPropSubscriptionWhereInput,
  OR?: Array< ComponentPropSubscriptionWhereInput > | ComponentPropSubscriptionWhereInput,
  NOT?: Array< ComponentPropSubscriptionWhereInput > | ComponentPropSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: ComponentPropWhereInput
|}

 export type ComponentPropUpdateInput = {| 
  name?: String,
  type?: PropType,
  component?: ComponentUpdateOneRequiredWithoutPropsInput
|}

 export type ComponentPropUpdateManyMutationInput = {| 
  name?: String,
  type?: PropType
|}

 export type ComponentPropUpdateManyWithoutComponentInput = {| 
  create?: Array< ComponentPropCreateWithoutComponentInput > | ComponentPropCreateWithoutComponentInput,
  connect?: Array< ComponentPropWhereUniqueInput > | ComponentPropWhereUniqueInput,
  disconnect?: Array< ComponentPropWhereUniqueInput > | ComponentPropWhereUniqueInput,
  delete?: Array< ComponentPropWhereUniqueInput > | ComponentPropWhereUniqueInput,
  update?: Array< ComponentPropUpdateWithWhereUniqueWithoutComponentInput > | ComponentPropUpdateWithWhereUniqueWithoutComponentInput,
  upsert?: Array< ComponentPropUpsertWithWhereUniqueWithoutComponentInput > | ComponentPropUpsertWithWhereUniqueWithoutComponentInput
|}

 export type ComponentPropUpdateWithoutComponentDataInput = {| 
  name?: String,
  type?: PropType
|}

 export type ComponentPropUpdateWithWhereUniqueWithoutComponentInput = {| 
  where: ComponentPropWhereUniqueInput,
  data: ComponentPropUpdateWithoutComponentDataInput
|}

 export type ComponentPropUpsertWithWhereUniqueWithoutComponentInput = {| 
  where: ComponentPropWhereUniqueInput,
  update: ComponentPropUpdateWithoutComponentDataInput,
  create: ComponentPropCreateWithoutComponentInput
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

 export type ComponentUpdateDataInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutComponentsInput,
  props?: ComponentPropUpdateManyWithoutComponentInput
|}

 export type ComponentUpdateInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutComponentsInput,
  props?: ComponentPropUpdateManyWithoutComponentInput
|}

 export type ComponentUpdateManyMutationInput = {| 
  name?: String
|}

 export type ComponentUpdateManyWithoutCreatorInput = {| 
  create?: Array< ComponentCreateWithoutCreatorInput > | ComponentCreateWithoutCreatorInput,
  connect?: Array< ComponentWhereUniqueInput > | ComponentWhereUniqueInput,
  disconnect?: Array< ComponentWhereUniqueInput > | ComponentWhereUniqueInput,
  delete?: Array< ComponentWhereUniqueInput > | ComponentWhereUniqueInput,
  update?: Array< ComponentUpdateWithWhereUniqueWithoutCreatorInput > | ComponentUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< ComponentUpsertWithWhereUniqueWithoutCreatorInput > | ComponentUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type ComponentUpdateOneRequiredInput = {| 
  create?: ComponentCreateInput,
  connect?: ComponentWhereUniqueInput,
  update?: ComponentUpdateDataInput,
  upsert?: ComponentUpsertNestedInput
|}

 export type ComponentUpdateOneRequiredWithoutPropsInput = {| 
  create?: ComponentCreateWithoutPropsInput,
  connect?: ComponentWhereUniqueInput,
  update?: ComponentUpdateWithoutPropsDataInput,
  upsert?: ComponentUpsertWithoutPropsInput
|}

 export type ComponentUpdateWithoutCreatorDataInput = {| 
  name?: String,
  props?: ComponentPropUpdateManyWithoutComponentInput
|}

 export type ComponentUpdateWithoutPropsDataInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutComponentsInput
|}

 export type ComponentUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: ComponentWhereUniqueInput,
  data: ComponentUpdateWithoutCreatorDataInput
|}

 export type ComponentUpsertNestedInput = {| 
  update: ComponentUpdateDataInput,
  create: ComponentCreateInput
|}

 export type ComponentUpsertWithoutPropsInput = {| 
  update: ComponentUpdateWithoutPropsDataInput,
  create: ComponentCreateWithoutPropsInput
|}

 export type ComponentUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: ComponentWhereUniqueInput,
  update: ComponentUpdateWithoutCreatorDataInput,
  create: ComponentCreateWithoutCreatorInput
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

 export type DimensionValueUpdateDataInput = {| 
  name?: String,
  unit?: DimensionValueUnit,
  value?: Int,
  web?: WebUpdateOneRequiredWithoutDimensionValuesInput
|}

 export type DimensionValueUpdateInput = {| 
  name?: String,
  unit?: DimensionValueUnit,
  value?: Int,
  web?: WebUpdateOneRequiredWithoutDimensionValuesInput
|}

 export type DimensionValueUpdateManyMutationInput = {| 
  name?: String,
  unit?: DimensionValueUnit,
  value?: Int
|}

 export type DimensionValueUpdateManyWithoutWebInput = {| 
  create?: Array< DimensionValueCreateWithoutWebInput > | DimensionValueCreateWithoutWebInput,
  connect?: Array< DimensionValueWhereUniqueInput > | DimensionValueWhereUniqueInput,
  disconnect?: Array< DimensionValueWhereUniqueInput > | DimensionValueWhereUniqueInput,
  delete?: Array< DimensionValueWhereUniqueInput > | DimensionValueWhereUniqueInput,
  update?: Array< DimensionValueUpdateWithWhereUniqueWithoutWebInput > | DimensionValueUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< DimensionValueUpsertWithWhereUniqueWithoutWebInput > | DimensionValueUpsertWithWhereUniqueWithoutWebInput
|}

 export type DimensionValueUpdateOneInput = {| 
  create?: DimensionValueCreateInput,
  connect?: DimensionValueWhereUniqueInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: DimensionValueUpdateDataInput,
  upsert?: DimensionValueUpsertNestedInput
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

 export type DimensionValueUpsertNestedInput = {| 
  update: DimensionValueUpdateDataInput,
  create: DimensionValueCreateInput
|}

 export type DimensionValueUpsertWithWhereUniqueWithoutWebInput = {| 
  where: DimensionValueWhereUniqueInput,
  update: DimensionValueUpdateWithoutWebDataInput,
  create: DimensionValueCreateWithoutWebInput
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

 export type ElementCreateManyWithoutSharedInput = {| 
  create?: Array< ElementCreateWithoutSharedInput > | ElementCreateWithoutSharedInput,
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

 export type ElementCreateWithoutSharedInput = {| 
  type: ElementType,
  index: Int,
  textLeaves?: Json,
  web: WebCreateOneWithoutElementsInput,
  parent?: ElementCreateOneWithoutChildrenInput,
  children?: ElementCreateManyWithoutParentInput,
  component: ComponentCreateOneInput,
  props?: ElementPropCreateManyWithoutElementInput
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

 export type ElementPropCreateInput = {| 
  name: String,
  type: PropType,
  value?: String,
  element: ElementCreateOneWithoutPropsInput,
  valueStyle?: StyleCreateOneWithoutPropsInput
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

 export type ElementPropSubscriptionWhereInput = {| 
  AND?: Array< ElementPropSubscriptionWhereInput > | ElementPropSubscriptionWhereInput,
  OR?: Array< ElementPropSubscriptionWhereInput > | ElementPropSubscriptionWhereInput,
  NOT?: Array< ElementPropSubscriptionWhereInput > | ElementPropSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: ElementPropWhereInput
|}

 export type ElementPropUpdateInput = {| 
  name?: String,
  type?: PropType,
  value?: String,
  element?: ElementUpdateOneRequiredWithoutPropsInput,
  valueStyle?: StyleUpdateOneWithoutPropsInput
|}

 export type ElementPropUpdateManyMutationInput = {| 
  name?: String,
  type?: PropType,
  value?: String
|}

 export type ElementPropUpdateManyWithoutElementInput = {| 
  create?: Array< ElementPropCreateWithoutElementInput > | ElementPropCreateWithoutElementInput,
  connect?: Array< ElementPropWhereUniqueInput > | ElementPropWhereUniqueInput,
  disconnect?: Array< ElementPropWhereUniqueInput > | ElementPropWhereUniqueInput,
  delete?: Array< ElementPropWhereUniqueInput > | ElementPropWhereUniqueInput,
  update?: Array< ElementPropUpdateWithWhereUniqueWithoutElementInput > | ElementPropUpdateWithWhereUniqueWithoutElementInput,
  upsert?: Array< ElementPropUpsertWithWhereUniqueWithoutElementInput > | ElementPropUpsertWithWhereUniqueWithoutElementInput
|}

 export type ElementPropUpdateManyWithoutValueStyleInput = {| 
  create?: Array< ElementPropCreateWithoutValueStyleInput > | ElementPropCreateWithoutValueStyleInput,
  connect?: Array< ElementPropWhereUniqueInput > | ElementPropWhereUniqueInput,
  disconnect?: Array< ElementPropWhereUniqueInput > | ElementPropWhereUniqueInput,
  delete?: Array< ElementPropWhereUniqueInput > | ElementPropWhereUniqueInput,
  update?: Array< ElementPropUpdateWithWhereUniqueWithoutValueStyleInput > | ElementPropUpdateWithWhereUniqueWithoutValueStyleInput,
  upsert?: Array< ElementPropUpsertWithWhereUniqueWithoutValueStyleInput > | ElementPropUpsertWithWhereUniqueWithoutValueStyleInput
|}

 export type ElementPropUpdateWithoutElementDataInput = {| 
  name?: String,
  type?: PropType,
  value?: String,
  valueStyle?: StyleUpdateOneWithoutPropsInput
|}

 export type ElementPropUpdateWithoutValueStyleDataInput = {| 
  name?: String,
  type?: PropType,
  value?: String,
  element?: ElementUpdateOneRequiredWithoutPropsInput
|}

 export type ElementPropUpdateWithWhereUniqueWithoutElementInput = {| 
  where: ElementPropWhereUniqueInput,
  data: ElementPropUpdateWithoutElementDataInput
|}

 export type ElementPropUpdateWithWhereUniqueWithoutValueStyleInput = {| 
  where: ElementPropWhereUniqueInput,
  data: ElementPropUpdateWithoutValueStyleDataInput
|}

 export type ElementPropUpsertWithWhereUniqueWithoutElementInput = {| 
  where: ElementPropWhereUniqueInput,
  update: ElementPropUpdateWithoutElementDataInput,
  create: ElementPropCreateWithoutElementInput
|}

 export type ElementPropUpsertWithWhereUniqueWithoutValueStyleInput = {| 
  where: ElementPropWhereUniqueInput,
  update: ElementPropUpdateWithoutValueStyleDataInput,
  create: ElementPropCreateWithoutValueStyleInput
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

 export type ElementUpdateDataInput = {| 
  type?: ElementType,
  index?: Int,
  textLeaves?: Json,
  web?: WebUpdateOneRequiredWithoutElementsInput,
  parent?: ElementUpdateOneWithoutChildrenInput,
  children?: ElementUpdateManyWithoutParentInput,
  shared?: SharedElementUpdateOneWithoutSharedByInput,
  component?: ComponentUpdateOneRequiredInput,
  props?: ElementPropUpdateManyWithoutElementInput
|}

 export type ElementUpdateInput = {| 
  type?: ElementType,
  index?: Int,
  textLeaves?: Json,
  web?: WebUpdateOneRequiredWithoutElementsInput,
  parent?: ElementUpdateOneWithoutChildrenInput,
  children?: ElementUpdateManyWithoutParentInput,
  shared?: SharedElementUpdateOneWithoutSharedByInput,
  component?: ComponentUpdateOneRequiredInput,
  props?: ElementPropUpdateManyWithoutElementInput
|}

 export type ElementUpdateManyMutationInput = {| 
  type?: ElementType,
  index?: Int,
  textLeaves?: Json
|}

 export type ElementUpdateManyWithoutParentInput = {| 
  create?: Array< ElementCreateWithoutParentInput > | ElementCreateWithoutParentInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  disconnect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  delete?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  update?: Array< ElementUpdateWithWhereUniqueWithoutParentInput > | ElementUpdateWithWhereUniqueWithoutParentInput,
  upsert?: Array< ElementUpsertWithWhereUniqueWithoutParentInput > | ElementUpsertWithWhereUniqueWithoutParentInput
|}

 export type ElementUpdateManyWithoutSharedInput = {| 
  create?: Array< ElementCreateWithoutSharedInput > | ElementCreateWithoutSharedInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  disconnect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  delete?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  update?: Array< ElementUpdateWithWhereUniqueWithoutSharedInput > | ElementUpdateWithWhereUniqueWithoutSharedInput,
  upsert?: Array< ElementUpsertWithWhereUniqueWithoutSharedInput > | ElementUpsertWithWhereUniqueWithoutSharedInput
|}

 export type ElementUpdateManyWithoutWebInput = {| 
  create?: Array< ElementCreateWithoutWebInput > | ElementCreateWithoutWebInput,
  connect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  disconnect?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  delete?: Array< ElementWhereUniqueInput > | ElementWhereUniqueInput,
  update?: Array< ElementUpdateWithWhereUniqueWithoutWebInput > | ElementUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< ElementUpsertWithWhereUniqueWithoutWebInput > | ElementUpsertWithWhereUniqueWithoutWebInput
|}

 export type ElementUpdateOneRequiredInput = {| 
  create?: ElementCreateInput,
  connect?: ElementWhereUniqueInput,
  update?: ElementUpdateDataInput,
  upsert?: ElementUpsertNestedInput
|}

 export type ElementUpdateOneRequiredWithoutPropsInput = {| 
  create?: ElementCreateWithoutPropsInput,
  connect?: ElementWhereUniqueInput,
  update?: ElementUpdateWithoutPropsDataInput,
  upsert?: ElementUpsertWithoutPropsInput
|}

 export type ElementUpdateOneWithoutChildrenInput = {| 
  create?: ElementCreateWithoutChildrenInput,
  connect?: ElementWhereUniqueInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: ElementUpdateWithoutChildrenDataInput,
  upsert?: ElementUpsertWithoutChildrenInput
|}

 export type ElementUpdateWithoutChildrenDataInput = {| 
  type?: ElementType,
  index?: Int,
  textLeaves?: Json,
  web?: WebUpdateOneRequiredWithoutElementsInput,
  parent?: ElementUpdateOneWithoutChildrenInput,
  shared?: SharedElementUpdateOneWithoutSharedByInput,
  component?: ComponentUpdateOneRequiredInput,
  props?: ElementPropUpdateManyWithoutElementInput
|}

 export type ElementUpdateWithoutParentDataInput = {| 
  type?: ElementType,
  index?: Int,
  textLeaves?: Json,
  web?: WebUpdateOneRequiredWithoutElementsInput,
  children?: ElementUpdateManyWithoutParentInput,
  shared?: SharedElementUpdateOneWithoutSharedByInput,
  component?: ComponentUpdateOneRequiredInput,
  props?: ElementPropUpdateManyWithoutElementInput
|}

 export type ElementUpdateWithoutPropsDataInput = {| 
  type?: ElementType,
  index?: Int,
  textLeaves?: Json,
  web?: WebUpdateOneRequiredWithoutElementsInput,
  parent?: ElementUpdateOneWithoutChildrenInput,
  children?: ElementUpdateManyWithoutParentInput,
  shared?: SharedElementUpdateOneWithoutSharedByInput,
  component?: ComponentUpdateOneRequiredInput
|}

 export type ElementUpdateWithoutSharedDataInput = {| 
  type?: ElementType,
  index?: Int,
  textLeaves?: Json,
  web?: WebUpdateOneRequiredWithoutElementsInput,
  parent?: ElementUpdateOneWithoutChildrenInput,
  children?: ElementUpdateManyWithoutParentInput,
  component?: ComponentUpdateOneRequiredInput,
  props?: ElementPropUpdateManyWithoutElementInput
|}

 export type ElementUpdateWithoutWebDataInput = {| 
  type?: ElementType,
  index?: Int,
  textLeaves?: Json,
  parent?: ElementUpdateOneWithoutChildrenInput,
  children?: ElementUpdateManyWithoutParentInput,
  shared?: SharedElementUpdateOneWithoutSharedByInput,
  component?: ComponentUpdateOneRequiredInput,
  props?: ElementPropUpdateManyWithoutElementInput
|}

 export type ElementUpdateWithWhereUniqueWithoutParentInput = {| 
  where: ElementWhereUniqueInput,
  data: ElementUpdateWithoutParentDataInput
|}

 export type ElementUpdateWithWhereUniqueWithoutSharedInput = {| 
  where: ElementWhereUniqueInput,
  data: ElementUpdateWithoutSharedDataInput
|}

 export type ElementUpdateWithWhereUniqueWithoutWebInput = {| 
  where: ElementWhereUniqueInput,
  data: ElementUpdateWithoutWebDataInput
|}

 export type ElementUpsertNestedInput = {| 
  update: ElementUpdateDataInput,
  create: ElementCreateInput
|}

 export type ElementUpsertWithoutChildrenInput = {| 
  update: ElementUpdateWithoutChildrenDataInput,
  create: ElementCreateWithoutChildrenInput
|}

 export type ElementUpsertWithoutPropsInput = {| 
  update: ElementUpdateWithoutPropsDataInput,
  create: ElementCreateWithoutPropsInput
|}

 export type ElementUpsertWithWhereUniqueWithoutParentInput = {| 
  where: ElementWhereUniqueInput,
  update: ElementUpdateWithoutParentDataInput,
  create: ElementCreateWithoutParentInput
|}

 export type ElementUpsertWithWhereUniqueWithoutSharedInput = {| 
  where: ElementWhereUniqueInput,
  update: ElementUpdateWithoutSharedDataInput,
  create: ElementCreateWithoutSharedInput
|}

 export type ElementUpsertWithWhereUniqueWithoutWebInput = {| 
  where: ElementWhereUniqueInput,
  update: ElementUpdateWithoutWebDataInput,
  create: ElementCreateWithoutWebInput
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

 export type PageCreateInput = {| 
  title: String,
  creator: UserCreateOneInput,
  web: WebCreateOneWithoutPagesInput,
  element: ElementCreateOneInput
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

 export type PageUpdateInput = {| 
  title?: String,
  creator?: UserUpdateOneRequiredInput,
  web?: WebUpdateOneRequiredWithoutPagesInput,
  element?: ElementUpdateOneRequiredInput
|}

 export type PageUpdateManyMutationInput = {| 
  title?: String
|}

 export type PageUpdateManyWithoutWebInput = {| 
  create?: Array< PageCreateWithoutWebInput > | PageCreateWithoutWebInput,
  connect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  disconnect?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  delete?: Array< PageWhereUniqueInput > | PageWhereUniqueInput,
  update?: Array< PageUpdateWithWhereUniqueWithoutWebInput > | PageUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< PageUpsertWithWhereUniqueWithoutWebInput > | PageUpsertWithWhereUniqueWithoutWebInput
|}

 export type PageUpdateWithoutWebDataInput = {| 
  title?: String,
  creator?: UserUpdateOneRequiredInput,
  element?: ElementUpdateOneRequiredInput
|}

 export type PageUpdateWithWhereUniqueWithoutWebInput = {| 
  where: PageWhereUniqueInput,
  data: PageUpdateWithoutWebDataInput
|}

 export type PageUpsertWithWhereUniqueWithoutWebInput = {| 
  where: PageWhereUniqueInput,
  update: PageUpdateWithoutWebDataInput,
  create: PageCreateWithoutWebInput
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

 export type SharedElementCreateInput = {| 
  name: String,
  sharedBy?: ElementCreateManyWithoutSharedInput,
  element: ElementCreateOneInput
|}

 export type SharedElementCreateOneWithoutSharedByInput = {| 
  create?: SharedElementCreateWithoutSharedByInput,
  connect?: SharedElementWhereUniqueInput
|}

 export type SharedElementCreateWithoutSharedByInput = {| 
  name: String,
  element: ElementCreateOneInput
|}

 export type SharedElementSubscriptionWhereInput = {| 
  AND?: Array< SharedElementSubscriptionWhereInput > | SharedElementSubscriptionWhereInput,
  OR?: Array< SharedElementSubscriptionWhereInput > | SharedElementSubscriptionWhereInput,
  NOT?: Array< SharedElementSubscriptionWhereInput > | SharedElementSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: SharedElementWhereInput
|}

 export type SharedElementUpdateInput = {| 
  name?: String,
  sharedBy?: ElementUpdateManyWithoutSharedInput,
  element?: ElementUpdateOneRequiredInput
|}

 export type SharedElementUpdateManyMutationInput = {| 
  name?: String
|}

 export type SharedElementUpdateOneWithoutSharedByInput = {| 
  create?: SharedElementCreateWithoutSharedByInput,
  connect?: SharedElementWhereUniqueInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: SharedElementUpdateWithoutSharedByDataInput,
  upsert?: SharedElementUpsertWithoutSharedByInput
|}

 export type SharedElementUpdateWithoutSharedByDataInput = {| 
  name?: String,
  element?: ElementUpdateOneRequiredInput
|}

 export type SharedElementUpsertWithoutSharedByInput = {| 
  update: SharedElementUpdateWithoutSharedByDataInput,
  create: SharedElementCreateWithoutSharedByInput
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

 export type StyleCreateOneWithoutSpreadStylesInput = {| 
  create?: StyleCreateWithoutSpreadStylesInput,
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

 export type StyleCreateWithoutSpreadStylesInput = {| 
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

 export type StyleSpreadCreateInput = {| 
  index: Int,
  spreadStyle: StyleCreateOneWithoutSpreadStylesInput,
  style: StyleCreateOneInput
|}

 export type StyleSpreadCreateManyWithoutSpreadStyleInput = {| 
  create?: Array< StyleSpreadCreateWithoutSpreadStyleInput > | StyleSpreadCreateWithoutSpreadStyleInput,
  connect?: Array< StyleSpreadWhereUniqueInput > | StyleSpreadWhereUniqueInput
|}

 export type StyleSpreadCreateWithoutSpreadStyleInput = {| 
  index: Int,
  style: StyleCreateOneInput
|}

 export type StyleSpreadSubscriptionWhereInput = {| 
  AND?: Array< StyleSpreadSubscriptionWhereInput > | StyleSpreadSubscriptionWhereInput,
  OR?: Array< StyleSpreadSubscriptionWhereInput > | StyleSpreadSubscriptionWhereInput,
  NOT?: Array< StyleSpreadSubscriptionWhereInput > | StyleSpreadSubscriptionWhereInput,
  mutation_in?: Array< MutationType > | MutationType,
  updatedFields_contains?: String,
  updatedFields_contains_every?: Array< String > | String,
  updatedFields_contains_some?: Array< String > | String,
  node?: StyleSpreadWhereInput
|}

 export type StyleSpreadUpdateInput = {| 
  index?: Int,
  spreadStyle?: StyleUpdateOneRequiredWithoutSpreadStylesInput,
  style?: StyleUpdateOneRequiredInput
|}

 export type StyleSpreadUpdateManyMutationInput = {| 
  index?: Int
|}

 export type StyleSpreadUpdateManyWithoutSpreadStyleInput = {| 
  create?: Array< StyleSpreadCreateWithoutSpreadStyleInput > | StyleSpreadCreateWithoutSpreadStyleInput,
  connect?: Array< StyleSpreadWhereUniqueInput > | StyleSpreadWhereUniqueInput,
  disconnect?: Array< StyleSpreadWhereUniqueInput > | StyleSpreadWhereUniqueInput,
  delete?: Array< StyleSpreadWhereUniqueInput > | StyleSpreadWhereUniqueInput,
  update?: Array< StyleSpreadUpdateWithWhereUniqueWithoutSpreadStyleInput > | StyleSpreadUpdateWithWhereUniqueWithoutSpreadStyleInput,
  upsert?: Array< StyleSpreadUpsertWithWhereUniqueWithoutSpreadStyleInput > | StyleSpreadUpsertWithWhereUniqueWithoutSpreadStyleInput
|}

 export type StyleSpreadUpdateWithoutSpreadStyleDataInput = {| 
  index?: Int,
  style?: StyleUpdateOneRequiredInput
|}

 export type StyleSpreadUpdateWithWhereUniqueWithoutSpreadStyleInput = {| 
  where: StyleSpreadWhereUniqueInput,
  data: StyleSpreadUpdateWithoutSpreadStyleDataInput
|}

 export type StyleSpreadUpsertWithWhereUniqueWithoutSpreadStyleInput = {| 
  where: StyleSpreadWhereUniqueInput,
  update: StyleSpreadUpdateWithoutSpreadStyleDataInput,
  create: StyleSpreadCreateWithoutSpreadStyleInput
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

 export type StyleUpdateDataInput = {| 
  name?: String,
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
  web?: WebUpdateOneRequiredWithoutStylesInput,
  props?: ElementPropUpdateManyWithoutValueStyleInput,
  spreadStyles?: StyleSpreadUpdateManyWithoutSpreadStyleInput,
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

 export type StyleUpdateInput = {| 
  name?: String,
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
  web?: WebUpdateOneRequiredWithoutStylesInput,
  props?: ElementPropUpdateManyWithoutValueStyleInput,
  spreadStyles?: StyleSpreadUpdateManyWithoutSpreadStyleInput,
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

 export type StyleUpdateManyMutationInput = {| 
  name?: String,
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
  textTransform?: StyleTextTransform
|}

 export type StyleUpdateManyWithoutWebInput = {| 
  create?: Array< StyleCreateWithoutWebInput > | StyleCreateWithoutWebInput,
  connect?: Array< StyleWhereUniqueInput > | StyleWhereUniqueInput,
  disconnect?: Array< StyleWhereUniqueInput > | StyleWhereUniqueInput,
  delete?: Array< StyleWhereUniqueInput > | StyleWhereUniqueInput,
  update?: Array< StyleUpdateWithWhereUniqueWithoutWebInput > | StyleUpdateWithWhereUniqueWithoutWebInput,
  upsert?: Array< StyleUpsertWithWhereUniqueWithoutWebInput > | StyleUpsertWithWhereUniqueWithoutWebInput
|}

 export type StyleUpdateOneRequiredInput = {| 
  create?: StyleCreateInput,
  connect?: StyleWhereUniqueInput,
  update?: StyleUpdateDataInput,
  upsert?: StyleUpsertNestedInput
|}

 export type StyleUpdateOneRequiredWithoutSpreadStylesInput = {| 
  create?: StyleCreateWithoutSpreadStylesInput,
  connect?: StyleWhereUniqueInput,
  update?: StyleUpdateWithoutSpreadStylesDataInput,
  upsert?: StyleUpsertWithoutSpreadStylesInput
|}

 export type StyleUpdateOneWithoutPropsInput = {| 
  create?: StyleCreateWithoutPropsInput,
  connect?: StyleWhereUniqueInput,
  disconnect?: Boolean,
  delete?: Boolean,
  update?: StyleUpdateWithoutPropsDataInput,
  upsert?: StyleUpsertWithoutPropsInput
|}

 export type StyleUpdateWithoutPropsDataInput = {| 
  name?: String,
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
  web?: WebUpdateOneRequiredWithoutStylesInput,
  spreadStyles?: StyleSpreadUpdateManyWithoutSpreadStyleInput,
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

 export type StyleUpdateWithoutSpreadStylesDataInput = {| 
  name?: String,
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
  web?: WebUpdateOneRequiredWithoutStylesInput,
  props?: ElementPropUpdateManyWithoutValueStyleInput,
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

 export type StyleUpdateWithoutWebDataInput = {| 
  name?: String,
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
  props?: ElementPropUpdateManyWithoutValueStyleInput,
  spreadStyles?: StyleSpreadUpdateManyWithoutSpreadStyleInput,
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

 export type StyleUpdateWithWhereUniqueWithoutWebInput = {| 
  where: StyleWhereUniqueInput,
  data: StyleUpdateWithoutWebDataInput
|}

 export type StyleUpsertNestedInput = {| 
  update: StyleUpdateDataInput,
  create: StyleCreateInput
|}

 export type StyleUpsertWithoutPropsInput = {| 
  update: StyleUpdateWithoutPropsDataInput,
  create: StyleCreateWithoutPropsInput
|}

 export type StyleUpsertWithoutSpreadStylesInput = {| 
  update: StyleUpdateWithoutSpreadStylesDataInput,
  create: StyleCreateWithoutSpreadStylesInput
|}

 export type StyleUpsertWithWhereUniqueWithoutWebInput = {| 
  where: StyleWhereUniqueInput,
  update: StyleUpdateWithoutWebDataInput,
  create: StyleCreateWithoutWebInput
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

 export type UserUpdateDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput,
  components?: ComponentUpdateManyWithoutCreatorInput
|}

 export type UserUpdateInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput,
  components?: ComponentUpdateManyWithoutCreatorInput
|}

 export type UserUpdateManyMutationInput = {| 
  email?: String,
  password?: String,
  themeName?: String
|}

 export type UserUpdateOneRequiredInput = {| 
  create?: UserCreateInput,
  connect?: UserWhereUniqueInput,
  update?: UserUpdateDataInput,
  upsert?: UserUpsertNestedInput
|}

 export type UserUpdateOneRequiredWithoutComponentsInput = {| 
  create?: UserCreateWithoutComponentsInput,
  connect?: UserWhereUniqueInput,
  update?: UserUpdateWithoutComponentsDataInput,
  upsert?: UserUpsertWithoutComponentsInput
|}

 export type UserUpdateOneRequiredWithoutWebsInput = {| 
  create?: UserCreateWithoutWebsInput,
  connect?: UserWhereUniqueInput,
  update?: UserUpdateWithoutWebsDataInput,
  upsert?: UserUpsertWithoutWebsInput
|}

 export type UserUpdateWithoutComponentsDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  webs?: WebUpdateManyWithoutCreatorInput
|}

 export type UserUpdateWithoutWebsDataInput = {| 
  email?: String,
  password?: String,
  themeName?: String,
  components?: ComponentUpdateManyWithoutCreatorInput
|}

 export type UserUpsertNestedInput = {| 
  update: UserUpdateDataInput,
  create: UserCreateInput
|}

 export type UserUpsertWithoutComponentsInput = {| 
  update: UserUpdateWithoutComponentsDataInput,
  create: UserCreateWithoutComponentsInput
|}

 export type UserUpsertWithoutWebsInput = {| 
  update: UserUpdateWithoutWebsDataInput,
  create: UserCreateWithoutWebsInput
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

 export type WebCreateInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  pages?: PageCreateManyWithoutWebInput,
  elements?: ElementCreateManyWithoutWebInput,
  styles?: StyleCreateManyWithoutWebInput,
  dimensionValues?: DimensionValueCreateManyWithoutWebInput,
  colorValues?: ColorValueCreateManyWithoutWebInput,
  borderValues?: BorderValueCreateManyWithoutWebInput
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

 export type WebCreateOneWithoutPagesInput = {| 
  create?: WebCreateWithoutPagesInput,
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

 export type WebCreateWithoutPagesInput = {| 
  name: String,
  creator: UserCreateOneWithoutWebsInput,
  elements?: ElementCreateManyWithoutWebInput,
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

 export type WebUpdateInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput,
  elements?: ElementUpdateManyWithoutWebInput,
  styles?: StyleUpdateManyWithoutWebInput,
  dimensionValues?: DimensionValueUpdateManyWithoutWebInput,
  colorValues?: ColorValueUpdateManyWithoutWebInput,
  borderValues?: BorderValueUpdateManyWithoutWebInput
|}

 export type WebUpdateManyMutationInput = {| 
  name?: String
|}

 export type WebUpdateManyWithoutCreatorInput = {| 
  create?: Array< WebCreateWithoutCreatorInput > | WebCreateWithoutCreatorInput,
  connect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  disconnect?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  delete?: Array< WebWhereUniqueInput > | WebWhereUniqueInput,
  update?: Array< WebUpdateWithWhereUniqueWithoutCreatorInput > | WebUpdateWithWhereUniqueWithoutCreatorInput,
  upsert?: Array< WebUpsertWithWhereUniqueWithoutCreatorInput > | WebUpsertWithWhereUniqueWithoutCreatorInput
|}

 export type WebUpdateOneRequiredWithoutBorderValuesInput = {| 
  create?: WebCreateWithoutBorderValuesInput,
  connect?: WebWhereUniqueInput,
  update?: WebUpdateWithoutBorderValuesDataInput,
  upsert?: WebUpsertWithoutBorderValuesInput
|}

 export type WebUpdateOneRequiredWithoutColorValuesInput = {| 
  create?: WebCreateWithoutColorValuesInput,
  connect?: WebWhereUniqueInput,
  update?: WebUpdateWithoutColorValuesDataInput,
  upsert?: WebUpsertWithoutColorValuesInput
|}

 export type WebUpdateOneRequiredWithoutDimensionValuesInput = {| 
  create?: WebCreateWithoutDimensionValuesInput,
  connect?: WebWhereUniqueInput,
  update?: WebUpdateWithoutDimensionValuesDataInput,
  upsert?: WebUpsertWithoutDimensionValuesInput
|}

 export type WebUpdateOneRequiredWithoutElementsInput = {| 
  create?: WebCreateWithoutElementsInput,
  connect?: WebWhereUniqueInput,
  update?: WebUpdateWithoutElementsDataInput,
  upsert?: WebUpsertWithoutElementsInput
|}

 export type WebUpdateOneRequiredWithoutPagesInput = {| 
  create?: WebCreateWithoutPagesInput,
  connect?: WebWhereUniqueInput,
  update?: WebUpdateWithoutPagesDataInput,
  upsert?: WebUpsertWithoutPagesInput
|}

 export type WebUpdateOneRequiredWithoutStylesInput = {| 
  create?: WebCreateWithoutStylesInput,
  connect?: WebWhereUniqueInput,
  update?: WebUpdateWithoutStylesDataInput,
  upsert?: WebUpsertWithoutStylesInput
|}

 export type WebUpdateWithoutBorderValuesDataInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput,
  elements?: ElementUpdateManyWithoutWebInput,
  styles?: StyleUpdateManyWithoutWebInput,
  dimensionValues?: DimensionValueUpdateManyWithoutWebInput,
  colorValues?: ColorValueUpdateManyWithoutWebInput
|}

 export type WebUpdateWithoutColorValuesDataInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput,
  elements?: ElementUpdateManyWithoutWebInput,
  styles?: StyleUpdateManyWithoutWebInput,
  dimensionValues?: DimensionValueUpdateManyWithoutWebInput,
  borderValues?: BorderValueUpdateManyWithoutWebInput
|}

 export type WebUpdateWithoutCreatorDataInput = {| 
  name?: String,
  pages?: PageUpdateManyWithoutWebInput,
  elements?: ElementUpdateManyWithoutWebInput,
  styles?: StyleUpdateManyWithoutWebInput,
  dimensionValues?: DimensionValueUpdateManyWithoutWebInput,
  colorValues?: ColorValueUpdateManyWithoutWebInput,
  borderValues?: BorderValueUpdateManyWithoutWebInput
|}

 export type WebUpdateWithoutDimensionValuesDataInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput,
  elements?: ElementUpdateManyWithoutWebInput,
  styles?: StyleUpdateManyWithoutWebInput,
  colorValues?: ColorValueUpdateManyWithoutWebInput,
  borderValues?: BorderValueUpdateManyWithoutWebInput
|}

 export type WebUpdateWithoutElementsDataInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput,
  styles?: StyleUpdateManyWithoutWebInput,
  dimensionValues?: DimensionValueUpdateManyWithoutWebInput,
  colorValues?: ColorValueUpdateManyWithoutWebInput,
  borderValues?: BorderValueUpdateManyWithoutWebInput
|}

 export type WebUpdateWithoutPagesDataInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutWebsInput,
  elements?: ElementUpdateManyWithoutWebInput,
  styles?: StyleUpdateManyWithoutWebInput,
  dimensionValues?: DimensionValueUpdateManyWithoutWebInput,
  colorValues?: ColorValueUpdateManyWithoutWebInput,
  borderValues?: BorderValueUpdateManyWithoutWebInput
|}

 export type WebUpdateWithoutStylesDataInput = {| 
  name?: String,
  creator?: UserUpdateOneRequiredWithoutWebsInput,
  pages?: PageUpdateManyWithoutWebInput,
  elements?: ElementUpdateManyWithoutWebInput,
  dimensionValues?: DimensionValueUpdateManyWithoutWebInput,
  colorValues?: ColorValueUpdateManyWithoutWebInput,
  borderValues?: BorderValueUpdateManyWithoutWebInput
|}

 export type WebUpdateWithWhereUniqueWithoutCreatorInput = {| 
  where: WebWhereUniqueInput,
  data: WebUpdateWithoutCreatorDataInput
|}

 export type WebUpsertWithoutBorderValuesInput = {| 
  update: WebUpdateWithoutBorderValuesDataInput,
  create: WebCreateWithoutBorderValuesInput
|}

 export type WebUpsertWithoutColorValuesInput = {| 
  update: WebUpdateWithoutColorValuesDataInput,
  create: WebCreateWithoutColorValuesInput
|}

 export type WebUpsertWithoutDimensionValuesInput = {| 
  update: WebUpdateWithoutDimensionValuesDataInput,
  create: WebCreateWithoutDimensionValuesInput
|}

 export type WebUpsertWithoutElementsInput = {| 
  update: WebUpdateWithoutElementsDataInput,
  create: WebCreateWithoutElementsInput
|}

 export type WebUpsertWithoutPagesInput = {| 
  update: WebUpdateWithoutPagesDataInput,
  create: WebCreateWithoutPagesInput
|}

 export type WebUpsertWithoutStylesInput = {| 
  update: WebUpdateWithoutStylesDataInput,
  create: WebCreateWithoutStylesInput
|}

 export type WebUpsertWithWhereUniqueWithoutCreatorInput = {| 
  where: WebWhereUniqueInput,
  update: WebUpdateWithoutCreatorDataInput,
  create: WebCreateWithoutCreatorInput
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

 export type AggregateBorderValue = {| 
   count: Int,
|}

 export type AggregateColorValue = {| 
   count: Int,
|}

 export type AggregateComponent = {| 
   count: Int,
|}

 export type AggregateComponentProp = {| 
   count: Int,
|}

 export type AggregateDimensionValue = {| 
   count: Int,
|}

 export type AggregateElement = {| 
   count: Int,
|}

 export type AggregateElementProp = {| 
   count: Int,
|}

 export type AggregatePage = {| 
   count: Int,
|}

 export type AggregateSharedElement = {| 
   count: Int,
|}

 export type AggregateStyle = {| 
   count: Int,
|}

 export type AggregateStyleSpread = {| 
   count: Int,
|}

 export type AggregateUser = {| 
   count: Int,
|}

 export type AggregateWeb = {| 
   count: Int,
|}

 export type BatchPayload = {| 
   count: Long,
|}

 export type BorderValue = {| ...Node,
 
   id: ID_Output,
   web: Web,
   name?: String,
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

/*
 * An edge in a connection.

*/
 export type BorderValueEdge = {| 
   node: BorderValue,
   cursor: String,
|}

 export type BorderValuePreviousValues = {| 
   id: ID_Output,
   name?: String,
   unit: BorderValueUnit,
   value: Int,
|}

 export type BorderValueSubscriptionPayload = {| 
   mutation: MutationType,
   node?: BorderValue,
   updatedFields?: String[],
   previousValues?: BorderValuePreviousValues,
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
 export type ColorValueConnection = {| 
   pageInfo: PageInfo,
   edges: ColorValueEdge[],
   aggregate: AggregateColorValue,
|}

/*
 * An edge in a connection.

*/
 export type ColorValueEdge = {| 
   node: ColorValue,
   cursor: String,
|}

 export type ColorValuePreviousValues = {| 
   id: ID_Output,
   name?: String,
   r: Int,
   g: Int,
   b: Int,
   a?: Float,
|}

 export type ColorValueSubscriptionPayload = {| 
   mutation: MutationType,
   node?: ColorValue,
   updatedFields?: String[],
   previousValues?: ColorValuePreviousValues,
|}

 export type Component = {| ...Node,
 
   id: ID_Output,
   name: String,
   creator: User,
   props?: ComponentProp[],
|}

/*
 * A connection to a list of items.

*/
 export type ComponentConnection = {| 
   pageInfo: PageInfo,
   edges: ComponentEdge[],
   aggregate: AggregateComponent,
|}

/*
 * An edge in a connection.

*/
 export type ComponentEdge = {| 
   node: Component,
   cursor: String,
|}

 export type ComponentPreviousValues = {| 
   id: ID_Output,
   name: String,
|}

 export type ComponentProp = {| ...Node,
 
   id: ID_Output,
   component: Component,
   name: String,
   type: PropType,
|}

/*
 * A connection to a list of items.

*/
 export type ComponentPropConnection = {| 
   pageInfo: PageInfo,
   edges: ComponentPropEdge[],
   aggregate: AggregateComponentProp,
|}

/*
 * An edge in a connection.

*/
 export type ComponentPropEdge = {| 
   node: ComponentProp,
   cursor: String,
|}

 export type ComponentPropPreviousValues = {| 
   id: ID_Output,
   name: String,
   type: PropType,
|}

 export type ComponentPropSubscriptionPayload = {| 
   mutation: MutationType,
   node?: ComponentProp,
   updatedFields?: String[],
   previousValues?: ComponentPropPreviousValues,
|}

 export type ComponentSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Component,
   updatedFields?: String[],
   previousValues?: ComponentPreviousValues,
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
 export type DimensionValueConnection = {| 
   pageInfo: PageInfo,
   edges: DimensionValueEdge[],
   aggregate: AggregateDimensionValue,
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

 export type DimensionValueSubscriptionPayload = {| 
   mutation: MutationType,
   node?: DimensionValue,
   updatedFields?: String[],
   previousValues?: DimensionValuePreviousValues,
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

 export type ElementPreviousValues = {| 
   id: ID_Output,
   type: ElementType,
   index: Int,
   textLeaves?: Json,
|}

 export type ElementProp = {| ...Node,
 
   id: ID_Output,
   element: Element,
   name: String,
   type: PropType,
   valueStyle?: Style,
   value?: String,
|}

/*
 * A connection to a list of items.

*/
 export type ElementPropConnection = {| 
   pageInfo: PageInfo,
   edges: ElementPropEdge[],
   aggregate: AggregateElementProp,
|}

/*
 * An edge in a connection.

*/
 export type ElementPropEdge = {| 
   node: ElementProp,
   cursor: String,
|}

 export type ElementPropPreviousValues = {| 
   id: ID_Output,
   name: String,
   type: PropType,
   value?: String,
|}

 export type ElementPropSubscriptionPayload = {| 
   mutation: MutationType,
   node?: ElementProp,
   updatedFields?: String[],
   previousValues?: ElementPropPreviousValues,
|}

 export type ElementSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Element,
   updatedFields?: String[],
   previousValues?: ElementPreviousValues,
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
 export type PageEdge = {| 
   node: Page,
   cursor: String,
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

 export type PagePreviousValues = {| 
   id: ID_Output,
   createdAt: DateTime,
   updatedAt: DateTime,
   title: String,
|}

 export type PageSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Page,
   updatedFields?: String[],
   previousValues?: PagePreviousValues,
|}

 export type SharedElement = {| ...Node,
 
   id: ID_Output,
   sharedBy?: Element[],
   name: String,
   element: Element,
|}

/*
 * A connection to a list of items.

*/
 export type SharedElementConnection = {| 
   pageInfo: PageInfo,
   edges: SharedElementEdge[],
   aggregate: AggregateSharedElement,
|}

/*
 * An edge in a connection.

*/
 export type SharedElementEdge = {| 
   node: SharedElement,
   cursor: String,
|}

 export type SharedElementPreviousValues = {| 
   id: ID_Output,
   name: String,
|}

 export type SharedElementSubscriptionPayload = {| 
   mutation: MutationType,
   node?: SharedElement,
   updatedFields?: String[],
   previousValues?: SharedElementPreviousValues,
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

/*
 * A connection to a list of items.

*/
 export type StyleConnection = {| 
   pageInfo: PageInfo,
   edges: StyleEdge[],
   aggregate: AggregateStyle,
|}

/*
 * An edge in a connection.

*/
 export type StyleEdge = {| 
   node: Style,
   cursor: String,
|}

 export type StylePreviousValues = {| 
   id: ID_Output,
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
|}

 export type StyleSpread = {| ...Node,
 
   id: ID_Output,
   spreadStyle: Style,
   index: Int,
   style: Style,
|}

/*
 * A connection to a list of items.

*/
 export type StyleSpreadConnection = {| 
   pageInfo: PageInfo,
   edges: StyleSpreadEdge[],
   aggregate: AggregateStyleSpread,
|}

/*
 * An edge in a connection.

*/
 export type StyleSpreadEdge = {| 
   node: StyleSpread,
   cursor: String,
|}

 export type StyleSpreadPreviousValues = {| 
   id: ID_Output,
   index: Int,
|}

 export type StyleSpreadSubscriptionPayload = {| 
   mutation: MutationType,
   node?: StyleSpread,
   updatedFields?: String[],
   previousValues?: StyleSpreadPreviousValues,
|}

 export type StyleSubscriptionPayload = {| 
   mutation: MutationType,
   node?: Style,
   updatedFields?: String[],
   previousValues?: StylePreviousValues,
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

/*
 * A connection to a list of items.

*/
 export type UserConnection = {| 
   pageInfo: PageInfo,
   edges: UserEdge[],
   aggregate: AggregateUser,
|}

/*
 * An edge in a connection.

*/
 export type UserEdge = {| 
   node: User,
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

 export type UserSubscriptionPayload = {| 
   mutation: MutationType,
   node?: User,
   updatedFields?: String[],
   previousValues?: UserPreviousValues,
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
 export type WebEdge = {| 
   node: Web,
   cursor: String,
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
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
 export type Long = string 

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
 export type String = string 