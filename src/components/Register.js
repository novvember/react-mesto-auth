import { Link } from 'react-router-dom';

import Header from './Header';

function Register() {
  return (

    <>
      <Header>
        <Link to="/sign-in" className="header__menu-item">Войти</Link>
      </Header>

      <main>
        <div className="login content__element">
          <h2 className="login__title">Регистрация</h2>
          <form className="login__form">
            <input
              type="email"
              className="login__input"
              placeholder="Email"
            />
            <input
              type="password"
              className="login__input"
              placeholder="Пароль"
            />
            <button rype="submit" className="login__submit-button">Зарегистрироваться</button>
          </form>
          <p className="login__extra-text">
            Уже зарегистрированы? <Link className="login__link" to="/sign-in">Войти</Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default Register;
