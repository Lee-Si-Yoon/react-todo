import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState, IToDo } from "../atoms";
import styled from "styled-components";

const CreateForm = styled.form`
  display: flex;
  justify-content: space-around;
  max-width: 470px;
  margin: 12px auto 0 auto;
  padding: 20px 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5), 0px 3px 3px rgba(0, 0, 0, 0.5);
  input {
    width: 70%;
    border: none;
    font-size: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
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

interface IForm {
  toDo: string;
}

let L_TO_DOS: IToDo[] = [];

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  // to set category from the wanted starting category
  const category = useRecoilValue(categoryState);
  const { handleSubmit, register, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      // previous inputs
      ...oldToDos,
    ]);
    L_TO_DOS.push({ text: toDo, id: Date.now(), category });
    localStorage.setItem("toDos", JSON.stringify(L_TO_DOS));
    setValue("toDo", "");
  };
  return (
    <CreateForm onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </CreateForm>
  );
}

export default CreateToDo;
