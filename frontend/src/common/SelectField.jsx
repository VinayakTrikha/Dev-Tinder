const SelectField = ({
  label,
  name,
  options,
  register,
  validation,
  errors,
}) => (
  <fieldset className="fieldset">
    <legend className="fieldset-legend">{label}</legend>
    <select className="select" {...register(name, validation)}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </fieldset>
);

export default SelectField;
