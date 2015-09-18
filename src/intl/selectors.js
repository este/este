export const selectTranslations = ({intl}) => {
  const {messages, selectedLanguage, defaultLanguage} = intl;
  return messages[selectedLanguage] || messages[defaultLanguage];
};
