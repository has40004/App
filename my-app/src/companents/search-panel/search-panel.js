import React, { Component } from 'react';
import './search-panel.css';


export default class SearchPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            term : ''
        }
        this.onUpdateSearch = this.onUpdateSearch.bind(this); // привязываем наш обрабочик события 
    }

    onUpdateSearch (e) {
        const term = e.target.value ;
        this.setState ({term}); // записываем переменую term в наш state в свойстве term  
        this.props.onUpdateSearch(term); // это функция не является функция onUpdateSearch  в этом компонентеБ мы будем ее писать в наш главном компоненте App
        //  поэтому мы молучили ее с props 
       
    }
  render(){
    return (
        <input
            className="form-control search-input"
            type="text"
            placeholder="поиск по записам"
            onChange={this.onUpdateSearch} // это функция будет следить на то что вводит пользователь и изменять наш state 
        />
    )
  }
}
