import { useParams } from "react-router-dom";

function Task() {
  const { id } = useParams();
  return (
    <div>
      <h1>Task - {id}</h1>
    </div>
  );
}

export default Task;
