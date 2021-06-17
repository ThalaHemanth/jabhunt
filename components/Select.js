import Select from 'react-select';

export default function SelectComponent({
  options = [],
  placeholder,
  handleChange,
  propValue,
}) {
  return (
    <Select
      onChange={value => handleChange(value)}
      value={propValue}
      options={options}
      isSearchable
      placeholder={propValue.label || placeholder}
    />
  );
}
