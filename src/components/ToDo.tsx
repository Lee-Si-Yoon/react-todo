import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";
import styled from "styled-components";

const ButtonWrapper = styled.div``;

const ToDosList = styled.li`
  list-style: none;
  border: 1px solid white;
  margin: 0 0 8px 0;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 16px;
    color: white;
    padding: 0 0 0 3px;
  }
  button {
    background-color: transparent;
    border: 1px solid white;
    padding: 5px 8px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 0 0 5px;
    &:hover {
      background-color: white;
      color: #34495e;
    }
  }
  button:last-child {
    color: red;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    if (name !== "delete") {
      setToDos((oldToDos) => {
        // toDo.id is id from onClick, id is from props sent by ToDoList
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        //const oldToDo = oldToDos[targetIndex];
        const newToDo = { text, id, category: name as any };

        const NEW_LOCAL_TODOS = [
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ];

        // LOCAL STORAGE
        localStorage.setItem("toDos", JSON.stringify(NEW_LOCAL_TODOS));
        return NEW_LOCAL_TODOS;
      });
    } else {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        const NEW_LOCAL_TODOS = [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];

        localStorage.setItem("toDos", JSON.stringify(NEW_LOCAL_TODOS));
        return NEW_LOCAL_TODOS;
      });
    }
  };
  return (
    <ToDosList>
      <span>{text}</span>
      <ButtonWrapper>
        {category !== "TO_DO" && (
          <button name="TO_DO" onClick={onClick}>
            ToDo
          </button>
        )}
        {category !== "DOING" && (
          <button name="DOING" onClick={onClick}>
            Doing
          </button>
        )}
        {category !== "DONE" && (
          <button name="DONE" onClick={onClick}>
            Done
          </button>
        )}
        <button name="delete" onClick={onClick}>
          X
        </button>
      </ButtonWrapper>
    </ToDosList>
  );
}

export default ToDo;
