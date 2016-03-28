import { Todos } from '../Todos.react.js';
import Todo from '../Todo.react.js';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import React from 'react';

describe('Todos', () => {
  // Define default props to reuse through all the tests
  // PropTypes will warn if these props are not provided
  const todosDefaultProps = {
    deleteTodo: () => {},
    msg: {
      empty: 'No todos!',
    },
    todos: Map(),
    toggleTodoCompleted: () => {}
  };

  it('should render a Todo item per todo', () => {
    const todoList = Map({
      1: {
        id: 1,
        title: 'First todo'
      },
      2: {
        id: 3,
        title: 'Second todo'
      }
    });

    // Use shallow-rendering as much as possible.
    // With shallow-rendering, no need to think of the component's children
    // It's always better to expose as little of your code to your test
    const wrapper = shallow(
      <Todos
        {...{
          ...todosDefaultProps,
          todos: todoList,
        }}
      />
    );

    expect(wrapper.find(Todo).length).equal(todoList.size);
  });
});
