// Simulate async action.
export default function loadTodos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const todos = {
        todos: {
          list: [
            {id: 2, title: 'test'}
          ]
        }
      };

      resolve(todos);
    }, 20);
  });
}
