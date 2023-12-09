import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import UserPage from "./UserPage";
import InformationPopup from "./InformationPopup";
import ProtectedRouteElement from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/Api";
import authApi from "../utils/Auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [isRegisterSuccessPopupOpen, setIsRegisterSuccessPopupOpen] =
    React.useState(false);
  const [isSomethingWentWrongPopupOpen, setIsSomethingWentWrongPopupOpen] =
    React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authApi.getContent(token).then((res) => {
        setUserEmail(res.email);
        setIsLoggedIn(true);
      });
    }
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (isLoggedIn && token) {
      Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
        .then((values) => {
          const [userInfo, initialCards] = values;
          setCurrentUser(userInfo);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) navigate("/", { replace: true });
  }, [isLoggedIn]);

  function closeAllPopups() {
    setIsRegisterSuccessPopupOpen(false);
    setIsSomethingWentWrongPopupOpen(false);
  }

  const handleLogin = ({ email, password }) => {
    authApi
      .signin({ email, password })
      .then((res) => {
        setUserEmail(email);
        setIsLoggedIn(true);
        localStorage.setItem("token", res.token);
      })
      .catch((err) => {
        console.log(err);
        setIsSomethingWentWrongPopupOpen(true);
      });
  };

  function handleRegister({ email, password }) {
    return authApi
      .signup({ email, password })
      .then((res) => {
        console.log(res);
        setIsRegisterSuccessPopupOpen(true);
        return res;
      })
      .catch((err) => {
        console.log(err);
        setIsSomethingWentWrongPopupOpen(true);
        return Promise.reject(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            userEmail={userEmail}
            location={location}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={UserPage}
                  isLoggedIn={isLoggedIn}
                  handleclosePopups={closeAllPopups}
                  setCurrentUser={setCurrentUser}
                  cards={cards}
                  setCards={setCards}
                />
              }
            />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <InformationPopup
            name="register-success"
            message="Вы успешно зарегистрировались!"
            isOpen={isRegisterSuccessPopupOpen}
            onClose={closeAllPopups}
            isErrorMessage={false}
          />
          <InformationPopup
            name="error"
            message="Что-то пошло не так! Попробуйте ещё раз."
            isOpen={isSomethingWentWrongPopupOpen}
            onClose={closeAllPopups}
            isErrorMessage={true}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
