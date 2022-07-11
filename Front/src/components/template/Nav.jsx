import "./Nav.css";
import React from "react";
import { Link } from "react-router-dom";
import UserLogo from "../../assets/imgs/User.svg";
import TeamLogo from "../../assets/imgs/Team.svg";

export default (props) => (
  <aside className="menu-area">
    <nav className="menu">
      <Link to="/">
        <i className="fa fa-home"></i> Início
      </Link>
      <Link to="/users">
        <i>
          <img src={UserLogo} />
        </i>
        Usuário
      </Link>
      <Link to="/teams">
        <i>
          <img src={TeamLogo} />
        </i>
        Times
      </Link>
      <Link to="/championship">
        <i>
          <img src={TeamLogo} />
        </i>
        Camp
      </Link>
      <Link to="/signup">
        <i className="fa fa-sign-out"></i> sair
      </Link>
    </nav>
  </aside>
);
