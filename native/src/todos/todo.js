import {Record} from 'immutable';

const TodoRecord = Record({
  // Record will create getter for every property.
  id: '',
  title: '',
  completed: false
});

export default class Todo extends TodoRecord {

  // And here we can add own getters.
  get titleLowerCase() {
    return this.title.toLowerCase();
  }

}
