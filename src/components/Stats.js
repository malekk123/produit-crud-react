import React,{ useContext} from 'react';
import { AppContext } from '../app/app';

export default function Stats() {
    const [state,setState] = useContext (AppContext);
    return (
      
    <ul className="navbar-nav ">
      <li>
        <button type="button" className="btn btn-primary position-relative">
          Caddy
          <span className="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger">
            {state.produits.length}
          </span>
        </button>
      </li>
    </ul>
      );
}
