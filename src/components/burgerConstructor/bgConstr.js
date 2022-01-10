import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import bgStyle from './BurgerConstructor.module.css'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import img from '../../images/done.png'

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

const Product = ({data, type, isLocked, flag, name}) => {
   return (
      <li className={bgStyle.list}>
        {flag&&<DragIcon type="primary" />}
        <ConstructorElement
            type={type}
            isLocked={isLocked}
            text={name?name:data.name}
            price={data.price}
            thumbnail={data.image}
          >
  </ConstructorElement>
      </li>
    );
  };

  Product.propTypes=PropTypes.shape({
    data:productPropTypes,
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    flag:PropTypes.bool,
    name:PropTypes.string
  })

class BurgerConstructor extends React.Component{
  constructor(props){
    super(props);
    this.data=props.data?props.data:[];
    this.list=props.data?props.data:[];
    this.price=this.list.map(i=>this.price+=i.price, this.price=0).reverse()[0];
    
    this.state = { show: false };
  }

  showChanger =()=>{
    console.log(this.state.show)
    this.setState({ show: !this.state.show })
  }
    render()
    {
        return (
          <div  className={bgStyle.main}>
            
           <ul className={`custom-scroll`}>
           {this.list.map((prod, index)=>{
              if(prod.type=="bun" ){
                if (index==0){
            return <Product type={"top"} data={prod} isLocked={true} flag={false} name="Краторная булка N-200i (верх)"/>}}})}
           <li>
           {this.list.map((prod, index)=>{
              if(prod.type=="sauce" ){
                 return <Product  data={prod} isLocked={false} flag={true}/>   
              }
            }  )}
           </li>
           {this.list.map((prod, index)=>{
              if(prod.type=="bun" ){
                if (index==0){
            return <Product type={"bottom"} data={prod} isLocked={true} flag={false} name="Краторная булка N-200i (низ)"/>}}})}
          </ul>
          <div className={bgStyle.bottom}><div className={bgStyle.price}>{this.price} <CurrencyIcon/></div>
          <Button type="primary" size="medium" className={bgStyle.but} onClick={this.showChanger}>
          Оформить заказ
        </Button>
        
        {this.state.show&&
          <div onClick={this.showChanger}>
          <Modal >
          <Child/>
        </Modal>
        </div>}
        </div>
          
        </div>
        )
    }
}

BurgerConstructor.propTypes={
  data:PropTypes.arrayOf(productPropTypes.isRequired).isRequired
}

export default BurgerConstructor;


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

Modal.propTypes={
  data:productPropTypes
}

function Child() {
  // Событие клика на этой кнопке будет всплывать вверх к родителю,
  // так как здесь не определён атрибут 'onClick' 
  return (
    <section className={bgStyle.overlay} >
      <div className={bgStyle.details}>
      <Button type="secondary" size="small" onClick={() => console.log("hi")}>Х</Button>
      <p className="text text_type_digits-large" style={{textShadow: " 0px 0px 16px rgba(51, 51, 255, 0.25), 0px 0px 8px rgba(51, 51, 255, 0.25), 0px 4px 32px rgba(51, 51, 255, 0.5)"}}>123456</p>
      <h1>Идентификатор заказа</h1>
      <img src={img} alt="error"/>
      <p>Ваш заказ начали готовить</p>
      <p style={{color: "#8585AD"}}>Дождитесь готовности на орбитальной станции</p>
    </div>
    </section>
  );
}
Child.propTypes={
  data:productPropTypes
}