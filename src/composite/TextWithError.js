import { useRef } from 'react';

function TextWithError({ name, inputType, value, placeholder, error, onChange, focus }) {
  const inputRef = useRef(null);

  if (inputRef && focus === true) {
    inputRef.current.focus();
  }

  let classNames = "input";
  if (error && error.length > 0) {
    classNames.concat(" is-danger");
  }

  return (
    <>
      <div className="control">
        <input ref={inputRef} className={classNames} type={inputType} id={name} name={name}
          value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      </div>
      {error && error.length > 0 && <p className="help is-danger">{error}</p>}
    </>
  );
}

export default TextWithError;
