import React from 'react'
import Button from "@mui/material/Button";

const Btn = (props) => {
  return (
    <Button
        variant="outlined"
        onClick={props.handleClickOpen()}
        style={{ height: "40px", fontWeight: "bold", border:"2px solid black"  }}
      >
        Add Transaction
      </Button>
  )
}

export default Btn