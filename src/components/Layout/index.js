import React, { useContext } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import Navigator from '../Navigator';
import SearchBox from '../SearchBox';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import './style.scss';

function Layout({ title, children }) {
  const history = useHistory();

  const { changeStyles } = useContext(GlobalContext);

  return (
    <div className='layout-container'>
      <div className='nav-wraper'>
        <Navigator />
      </div>
      <div className='main-content'>
        <div className='title'>
          <button onClick={() => history.goBack()} hidden={title === 'Home'}>
            <BiArrowBack className='fa fa-arrow-left' />
          </button>
          <h1
            onClick={() => changeStyles({ left: 0 })}
            hidden={!(window.innerWidth < 420)}
            style={{ marginRight: 6, marginLeft: 6 }}
          >
            <i className='fa fa-bars'></i>
          </h1>
          <h1>{title}</h1>
        </div>
        <div>{children}</div>
      </div>
      <div className='search-wraper'>
        <SearchBox />
      </div>
    </div>
  );
}

export default Layout;
