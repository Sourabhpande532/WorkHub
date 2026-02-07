import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container'>
        <Link className='navbar-brand'>myWebsite</Link>
        <button
          className='navbar-toggler'
          data-bs-target='#navId'
          data-bs-toggle='collapse'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navId'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='' className='nav-link'>
                Contect
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Header };
