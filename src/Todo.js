import React, {useEffect} from 'react'
import axios from 'axios'
import {  useRecoilValue, useSetRecoilState,} from 'recoil'
import TodoItem from './TodoItem'
import TodoItemCreator from './TodoItemCreator';
import  TodoFilter from './TodoFilter';
import { filteredTodoListState, todoListState,} from "./store/todoState";

function Todo () {
  const todoList = useRecoilValue(filteredTodoListState);
  const setTodoList = useSetRecoilState(todoListState);


  //useRecoilState = 업데이트 가능
  //useRecoilValue = 읽을때만 씀


  useEffect(() => {
    let mounted= true;

    const requestData = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      )

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