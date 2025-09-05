import { useEffect, useState } from "react";
import { useCollection } from "../hooks/useCollection";
import FormInput from "../components/FormInput";
import FromTextArea from "../components/FromTextArea";
import Select, { components } from "react-select";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const navigate = useNavigate();
  const { data } = useCollection("users");
  const [userOptions, setUserOptions] = useState(null);
  const [attachedUsers, setAttachedUsers] = useState([]);

  useEffect(() => {
    const users = data?.map((user) => {
      return {
        value: user.uid,
        label: user.displayName,
        photoURL: user.photoURL,
      };
    });
    setUserOptions(users);
  }, [data]);

  const UserOption = (props) => (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <img
          src={props.data.photoURL}
          alt={props.data.label}
          className="w-6 h-6 rounded-full"
        />
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );

  const UserMultiValue = (props) => (
    <components.MultiValueLabel {...props}>
      <div className="flex items-center gap-1">
        <img
          src={props.data.photoURL}
          alt={props.data.label}
          className="w-4 h-4 rounded-full"
        />
        <span>{props.data.label}</span>
      </div>
    </components.MultiValueLabel>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const dueTo = formData.get("due-to");

    const task = {
      title,
      description,
      dueTo,
      attachedUsers,
      comments: [],
    };

    await addDoc(collection(db, "tasks"), {
      ...task,
    }).then(() => alert("Qo'shildi"));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <FormInput label="Title:" name="title" type="text" className="input" />
      <FromTextArea label="Description:" name="description" />
      <FormInput label="Due to:" name="due-to" type="date" />
      <Select
        isMulti
        name="users"
        value={attachedUsers}
        onChange={(users) => setAttachedUsers(users)}
        options={userOptions}
        className="basic-multi-select selectUsers"
        classNamePrefix="select"
        components={{ Option: UserOption, MultiValueLabel: UserMultiValue }}
      />
      <button className="btn btn-outline mt-[1rem] ml-[1rem]">
        Create Task
      </button>
    </form>
  );
}

export default CreateTask;
