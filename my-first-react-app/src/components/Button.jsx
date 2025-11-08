function Button({
  children,
  variant = 'primary',
  onClick,
  disable = false,
  size = 'medium',
}) {
  const buttonClass = `btn btn-${variant} btn-${size} ${
    disable ? 'btn-disabled' : ''
  }`;

  return (
    <button className={buttonClass} onClick={onClick} disabled={disable}>
      {children}
    </button>
  );
}

export default Button;
