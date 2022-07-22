import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddNewBook.scss";
import def from "../../image/Default.png";
import { useNavigate, useParams } from "react-router-dom";
import ModalType from "../modalType/ModalType.js";

const AddNewBook = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [genres, setGenres] = useState([
    { name: "" },
    { name: "Бестселлеры" },
    { name: "Новинки" },
    { name: "Художественная литература" },
    { name: "Эзотерика" },
    { name: "Образование" },
    { name: "Психология" },
    { name: "Искусство" },
    { name: "Наука" },
  ]);

  const [{ alt, src, file }, setImg] = useState({
    src: "",
    alt: "your image",
    file: null,
  });

  const [modalType, setModalType] = useState({
    id,
    todown: false,
    type: "",
    open: false,
  });

  const [newBook, setNewBook] = useState({
    name: "",
    autor: "",
    rating: 0,
    description: "",
    countDownl: 0,
    genre: "",
    img: "",
  });
  const [errorName, setErrorName] = useState("");
  const [errorAutor, setErrorAutor] = useState("");
  const [errorGenre, setErrorGenre] = useState("");
  const [errorDescription, setDescription] = useState("");

  let flagError = true;

  useEffect(() => {
    if (id) {
      axios
        .post(`http://localhost:8080/book/get`, {
          id,
        })
        .then((res) => {
          const { book } = res.data;
          setNewBook(book);
        });
    }
    console.log(id);
  }, []);

  const previewImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
        file: e.target.files[0],
      });
    }
  };

  const setGenre = (e) => {
    setNewBook({
      ...newBook,
      genre: e.target.value,
    });
  };

  const saveBook = () => {
    if (newBook.name.length === 0) {
      setErrorName("Заполните поле название!");
      flagError = false;
    } else if (newBook.autor.length === 0) {
      setErrorAutor("Заполните поле автор!");
      flagError = false;
    } else if (newBook.genre.length === 0) {
      setErrorGenre("Заполните поле жанры!");
      flagError = false;
    } else if (newBook.description.length === 0) {
      setDescription("Заполните поле описание!");
      flagError = false;
    } else if (id) {
      const formData = new FormData();
      formData.append("img", file);
      axios
        .patch("http://localhost:8080/book/patch", {
          id,
          name: newBook.name,
          autor: newBook.autor,
          description: newBook.description,
          genre: newBook.genre,
          type: modalType.type,
        })
        .then((res) => {
          if (src) {
            axios
              .patch("http://localhost:8080/book/patchimg", formData, {
                headers: {
                  id,
                },
              })
              .then((res) => {});
          }
          setNewBook({
            name: "",
            autor: "",
            rating: 0,
            description: "",
            countDownl: 0,
            genre: "",
            img: "",
          });
          setImg({
            src: "",
            alt: "your image",
            file: null,
          });

          setErrorName("");
          setErrorAutor("");
          setErrorGenre("");
          setDescription("");

          navigate(`/BookPage/${id}`);
        });
    } else {
      const formData = new FormData();
      formData.append("img", file);
      axios
        .post("http://localhost:8080/book/post", {
          name: newBook.name,
          autor: newBook.autor,
          rating: 0,
          description: newBook.description,
          countDownl: 0,
          genre: newBook.genre,
          img: "",
          type: modalType.type,
        })
        .then((res) => {
          if (src) {
            axios
              .patch("http://localhost:8080/book/patchimg", formData, {
                headers: {
                  id: res.data,
                },
              })
              .then((res) => {});
          }
          setNewBook({
            name: "",
            autor: "",
            rating: "",
            description: "",
            countDownl: "",
            genre: "",
            img: "",
          });
          setImg({
            src: "",
            alt: "your image",
            file: null,
          });

          setErrorName("");
          setErrorAutor("");
          setErrorGenre("");
          setDescription("");

          navigate("/MainPage");
        });
    }
  };

  const toModalType = () => {
    if (id) {
      setModalType({ ...modalType, open: true, todown: true });
    } else setModalType({ ...modalType, open: true });
  };

  return (
    <div className="container_ANB">
      <div className="img_block">
        {src === "" ? <img src={def}></img> : <img src={src}></img>}
        <input
          multiple
          type="file"
          name="file1"
          id="file1"
          accept="image/*"
          multiple
          onChange={(e) => previewImg(e)}
        />
        <label for="file1" className="button_ANB">
          Загрузить изображение
        </label>

        {/* <input multiple type="file" name="file2" id="file2" /> */}
        <label for="file2" className="button_ANB" onClick={() => toModalType()}>
          Загрузить файлы
        </label>
      </div>

      <div className="input_block">
        <div className="input_block__one">
          <p>Название:</p>
          <input
            type="text"
            onChange={(e) =>
              setNewBook({
                ...newBook,
                name: e.target.value,
              })
            }
            value={newBook.name}
          />
        </div>
        <p className="addNewBook_error">{errorName}</p>
        <div className="input_block__one">
          <p>Автор:</p>
          <input
            type="text"
            onChange={(e) =>
              setNewBook({
                ...newBook,
                autor: e.target.value,
              })
            }
            value={newBook.autor}
          />
        </div>
        <p className="addNewBook_error">{errorAutor}</p>
        <div className="input_block__one">
          <p>Жанры:</p>
          <select onChange={(e) => setGenre(e)} value={newBook.genre}>
            {genres.map((elem, index) => (
              <option key={index} value={elem.name}>
                {elem.name}
              </option>
            ))}
          </select>
        </div>
        <p className="addNewBook_error">{errorGenre}</p>
        <div className="input_block__one">
          <p>Описание:</p>
          <textarea
            onChange={(e) =>
              setNewBook({
                ...newBook,
                description: e.target.value,
              })
            }
            value={newBook.description}
          ></textarea>
        </div>
        <p className="addNewBook_error">{errorDescription}</p>
        <button className="button_ANB button_save" onClick={() => saveBook()}>
          Сохранить
        </button>
      </div>
      {modalType.open && (
        <ModalType modalType={modalType} setModalType={setModalType} />
      )}
    </div>
  );
};

export default AddNewBook;
