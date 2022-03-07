import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState, IToDo, Categories } from "../atoms";

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
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
