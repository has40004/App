import React, { Component } from 'react';
import './post-status-filter.css';

export default class PostStatusFilter extends Component {
    constructor(props){
        super(props);
        this.buttons =[
            {name:'all', label:'Все'},
            {name:'like', label:'Понравилось'}

        ]
    }
    render(){
        const buttons = this.buttons.map((item) => {
            const active = this.props.filter === item.name;
            const clazz = active ? ' btn-info': 'btn-outline-secondary';
            return (
                <button 
                 key ={item.name} 
                 type='button' 
                 className={ `btn ${clazz}`} 
                 onClick={() => this.props.onFilterSelect(item.name)}
                 >{item.label} </button>
            )
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}

