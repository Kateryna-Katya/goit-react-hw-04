import style from "./ImageCard.module.css";
const ImageCard = ({ image, onClick }) => {
  return (
    <div className={style.wrapper} onClick={onClick}>
      <img
        className={style.img}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
