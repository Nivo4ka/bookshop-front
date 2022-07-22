import React, { useState } from "react";
import axios from "axios";
import "./registration.scss";
import Girl from "../../image/girl.png";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  let navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    login: "",
    password: "",
    passwordTwo: "",
  });
  const [errorLogin, setErrorLogin] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordTwo, setErrorPasswordTwo] = useState("");
  let flagError = true;

  const addUser = () => {
    setErrorLogin("");
    setErrorPassword("");
    setErrorPasswordTwo("");

    flagError = true;
    if (newUser.password.length < 8) {
      setErrorPassword("Пароль должен содержать не менее 8 символов!");
      flagError = false;
    } else if (newUser.password !== newUser.passwordTwo) {
      setErrorPasswordTwo("Введенные пароли не совпадают!");
      flagError = false;
    } else if (newUser.login.length === 0) {
      setErrorLogin("Заполните поле логин!");
      flagError = false;
    } else if (newUser.password.length === 0) {
      setErrorPassword("Заполните поле пароль!");
      flagError = false;
    } else if (newUser.passwordTwo.length === 0) {
      setErrorPasswordTwo("Заполните поле повтора пароля!");
      flagError = false;
    } else {
      axios
        .post("http://localhost:8080/user/post", {
          login: newUser.login,
          password: newUser.password,
        })
        .then((res) => {
          const {_id, login, img, role } = res.data;
          console.log(res.data);
          localStorage.setItem(
            "userAuth",
            JSON.stringify({
              _id: _id,
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
          setErrorPasswordTwo("");

          navigate("/MainPage");
        })
        .catch((err) => {
          if (err.response.status === 421) {
            setErrorLogin("Такой логин уже существует!");
            flagError = false;
          }
        });
    }
  };

  return (
    <div className="containerReg">
      <div className="registration">
        <img src={Girl} alt={"girl"} />
        <div className="registration__form">
          <p className="registration__form_lable">Регистрация</p>
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
          <div className="registration__form_div">
            <p>Повторите пароль:</p>
            <input
              className="registration__form_input"
              type="password"
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  passwordTwo: e.target.value,
                })
              }
              value={newUser.passwordTwo}
            />
            <p className="registration__form_error">{errorPasswordTwo}</p>
          </div>
          <button onClick={() => addUser()}>Зарегистрироваться</button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
