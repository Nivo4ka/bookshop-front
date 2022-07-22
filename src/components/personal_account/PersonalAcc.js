import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PersonalAcc.scss";
import { useNavigate, Link } from "react-router-dom";
import Avatar from "../../image/Avatar.png";
import def from "../../image/Default.png";
import PerAccImg from "../../image/PerAccImg.png";

const PersonalAcc = ({ user, setUser }) => {
  let navigate = useNavigate();
  const [usr, setUsr] = useState({
    _id: "",
    login: "",
    role: "",
    img: "",
  });

  useEffect(() => {
    setUsr(JSON.parse(localStorage.getItem("userAuth")));
  }, []);

  const previewImg = (e) => {
    if (e.target.files[0]) {
    }

    const formData = new FormData();
    formData.append("img", e.target.files[0]);
    axios
      .patch("http://localhost:8080/user/patch", formData, {
        headers: { login: JSON.parse(localStorage.getItem("userAuth")).login },
      })
      .then((res) => {
        setUsr({ ...usr, img: res.data });
        let ur = JSON.parse(localStorage.getItem("userAuth"));
        ur.img = res.data;
        localStorage.setItem("userAuth", JSON.stringify(ur));
      });
  };

  const toGoAuth = () => {
    localStorage.removeItem("userAuth");
    navigate("/MainPage");
  };

  const toGoAddNewBook = () => {
    navigate("/AddNewBook");
  };

  return (
    <div className="container_AC">
      <div className="first_block">
        <p className="first_block__lable">Личный кабинет</p>
        <div className="main">
          <div className="genres_PerAcc">
            <div className="colorG">
              <div className="colorA">
                <div>&bull;</div>
                <div>Мой профиль</div>
              </div>
              <div className="colorB">
                <div>Уведомления</div>
              </div>
              <div className="colorB">
                <div>Моя история скачиваний</div>
              </div>
              {usr.role === "Admin" && (
                <div onClick={() => toGoAddNewBook()} className="colorB">
                  <div>Добавить книгу</div>
                </div>
              )}
              <div onClick={() => toGoAuth()} className="colorB">
                <div>Выйти</div>
              </div>
            </div>
          </div>
          <div className="second_block">
            <div className="second_block__img_block">
              {usr.img === "" ? (
                <img className="second_block__img_block_avatar" src={def}></img>
              ) : (
                <img
                  className="second_block__img_block_avatar"
                  src={usr.img}
                ></img>
              )}
              <input
                multiple
                type="file"
                name="file1"
                id="file1"
                accept="image/*"
                onChange={(e) => previewImg(e)}
              />
              <label htmlFor="file1" className="button_ANB">
                Сменить аватар
              </label>
            </div>
            <div className="second_block__info_block">
              <p className="p_1">Логин</p>
              <p className="p_2">{usr.login}</p>
            </div>
          </div>
        </div>
      </div>

      <img className="second_block__perAccImg" src={PerAccImg}></img>
    </div>
  );
};

export default PersonalAcc;
