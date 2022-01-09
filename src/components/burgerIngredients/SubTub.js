
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useRef } from 'react';

export function SubTub() {

  const h2ref = useRef(null);
  const [current, setCurrent] = useState('one');
  function handleClick(prop){
    setCurrent(prop);
    document.getElementById(prop).scrollIntoView();
  }
  return (
    <div style={{ display: 'flex' }}>
      <Tab value='one' active={current==='one'} onClick={handleClick}>Булки</Tab>
      <Tab value='two' active={current==='two'} onClick={handleClick}>Соусы</Tab>
      <Tab value='three' active={current==='three'} onClick={handleClick}>Начинки</Tab>
    </div>
  );
}