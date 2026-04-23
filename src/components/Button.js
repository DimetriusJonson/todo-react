function Button({ id, className, disabled, label, loading, onClick }) {
  let onMouseup = (e) => {
    e.target.blur();
  };

  let loadingClass = loading ? " is-loading" : "";
  return (
    <button id={id} className={'button is-rounded' + loadingClass + ' ' + className} onClick={onClick} onMouseUp={onMouseup} disabled={disabled}> {label} </button>
  );
}

export default Button;
