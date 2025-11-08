function Footer({
  author = 'Danny Flores',
  year = new Date().getFullYear(),
  links = [],
}) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          {year} {author}. All rigts reserved
        </p>

        {links.length > 0 && (
          <div className="footer-links">
            {links.map((link, index) => {
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </a>;
            })}
          </div>
        )}
        <p>⚛️ Built with React</p>
      </div>
    </footer>
  );
}
export default Footer;
