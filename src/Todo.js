import React, {useEffect} from 'react'
import axios from 'axios'
import { atom, useRecoilValue, useSetRecoilState, selector} from 'recoil'
import TodoItem from './TodoItem'
import TodoItemCreator from './TodoItemCreator';
import  TodoFilter from './TodoFilter';

export const todoListState = atom({
  key: 'todoListState',
  default: [],
});

export const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: '전체',
});

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({get}) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'complete':
        return list.filter((item) => item.completed);
      case 'incomplete':
        return list.filter((item) => !item.completed);
      default:
        return list;
    }
  },
});

function Todo () {
  const todoList = useRecoilValue(filteredTodoListState);
  const setTodoList = useSetRecoilState(todoListState);


  useEffect(() => {
    let mounted= true;

    const requestData = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      )
      console.log(res)
      const {data} = res;
      setTodoList(data)
    } catch (e) {
      console.log(e)
    }
  }
  requestData()
    return () => {
      mounted = false;
    }
  }, [])



  return (
  <div>
    <TodoItemCreator/>
    <TodoFilter/>
     {todoList.map((todoItem) => (
        <TodoItem item={todoItem} key={todoItem.id} />
      ))}
  </div>

  )
}




export default Todo