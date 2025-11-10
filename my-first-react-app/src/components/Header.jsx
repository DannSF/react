function Header({ title, subtitle, showCounter = true }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}

      {showCounter && (
        <div className="counter-badge">
          <span>🚀 Day 4 of React</span>
        </div>
      )}
    </header>
  );
}

export default Header;
