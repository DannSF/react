export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  loading = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn btn-${variant} ${loading ? 'loading' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
