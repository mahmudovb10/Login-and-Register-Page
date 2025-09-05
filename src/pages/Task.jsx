import { useParams } from "react-router-dom";
import useDocument from "../hooks/useDocument";

function Task() {
  const { id } = useParams();
  const { data } = useDocument("task", id);
  console.log(data);

  return (
    <div>
      <h1>Task - {id}</h1>
    </div>
  );
}

export default Task;
