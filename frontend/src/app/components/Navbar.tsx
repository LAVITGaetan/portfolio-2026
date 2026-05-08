export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo" />

      <ul className="navbar-links">
        <li className="navbar-link">
          <span className="navbar-link-num">01</span>
          <span className="navbar-link-txt">Technologies</span>
        </li>
        <li className="navbar-link">
          <span className="navbar-link-num">02</span>
          <span className="navbar-link-txt">Projets & Réalisations</span>
        </li>
        <li className="navbar-link">
          <span className="navbar-link-num">03</span>
          <span className="navbar-link-txt">Compétences</span>
        </li>
      </ul>

      <div className="navbar-action">
        <div className="btn-skew">
          <div className="btn-skew-shadow" />
          <div className="btn-skew-main">
            <button className="btn-skew-inner">Me contacter</button>
          </div>
        </div>
      </div>
    </nav>
  );
}