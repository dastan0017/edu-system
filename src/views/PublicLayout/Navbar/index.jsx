import { NavLink, Link } from 'react-router-dom'
import UserInfo from '../UserInfo'
import { useStore } from 'hooks'
import logo from '../../../assets/images/logo.png'
import './Navbar.scss'

const Navbar = () => {
  return (
    <nav>
      <div className="nav_container">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="LOGO" />
            <p className="logo_name">Khan Academy</p>
          </div>
        </Link>
        <div className="navbar">
          <NavLink to="video-lessons" className={navData => `navbar_item ${navData.isActive ? 'navbar_active' : ''}`}>
            Видеоуроки
          </NavLink>
          <NavLink to="quizzes" className={navData => `navbar_item ${navData.isActive ? 'navbar_active' : ''}`}>
            Тесты
          </NavLink>
        </div>
      </div>

      <UserInfo />
    </nav>
  )
}

export default Navbar
