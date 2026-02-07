import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className='navbar navbar-expand-lg text-bg-primary p-3 '>
      <div className='container'>
        <Link className='navbar-brand text-light fw-bold'>Intern House</Link>
        <button
          className='navbar-toggler'
          data-bs-target='#navId'
          data-bs-toggle='collapse'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navId'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link to='/' className='nav-link text-white'>
                Job Postings
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/' className='nav-link text-light'>
                Post a Job
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='' className='nav-link text-light'>
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
