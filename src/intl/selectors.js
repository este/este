export const selectTranslations = ({intl}) => {
  const {messages, selectedLanguage, defaultLanguage} = intl;
  return {
    msg: messages[selectedLanguage] || messages[defaultLanguage],
    availableLanguages: intl.availableLanguages
  };
};
