import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./header.scss";

const Header = ({ books, setBooks, triggers, setTriggers }) => {
  let navigate = useNavigate();

  const [search, setSearch] = useState("");

  const toGoPerAcc = () => {
    navigate("/PersonalAccount");
  };

  const toGoAuth = () => {
    localStorage.removeItem("userAuth");
    navigate("/Authorization");
  };

  const toGoMainPage = () => {
    navigate("/MainPage");
  };

  const sortByrating = (e) => {
    e.preventDefault();
    if (triggers.rating === "") {
      setTriggers({ rating: "-1" });
    } else if (triggers.rating === "-1") {
      setTriggers({ rating: "1" });
    } else setTriggers({ rating: "" });
    navigate("/MainPage");
  };

  const sortBydown = (e) => {
    e.preventDefault();
    if (triggers.down === "") {
      setTriggers({ down: "-1" });
    } else if (triggers.down === "-1") {
      setTriggers({ down: "1" });
    } else setTriggers({ down: "" });
    navigate("/MainPage");
  };

  const sortByType = (e) => {
    e.preventDefault();
    setTriggers({ type: e.target.value });
    navigate("/MainPage");
  };

  const toSearch = () => {
    localStorage.setItem("search", search);
    navigate("/MainPage");
  };

  return (
    <div className="header">
      <p className="header__logo">Bookshop</p>
      <div className="header__navbar">
        <ul className="header__navbar_ul">
          <a className="header__navbar_text" onClick={() => toGoMainPage()}>
            Главная
          </a>
          <a
            className="header__navbar_text"
            href=""
            onClick={(e) => sortByrating(e)}
          >
            Рейтинг
          </a>
          <a
            className="header__navbar_text"
            href=""
            onClick={(e) => sortBydown(e)}
          >
            Количество скачиваний
          </a>
          <select onChange={(e) => sortByType(e)}>
            <option className="header__navbar_text" value="">
              Тип файла
            </option>

            <option className="option" value="fb2">
              FB2
            </option>
            <option className="option" value="pdf">
              PDF
            </option>
            <option className="option" value="epab">
              EPAB
            </option>
            <option className="option" value="txt">
              TXT
            </option>
          </select>
        </ul>
      </div>

      <div className="header_icons">
        <div id="wrap">
          <form action="" autocomplete="on">
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Поиск"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              id="search_submit"
              value="Rechercher"
              type="submit"
              onClick={() => toSearch()}
            ></input>
          </form>
        </div>
        {localStorage.getItem("userAuth") ? (
          JSON.parse(localStorage.getItem("userAuth")).role === "Admin" ? (
            <div className="header_icon" onClick={() => toGoPerAcc()}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.1887 7.33158C22.9931 7.1683 22.7555 7.06329 22.5031 7.02855C22.2507 6.9938 21.9936 7.03073 21.7612 7.1351L16.8215 9.33051C16.7769 9.35061 16.7264 9.35318 16.68 9.3377C16.6337 9.32223 16.5948 9.28984 16.5713 9.24701L13.6951 4.06976C13.5767 3.85664 13.4034 3.67906 13.1933 3.55542C12.9832 3.43178 12.7438 3.36658 12.5 3.36658C12.2562 3.36658 12.0168 3.43178 11.8067 3.55542C11.5965 3.67906 11.4233 3.85664 11.3049 4.06976L8.4287 9.24691C8.40516 9.28979 8.36632 9.32222 8.31993 9.33773C8.27354 9.35324 8.22301 9.3507 8.17841 9.3306L3.23788 7.13471C3.00528 7.03137 2.74846 6.99501 2.49631 7.02973C2.24417 7.06445 2.00673 7.16886 1.81071 7.33121C1.61469 7.49356 1.46789 7.70741 1.38682 7.94867C1.30575 8.18994 1.29364 8.44904 1.35185 8.69682L3.83671 19.2762C3.87805 19.4554 3.95548 19.6242 4.06429 19.7724C4.17309 19.9206 4.31098 20.0451 4.46952 20.1382C4.62905 20.2321 4.80581 20.293 4.98933 20.3172C5.17284 20.3415 5.35935 20.3286 5.53779 20.2793C10.0924 19.0219 14.9026 19.0215 19.4575 20.2781C19.6359 20.3272 19.8223 20.3401 20.0058 20.3158C20.1892 20.2916 20.3659 20.2307 20.5254 20.1369C20.6838 20.0438 20.8217 19.9194 20.9305 19.7713C21.0393 19.6232 21.1168 19.4545 21.1582 19.2754L23.6475 8.6976C23.7067 8.44979 23.6951 8.19032 23.614 7.9488C23.5328 7.70727 23.3855 7.4934 23.1887 7.33158ZM22.5066 8.42924L20.0174 19.0071C20.0117 19.0324 20.0009 19.0562 19.9855 19.0771C19.9702 19.098 19.9507 19.1156 19.9282 19.1286C19.9047 19.1424 19.8786 19.1514 19.8515 19.1549C19.8244 19.1583 19.7969 19.1563 19.7706 19.1488C15.0107 17.8354 9.984 17.8359 5.22441 19.1502C5.19814 19.1577 5.17062 19.1598 5.14352 19.1563C5.11642 19.1529 5.09031 19.1439 5.06679 19.13C5.04435 19.117 5.02485 19.0994 5.00949 19.0785C4.99413 19.0576 4.98325 19.0337 4.97753 19.0084V19.0083L2.49257 8.42875C2.48333 8.39335 2.48461 8.35603 2.49627 8.32135C2.50793 8.28668 2.52945 8.25616 2.55819 8.23353C2.59239 8.20433 2.63569 8.18796 2.68066 8.18724C2.70878 8.18751 2.73653 8.1937 2.7621 8.20541L7.70263 10.4013C8.01455 10.5417 8.36791 10.5594 8.69231 10.451C9.01672 10.3425 9.28836 10.1158 9.45312 9.81605L12.3293 4.63881C12.3462 4.60835 12.3709 4.58297 12.4009 4.56529C12.431 4.54762 12.4652 4.5383 12.5 4.5383C12.5348 4.5383 12.569 4.54762 12.599 4.56529C12.6291 4.58297 12.6538 4.60835 12.6707 4.63881L15.547 9.81615C15.7117 10.1159 15.9833 10.3426 16.3077 10.451C16.6321 10.5595 16.9855 10.5417 17.2974 10.4013L22.2372 8.2058C22.2704 8.19103 22.3071 8.18583 22.3432 8.19079C22.3792 8.19576 22.4131 8.21068 22.4411 8.23388C22.4691 8.25709 22.4901 8.28765 22.5017 8.32213C22.5133 8.35661 22.515 8.39364 22.5066 8.42904V8.42924Z"
                  fill="#1C2A39"
                />
              </svg>
            </div>
          ) : (
            <div className="header_icon" onClick={() => toGoPerAcc()}>
              <svg
                width="12"
                height="15"
                viewBox="0 0 12 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="path-1-inside-1_1_428" fill="white">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 4C9 5.65685 7.65685 7 6 7C4.34315 7 3 5.65685 3 4C3 2.34315 4.34315 1 6 1C7.65685 1 9 2.34315 9 4ZM10 4C10 6.20914 8.20914 8 6 8C3.79086 8 2 6.20914 2 4C2 1.79086 3.79086 0 6 0C8.20914 0 10 1.79086 10 4ZM1 13C1 11.3431 2.34315 10 4 10H8C9.65685 10 11 11.3431 11 13V14H1V13ZM0 13C0 10.7909 1.79086 9 4 9H8C10.2091 9 12 10.7909 12 13V15H0V13Z"
                  />
                </mask>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 4C9 5.65685 7.65685 7 6 7C4.34315 7 3 5.65685 3 4C3 2.34315 4.34315 1 6 1C7.65685 1 9 2.34315 9 4ZM10 4C10 6.20914 8.20914 8 6 8C3.79086 8 2 6.20914 2 4C2 1.79086 3.79086 0 6 0C8.20914 0 10 1.79086 10 4ZM1 13C1 11.3431 2.34315 10 4 10H8C9.65685 10 11 11.3431 11 13V14H1V13ZM0 13C0 10.7909 1.79086 9 4 9H8C10.2091 9 12 10.7909 12 13V15H0V13Z"
                  fill="#1C2A39"
                />
                <path
                  d="M11 14V15H12V14H11ZM1 14H0V15H1V14ZM12 15V16H13V15H12ZM0 15H-1V16H0V15ZM6 8C8.20914 8 10 6.20914 10 4H8C8 5.10457 7.10457 6 6 6V8ZM2 4C2 6.20914 3.79086 8 6 8V6C4.89543 6 4 5.10457 4 4H2ZM6 0C3.79086 0 2 1.79086 2 4H4C4 2.89543 4.89543 2 6 2V0ZM10 4C10 1.79086 8.20914 0 6 0V2C7.10457 2 8 2.89543 8 4H10ZM6 9C8.76142 9 11 6.76142 11 4H9C9 5.65685 7.65685 7 6 7V9ZM1 4C1 6.76142 3.23858 9 6 9V7C4.34315 7 3 5.65685 3 4H1ZM6 -1C3.23858 -1 1 1.23858 1 4H3C3 2.34315 4.34315 1 6 1V-1ZM11 4C11 1.23858 8.76142 -1 6 -1V1C7.65685 1 9 2.34315 9 4H11ZM4 9C1.79086 9 0 10.7909 0 13H2C2 11.8954 2.89543 11 4 11V9ZM8 9H4V11H8V9ZM12 13C12 10.7909 10.2091 9 8 9V11C9.10457 11 10 11.8954 10 13H12ZM12 14V13H10V14H12ZM1 15H11V13H1V15ZM0 13V14H2V13H0ZM4 8C1.23858 8 -1 10.2386 -1 13H1C1 11.3431 2.34315 10 4 10V8ZM8 8H4V10H8V8ZM13 13C13 10.2386 10.7614 8 8 8V10C9.65685 10 11 11.3431 11 13H13ZM13 15V13H11V15H13ZM0 16H12V14H0V16ZM-1 13V15H1V13H-1Z"
                  fill="#1C2A39"
                  mask="url(#path-1-inside-1_1_428)"
                />
              </svg>
            </div>
          )
        ) : (
          // <div className="header_icon">
          //   <svg
          //     width="15"
          //     height="15"
          //     viewBox="0 0 15 15"
          //     fill="none"
          //     xmlns="http://www.w3.org/2000/svg"
          //   >
          //     <path
          //       fillRule="evenodd"
          //       clipRule="evenodd"
          //       d="M12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5ZM10.8845 11.2986C9.72859 12.3554 8.18957 13 6.5 13C2.91015 13 0 10.0899 0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5C13 8.04017 12.4643 9.45523 11.5691 10.569L15 13.9999L14.2929 14.707L10.8845 11.2986Z"
          //       fill="#1C2A39"
          //     />
          //   </svg>
          // </div>
          <div className="header_icon" onClick={() => toGoAuth()}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3096 16.0714L14.881 12.5L11.3096 8.92859"
                stroke="#1C2A39"
                strokeWidth="1.19048"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.8808 12.5H4.1665"
                stroke="#1C2A39"
                strokeWidth="1.19048"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.35693 10.119V6.53809C5.35693 5.90826 5.60647 5.3041 6.05093 4.85786C6.49539 4.41161 7.09855 4.15965 7.72836 4.15713L17.195 4.11904C17.5078 4.11778 17.8178 4.17817 18.1072 4.29674C18.3966 4.41531 18.6598 4.58975 18.8818 4.81008C19.1038 5.03042 19.2802 5.29233 19.401 5.58086C19.5217 5.86939 19.5844 6.17888 19.5855 6.49166L19.6331 18.4309C19.6344 18.7436 19.574 19.0535 19.4555 19.3428C19.337 19.6322 19.1627 19.8953 18.9425 20.1173C18.7223 20.3393 18.4605 20.5157 18.1721 20.6365C17.8837 20.7573 17.5744 20.8202 17.2617 20.8214H7.73789C7.10642 20.8214 6.50081 20.5706 6.0543 20.1241C5.60778 19.6775 5.35693 19.0719 5.35693 18.4405V14.8809"
                stroke="#1C2A39"
                strokeWidth="1.19048"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
