function TextArea({ name, value, placeholder, onChange }) {
    let id = name.toLowerCase().replaceAll(" ", "");
    return (
        <textarea className="textarea" rows="4" cols="50" id={id} name={name}
            value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    );
}

export default TextArea;
