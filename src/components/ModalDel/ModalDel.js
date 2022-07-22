import React from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import "./ModalDel.scss";

const ModalDel = ({ modalDel, setModalDel }) => {
  const delFunc = () => {
    axios
      .delete(`http://localhost:8080/book/del?id=${modalDel.id}`)
      .then((res) => {
        setModalDel({
          open: false,
          id: "",
        });
      });
  };

  const onCloseModalDel = () => {
    setModalDel({
      open: false,
      id: "",
    });
  };

  return (
    <Dialog
      open={modalDel.open}
      onClose={() => onCloseModalDel()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Вы уверены, что хотите удалить данную книгу?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button className="button_del" onClick={() => delFunc()}>
          Удалить
        </button>
        <button className="button_canc" onClick={() => onCloseModalDel()}>
          Отмена
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDel;
