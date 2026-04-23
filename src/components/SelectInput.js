function SelectInput({name, value, options, className, notSelectedText, onChange}) {

  let selectOnChange = (event) => {
    onChange(event.target.value);
  };

  let id = name.toLowerCase().replaceAll(" ", "");

  return (
    <div className={'select ' + className}>
      <select id={id} name={name} value={value} onChange={selectOnChange}>
        <option value={""} selected={value}>{notSelectedText}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.text}</option>
        ))
        }
      </select>
    </div>
  );
}

export default SelectInput;
