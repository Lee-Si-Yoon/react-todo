import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const ToDosWarpper = styled.ul`
  max-width: 470px;
  margin: 20px auto 0 auto;
`;

const CategoryForm = styled.form`
  input {
    font-size: 16px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin: 0 12px 0 0;
    padding: 0 0 4px 0;
    &:focus {
      outline: none;
    }
  }
  button {
    font-size: 16px;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: #34495e;
    cursor: pointer;
    &:hover {
      background-color: #95a5a6;
      transition: 0.2s all ease-out;
    }
  }
`;

const CategorySelect = styled.select`
  font-size: 16px;
  padding: 3px 5px;
  border: none;
  cursor: pointer;
  option {
    padding: 20px;
    border-radius: 0px;
  }
`;

const Base = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 470px;
  margin: 30px auto 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5), 0px 3px 3px rgba(0, 0, 0, 0.5);
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  //
  interface ICategory {
    newCategory: string;
  }
  const { handleSubmit, register, setValue } = useForm<ICategory>();
  const handleCategoryAdd = ({ newCategory }: ICategory) => {
    const categorySelector = document.querySelector("select");
    const newCategoryOpt = document.createElement("option");
    newCategoryOpt.value = newCategory;
    newCategoryOpt.innerHTML = newCategory;
    categorySelector?.appendChild(newCategoryOpt);
    setValue("newCategory", "");
  };
  return (
    <>
      <Base>
        <CategorySelect value={category} onInput={onInput}>
          <option value="TO_DO">To Do</option>
          <option value="DOING">Doing</option>
          <option value="DONE">Done</option>
        </CategorySelect>
        <CategoryForm onSubmit={handleSubmit(handleCategoryAdd)}>
          <input {...register("newCategory")} placeholder="add your category" />
          <button>Add</button>
        </CategoryForm>
      </Base>
      <CreateToDo />
      <ToDosWarpper>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDosWarpper>
    </>
  );
}

export default ToDoList;
