import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import NativeSelectDemo from "../Dropdown";
import { useDebounce } from "../utilities/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import { nanoid } from "@reduxjs/toolkit";
import MenuItem from '@mui/material/MenuItem';
import Btn from "../Btn";
import {
  addBalance,
  deductBalance,
  handleDate,
  setTransactionType,
  handleTitle,
  handleTransactions,
  setId,
  deleteTransaction
} from "../store/slices/transactionSlice";
import "./Dialog.css";

export default function FormDialog({ handleClickOpen, handleClose, open, cardId }) {
  const [amount, setAmount] = React.useState(0);
  const [date, setDate] = React.useState("");
  const [type, setType] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [currencyType, setCurrencyType] = React.useState("");
  const dispatch = useDispatch();
  const transactions = useSelector((t) => t.transaction);

  const currencies = [
    {
      value: 'INR',
      label: '₹',
    },
    {
      value: 'USD',
      label: '$',//83
    },
    {
      value: 'EUR',
      label: '€',//89.69
    },
    {
      value: 'BTC',
      label: '฿',//35,56,497.52
    },
    {
      value: 'JPY',
      label: '¥',//0.56
    },
  ];


  React.useEffect(()=>{
    if (cardId !== null) {
      const transaction = transactions.transactions.filter((t) => t.id === cardId)[0];
      setAmount(transaction?.amount>0 ? transaction?.amount : -transaction?.amount);
      setCurrencyType(transaction?.currencyType);
      setDate(transaction?.date);
      setType(transaction?.type);
      setTitle(transaction?.title);
    
    }
  }, [cardId]);

  const handleSubmit = () => {
    const id = nanoid();
    dispatch(handleDate(date));
    dispatch(setTransactionType(type));
    if (type === "Credit") {
      dispatch(addBalance(amount));
    } else {
      dispatch(deductBalance(amount));
    }
    dispatch(setId(id));
    dispatch(handleTitle(title));
    dispatch(
      handleTransactions({
        id: id,
        currencyType: currencyType??"₹",
        title:title,
        amount: type === "Debit" ? -amount : +amount,
        date: date,
        type: type,
      })
    );
    handleClose();
    setAmount(0);
    setDate("");
    setType("");
    setTitle("");
    setCurrencyType("₹");
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleTransactionType = (e) => {
    setType(e.target.value);
  };

  const debouncedSetTitle = useDebounce((value) => setTitle(value), 100);
  const debouncedSetAmount = useDebounce((value) => setAmount(value), 100);
  const debouncedSetDate = useDebounce((value) => setDate(value), 100);
  const debouncedHandleTransactionType = useDebounce((value) => setType(value), 100);

  // const handleAmountChange = (e) => {
  //   setAmount(e.target.value);
  // }

  const handleEdit = () =>{
    dispatch(deleteTransaction(cardId));
    dispatch(handleTransactions({
      title:title,
      id: cardId,
      currencyType: currencyType,
      amount: type === "Debit"? -amount : +amount,
      date: date,
      type: type,
    }))
    handleClose();
    
  }


  return (
    <React.Fragment>
    {!cardId && <Btn handleClickOpen={() => handleClickOpen()} />}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="heading-text" style={{paddingBottom:"8px"}}>
          {cardId === undefined || cardId == null?"Add Your Transactions":"Edit Your Transactions"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="sub-heading" style={{paddingBottom:"15px"}}>
           {cardId === undefined || cardId == null? "Enter your credits or debits here to manage your expenses":`Editing Transaction with id: ${cardId}`}
          </DialogContentText>
         
          <TextField
          inputProps={{ maxLength: 20 }}
            autoFocus
            required
            margin="dense"
            type="text"
            id="desc"
            name="description"
            label="Title"
            fullWidth
            variant="standard"
            className="form-field"
            value={title}
            onChange={(e) => debouncedSetTitle(e.target.value)}
          />
          <Stack direction="row" spacing={5} style={{padding:"12px 0"}}>
          <TextField
          id="standard-select-currency"
          select
          label="Currency"
          defaultValue="₹"
          value={currencyType}
          // helperText="Please select your currency"
          style={{width:"20%"}}
          variant="standard"
          onChange={(e)=>setCurrencyType(e.target.value)}
        >
          {currencies.map((option) => (
            <MenuItem key={option.label} value={option.label} >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="amount"
            name="amount"
            label="Amount"
            fullWidth
            variant="standard"
            className="form-field"
            value={isNaN(amount)?0:amount}
            onChange={(e) => debouncedSetAmount(e.target.value)}
          />
          </Stack>
          
          <TextField
            type="date"
            inputProps={{ max: getCurrentDate() }}
            autoFocus
            required
            margin="dense"
            id="date"
            name="date"
            className="form-field"
            fullWidth
            variant="standard"
            value={date}
            onChange={(e) => debouncedSetDate(e.target.value)}
          />
          <div className="form-field">
            <NativeSelectDemo handleType={(e) => debouncedHandleTransactionType(e.target.value)} type={type?.length === 0?"Select":type}/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
      {cardId === undefined || cardId == null?<Button disabled={!type?.length} type="submit" onClick={handleSubmit}>
        Add Transaction
      </Button>:<Button disabled={!type?.length || type==='Select'} type="submit" onClick={handleEdit}>
        Submit
      </Button>}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
