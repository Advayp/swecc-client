import React from "react";
import api from "../api";
import { devPrint } from "../components/utils/RandomUltils";

const ProtectedPage: React.FC = () => {
  const whoami = async (): Promise<void> => {
    const res = await api.get('/api/members/profile/')
    const data = res.data
    devPrint(data);
  }

  return (
    <div className="container mt-3">
      <h1>React Cookie Auth</h1>
      <p>You are logged in!</p>
      <button onClick={whoami}>
        WhoAmI
      </button>
    </div>
  );
};

export default ProtectedPage;
