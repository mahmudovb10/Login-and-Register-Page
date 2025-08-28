import React from "react";
import useLogout from "../hooks/useLogout";

function Home() {
  const { _logout, error, isPending } = useLogout();
  return (
    <div>
      <h1>Home</h1>
      {error && <div>{error}</div>}
      {!isPending && <button onClick={_logout}>Logout</button>}
      {isPending && <button disabled>Loading</button>}
    </div>
  );
}

export default Home;
