import React from 'react';
import {todoListFilterState } from './Todo'
import { useRecoilState } from 'recoil';



function TodoFilter() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({target: {value}}) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="전체">전체</option>
        <option value="complete">완료</option>
        <option value="incomplete">미완</option>
      </select>
    </>
  );
}

export default TodoFilter