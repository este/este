export default function mapStateToProps(state) {
  state = state.toObject();
  return {
    ...state,
    msg: state.intl.messages[state.intl.selectedLanguage]
  };
}
