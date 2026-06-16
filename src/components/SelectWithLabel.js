import SelectInput from './SelectInput';

function SelectWithLabel({ name, value, label, options, error, onChange }) {
    let id = name.toLowerCase().replaceAll(" ", "");

    let classNames = "";
    if (error && error.length > 0) {
        classNames.concat(" is-danger");
    }

    return (
        <>
            <label className="label mx-2" htmlFor={id}>{label}</label>
            <SelectInput className={classNames} name={id} value={value} options={options} notSelectedText={"Не выбран"} onChange={onChange} />
            {error && error.length > 0 && <p className="help is-danger px-4">{error}</p>}
        </>
    );
}

export default SelectWithLabel;
