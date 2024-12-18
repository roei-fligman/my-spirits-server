import React from 'react';
import style from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={style.loaderContainer}>
      <img src={require("../../assets/Loader.svg").default} alt="loading" className={style.loader} />
    </div>
  );
};

export default Loader;
