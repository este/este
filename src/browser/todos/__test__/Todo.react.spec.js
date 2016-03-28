import Todo from '../Todo.react.js';
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';

describe('Todo', () => {
  const todoDefaultProps = {
    deleteTodo: () => {},
    todo: { id: 1, title: 'It is a todo' },
    toggleTodoCompleted: () => {},
  };

  it('should call deleteTodo on todo click', () => {
    const spiesObject = { deleteTodo: () => {} };
    const deleteTodoSpy = spy(spiesObject, 'deleteTodo');

    // Use the full dom rendering to test user interactions
    const wrapper = mount(
      <Todo
        {...{
          ...todoDefaultProps,
          deleteTodo: spiesObject.deleteTodo,
        }}
      />
    );

    wrapper.find('.button').simulate('click');

    expect(deleteTodoSpy.calledOnce).equal(true);
    expect(deleteTodoSpy.firstCall.args[0]).equal(todoDefaultProps.todo.id);
  });
});
