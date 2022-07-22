import React, { useState, useEffect } from "react";
import axios from "axios";
import "./mainPage.scss";
import promo from "../../image/Group 77.svg";
import def from "../../image/Default.png";
import { useNavigate } from "react-router-dom";
import cover11 from "../../image/cover11.png";
import ModalDel from "../ModalDel/ModalDel.js";
import Rating from "@mui/material/Rating";

const MainPage = ({ triggers, setTriggers }) => {
  let navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([
    { name: "Бестселлеры", isActive: false },
    { name: "Новинки", isActive: false },
    { name: "Художественная литература", isActive: false },
    { name: "Эзотерика", isActive: false },
    { name: "Образование", isActive: false },
    { name: "Психология", isActive: false },
    { name: "Искусство", isActive: false },
    { name: "Наука", isActive: false },
  ]);

  const [modalDel, setModalDel] = useState({
    id: "",
    open: false,
  });

  useEffect(() => {
    if (localStorage.getItem("search")) {
      axios
        .post(`http://localhost:8080/book/searchBooks`, {
          s: localStorage.getItem("search"),
        })
        .then((res) => {
          const { books } = res.data;
          setBooks(books);
          localStorage.removeItem("search");
        });
    } else
      axios
        .post(`http://localhost:8080/book/getBooks`, {
          down: triggers.down,
          rating: triggers.rating,
          type: triggers.type,
        })
        .then((res) => {
          console.log(res.data);
          const { books } = res.data;
          setBooks(books);
        });
  }, [triggers, modalDel]);

  const setEnter = (index) => {
    genres.forEach((elem, inx) => {
      if (inx === index) {
        setGenres([...genres, (elem.isActive = true)]);
      } else if (elem.isActive) {
        setGenres([...genres, (elem.isActive = false)]);
      }
    });
    axios
      .post(`http://localhost:8080/book/getBooksBygenre`, {
        genre: genres[index].name,
      })
      .then((res) => {
        console.log(res.data);
        const { books } = res.data;
        setBooks(books);
      });
  };

  const toBook = (_id) => {
    navigate(`/BookPage/${_id}`);
  };

  const toModalDel = (_id) => {
    setModalDel({ id: _id, open: true });
  };

  return (
    <div>
      <div className="uppromo">
        <img src={promo} className="promo"></img>
      </div>
      <div className="cont">
        <div className="genres">
          <div className="colorG">
            {genres.map((element, index) =>
              element.isActive ? (
                <div key={index} className="colorA">
                  <div>&bull;</div>
                  <div>{element.name}</div>
                </div>
              ) : (
                <div
                  className="colorB"
                  key={index}
                  onClick={() => setEnter(index)}
                >
                  {element.name}
                </div>
              )
            )}
          </div>
        </div>
        <div className="listBook">
          {books.map((element, index) => (
            <div key={index} className="panelBook">
              {element.img ? (
                <img src={element.img}></img>
              ) : (
                <img src={def}></img>
              )}
              <div className="infoBook">
                {JSON.parse(localStorage.getItem("userAuth")) &&
                  JSON.parse(localStorage.getItem("userAuth")).role ===
                    "Admin" && (
                    <div className="del">
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => toModalDel(element._id)}
                      >
                        <path
                          d="M18.8472 23.6111H6.15278C5.88556 23.6048 5.62219 23.5459 5.37773 23.4378C5.13328 23.3296 4.91252 23.1744 4.72808 22.9809C4.54364 22.7874 4.39912 22.5595 4.30279 22.3102C4.20647 22.0609 4.16021 21.795 4.16667 21.5278V7.79858H5.55556V21.5278C5.54893 21.6126 5.55914 21.6979 5.58561 21.7788C5.61207 21.8597 5.65427 21.9346 5.70977 21.9992C5.76527 22.0637 5.83298 22.1166 5.90901 22.1549C5.98504 22.1932 6.06788 22.216 6.15278 22.2222H18.8472C18.9321 22.216 19.015 22.1932 19.091 22.1549C19.167 22.1166 19.2347 22.0637 19.2902 21.9992C19.3457 21.9346 19.3879 21.8597 19.4144 21.7788C19.4409 21.6979 19.4511 21.6126 19.4444 21.5278V7.79858H20.8333V21.5278C20.8398 21.795 20.7935 22.0609 20.6972 22.3102C20.6009 22.5595 20.4564 22.7874 20.2719 22.9809C20.0875 23.1744 19.8667 23.3296 19.6223 23.4378C19.3778 23.5459 19.1145 23.6048 18.8472 23.6111Z"
                          fill="#1C2A39"
                        />
                        <path
                          d="M21.375 6.24997H3.47222C3.28804 6.24997 3.1114 6.17681 2.98117 6.04657C2.85094 5.91634 2.77777 5.73971 2.77777 5.55553C2.77777 5.37135 2.85094 5.19472 2.98117 5.06448C3.1114 4.93425 3.28804 4.86108 3.47222 4.86108H21.375C21.5592 4.86108 21.7358 4.93425 21.866 5.06448C21.9963 5.19472 22.0694 5.37135 22.0694 5.55553C22.0694 5.73971 21.9963 5.91634 21.866 6.04657C21.7358 6.17681 21.5592 6.24997 21.375 6.24997Z"
                          fill="#1C2A39"
                        />
                        <path
                          d="M14.5833 9.02783H15.9722V19.4445H14.5833V9.02783Z"
                          fill="#1C2A39"
                        />
                        <path
                          d="M9.02777 9.02783H10.4167V19.4445H9.02777V9.02783Z"
                          fill="#1C2A39"
                        />
                        <path
                          d="M15.9722 4.06947H14.6528V2.7778H10.3472V4.06947H9.02777V2.7778C9.02733 2.42117 9.16408 2.07803 9.40972 1.81947C9.65535 1.56091 9.99103 1.40675 10.3472 1.38892H14.6528C15.009 1.40675 15.3446 1.56091 15.5903 1.81947C15.8359 2.07803 15.9727 2.42117 15.9722 2.7778V4.06947Z"
                          fill="#1C2A39"
                        />
                      </svg>
                    </div>
                  )}
                <div className="autor">{element.autor}</div>
                <div className="nameBook">{element.name}</div>
                <div className="autor">
                  <Rating
                    name="half-rating-read"
                    value={+element.rating.$numberDecimal}
                    precision={0.1}
                    readOnly
                  />
                </div>
                <div className="descript">{element.description}</div>
                <div className="autor">↓ {element.countDownl} скачиваний</div>
                <div>
                  <button onClick={() => toBook(element._id)}>Читать</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modalDel.open && (
        <ModalDel modalDel={modalDel} setModalDel={setModalDel} />
      )}
    </div>
  );
};

export default MainPage;
