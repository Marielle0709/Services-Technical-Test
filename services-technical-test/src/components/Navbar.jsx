import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/'); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: "10%" }}>
      <div className="container">
        <Link className="navbar-brand" to="/">Technical test</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" aria-current="page">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">À propos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
          <button className="btn btn-outline-light" onClick={handleLogout}>Déconnexion</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
