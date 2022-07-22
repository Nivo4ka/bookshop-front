import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import def from "../../image/Default.png";
import "./BookPage.scss";
import ModalType from "../modalType/ModalType.js";
import Rating from "@mui/material/Rating";
import ModalRating from "../ModalRating/ModalRating.js";

const BookPage = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [selectedBook, setSelectedBook] = useState({
    name: "",
    autor: "",
    rating: "",
    description: "",
    countDownl: "",
    genre: "",
    img: "",
  });
  const [revs, setRevs] = useState([]);
  const [modalType, setModalType] = useState({
    id,
    type: "",
    open: false,
  });

  const [modalRating, setModalRating] = useState({
    id,
    open: false,
  });

  const toModalType = () => {
    if (
      JSON.parse(localStorage.getItem("userAuth")) &&
      JSON.parse(localStorage.getItem("userAuth")).login
    ) {
      setModalType({ ...modalType, open: true });
    } else {
      navigate("/Authorization");
    }
  };

  const toModalReview = () => {
    if (
      JSON.parse(localStorage.getItem("userAuth")) &&
      JSON.parse(localStorage.getItem("userAuth")).login
    ) {
      setModalRating({ ...modalRating, open: true });
    } else {
      navigate("/Authorization");
    }
  };

  // let idSelectedBook = JSON.parse(localStorage.getItem('bookPageId'));

  useEffect(() => {
    axios
      .post(`http://localhost:8080/book/get`, {
        id,
      })
      .then((res) => {
        console.log(res.data);
        const { book } = res.data;
        setSelectedBook(book);
        axios
          .post(`http://localhost:8080/review/get`, {
            _id: book._id,
          })
          .then((ress) => {
            console.log(ress.data);
            const { reviews } = ress.data;
            let arr = reviews;
            // setRevs(reviews);

            arr.length &&
            arr.forEach((element, index) => {
                axios
                  .post(`http://localhost:8080/user/getUserById`, {
                    _id: element.idUser,
                  })
                  .then((result) => {
                    console.log(revs);
                    element.login = result.data.login;
                    element.img = result.data.img;
                    setRevs([...arr]);
                  });
              });

            // setRevs(arr);
          });
      });
  }, [modalType, modalRating]);

  const toEditBook = () => {
    navigate(`/AddNewBook/${id}`);
  };

  return (
    <div className="container_BP">
      <div className="img_block">
        {selectedBook.img === "" ? (
          <img src={def}></img>
        ) : (
          <img src={selectedBook.img}></img>
        )}
        <button className="button_BP" onClick={() => toModalType()}>
          Читать
        </button>

        <button className="button_BP" onClick={() => toModalReview()}>
          Оставить отзыв
        </button>
      </div>

      <div className="text_block">
        <div className="text_block__div_lable">
          <p className="text_block__div_lable_p">{selectedBook.name}</p>
          <Rating
            name="half-rating-read"
            value={+selectedBook.rating.$numberDecimal}
            precision={0.1}
            readOnly
          />

          <p className="text_block__div_lable_Downl">
            ↓ {selectedBook.countDownl} скачиваний
          </p>
          {JSON.parse(localStorage.getItem("userAuth")) &&
            JSON.parse(localStorage.getItem("userAuth")).role === "Admin" && (
              <div>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => toEditBook()}
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.0101 8.87941C20.091 5.05 20.8704 2.06029 20.3998 1.61618C19.9969 1.23382 16.6646 2.45588 15.0499 3.68529C14.741 3.92353 13.4881 7.51618 13.094 7.67206C12.7572 7.81029 12.8087 5.49853 12.9984 4.48529C11.4322 5.21323 8.80132 7.09118 7.34838 8.39265C7.23515 8.49559 6.9425 13.2059 6.8072 13.3471C6.53073 13.6235 5.69838 10.1574 5.46603 10.4544C2.13662 14.6897 0.641027 19.4132 2.02926 21.4426C0.702792 23.5779 0.0380859 24.9603 0.0380859 24.9603L1.06014 24.9206C1.67779 23.8632 2.29103 22.8706 2.90132 21.9088L2.9425 21.9309C4.41014 22.075 7.98367 21.6618 11.5513 18.3235C11.5513 18.3235 9.56603 17.1897 9.88956 16.85C10.2101 16.5088 13.291 15.4941 13.6131 15.1118C14.7675 13.7324 15.4204 13.0912 16.2954 11.75C16.5263 11.4 13.8969 12.0368 14.1101 11.6912C14.3175 11.3559 14.7998 9.65147 18.0101 8.87941Z"
                    fill="#1C2A39"
                  />
                </svg>
              </div>
            )}
        </div>

        <p className="text_block__autor_p">{selectedBook.autor}</p>

        <p className="text_block__description_lable">Описание</p>

        <p className="text_block__description_text">
          {selectedBook.description}
        </p>

        <div className="line"></div>

        <p className="response_lable">Отзывы</p>

        {revs.length !== 0 &&
          revs.map((elem, index) => (
            <div key={index} className="response_div">
              {console.log(elem.login)}
              <div className="response_div__user">
                <div className="response_div__user_avatar">
                  {elem.img ? (
                    <img src={elem.img}></img>
                  ) : (
                    <img src={def}></img>
                  )}
                </div>
                <p className="response_div__user_name">{elem.login}</p>
                <Rating
                  name="half-rating-read"
                  value={+elem.rating}
                  precision={0.1}
                  readOnly
                />
              </div>
              <p className="response_div__text">{elem.review}</p>
            </div>
          ))}
      </div>
      {modalType.open && (
        <ModalType modalType={modalType} setModalType={setModalType} />
      )}
      {modalRating.open && (
        <ModalRating
          modalRating={modalRating}
          setModalRating={setModalRating}
        />
      )}
    </div>
  );
};

export default BookPage;
