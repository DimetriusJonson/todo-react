function MainTitle({ title, className }) {
  return (
    <h1 className={'title '.concat(className)}>
      {title}
    </h1>
  );
}

export default MainTitle;
