function InfoPopup({ message, isSuccessful = true, isOpened, onClose }) {
  return (
    <div
      className={`popup popup_type_info` + (isOpened ? " popup_opened" : "")}
    >
      <div className="popup__container content__element">
        <p
          className={
            "popup__info-message" + (!isSuccessful ? " popup__info-message_type_fail" : "")
            }>
          {message}
        </p>

        <button
            className="popup__cancel-button"
            type="button"
            aria-label="Закрыть окно"
            onClick={onClose}
          ></button>
      </div>
    </div>
  );
}

export default InfoPopup;
