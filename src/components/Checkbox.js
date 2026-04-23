function Checkbox({ name, className, value, disabled, onChange }) {

    let checkOnChange = (event) => {
        event.preventDefault();
        onChange({
            name: name,
            value: event.target.checked,
            target: event.target,
        });
    };

    let id = name.toLowerCase().replaceAll(" ", "");

    return (
        <label className={'b-checkbox checkbox ' + className}>
            <input type="checkbox" id={id} name={name} checked={value} onChange={checkOnChange} disabled={disabled}/>
            <span className="check is-warning"></span>
        </label>
    );
}

export default Checkbox;
