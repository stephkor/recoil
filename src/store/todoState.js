import {atom, selector,} from "recoil";

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

