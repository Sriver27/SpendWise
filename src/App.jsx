import React, { useState, useEffect } from "react";
import "./App.css";
import Balance from "./components/Balance/Balance";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "./components/Dialog/Dialog";
import Card from "./components/Card/Card";
import Message from "./components/Message/Message";
import Toggle from "./components/Toggle/Toggle";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTransaction,
  updateBalance,
} from "./components/store/slices/transactionSlice";

function App() {
  const transactions = useSelector((t) => t.transaction);
  const dispatch = useDispatch();
  const [deletedTransactionId, setDeletedTransactionId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const total = transactions.transactions.reduce((acc, curr) => {
    if(curr.currencyType === "$")
    return acc + 83*curr.amount;
   else if(curr.currencyType === "€")
    return acc + 89.69*curr.amount;
   else if(curr.currencyType === "฿")
    return acc + 3556497.52*curr.amount;
   else if(curr.currencyType === "¥")
    return acc + 0.56*curr.amount;
   else
    return acc + curr.amount;
  }, 0);
  const credits = transactions.transactions.reduce((acc, curr) => {
    if (curr.type === "Credit") {
      if (curr.currencyType === "$") {
        return acc + 83 * curr.amount;
      } else if (curr.currencyType === "€") {
        return acc + 89.69 * curr.amount;
      } else if (curr.currencyType === "฿") {
        return acc + 3556497.52 * curr.amount;
      } else if (curr.currencyType === "¥") {
        return acc + 0.56 * curr.amount;
      } else {
        return acc + curr.amount;
      }
    }
  
    // If the type is not "Credit," return the accumulator without modification
    return acc;
  }, 0);
  
const debits = transactions.transactions.reduce((acc, curr) =>{

  if(curr.type ==="Debit"){

  if(curr.currencyType === "$")
  return acc + 83*curr.amount;
 else if(curr.currencyType === "€")
  return acc + 89.69*curr.amount;
 else if(curr.currencyType === "฿")
  return acc + 3556497.52*curr.amount;
 else if(curr.currencyType === "¥")
  return acc + 0.56*curr.amount;
 else
  return acc + curr.amount;
  }

  return acc;

},0);
  const [alignment, setAlignment] = useState("All");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleDeleteTransaction = (transactionId) => {
    dispatch(deleteTransaction(transactionId));
    setDeletedTransactionId(transactionId);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (deletedTransactionId !== null) {
      const updatedTransactions = transactions.transactions.filter(
        (t) => t.id !== deletedTransactionId
      );
      const totalAmount = updatedTransactions.reduce(
        (acc, t) => acc + +t.amount,
        0
      );
      dispatch(updateBalance(+totalAmount));
      setDeletedTransactionId(null);
    }
  }, [deletedTransactionId, transactions, dispatch]);

  const sortedTransactions = [...transactions.transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const filteredTransactions =
    alignment === "All"
      ? sortedTransactions
      : sortedTransactions.filter((t) => t.type === alignment);

  return (
    <>
      <div className="header">
        <h1>Expense Tracker</h1>
        <Stack direction="column" spacing={5} >
          <div className="stack-top">
            <Stack direction="row" spacing={80}>
              <Balance total={total} credits={credits === undefined?0:credits} debits={debits === undefined?0:-debits}/>
              <Dialog
                handleClickOpen={() => handleClickOpen}
                handleClose={handleClose}
                open={open}
                id={null}
              />
            </Stack>
          </div>

          <Toggle handleChange={handleChange} alignment={alignment} />
        </Stack>
        {filteredTransactions.length !== 0 ? (
          <div className="cards">
            {filteredTransactions.map((t) => (
              <Card
              title={t.title}
              currency={t.currencyType}
                balance={+t.amount}
                date={t.date}
                key={t.id}
                id={t.id}
                onDelete={() => handleDeleteTransaction(t.id)}
              />
            ))}
          </div>
        ) : (
          <Message />
        )}
      </div>
    </>
  );
}

export default App;
