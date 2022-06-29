import {Link} from 'react-router-dom';

import Header from './Header';

function Login() {
  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__menu-item">Регистрация</Link>
      </Header>

      <main>
        <div className="login content__element">
          <h2 className="login__title">Вход</h2>
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
            <button rype="submit" className="login__submit-button">Войти</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
