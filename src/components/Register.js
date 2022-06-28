import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form">
        <input
          type="email"
          className="login__email-input"
          placeholder="Email"
        />
        <input
          type="password"
          className="login__password-input"
          placeholder="Пароль"
        />
        <button rype="submit" className="login__submit-button">Зарегистрироваться</button>
      </form>
      <p className="login__extra-text">
        Уже зарегистрированы? <Link className="login__link" to="/sign-in">Войти</Link>
      </p>
    </div>
  );
}

export default Register;
