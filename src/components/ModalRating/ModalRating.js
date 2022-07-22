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
import epub from "../../image/icons8-epub-96.png";
import fb2 from "../../image/icons8-fb2-96.png";
import pdf from "../../image/icons8-pdf-96 (1).png";
import txt from "../../image/icons8-txt-96.png";
import Rating from "@mui/material/Rating";
import "./ModalRating.scss";

const ModalRating = ({ modalRating, setModalRating }) => {
  const [review, setReview] = useState({
    rating: 0,
    review: "",
  });
  const [errorName, setErrorName] = useState("");

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setModalType(false);
  // };

  const onSaveChangesModal = (e) => {
    console.log(review);
    if (review.rating || review.review) {
      let userId=JSON.parse(localStorage.getItem("userAuth"))._id;
      axios
        .post("http://localhost:8080/review/post", {
          idUser: userId,
          idBook: modalRating.id,
          review: review.review,
          rating: review.rating,
        })
        .then((res) => {
          setErrorName("");
          setModalRating({ ...modalRating, open: false });
        });
    } else {
      setErrorName("Ниодно поле не заполнено!");
    }

    // onCloseModalEdit();
  };

  const onCloseModalEdit = (e) => {
    setModalRating({ ...modalRating, open: false });
  };

  return (
    <Dialog
      open={modalRating.open}
      onClose={() => onCloseModalEdit()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Напишите отзыв</DialogTitle>
      <DialogContent>
        <div className="modalReview">
          <div className="inline">
            <p>Ваш рейтинг:</p>
            <Rating
              name="simple-controlled"
              value={review.rating}
              onChange={(e) => {
                setReview({ ...review, rating: +e.target.value });
              }}
            />
          </div>
          <div>
            <div className="input_block__one">
              <p>Ваш отзыв:</p>
              <textarea
                onChange={(e) =>
                  setReview({
                    ...review,
                    review: e.target.value,
                  })
                }
                value={review.review}
              ></textarea>
            </div>
          </div>
          <p className="addNewBook_error">{errorName}</p>
        </div>
      </DialogContent>
      <DialogActions className="button_cancel">
        <button className="button_canc" onClick={(e) => onSaveChangesModal(e)}>
          Отправить
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalRating;
