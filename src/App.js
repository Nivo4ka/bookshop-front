import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, Navigate } from "react-router-dom";
import Registration from "./components/registration/registration.js";
import Authorization from "./components/authorization/authorization.js";
import MainPage from "./components/main_page/mainPage.js";
import Header from "./components/header/header.js";
import PersonalAcc from "./components/personal_account/PersonalAcc.js";
import AddNewBook from "./components/Add_new_book/AddNewBook.js";
import BookPage from "./components/BookPage/BookPage.js";
import cover11 from "./image/cover11.png";

function App() {
  const [triggers, setTriggers] = useState({
    type: "",
    down: "",
    rating: "",
  });

  return (
    <div className="App">
      <Header triggers={triggers} setTriggers={setTriggers} />
      <Routes>
        <Route
          path="/MainPage"
          element={<MainPage triggers={triggers} setTriggers={setTriggers} />}
        />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Authorization" element={<Authorization />} />

        <Route path="/PersonalAccount" element={<PersonalAcc />} />
        <Route path="/BookPage/:id" element={<BookPage />} />
        <Route path="/AddNewBook" element={<AddNewBook />} />
        <Route path="/AddNewBook/:id" element={<AddNewBook />} />
      </Routes>
    </div>
  );
}

export default App;
