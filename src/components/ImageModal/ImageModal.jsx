import Modal from "react-modal";
import style from "./ImageModal.module.css";

Modal.setAppElement("#root");

function ImageModal({ image, onClose }) {
  if (!image) return null;
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal isOpen={!!image} onRequestClose={onClose} className={style.modal}>
      <div className={style.modalContent} onClick={handleBackdropClick}>
        <button className={style.close} onClick={onClose}>
          &times;
        </button>
        <img src={image.urls.regular} alt={image.alt_description} />
        <p>{image.description || image.alt_description}</p>
        <p>Автор: {image.user.name}</p>
      </div>
    </Modal>
  );
}

export default ImageModal;
