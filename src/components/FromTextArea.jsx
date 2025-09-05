function FromTextArea({ label, name, type, className }) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor="" className="font-medium">
        {label}
      </label>
      <br />
      <textarea
        type={type}
        name={name}
        className="border border-gray-300  focus:outline-none  w-[20rem]"
      />
      <br />
    </div>
  );
}

export default FromTextArea;
