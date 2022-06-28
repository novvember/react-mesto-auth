import logo from "../images/header__logo_light.svg";

function Header({children}) {
  let links;
  if (children.length > 1) {
    links = children;
  } else {
    links = [children];
  }

  return (
    <header className="header content__element content__element_type_header">
      <img
        src={logo}
        alt="Сервис Место-Россия. Логотип"
        className="header__logo"
      />

      {links && (
        <ul className="header__menu">
          {[...links].map((item, pos) => (
            <li
              className="header__menu-item"
              key={pos}
            >{item}</li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default Header;
