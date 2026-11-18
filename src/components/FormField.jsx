
function FormField({
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  fullWidth = false,
}) {
  return (
    <div
      className={`checkout-field ${
        fullWidth ? "checkout-field-full" : ""
      }`}
    >
      <label htmlFor={name}>
        {label}
        <span>*</span>
      </label>

      <input
        type={type}
        id={name}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        className={
          error
            ? "checkout-input checkout-input-invalid"
            : value
            ? "checkout-input checkout-input-valid"
            : "checkout-input"
        }
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        required
      />

      {error && (
        <small
          id={`${name}-error`}
          className="checkout-error"
          role="alert"
        >
          {error}
        </small>
      )}
    </div>
  );
}

export default FormField;
