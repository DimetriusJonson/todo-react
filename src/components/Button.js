function Button({ id, className, disabled, label, loading, onClick }) {
  let onMouseup = (e) => {
    e.target.blur();
  };

  return (
    <button id={id} className={'button is-rounded' + (loading ? ' is-loading' : '') + ' ' + className} onClick={onClick} onMouseUp={onMouseup} disabled={disabled}> {label} </button>
  );
}

export default Button;
