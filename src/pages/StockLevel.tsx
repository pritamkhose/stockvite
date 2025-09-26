import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StockLevel.css";

const StockLevel: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid === undefined || uid === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSrJmCPUB_ICiVmQgcin2wr6C1GxciOcNYFSCzGUCiseVHbZS2qY809kIq9quSL7sTAT29o8k8qY4KD/pubhtml?widget=true&amp;headers=false"></iframe>
    </div>
  );
};

export default StockLevel;
