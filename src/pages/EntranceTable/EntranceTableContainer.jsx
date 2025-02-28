import React, { useContext,useEffect,useState} from "react";
import EntranceTableComponent from "./EntranceTableComponent";
import { AppContext } from "context/AppContext";
import { CLAIM } from "constant/endpoints";

function EntranceTableContainer() {
  const { api, account } = useContext(AppContext);

  const [claims, setClaims] = useState([
  ]);
  useEffect(() => {
      api(CLAIM).then(({ ok, body }) => {
            if (ok) {
              setClaims(body.data)
            }
          });
    }, []);

  return <EntranceTableComponent claims={claims}/>;
}

export default EntranceTableContainer;
