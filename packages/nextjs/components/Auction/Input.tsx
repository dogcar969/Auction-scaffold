const InputWithLabel = ({ label, children, width }: any) => {
  return (
    <>
      <div className="flex justify-between gap-x-4">
        <div className="leading-8">{label}</div>
        <div className={width}>{children}</div>
      </div>
    </>
  );
};

export default InputWithLabel;
