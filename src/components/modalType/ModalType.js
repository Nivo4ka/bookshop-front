import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import "./ModalType.scss";
import epub from "../../image/icons8-epub-96.png";
import fb2 from "../../image/icons8-fb2-96.png";
import pdf from "../../image/icons8-pdf-96 (1).png";
import txt from "../../image/icons8-txt-96.png";

const ModalType = ({ modalType, setModalType }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setModalType(false);
  };

  const onSaveChangesModal = (e) => {
    if (modalType.id && !modalType.todown) {
      axios
        .patch("http://localhost:8080/book/patchdown", {
          id: modalType.id,
        })
        .then((res) => {
          setModalType({...modalType, open: false });
        });
    } else if (modalType.id && modalType.todown) {
      setModalType({ ...modalType, open: false, type: e.target.alt });
    } else setModalType({ ...modalType, open: false, type: e.target.alt });

    // onCloseModalEdit();
  };

  const onCloseModalEdit = (e) => {
    setModalType({ ...modalType, open: false });
  };

  return (
    <Dialog
      open={modalType.open}
      onClose={() => onCloseModalEdit()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Выберите тип файла для скачивания
      </DialogTitle>
      <DialogContent>
        <div className="setca">
          <img
            src={epub}
            alt="epub"
            onClick={(e) => onSaveChangesModal(e)}
          ></img>
          <img src={fb2} alt="fb2" onClick={(e) => onSaveChangesModal(e)}></img>
          <img src={pdf} alt="pdf" onClick={(e) => onSaveChangesModal(e)}></img>
          <img src={txt} alt="txt" onClick={(e) => onSaveChangesModal(e)}></img>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalType;
