import config from '../config';
import Promise from 'bluebird';
import Immutable from 'immutable';
import i18n from '../lib/loadtranslations';

// Example how initialState, which is the same for all users, is enriched with
// user state. With state-less Flux, we don't need instances.
export default function userState() {

  return (req, res, next) => {
    loadUserData(req).then(loadedData => {
      console.log(loadedData);
      req.userState = Immutable.Map().merge(...loadedData);
      next();
    });
  };

}

// Gracefully settle all promises, ignore failed.
function loadUserData(req) {
  const dataSources = [
    loadLanguage(req),
    loadTodos()
  ];

  return Promise.settle(dataSources).then(receivedData =>
    receivedData
      .filter(promise => promise.isFulfilled())
      .map(promise => promise.value())
  );
}

function loadLanguage(req) {
  const acceptedLanguage = req.acceptsLanguages(i18n.locales);
  const locale = acceptedLanguage || config.defaultLocale;
  return {
    i18n: {
      locale,
      messages: i18n.messages[locale]
    }
  };
}

// Simulate async action.
function loadTodos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const todos = {
        todos: {
          list: [
            {id: 2, title: 'relax'}
          ]
        }
      };

      resolve(todos);
    }, 20);
  });
}
