import { Button, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {React, useState} from 'react'
import bgStyle from './bgStyle.module.css'
import cn from 'classnames'
import {SubTub} from './SubTub'
//import Overlay from 'react-bootstrap/Overlay'


const Product = ({data }) => {
  const [show, setShow]=useState(false);
  const image = (
    <img className={bgStyle.img}
      src={
        data.image      }
      alt={data.name}
    />
  );
  return (
    <div className={bgStyle.product}>
      <div className={bgStyle.counter}><Counter  count={21} size="small" /></div>
      <div >{image}</div>
      <div className={bgStyle.price}>{data.price}<CurrencyIcon/></div>
      <div className={bgStyle.name}>{data.name}</div>
    </div>
  );
};

/*function Details({prod, show}) {

  return (
    <>
      <Overlay show={show} placement="right">
        {() => (
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              position: 'fixed',
              width: '100%',
              height: '100%',
              color: 'white',
              top: '0px',
              bottom: '0px',
              left: '0px',
              ridht: '0px'
      
            }}
          >
            Simple tooltip
          </div>
        )}
      </Overlay>
    </>
  );
}*/



class BurgerIngredients extends React.Component{

  constructor(props){
    super(props);
    this.data=props.data?props.data:[];
    this.list=[];
  }

  

    render()
    {
        return (
          <div className={bgStyle.container}>
           <div className={bgStyle.header}>
             
              <h1>Соберите бургер</h1>
              
              <SubTub/>
            </div>
            <ul className={'custom-scroll'}>
            <li className={bgStyle.section}>
            <h1 id='one'>Булки</h1>
              {this.data.map((prod, index)=>{
                if(prod.type=="bun"){
                  return <Product key={index} data={prod} />
                }
              }  )}
              </li>
              {/*if(prod.type=="bun"){
                return 
                <Product key={index} data={prod} onClick={() => this.setState({show: !this.state.show})}/>
                <Details product={prod} show={this.state.show}/>
                </>}
            }  })}*/}
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