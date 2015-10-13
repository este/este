export default function mapStateToProps(state) {
  return {
    ...state,
    msg: state.intl.messages[state.intl.selectedLanguage]
  };
}
