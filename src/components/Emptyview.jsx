import React from 'react';
import empty from '../images/gif/empty.gif';
import './Style.css';

const EmptyView = () => (
  <div className='emptyView-wrap '>
    <p> <img src={empty} alt='' /> No results found !!!</p>
    {/* <h4 >No results found :)🙂</h4> */}
  </div>
);

export default EmptyView;
