import React, {useEffect} from 'react'
import axios from 'axios'
import {  useRecoilValue, useSetRecoilState,} from 'recoil'
import TodoItem from './TodoItem'
import TodoItemCreator from './TodoItemCreator';
import  TodoFilter from './TodoFilter';
import { filteredTodoListState, todoListState} from "./GlobalState/recoilState";

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