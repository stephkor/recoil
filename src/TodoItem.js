import React from 'react';
import {useRecoilState} from 'recoil'
import {todoListState }from './GlobalState/recoilState'


function edit(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

const  deleteItem = (arr, index) =>  {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}


function TodoItem({item}) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editTitle = ({target: {value}}) => {
    const newList = edit(todoList, index, {
      ...item,
    title: value,
    });

    setTodoList(newList);
  };

  const setComplete= () => {
    const newList = edit(todoList, index, {
      ...item,
      completed: !item.completed,
    });

    setTodoList(newList);
  };

  const deleteTodoItem = () => {
    const newList = deleteItem(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.title} onChange={editTitle} />
      <input
        type="checkbox"
        checked={item.completed}
        onChange={setComplete}
      />
      <button onClick={deleteTodoItem}>X</button>
    </div>
  );
}



export default TodoItem