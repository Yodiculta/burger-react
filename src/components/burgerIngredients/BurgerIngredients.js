import { Button, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react'
import bgStyle from './bgStyle.module.css'
import {SubTub} from './SubTub'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const productPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired
});
Product.propTypes={
  data:productPropTypes,
  type: PropTypes.string,
  isLocked: PropTypes.bool
}
BurgerIngredients.propTypes={
  data:PropTypes.arrayOf(productPropTypes.isRequired).isRequired
}
Modal.propTypes={
  data:productPropTypes
}
Child.propTypes={
  data:productPropTypes
}
const Product = ({data }) => {
    const [show, setShow]=useState();

  const image = (
    <img className={bgStyle.img}
      src={
        data.image      }
      alt={data.name}
    />
  );
  return (
      <>
    <div className={bgStyle.product} onClick={() => setShow(!show)}>
        {show&&<>
          <Modal >
          <Child data={data}/>
        </Modal></>}
      <div className={bgStyle.counter}><Counter  count={21} size="small" /></div>
      <div >{image}</div>
      <div className={bgStyle.price}>{data.price}<CurrencyIcon/></div>
      <div className={bgStyle.name}>{data.name}</div>
    </div>
    </>
  );
};

const modalRoot = document.getElementById('root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  
  componentDidMount() {
    // Элемент портала добавляется в DOM-дерево после того, как
    // потомки компонента Modal будут смонтированы, это значит,
    // что потомки будут монтироваться на неприсоединённом DOM-узле.
    // Если дочерний компонент должен быть присоединён к DOM-дереву
    // сразу при подключении, например, для замеров DOM-узла,
    // или вызова в потомке 'autoFocus', добавьте в компонент Modal
    // состояние и рендерите потомков только тогда, когда
    // компонент Modal уже вставлен в DOM-дерево.
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}
function Child({data}) {
  const image = (
    <img className={bgStyle.img2}
      src={
        data.image      }
      alt={data.name}
    />
  );
  // Событие клика на этой кнопке будет всплывать вверх к родителю,
  // так как здесь не определён атрибут 'onClick' 
  return (
    <div className={bgStyle.overlay} >
      <div className={bgStyle.details}>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'640px'}}>
        <h1>Детали ингредиента</h1>
      <Button type="secondary" size="small">Х</Button>
      </div>
            <div >{image}</div>
            <div className={bgStyle.name2}>{data.name}</div> 
            <ul className={bgStyle.energy}>
              <li style={{width:'130px'}}>
                <h2>Калории, ккал</h2>
                <p>{data.calories}</p>
              </li>
              <li>
                <h2>Белки, г</h2>
                <p>{data.proteins}</p>
              </li><li>
                <h2>Жиры, г</h2>
                <p>{data.fat}</p>
              </li><li>
                <h2>Углеводы, г</h2>
                <p>{data.carbohydrates}</p>
              </li>
            </ul>
        </div>
    </div>
  );
}



class BurgerIngredients extends React.Component{

  constructor(props){
    super(props);
    this.data=props.data?props.data:[];
    this.list=[];
    this.show=false;
  }
  

    render()
    {
        return (
          <div className={bgStyle.main}>
           <div className={bgStyle.header}>
             
              <h1>Соберите бургер</h1>
              
              <SubTub/>
            </div>
            <ul className={'custom-scroll'}>
            <li className={bgStyle.section}>
            <h1 id='one'>Булки</h1>
              {this.data.map((prod, index)=>{
                if(prod.type=="bun"){
                return <>
                <Product key={index} data={prod} />
                </>
                }
              }  )}
              </li>
            <li className={bgStyle.section}>
            <h1 id='two'>Соусы</h1>
            {this.data.map((prod, index)=>{
              if(prod.type=="sauce"){
                return <Product key={index} data={prod} />
              }
            }  )}
            </li>
            <li className={bgStyle.section}>
            <h1 id='three'>Начинки</h1>
            {this.data.map((prod, index)=>{
              if(prod.type=="main"){
                return <Product key={index} data={prod} />
              }
            }  )}
            </li>
            </ul>
        </div>
        )
    }
}

export default BurgerIngredients;