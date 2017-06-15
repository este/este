// flow-typed signature: 59c6a9623e92cacd762f28ba1a717538
// flow-typed version: 77075613e4/validator_v7.x.x/flow_>=v0.38.x

declare module 'validator' {
  declare module.exports: {
    blacklist: $Exports<'validator/lib/blacklist'>,
    contains: $Exports<'validator/lib/contains'>,
    equals: $Exports<'validator/lib/equals'>,
    escape: $Exports<'validator/lib/escape'>,
    isAfter: $Exports<'validator/lib/isAfter'>,
    isAlpha: $Exports<'validator/lib/isAlpha'>,
    isAlphanumeric: $Exports<'validator/lib/isAlphanumeric'>,
    isAscii: $Exports<'validator/lib/isAscii'>,
    isBase64: $Exports<'validator/lib/isBase64'>,
    isBefore: $Exports<'validator/lib/isBefore'>,
    isBoolean: $Exports<'validator/lib/isBoolean'>,
    isByteLength: $Exports<'validator/lib/isByteLength'>,
    isCreditCard: $Exports<'validator/lib/isCreditCard'>,
    isCurrency: $Exports<'validator/lib/isCurrency'>,
    isDataURI: $Exports<'validator/lib/isDataURI'>,
    isDate: $Exports<'validator/lib/isDate'>,
    isDecimal: $Exports<'validator/lib/isDecimal'>,
    isDivisibleBy: $Exports<'validator/lib/isDivisibleBy'>,
    isEmail: $Exports<'validator/lib/isEmail'>,
    isEmpty: $Exports<'validator/lib/isEmpty'>,
    isFloat: $Exports<'validator/lib/isFloat'>,
    isFQDN: $Exports<'validator/lib/isFQDN'>,
    isFullWidth: $Exports<'validator/lib/isFullWidth'>,
    isHalfWidth: $Exports<'validator/lib/isHalfWidth'>,
    isHexadecimal: $Exports<'validator/lib/isHexadecimal'>,
    isHexColor: $Exports<'validator/lib/isHexColor'>,
    isIn: $Exports<'validator/lib/isIn'>,
    isInt: $Exports<'validator/lib/isInt'>,
    isIP: $Exports<'validator/lib/isIP'>,
    isISBN: $Exports<'validator/lib/isISBN'>,
    isISIN: $Exports<'validator/lib/isISIN'>,
    isISO8601: $Exports<'validator/lib/isISO8601'>,
    isISSN: $Exports<'validator/lib/isISSN'>,
    isJSON: $Exports<'validator/lib/isJSON'>,
    isLength: $Exports<'validator/lib/isLength'>,
    isLowercase: $Exports<'validator/lib/isLowercase'>,
    isMACAddress: $Exports<'validator/lib/isMACAddress'>,
    isMD5: $Exports<'validator/lib/isMD5'>,
    isMobilePhone: $Exports<'validator/lib/isMobilePhone'>,
    isMongoId: $Exports<'validator/lib/isMongoId'>,
    isMultibyte: $Exports<'validator/lib/isMultibyte'>,
    isNumeric: $Exports<'validator/lib/isNumeric'>,
    isSurrogatePair: $Exports<'validator/lib/isSurrogatePair'>,
    isUppercase: $Exports<'validator/lib/isUppercase'>,
    isURL: $Exports<'validator/lib/isURL'>,
    isUUID: $Exports<'validator/lib/isUUID'>,
    isVariableWidth: $Exports<'validator/lib/isVariableWidth'>,
    isWhitelisted: $Exports<'validator/lib/isWhitelisted'>,
    ltrim: $Exports<'validator/lib/ltrim'>,
    matches: $Exports<'validator/lib/matches'>,
    normalizeEmail: $Exports<'validator/lib/normalizeEmail'>,
    rtrim: $Exports<'validator/lib/rtrim'>,
    stripLow: $Exports<'validator/lib/stripLow'>,
    toBoolean: $Exports<'validator/lib/toBoolean'>,
    toDate: $Exports<'validator/lib/toDate'>,
    toFloat: $Exports<'validator/lib/toFloat'>,
    toInt: $Exports<'validator/lib/toInt'>,
    trim: $Exports<'validator/lib/trim'>,
    unescape: $Exports<'validator/lib/unescape'>,
    whitelist: $Exports<'validator/lib/whitelist'>
  };
}

type validator$MinMaxOptionalOptions = {
  min?: number,
  max?: number
}

type validator$MinMaxOptions = {
  min: number,
  max?: number
}

type validator$IsAlphaLocale = 'ar' | 'ar-AE' | 'ar-BH' | 'ar-DZ' | 'ar-EG' | 'ar-IQ' | 'ar-JO'
  | 'ar-KW' | 'ar-LB' | 'ar-LY' | 'ar-MA' | 'ar-QA' | 'ar-QM' | 'ar-SA' | 'ar-SD' | 'ar-SY'
  | 'ar-TN' | 'ar-YE' | 'cs-CZ' | 'da-DK' | 'de-DE' | 'en-AU' | 'en-GB' | 'en-HK' | 'en-IN'
  | 'en-NZ' | 'en-US' | 'en-ZA' | 'en-ZM' | 'es-ES' | 'fr-FR' | 'hu-HU' | 'nl-NL' | 'pl-PL'
  | 'pt-BR' | 'pt-PT' | 'ru-RU' | 'sr-RS' | 'sr-RS@latin' | 'tr-TR' | 'uk-UA';

type validator$IsAlphanumericLocale = validator$IsAlphaLocale | 'fr-BE' | 'nl-BE';

type validator$IsMobilePhoneLocale = 'ar-DZ' | 'ar-SA' | 'ar-SY' | 'cs-CZ' | 'de-DE' | 'da-DK'
  | 'el-GR' | 'en-AU' | 'en-GB' | 'en-HK' | 'en-IN' | 'en-NG' | 'en-NZ' | 'en-US' | 'en-CA'
  | 'en-ZA' | 'en-ZM' | 'es-ES' | 'en-PK' | 'fi-FI' | 'fr-FR' | 'he-IL' | 'hu-HU' | 'it-IT'
  | 'ja-JP' | 'ms-MY' | 'nb-NO' | 'nn-NO' | 'pl-PL' | 'pt-PT' | 'ro-RO' | 'ru-RU' | 'sr-RS'
  | 'tr-TR' | 'vi-VN' | 'zh-CN' | 'zh-HK' | 'zh-TW';

type validator$IsUUIDVersions = 3 | 4 | 5;

type validator$IsIPVersions = 4 | 6;

type validator$IsISBNVersions = 10 | 13;

type validator$IsCurrencyOptions = {
  symbol?: string,
  require_symbol?: boolean,
  allow_space_after_symbol?: boolean,
  symbol_after_digits?: boolean,
  allow_negatives?: boolean,
  parens_for_negatives?: boolean,
  negative_sign_before_digits?: boolean,
  negative_sign_after_digits?: boolean,
  allow_negative_sign_placeholder?: boolean,
  thousands_separator?: string,
  decimal_separator?: string,
  allow_space_after_digits?: boolean
}

type validator$IsEmailOptions = {
  allow_display_name?: boolean,
  require_display_name?: boolean,
  allow_utf8_local_part?: boolean,
  require_tld?: boolean
}

type validator$IsFQDNOptions = {
  require_tld?: boolean,
  allow_underscores?: boolean,
  allow_trailing_dot?: boolean
}

type validator$IsURLOptions = {
  protocols?: Array<string>,
  require_tld?: boolean,
  require_protocol?: boolean,
  require_host?: boolean,
  require_valid_protocol?: boolean,
  allow_underscores?: boolean,
  host_whitelist?: boolean,
  host_blacklist?: boolean,
  allow_trailing_dot?: boolean,
  allow_protocol_relative_urls?: boolean
}

type validator$NormalizeEmailOptions = {
  all_lowercase?: boolean,
  gmail_lowercase?: boolean,
  gmail_remove_dots?: boolean,
  gmail_remove_subaddress?: boolean,
  gmail_convert_googlemaildotcom?: boolean,
  outlookdotcom_lowercase?: boolean,
  outlookdotcom_remove_subaddress?: boolean,
  yahoo_lowercase?: boolean,
  yahoo_remove_subaddress?: boolean,
  icloud_lowercase?: boolean,
  icloud_remove_subaddress?: boolean,
}

type validator$IsISSNOptions = {
  case_sensitive?: boolean,
  require_hyphen?: boolean
};

declare module 'validator/lib/blacklist' {
  declare module.exports: {
    (input: string, chars: string): string
  };
}

declare module 'validator/lib/contains' {
  declare module.exports: {
    (str: string, seed?: mixed): boolean
  };
}

declare module 'validator/lib/equals' {
  declare module.exports: {
    (str: string, comparison: string): boolean
  };
}

declare module 'validator/lib/escape' {
  declare module.exports: {
    (input: string): string
  }
}

declare module 'validator/lib/isAfter' {
  declare module.exports: {
    (str: string, date?: string): boolean
  };
}

declare module 'validator/lib/isAlpha' {
  declare module.exports: {
    (str: string, locale?: validator$IsAlphaLocale): boolean
  };
}

declare module 'validator/lib/isAlphanumeric' {
  declare module.exports: {
    (str: string, locale?: validator$IsAlphanumericLocale): boolean
  };
}

declare module 'validator/lib/isAscii' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isBase64' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isBefore' {
  declare module.exports: {
    (str: string, date?: string): boolean
  };
}

declare module 'validator/lib/isBoolean' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isByteLength' {
  declare module.exports: {
    (str: string, options: validator$MinMaxOptions): boolean
  };
}

declare module 'validator/lib/isCreditCard' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isCurrency' {
  declare module.exports: {
    (str: string, options?: validator$IsCurrencyOptions): boolean
  };
}

declare module 'validator/lib/isDataURI' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isDate' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isDecimal' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isDivisibleBy' {
  declare module.exports: {
    (str: string, number: string | number): boolean
  };
}

declare module 'validator/lib/isEmail' {
  declare module.exports: {
    (str: string, options?: validator$IsEmailOptions): boolean;
  };
}

declare module 'validator/lib/isEmpty' {
  declare module.exports: {
    (str: string): boolean;
  };
}

declare module 'validator/lib/isFloat' {
  declare module.exports: {
    (str: string, options?: validator$MinMaxOptionalOptions): boolean
  };
}

declare module 'validator/lib/isFQDN' {
  declare module.exports: {
    (str: string, options?: validator$IsFQDNOptions): boolean
  };
}

declare module 'validator/lib/isFullWidth' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isHalfWidth' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isHexadecimal' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isHexColor' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isIn' {
  declare module.exports: {
    (str: string, values: Array<string> | string): boolean
  };
}

declare module 'validator/lib/isInt' {
  declare module.exports: {
    (str: string, options?: validator$MinMaxOptionalOptions): boolean
  };
}

declare module 'validator/lib/isIP' {
  declare module.exports: {
    (str: string, version?: validator$IsIPVersions): boolean
  };
}

declare module 'validator/lib/isISBN' {
  declare module.exports: {
    (str: string, version?: validator$IsISBNVersions): boolean
  };
}

declare module 'validator/lib/isISIN' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isISO8601' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isISSN' {
  declare module.exports: {
    (str: string, options?: validator$IsISSNOptions): boolean
  };
}

declare module 'validator/lib/isJSON' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isLength' {
  declare module.exports: {
    (password: string, options: validator$MinMaxOptions): boolean;
  }
}

declare module 'validator/lib/isLowercase' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isMACAddress' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isMD5' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isMobilePhone' {
  declare module.exports: {
    (str: string, locale: validator$IsMobilePhoneLocale): boolean
  };
}

declare module 'validator/lib/isMongoId' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isMultibyte' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isNumeric' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isSurrogatePair' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isUppercase' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isURL' {
  declare module.exports: {
    (str: string, options?: validator$IsURLOptions): boolean
  };
}

declare module 'validator/lib/isUUID' {
  declare module.exports: {
    (str: string, version?: validator$IsUUIDVersions): boolean
  };
}

declare module 'validator/lib/isVariableWidth' {
  declare module.exports: {
    (str: string): boolean
  };
}

declare module 'validator/lib/isWhitelisted' {
  declare module.exports: {
    (str: string, chars: string | Array<string>): boolean
  };
}

declare module 'validator/lib/ltrim' {
  declare module.exports: {
    (input: string, chars?: string): string
  };
}

declare module 'validator/lib/matches' {
  declare module.exports: {
    (str: string, pattern: RegExp | string, modifiers?: string): boolean
  };
}

declare module 'validator/lib/normalizeEmail' {
  declare module.exports: {
    (email: string, options?: validator$NormalizeEmailOptions): string
  };
}

declare module 'validator/lib/rtrim' {
  declare module.exports: {
    (input: string, chars?: string): string
  };
}

declare module 'validator/lib/stripLow' {
  declare module.exports: {
    (input: string, keep_new_lines?: boolean): string
  };
}

declare module 'validator/lib/toBoolean' {
  declare module.exports: {
    (input: string, strict?: boolean): boolean
  };
}

declare module 'validator/lib/toDate' {
  declare module.exports: {
    (input: string): Date
  };
}

declare module 'validator/lib/toFloat' {
  declare module.exports: {
    (input: string): number
  };
}

declare module 'validator/lib/toInt' {
  declare module.exports: {
    (input: string, radix?: number | string): number
  };
}

declare module 'validator/lib/trim' {
  declare module.exports: {
    (input: string, chars?: string): string
  };
}

declare module 'validator/lib/unescape' {
  declare module.exports: {
    (input: string): string
  };
}

declare module 'validator/lib/whitelist' {
  declare module.exports: {
    (input: string, chars: string): string
  };
}
