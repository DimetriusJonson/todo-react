import SelectInput from './SelectInput';

function SelectWithLabel({ name, value, label, options, onChange }) {
    let id = name.toLowerCase().replaceAll(" ", "");

    return (
        <>
            <label className="label mx-2" htmlFor={id}>{label}</label>
            <SelectInput name={id} value={value} options={options} notSelectedText={"Не выбран"} onChange={onChange} />
        </>
    );
}

export default SelectWithLabel;
