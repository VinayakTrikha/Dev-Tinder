const FormField = ({
  label,
  type = "text",
  register,
  name,
  validation,
  errors,
}) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      {type === "textarea" ? (
        <textarea
          className="textarea"
          placeholder={`Enter ${label}`}
          {...register(name, validation)}
        />
      ) : (
        <input
          type={type}
          className="input"
          placeholder={`Enter ${label}`}
          {...register(name, validation)}
        />
      )}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </fieldset>
  );
};

export default FormField;
