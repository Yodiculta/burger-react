import { BurgerIcon, ListIcon, Logo, ProfileIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react'
import appHeader from './AppHeader.module.css'
class AppHeader extends React.Component{
    

    render(){
        return (
            <>
                <div className={appHeader.container}>
                    <div className={appHeader.nav_panel}>
                    <div className={appHeader.item} ><BurgerIcon/> <h3>Конструктор</h3> </div>
                    <div className={appHeader.item}><ListIcon type="secondary"/><h3 style={{"color":"#8585AD"}}>Лента заказов</h3></div>
                    <div ><Logo/></div>
                    <div className={appHeader.item}><ProfileIcon type="secondary"/><h3 style={{"color":"#8585AD"}}>Личный кабинет</h3></div>
                </div></div>
                </>
        )
    }
}
export default AppHeader;