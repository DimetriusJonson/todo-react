import { useRef } from 'react';

function TextWithError({ name, inputType, value, placeholder, error, onChange }) {
  const inputRef = useRef(null);

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
      {error && error.length > 0 && <p class="help is-danger">{error}</p>}
    </>
  );
}

export default TextWithError;
