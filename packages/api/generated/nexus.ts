/**
 * This file was automatically generated by Nexus 0.11.7
 * Do not make changes to this file directly
 */

import * as types from "../types"
import { core } from "nexus"
declare global {
  interface NexusGenCustomDefinitionMethods<TypeName extends string> {
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    json<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "JSON";
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  PageSubcriptionFilters: { // input type
    first: number; // Int!
    rootDataId: string; // ID!
    skip: number; // Int!
  }
  SetUserThemeInput: { // input type
    name: string; // String!
  }
  SignInInput: { // input type
    createAccount: boolean; // Boolean!
    email: string; // String!
    password: string; // String!
  }
  TadaCreateInput: { // input type
    description?: string | null; // String
    name: string; // String!
  }
  TadaDeleteInput: { // input type
    id: string; // ID!
  }
  TadaUpdateInput: { // input type
    description?: string | null; // String
    id: string; // ID!
    name?: string | null; // String
  }
  TadaWhereInput: { // input type
    AND?: NexusGenInputs['TadaWhereInput'][] | null; // [TadaWhereInput!]
    createdAt?: any | null; // DateTime
    createdAt_gt?: any | null; // DateTime
    createdAt_gte?: any | null; // DateTime
    createdAt_in?: any[] | null; // [DateTime!]
    createdAt_lt?: any | null; // DateTime
    createdAt_lte?: any | null; // DateTime
    createdAt_not?: any | null; // DateTime
    createdAt_not_in?: any[] | null; // [DateTime!]
    creator?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    description?: string | null; // String
    description_contains?: string | null; // String
    description_ends_with?: string | null; // String
    description_gt?: string | null; // String
    description_gte?: string | null; // String
    description_in?: string[] | null; // [String!]
    description_lt?: string | null; // String
    description_lte?: string | null; // String
    description_not?: string | null; // String
    description_not_contains?: string | null; // String
    description_not_ends_with?: string | null; // String
    description_not_in?: string[] | null; // [String!]
    description_not_starts_with?: string | null; // String
    description_starts_with?: string | null; // String
    id?: string | null; // ID
    id_contains?: string | null; // ID
    id_ends_with?: string | null; // ID
    id_gt?: string | null; // ID
    id_gte?: string | null; // ID
    id_in?: string[] | null; // [ID!]
    id_lt?: string | null; // ID
    id_lte?: string | null; // ID
    id_not?: string | null; // ID
    id_not_contains?: string | null; // ID
    id_not_ends_with?: string | null; // ID
    id_not_in?: string[] | null; // [ID!]
    id_not_starts_with?: string | null; // ID
    id_starts_with?: string | null; // ID
    name?: string | null; // String
    name_contains?: string | null; // String
    name_ends_with?: string | null; // String
    name_gt?: string | null; // String
    name_gte?: string | null; // String
    name_in?: string[] | null; // [String!]
    name_lt?: string | null; // String
    name_lte?: string | null; // String
    name_not?: string | null; // String
    name_not_contains?: string | null; // String
    name_not_ends_with?: string | null; // String
    name_not_in?: string[] | null; // [String!]
    name_not_starts_with?: string | null; // String
    name_starts_with?: string | null; // String
    NOT?: NexusGenInputs['TadaWhereInput'][] | null; // [TadaWhereInput!]
    OR?: NexusGenInputs['TadaWhereInput'][] | null; // [TadaWhereInput!]
    updatedAt?: any | null; // DateTime
    updatedAt_gt?: any | null; // DateTime
    updatedAt_gte?: any | null; // DateTime
    updatedAt_in?: any[] | null; // [DateTime!]
    updatedAt_lt?: any | null; // DateTime
    updatedAt_lte?: any | null; // DateTime
    updatedAt_not?: any | null; // DateTime
    updatedAt_not_in?: any[] | null; // [DateTime!]
  }
  TeamWhereInput: { // input type
    AND?: NexusGenInputs['TeamWhereInput'][] | null; // [TeamWhereInput!]
    createdAt?: any | null; // DateTime
    createdAt_gt?: any | null; // DateTime
    createdAt_gte?: any | null; // DateTime
    createdAt_in?: any[] | null; // [DateTime!]
    createdAt_lt?: any | null; // DateTime
    createdAt_lte?: any | null; // DateTime
    createdAt_not?: any | null; // DateTime
    createdAt_not_in?: any[] | null; // [DateTime!]
    description?: string | null; // String
    description_contains?: string | null; // String
    description_ends_with?: string | null; // String
    description_gt?: string | null; // String
    description_gte?: string | null; // String
    description_in?: string[] | null; // [String!]
    description_lt?: string | null; // String
    description_lte?: string | null; // String
    description_not?: string | null; // String
    description_not_contains?: string | null; // String
    description_not_ends_with?: string | null; // String
    description_not_in?: string[] | null; // [String!]
    description_not_starts_with?: string | null; // String
    description_starts_with?: string | null; // String
    id?: string | null; // ID
    id_contains?: string | null; // ID
    id_ends_with?: string | null; // ID
    id_gt?: string | null; // ID
    id_gte?: string | null; // ID
    id_in?: string[] | null; // [ID!]
    id_lt?: string | null; // ID
    id_lte?: string | null; // ID
    id_not?: string | null; // ID
    id_not_contains?: string | null; // ID
    id_not_ends_with?: string | null; // ID
    id_not_in?: string[] | null; // [ID!]
    id_not_starts_with?: string | null; // ID
    id_starts_with?: string | null; // ID
    members_every?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    members_none?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    members_some?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    name?: string | null; // String
    name_contains?: string | null; // String
    name_ends_with?: string | null; // String
    name_gt?: string | null; // String
    name_gte?: string | null; // String
    name_in?: string[] | null; // [String!]
    name_lt?: string | null; // String
    name_lte?: string | null; // String
    name_not?: string | null; // String
    name_not_contains?: string | null; // String
    name_not_ends_with?: string | null; // String
    name_not_in?: string[] | null; // [String!]
    name_not_starts_with?: string | null; // String
    name_starts_with?: string | null; // String
    NOT?: NexusGenInputs['TeamWhereInput'][] | null; // [TeamWhereInput!]
    OR?: NexusGenInputs['TeamWhereInput'][] | null; // [TeamWhereInput!]
    updatedAt?: any | null; // DateTime
    updatedAt_gt?: any | null; // DateTime
    updatedAt_gte?: any | null; // DateTime
    updatedAt_in?: any[] | null; // [DateTime!]
    updatedAt_lt?: any | null; // DateTime
    updatedAt_lte?: any | null; // DateTime
    updatedAt_not?: any | null; // DateTime
    updatedAt_not_in?: any[] | null; // [DateTime!]
  }
  UserWhereInput: { // input type
    AND?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    createdAt?: any | null; // DateTime
    createdAt_gt?: any | null; // DateTime
    createdAt_gte?: any | null; // DateTime
    createdAt_in?: any[] | null; // [DateTime!]
    createdAt_lt?: any | null; // DateTime
    createdAt_lte?: any | null; // DateTime
    createdAt_not?: any | null; // DateTime
    createdAt_not_in?: any[] | null; // [DateTime!]
    email?: string | null; // String
    email_contains?: string | null; // String
    email_ends_with?: string | null; // String
    email_gt?: string | null; // String
    email_gte?: string | null; // String
    email_in?: string[] | null; // [String!]
    email_lt?: string | null; // String
    email_lte?: string | null; // String
    email_not?: string | null; // String
    email_not_contains?: string | null; // String
    email_not_ends_with?: string | null; // String
    email_not_in?: string[] | null; // [String!]
    email_not_starts_with?: string | null; // String
    email_starts_with?: string | null; // String
    id?: string | null; // ID
    id_contains?: string | null; // ID
    id_ends_with?: string | null; // ID
    id_gt?: string | null; // ID
    id_gte?: string | null; // ID
    id_in?: string[] | null; // [ID!]
    id_lt?: string | null; // ID
    id_lte?: string | null; // ID
    id_not?: string | null; // ID
    id_not_contains?: string | null; // ID
    id_not_ends_with?: string | null; // ID
    id_not_in?: string[] | null; // [ID!]
    id_not_starts_with?: string | null; // ID
    id_starts_with?: string | null; // ID
    NOT?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    OR?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    password?: string | null; // String
    password_contains?: string | null; // String
    password_ends_with?: string | null; // String
    password_gt?: string | null; // String
    password_gte?: string | null; // String
    password_in?: string[] | null; // [String!]
    password_lt?: string | null; // String
    password_lte?: string | null; // String
    password_not?: string | null; // String
    password_not_contains?: string | null; // String
    password_not_ends_with?: string | null; // String
    password_not_in?: string[] | null; // [String!]
    password_not_starts_with?: string | null; // String
    password_starts_with?: string | null; // String
    tadas_every?: NexusGenInputs['TadaWhereInput'] | null; // TadaWhereInput
    tadas_none?: NexusGenInputs['TadaWhereInput'] | null; // TadaWhereInput
    tadas_some?: NexusGenInputs['TadaWhereInput'] | null; // TadaWhereInput
    team?: NexusGenInputs['TeamWhereInput'] | null; // TeamWhereInput
    themeName?: string | null; // String
    themeName_contains?: string | null; // String
    themeName_ends_with?: string | null; // String
    themeName_gt?: string | null; // String
    themeName_gte?: string | null; // String
    themeName_in?: string[] | null; // [String!]
    themeName_lt?: string | null; // String
    themeName_lte?: string | null; // String
    themeName_not?: string | null; // String
    themeName_not_contains?: string | null; // String
    themeName_not_ends_with?: string | null; // String
    themeName_not_in?: string[] | null; // [String!]
    themeName_not_starts_with?: string | null; // String
    themeName_starts_with?: string | null; // String
    updatedAt?: any | null; // DateTime
    updatedAt_gt?: any | null; // DateTime
    updatedAt_gte?: any | null; // DateTime
    updatedAt_in?: any[] | null; // [DateTime!]
    updatedAt_lt?: any | null; // DateTime
    updatedAt_lte?: any | null; // DateTime
    updatedAt_not?: any | null; // DateTime
    updatedAt_not_in?: any[] | null; // [DateTime!]
  }
}

export interface NexusGenEnums {
  EmailError: "ALREADY_EXISTS" | "EMAIL" | "NOT_EXISTS" | "REQUIRED"
  Max140CharsError: "MAX_140_CHARS" | "REQUIRED"
  MutationType: "CREATED" | "DELETED" | "UPDATED"
  PasswordError: "MAX_1024_CHARS" | "MIN_5_CHARS" | "REQUIRED" | "WRONG_PASSWORD"
  URLError: "REQUIRED" | "URL"
  UserOrderByInput: "createdAt_ASC" | "createdAt_DESC" | "email_ASC" | "email_DESC" | "id_ASC" | "id_DESC" | "password_ASC" | "password_DESC" | "themeName_ASC" | "themeName_DESC" | "updatedAt_ASC" | "updatedAt_DESC"
}

export interface NexusGenRootTypes {
  AggregateTada: { // root type
    count: number; // Int!
  }
  AggregateUser: { // root type
    count: number; // Int!
  }
  Mutation: {};
  PageInfo: { // root type
    endCursor?: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor?: string | null; // String
  }
  Query: {};
  SetUserThemePayload: { // root type
    user?: NexusGenRootTypes['User'] | null; // User
  }
  SignInErrors: { // root type
    email?: NexusGenEnums['EmailError'] | null; // EmailError
    password?: NexusGenEnums['PasswordError'] | null; // PasswordError
  }
  SignInPayload: { // root type
    errors?: NexusGenRootTypes['SignInErrors'] | null; // SignInErrors
    token?: string | null; // String
  }
  Subscription: {};
  Tada: { // root type
    createdAt: any; // DateTime!
    creator: NexusGenRootTypes['User']; // User!
    description?: string | null; // String
    id: string; // ID!
    name: string; // String!
    updatedAt: any; // DateTime!
  }
  TadaConnection: { // root type
    edges: NexusGenRootTypes['TadaEdge'][]; // [TadaEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  TadaCreateErrors: { // root type
    name?: NexusGenEnums['Max140CharsError'] | null; // Max140CharsError
  }
  TadaCreatePayload: { // root type
    errors?: NexusGenRootTypes['TadaCreateErrors'] | null; // TadaCreateErrors
    tada?: NexusGenRootTypes['Tada'] | null; // Tada
  }
  TadaDeletePayload: { // root type
    tada?: NexusGenRootTypes['Tada'] | null; // Tada
  }
  TadaEdge: { // root type
    cursor: string; // String!
    node: NexusGenRootTypes['Tada']; // Tada!
  }
  TadaPreviousValues: { // root type
    createdAt: any; // DateTime!
    description?: string | null; // String
    id: string; // ID!
    name: string; // String!
    updatedAt: any; // DateTime!
  }
  TadaSubscriptionPayload: { // root type
    mutation: NexusGenEnums['MutationType']; // MutationType!
    node?: NexusGenRootTypes['Tada'] | null; // Tada
    previousValues?: NexusGenRootTypes['TadaPreviousValues'] | null; // TadaPreviousValues
    updatedFields?: string[] | null; // [String!]
  }
  TadaUpdateErrors: { // root type
    name?: NexusGenEnums['Max140CharsError'] | null; // Max140CharsError
  }
  TadaUpdatePayload: { // root type
    errors?: NexusGenRootTypes['TadaUpdateErrors'] | null; // TadaUpdateErrors
    tada?: NexusGenRootTypes['Tada'] | null; // Tada
  }
  Team: { // root type
    createdAt: any; // DateTime!
    description?: string | null; // String
    id: string; // ID!
    name: string; // String!
    updatedAt: any; // DateTime!
  }
  User: { // root type
    createdAt: any; // DateTime!
    email: string; // String!
    id: string; // ID!
    themeName: string; // String!
    updatedAt: any; // DateTime!
  }
  UserConnection: { // root type
    edges: NexusGenRootTypes['UserEdge'][]; // [UserEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  UserEdge: { // root type
    cursor: string; // String!
    node: NexusGenRootTypes['User']; // User!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
  JSON: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  PageSubcriptionFilters: NexusGenInputs['PageSubcriptionFilters'];
  SetUserThemeInput: NexusGenInputs['SetUserThemeInput'];
  SignInInput: NexusGenInputs['SignInInput'];
  TadaCreateInput: NexusGenInputs['TadaCreateInput'];
  TadaDeleteInput: NexusGenInputs['TadaDeleteInput'];
  TadaUpdateInput: NexusGenInputs['TadaUpdateInput'];
  TadaWhereInput: NexusGenInputs['TadaWhereInput'];
  TeamWhereInput: NexusGenInputs['TeamWhereInput'];
  UserWhereInput: NexusGenInputs['UserWhereInput'];
  EmailError: NexusGenEnums['EmailError'];
  Max140CharsError: NexusGenEnums['Max140CharsError'];
  MutationType: NexusGenEnums['MutationType'];
  PasswordError: NexusGenEnums['PasswordError'];
  URLError: NexusGenEnums['URLError'];
  UserOrderByInput: NexusGenEnums['UserOrderByInput'];
}

export interface NexusGenFieldTypes {
  AggregateTada: { // field return type
    count: number; // Int!
  }
  AggregateUser: { // field return type
    count: number; // Int!
  }
  Mutation: { // field return type
    createTada: NexusGenRootTypes['TadaCreatePayload']; // TadaCreatePayload!
    deleteTada: NexusGenRootTypes['TadaDeletePayload']; // TadaDeletePayload!
    setUserTheme: NexusGenRootTypes['SetUserThemePayload']; // SetUserThemePayload!
    signIn: NexusGenRootTypes['SignInPayload']; // SignInPayload!
    updateTada: NexusGenRootTypes['TadaUpdatePayload']; // TadaUpdatePayload!
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Query: { // field return type
    requiredViewer: NexusGenRootTypes['User'] | null; // User
    tada: NexusGenRootTypes['Tada'] | null; // Tada
    user: NexusGenRootTypes['User'] | null; // User
    viewer: NexusGenRootTypes['User'] | null; // User
  }
  SetUserThemePayload: { // field return type
    user: NexusGenRootTypes['User'] | null; // User
  }
  SignInErrors: { // field return type
    email: NexusGenEnums['EmailError'] | null; // EmailError
    password: NexusGenEnums['PasswordError'] | null; // PasswordError
  }
  SignInPayload: { // field return type
    errors: NexusGenRootTypes['SignInErrors'] | null; // SignInErrors
    token: string | null; // String
  }
  Subscription: { // field return type
    userTadasConnection: NexusGenRootTypes['TadaConnection']; // TadaConnection!
    viewerAccessibleTadaUpdated: NexusGenRootTypes['TadaSubscriptionPayload']; // TadaSubscriptionPayload!
  }
  Tada: { // field return type
    createdAt: any; // DateTime!
    creator: NexusGenRootTypes['User']; // User!
    description: string | null; // String
    id: string; // ID!
    name: string; // String!
    updatedAt: any; // DateTime!
  }
  TadaConnection: { // field return type
    aggregate: NexusGenRootTypes['AggregateTada']; // AggregateTada!
    edges: NexusGenRootTypes['TadaEdge'][]; // [TadaEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  TadaCreateErrors: { // field return type
    name: NexusGenEnums['Max140CharsError'] | null; // Max140CharsError
  }
  TadaCreatePayload: { // field return type
    errors: NexusGenRootTypes['TadaCreateErrors'] | null; // TadaCreateErrors
    tada: NexusGenRootTypes['Tada'] | null; // Tada
  }
  TadaDeletePayload: { // field return type
    tada: NexusGenRootTypes['Tada'] | null; // Tada
  }
  TadaEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Tada']; // Tada!
  }
  TadaPreviousValues: { // field return type
    createdAt: any; // DateTime!
    description: string | null; // String
    id: string; // ID!
    name: string; // String!
    updatedAt: any; // DateTime!
  }
  TadaSubscriptionPayload: { // field return type
    mutation: NexusGenEnums['MutationType']; // MutationType!
    node: NexusGenRootTypes['Tada'] | null; // Tada
    previousValues: NexusGenRootTypes['TadaPreviousValues'] | null; // TadaPreviousValues
    previousValuesAsTada: NexusGenRootTypes['Tada'] | null; // Tada
    updatedFields: string[] | null; // [String!]
  }
  TadaUpdateErrors: { // field return type
    name: NexusGenEnums['Max140CharsError'] | null; // Max140CharsError
  }
  TadaUpdatePayload: { // field return type
    errors: NexusGenRootTypes['TadaUpdateErrors'] | null; // TadaUpdateErrors
    tada: NexusGenRootTypes['Tada'] | null; // Tada
  }
  Team: { // field return type
    createdAt: any; // DateTime!
    description: string | null; // String
    id: string; // ID!
    members: NexusGenRootTypes['User'][] | null; // [User!]
    name: string; // String!
    updatedAt: any; // DateTime!
  }
  User: { // field return type
    createdAt: any; // DateTime!
    email: string; // String!
    id: string; // ID!
    tadas: NexusGenRootTypes['TadaConnection']; // TadaConnection!
    team: NexusGenRootTypes['Team'] | null; // Team
    teamates: NexusGenRootTypes['UserConnection']; // UserConnection!
    themeName: string; // String!
    updatedAt: any; // DateTime!
  }
  UserConnection: { // field return type
    aggregate: NexusGenRootTypes['AggregateUser']; // AggregateUser!
    edges: NexusGenRootTypes['UserEdge'][]; // [UserEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  UserEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['User']; // User!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createTada: { // args
      input: NexusGenInputs['TadaCreateInput']; // TadaCreateInput!
    }
    deleteTada: { // args
      input: NexusGenInputs['TadaDeleteInput']; // TadaDeleteInput!
    }
    setUserTheme: { // args
      input: NexusGenInputs['SetUserThemeInput']; // SetUserThemeInput!
    }
    signIn: { // args
      input: NexusGenInputs['SignInInput']; // SignInInput!
    }
    updateTada: { // args
      input: NexusGenInputs['TadaUpdateInput']; // TadaUpdateInput!
    }
  }
  Query: {
    tada: { // args
      id: string; // ID!
    }
    user: { // args
      id: string; // ID!
    }
  }
  Subscription: {
    userTadasConnection: { // args
      filters: NexusGenInputs['PageSubcriptionFilters']; // PageSubcriptionFilters!
    }
  }
  Team: {
    members: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenEnums['UserOrderByInput'] | null; // UserOrderByInput
      skip?: number | null; // Int
      where?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    }
  }
  User: {
    tadas: { // args
      first: number; // Int!
      skip?: number | null; // Int
    }
    teamates: { // args
      first: number; // Int!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "AggregateTada" | "AggregateUser" | "Mutation" | "PageInfo" | "Query" | "SetUserThemePayload" | "SignInErrors" | "SignInPayload" | "Subscription" | "Tada" | "TadaConnection" | "TadaCreateErrors" | "TadaCreatePayload" | "TadaDeletePayload" | "TadaEdge" | "TadaPreviousValues" | "TadaSubscriptionPayload" | "TadaUpdateErrors" | "TadaUpdatePayload" | "Team" | "User" | "UserConnection" | "UserEdge";

export type NexusGenInputNames = "PageSubcriptionFilters" | "SetUserThemeInput" | "SignInInput" | "TadaCreateInput" | "TadaDeleteInput" | "TadaUpdateInput" | "TadaWhereInput" | "TeamWhereInput" | "UserWhereInput";

export type NexusGenEnumNames = "EmailError" | "Max140CharsError" | "MutationType" | "PasswordError" | "URLError" | "UserOrderByInput";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "JSON" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: types.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}