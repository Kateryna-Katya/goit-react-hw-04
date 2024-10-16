import style from "./ErrorMessage.module.css";
const ErrorMessage = ({ message }) => {
  return (
    <div className={style.error}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
