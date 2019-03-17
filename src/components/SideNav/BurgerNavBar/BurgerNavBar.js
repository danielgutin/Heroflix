// React & Styling.
import React from 'react';
import './BurgerNavBar.css';
import './media.css';

// Redux Stuff.
import { connect } from 'react-redux';
import { toggleResponsiveNav } from '../../../store/actions/general';

const BurgerNavBar = (props) => {
    return (
        <div className='BurgerNavBar' onClick={() => props.toggleResponsiveNavHandler()}>
            <div className={props.general ? "container change" : "container"}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        </div>
    )
} 

// Map Store Props To component props.
const mapStateToProps = state => {
    return {
        general : state.general.burgerNav
    }
}

// map actions to component props.
const mapDispatchToProps = dispatch => {
    return {
        toggleResponsiveNavHandler : () => dispatch(toggleResponsiveNav())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerNavBar);