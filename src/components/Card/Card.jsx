import React,{useState} from "react";
import "./Card.css";
import { PencilRuler, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Dialog from "../Dialog/Dialog"

const Card = (props) => {

  const [clicked, setClicked] = useState(false);
  const handleOpenClick = () => {
    setClicked(true);
  }
  const handleClose = () => {
    setClicked(false);
  }
  return (
    <div className="card">
      <h3 className="title">{props.title}</h3>
      <h3 className="date">{props.date}</h3>
      <h3 className="amount">
        <span className={`${props.balance > 0 ? "green" : "red"}`}>
          {props.currency+props.balance}
        </span>
      </h3>
      <div className="utilities">
        <PencilRuler className="edit-btn" onClick={handleOpenClick} />
        <Trash2 className="delete-btn" onClick={props.onDelete} />
      </div>
      {clicked && <Dialog handleClickOpen={()=>handleOpenClick} handleClose={handleClose} open={clicked} cardId={props.id}/>}
    </div>
  );
};

Card.propTypes = {
  title:PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Card;
