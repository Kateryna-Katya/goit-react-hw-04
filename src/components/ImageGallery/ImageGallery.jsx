import style from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={style.list}>
      {images.map((image) => (
        <li key={image.id}>
          <div>
            <ImageCard image={image} onClick={() => onImageClick(image)} />
          </div>
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
