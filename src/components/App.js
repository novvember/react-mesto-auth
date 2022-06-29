import React from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";

import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmActionPopup from "./ConfirmActionPopup";
import InfoPopup from "./InfoPopup";
import Register from "./Register";
import Login from "./Login";

import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  // Состояние попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  // Выбранные карточки для обрабтки попапами
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [toBeDeletedCard, setToBeDeletedCard] = React.useState(null);
  // Пользователь
  const [currentUser, setCurrentUser] = React.useState({});
  // Карточки
  const [cards, setCards] = React.useState([]);
  // Авторизация пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);

  /**
   * Получение информации о пользователе и исходных карточек при открытии страницы
   */
  React.useEffect(() => {
    api.getUserInfo().then(setCurrentUser).catch(console.error);

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(console.error);
  }, []);

  // Функции открытия/закрытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setToBeDeletedCard(null);
    setIsInfoPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Функции с изменением/обновлением данных на странице
  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatar(avatar)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((person) => person._id === currentUser._id);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleAddPlace(newPlaceData) {
    api
      .addNewCard(newPlaceData)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    setToBeDeletedCard(card);
  }

  function handleConfirmDelete() {
    const cardId = toBeDeletedCard._id;
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch(console.error);
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                ) : (
                  <Navigate to="/sign-in" />
                )
              }
            />

            <Route path="/sign-up" element={<Register />} />

            <Route path="/sign-in" element={<Login />} />

            <Route path="*" element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/sign-in" />
              )
            } />
          </Routes>
          <Footer />

          {/* Попапы */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />

          <ConfirmActionPopup
            isOpen={!!toBeDeletedCard}
            onClose={closeAllPopups}
            onConfirm={handleConfirmDelete}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoPopup
            message="Успешно!"
            isSuccessful={true}
            isOpened={isInfoPopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
