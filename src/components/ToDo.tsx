import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    const LOCAL_TODOS = JSON.parse(localStorage.getItem("toDos") as any);
    const LOCAL_TODO = LOCAL_TODOS.findIndex((toDo: any) => toDo.id === id);
    if (name !== "delete") {
      setToDos((oldToDos) => {
        // toDo.id is id from onClick, id is from props sent by ToDoList
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        //const oldToDo = oldToDos[targetIndex];
        const newToDo = { text, id, category: name as any };
        // LOCAL STORAGE
        const NEW_LOCAL_TODOS = [
          ...LOCAL_TODOS.slice(0, LOCAL_TODO),
          newToDo,
          ...LOCAL_TODOS.slice(LOCAL_TODO + 1),
        ];
        localStorage.setItem("toDos", JSON.stringify(NEW_LOCAL_TODOS));

        return [
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ];
      });
    } else {
      const NEW_LOCAL_TODOS = [
        ...LOCAL_TODOS.slice(0, LOCAL_TODO),
        ...LOCAL_TODOS.slice(LOCAL_TODO + 1),
      ];
      localStorage.setItem("toDos", JSON.stringify(NEW_LOCAL_TODOS));
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      });
    }
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          ToDo
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button name="delete" onClick={onClick}>
        X
      </button>
    </li>
  );
}

export default ToDo;
