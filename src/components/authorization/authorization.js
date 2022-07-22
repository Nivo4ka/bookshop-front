import React, { useState } from "react";
import axios from "axios";
import "./authorization.scss";
import Girl from "../../image/girl.png";
import { useNavigate, Link } from "react-router-dom";

const Authorization = ({ user }) => {
  let navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    login: "",
    password: "",
  });
  const [errorLogin, setErrorLogin] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  let flagError = true;
  let flagFindUser = false;

  const authUser = () => {
    setErrorLogin("");
    setErrorPassword("");

    flagError = true;
    flagFindUser = false;

    if (newUser.login.length === 0) {
      setErrorLogin("Заполните поле логин!");
      flagError = false;
    } else if (newUser.password.length === 0) {
      setErrorPassword("Заполните поле пароль!");
      flagError = false;
    } else {
      axios
        .post("http://localhost:8080/user/get", {
          login: newUser.login,
          password: newUser.password,
        })
        .then((res) => {
          const {_id, login, img, role } = res.data;
          console.log(res.data)
          localStorage.setItem(
            "userAuth",
            JSON.stringify({
              _id:_id,
              login: login,
              role: role,
              img: img || "",
            })
          );
          setNewUser({
            login: "",
            password: "",
            passwordTwo: "",
          });

          setErrorLogin("");
          setErrorPassword("");

          navigate("/MainPage");
        })
        .catch((err) => {
          if (err.response.status === 450) {
            setErrorLogin("Такой пользователь не существует!");
            flagError = false;
          } 
          if(err.response.status === 440){
            setErrorPassword("Неправильный пароль!");
          flagError = false;
          }
        });
    }
  };

  return (
    <div className="container">
      <div className="registration">
        <img src={Girl} alt={"girl"} />
        <div className="registration__form">
          <p className="registration__form_lable">Авторизация</p>
          <div className="registration__form_div">
            <p>Логин:</p>
            <input
              className="registration__form_input"
              type="text"
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  login: e.target.value,
                })
              }
              value={newUser.login}
            />
            <p className="registration__form_error">{errorLogin}</p>
          </div>
          <div className="registration__form_div">
            <p>Пароль:</p>
            <input
              className="registration__form_input"
              type="password"
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  password: e.target.value,
                })
              }
              value={newUser.password}
            />
            <p className="registration__form_error">{errorPassword}</p>
          </div>
          <button onClick={() => authUser()}>Войти</button>
          <Link to={"/Registration"} className="registration__form_link">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
