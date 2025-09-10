import { useCollection } from "../hooks/useCollection";
import { useParams } from "react-router-dom";
import getRandomGradientImage from "../utils";

function UserInfo() {
  const { id } = useParams();
  const { data } = useCollection();

  return (
    <>
      {data && (
        <>
          <img
            src={data[0].bgURL ?? getRandomGradientImage()}
            alt=""
            style={{ height: "200px", width: "200px", objectFit: "cover" }}
          />
          <img src={data[0].photoURL} alt="" />
          <h3>{data[0].displayName}</h3>
        </>
      )}
    </>
  );
}

export default UserInfo;
