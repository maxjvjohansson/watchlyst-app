type Props = {
  id: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  id,
  label,
  value,
  placeholder,
  onChange,
  type = "text",
}: Props) {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
