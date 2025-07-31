import React from 'react';
import style from './App.module.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <div className={style.app}>
        Welcome to My Spirits
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
