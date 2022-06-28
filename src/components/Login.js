function Login() {
  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
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
        <button rype="submit" className="login__submit-button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
