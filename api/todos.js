import Appbase from 'appbase-js'; // installed alongside reactivesearch-native

import CONFIG from './../constants/Config';

class TodoModel {
  constructor(key) {
    this.key = key;
    this.todos = [];
    this.onChanges = [];
    this.appbaseRef = new Appbase({
      url: CONFIG.url,
      app: CONFIG.app,
      credentials: CONFIG.credentials,
      type: CONFIG.type,
    });
  }

  addTodo(todo) {
    const body = {
      createdAt: Date.now(),
      ...todo,
    };

    this.appbaseRef
      .index({
        type: CONFIG.type,
        body,
      })
      .on('data', (response) => {
        console.log('@api - add', response);
      })
      .on('error', (error) => {
        console.error('@api - add', error);
      });
  }

  update = (editedTodo) => {
    const { _id, touched, ...todo } = editedTodo;

    this.appbaseRef
      .index({
        type: CONFIG.type,
        id: _id,
        body: {
          ...todo,
        },
      })
      .on('data', (response) => {
        console.log('@api - update', response);
      })
      .on('error', (error) => {
        console.error('@api - update', error);
      });
  };

  destroy = (todo) => {
    this.appbaseRef
      .delete({
        type: CONFIG.type,
        id: todo._id,
      })
      .on('data', (response) => {
        console.log('@api - destroy: ', response);
      })
      .on('error', (error) => {
        console.error('@api - destroy: ', error);
      });
  };
}

export default TodoModel;
