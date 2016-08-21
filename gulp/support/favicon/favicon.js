import fs from 'fs';
import path from 'path';

const extractAttributesFromElement = element =>
  element.replace(/^<.*?\s/, '').slice(0, -1);

// key1=value1 key2=value2 -> { key1: value1, key2: value2 }
const mapAttributesToObject = (attributesList, obj = {}) => {
  const result = attributesList.match(/\s*(.*?)="(.*?)"/);
  if (result) {
    const [match, key, value] = result;
    const { index, input } = result;
    obj[key] = value;
    const nextChopAtIndex = index + match.length;
    const rest = input.substring(nextChopAtIndex);
    if (rest.length > 0) {
      return mapAttributesToObject(rest, obj);
    }
  }
  return obj;
};

const toObject = element => {
  const attributes = extractAttributesFromElement(element);
  return mapAttributesToObject(attributes);
};

const faviconProcessingHtmlResultCode = () => {
  const faviconDataFile = path.join(__dirname, './favicon-data.json');
  return JSON.parse(fs.readFileSync(faviconDataFile)).favicon.html_code;
};

const isLink = element => /^<link/.test(element);

const injectFavicon = () => {
  const elements = faviconProcessingHtmlResultCode().split('\n');
  return elements.reduce((acc, element) => {
    const key = isLink(element) ? 'link' : 'meta';
    acc[key].push(toObject(element));
    return acc;
  }, { link: [], meta: [] });
};

export default injectFavicon;
