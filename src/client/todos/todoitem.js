import {Record} from 'immutable';

const TodoItemRecord = Record({
  id: '',
  title: ''
});

// This is example how to subclass Record and add getter.
export default class TodoItem extends TodoItemRecord {
  get titleLowerCase() {
    return this.title.toLowerCase();
  }
}

