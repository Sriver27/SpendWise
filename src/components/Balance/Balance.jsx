import React from "react";
import "./Balance.css";
import { useSelector } from "react-redux";

const Balance = ({ total, credits, debits }) => {
  // const transactions = useSelector((state)=>state.transaction)
  //  const balance = transactions.balance;

  return (
    <div className="main">
      <h2>
        Your Balance :{" "}
        <span id={`${total >= 0 ? "green" : "red"}`}>{"₹" +  total}</span>
      </h2>
      <h3>
        Credits :{" "}
        <span id="green">{"₹" + credits}</span>
      </h3>
      <h3>
        Debits :{" "}
        <span id="red">{"-"+" "+"₹" + debits}</span>
      </h3>
    </div>
  );
};

export default Balance;
