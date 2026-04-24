function CheckboxWithLabel({ name, className, value, label, onChange }) {
    let id = name.toLowerCase().replaceAll(" ", "");
    return (
        <div className="control">
            <label className={"b-checkbox checkbox " + className}>
                <input type="checkbox" id={id} name={name} checked={value} onChange={(event) => onChange(event.target.checked)}/>
                <span className="check is-warning"></span>
                <span className="control-label">{label}</span>
            </label>
        </div>
    );
}

export default CheckboxWithLabel;
