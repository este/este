// flow-typed signature: 19c805d2d2dd24bd4496ce0e8d882439
// flow-typed version: 39d19131b6/react-intl_v2.x.x/flow_>=v0.53.x

/**
 * Original implementation of this file by @marudor at https://github.com/marudor/flowInterfaces
 * Copied here based on intention to merge with flow-typed expressed here:
 * https://github.com/marudor/flowInterfaces/issues/6
 */
// Mostly from https://github.com/yahoo/react-intl/wiki/API#react-intl-api

type $npm$ReactIntl$LocaleData = {
  locale: string,
  [key: string]: any
};

type $npm$ReactIntl$MessageDescriptor = {
  id: string,
  description?: string,
  defaultMessage?: string
};

type $npm$ReactIntl$IntlConfig = {
  locale: string,
  formats: Object,
  messages: { [id: string]: string },

  defaultLocale?: string,
  defaultFormats?: Object
};

type $npm$ReactIntl$IntlProviderConfig = {
  locale?: string,
  formats?: Object,
  messages?: { [id: string]: string },

  defaultLocale?: string,
  defaultFormats?: Object
};

type $npm$ReactIntl$IntlFormat = {
  formatDate: (value: any, options?: Object) => string,
  formatTime: (value: any, options?: Object) => string,
  formatRelative: (value: any, options?: Object) => string,
  formatNumber: (value: any, options?: Object) => string,
  formatPlural: (value: any, options?: Object) => string,
  formatMessage: (
    messageDescriptor: $npm$ReactIntl$MessageDescriptor,
    values?: Object
  ) => string,
  formatHTMLMessage: (
    messageDescriptor: $npm$ReactIntl$MessageDescriptor,
    values?: Object
  ) => string
};

type $npm$ReactIntl$IntlShape = $npm$ReactIntl$IntlConfig &
  $npm$ReactIntl$IntlFormat & { now: () => number };

type $npm$ReactIntl$DateTimeFormatOptions = {
  localeMatcher?: "best fit" | "lookup",
  formatMatcher?: "basic" | "best fit",

  timeZone?: string,
  hour12?: boolean,

  weekday?: "narrow" | "short" | "long",
  era?: "narrow" | "short" | "long",
  year?: "numeric" | "2-digit",
  month?: "numeric" | "2-digit" | "narrow" | "short" | "long",
  day?: "numeric" | "2-digit",
  hour?: "numeric" | "2-digit",
  minute?: "numeric" | "2-digit",
  second?: "numeric" | "2-digit",
  timeZoneName?: "short" | "long"
};

type $npm$ReactIntl$RelativeFormatOptions = {
  style?: "best fit" | "numeric",
  units?: "second" | "minute" | "hour" | "day" | "month" | "year"
};

type $npm$ReactIntl$NumberFormatOptions = {
  localeMatcher?: "best fit" | "lookup",

  style?: "decimal" | "currency" | "percent",

  currency?: string,
  currencyDisplay?: "symbol" | "code" | "name",

  useGrouping?: boolean,

  minimumIntegerDigits?: number,
  minimumFractionDigits?: number,
  maximumFractionDigits?: number,
  minimumSignificantDigits?: number,
  maximumSignificantDigits?: number
};

type $npm$ReactIntl$PluralFormatOptions = {
  style?: "cardinal" | "ordinal"
};

type $npm$ReactIntl$PluralCategoryString =
  | "zero"
  | "one"
  | "two"
  | "few"
  | "many"
  | "other";

type $npm$ReactIntl$DateParseable = number | string | Date;

declare module "react-intl" {
  // PropType checker
  declare function intlShape(
    props: Object,
    propName: string,
    componentName: string
  ): void;
  declare function addLocaleData(
    data: $npm$ReactIntl$LocaleData | Array<$npm$ReactIntl$LocaleData>
  ): void;
  declare function defineMessages<
    T: { [key: string]: $npm$ReactIntl$MessageDescriptor }
  >(
    messageDescriptors: T
  ): T;
  declare function injectIntl<Props: {}>(
    WrappedComponent: React$ComponentType<
      { intl: $npm$ReactIntl$IntlShape } & Props
    >,
    options?: {
      intlPropName?: string,
      withRef?: boolean
    }
  ): React$ComponentType<Props>;
  declare function formatMessage(
    messageDescriptor: $npm$ReactIntl$MessageDescriptor,
    values?: Object
  ): string;
  declare function formatHTMLMessage(
    messageDescriptor: $npm$ReactIntl$MessageDescriptor,
    values?: Object
  ): string;
  declare function formatDate(
    value: any,
    options?: $npm$ReactIntl$DateTimeFormatOptions & { format: string }
  ): string;
  declare function formatTime(
    value: any,
    options?: $npm$ReactIntl$DateTimeFormatOptions & { format: string }
  ): string;
  declare function formatRelative(
    value: any,
    options?: $npm$ReactIntl$RelativeFormatOptions & {
      format: string,
      now: any
    }
  ): string;
  declare function formatNumber(
    value: any,
    options?: $npm$ReactIntl$NumberFormatOptions & { format: string }
  ): string;
  declare function formatPlural(
    value: any,
    options?: $npm$ReactIntl$PluralFormatOptions
  ): $npm$ReactIntl$PluralCategoryString;

  declare class FormattedMessage extends React$Component<
    $npm$ReactIntl$MessageDescriptor & {
      values?: Object,
      tagName?: string,
      children?: (...formattedMessage: Array<React$Node>) => React$Node
    }
  > {}
  declare class FormattedHTMLMessage extends React$Component<
    $npm$ReactIntl$DateTimeFormatOptions & {
      values?: Object,
      tagName?: string,
      children?: (...formattedMessage: Array<React$Node>) => React$Node
    }
  > {}
  declare class FormattedDate extends React$Component<
    $npm$ReactIntl$DateTimeFormatOptions & {
      value: $npm$ReactIntl$DateParseable,
      format?: string,
      children?: (formattedDate: string) => React$Node
    }
  > {}
  declare class FormattedTime extends React$Component<
    $npm$ReactIntl$DateTimeFormatOptions & {
      value: $npm$ReactIntl$DateParseable,
      format?: string,
      children?: (formattedDate: string) => React$Node
    }
  > {}
  declare class FormattedRelative extends React$Component<
    $npm$ReactIntl$RelativeFormatOptions & {
      value: $npm$ReactIntl$DateParseable,
      format?: string,
      updateInterval?: number,
      initialNow?: $npm$ReactIntl$DateParseable,
      children?: (formattedDate: string) => React$Node
    }
  > {}
  declare class FormattedNumber extends React$Component<
    $npm$ReactIntl$NumberFormatOptions & {
      value: number | string,
      format?: string,
      children?: (formattedNumber: string) => React$Node
    }
  > {}
  declare class FormattedPlural extends React$Component<
    $npm$ReactIntl$PluralFormatOptions & {
      value: number | string,
      other: React$Node,
      zero?: React$Node,
      one?: React$Node,
      two?: React$Node,
      few?: React$Node,
      many?: React$Node,
      children?: (formattedPlural: React$Node) => React$Node
    }
  > {}
  declare class IntlProvider extends React$Component<
    $npm$ReactIntl$IntlProviderConfig & {
      children: React$Node,
      initialNow?: $npm$ReactIntl$DateParseable
    }
  > {}
  declare type IntlShape = $npm$ReactIntl$IntlShape;
}
