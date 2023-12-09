import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({
  isLoggedIn,
  setIsLoggedIn,
  userEmail,
  location,
}) {
  const navigate = useNavigate();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

  function signOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsBurgerMenuOpen(false);
    navigate("/sign-in");
  }

  function handleMenuBurgerClick() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  return (
    <header
      className={`header ${isBurgerMenuOpen ? "header_menu-burger-open" : ""} `}
    >
      <img src={logo} alt="Лого" className="header__logo" />
      <div
        className={`header__mobile-nav ${
          isBurgerMenuOpen && isLoggedIn ? "header__mobile-nav_open" : ""
        } ${!isBurgerMenuOpen && isLoggedIn ? "header__mobile-nav_close" : ""}`}
      >
        <ul className="header__menu">
          {isLoggedIn && (
            <>
              <p className="header__menu-email">{userEmail}</p>
              <li>
                <button
                  onClick={signOut}
                  className="header__menu-link header__menu-button"
                >
                  Выйти
                </button>
              </li>
            </>
          )}
          {!isLoggedIn && location.pathname === "/sign-in" && (
            <Link to="/sign-up" className="header__menu-link">
              Регистрация
            </Link>
          )}
          {!isLoggedIn && location.pathname === "/sign-up" && (
            <Link to="/sign-in" className="header__menu-link">
              Войти
            </Link>
          )}
        </ul>
      </div>
      {isLoggedIn && (
        <div
          className={`header__menu-burger ${
            isBurgerMenuOpen ? "header__menu-burger_open" : ""
          }`}
          onClick={handleMenuBurgerClick}
        >
          <span></span>
        </div>
      )}
    </header>
  );
}

export default Header;
