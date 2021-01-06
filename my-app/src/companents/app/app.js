import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-ststus-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import './app.css';
import styled from 'styled-components';
const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;

`
export default class App extends Component  {
    constructor (props){
        super(props);
        this.state = {
            data : [
                {label: "Going to learn React", important: false, like: false, id: 1},
                {label: "That is so goo", important: false, like: false, id : 2},
                {label: "I need a break...", important: false, like: false, id: 3 }
            ],
            term : '',
            filter : 'all'
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);



    }

    deleteItem (id) {
        this.setState( ({data}) => {
            const index = data.findIndex( elem => elem.id === id); // здесь мы находим нужный id и его index 
            const before = data.slice (0,index); //здесь мы берем массив и убираем все элементы кроме тех кто до элемента с индексом (index) 
            const after = data.slice( index +1 ); // здесь мы убираем все элементы которые будут после выбраного элемента если index = 1 то будет элементы с индексом 2 и 3 и тд
            const newArr = [...before, ...after]; //  тут мы собираем оба масива в один используя spread 
            return {
                data : newArr // возврашаем новый массив с новыми данными
            }
        });
    }

    addItem(body) {
        const newItem= {
            label : body,
            important : false,
            id : Math.random()
        }
        
         this.setState (({data}) => {
             const newArr = [...data, newItem];
             return {
                 data : newArr
             }
         })
    }

    onToggleImportant (id) {
        this.setState ( ({data}) => {
            const index = data.findIndex( elem => elem.id === id);
            const old = data[index];
            const newItem = {...old, important: !old.important};
            const newArr = [...data.slice (0,index), newItem, ...data.slice( index +1 )];
            return {
                data: newArr
            }
        })
    }
    onToggleLike (id) {
        this.setState ( ({data}) => {
            const index = data.findIndex( elem => elem.id === id);
            const old = data[index];
            const newItem = {...old, like: !old.like};
            const newArr = [...data.slice (0,index), newItem, ...data.slice( index +1 )];
            return {
                data: newArr
            }
        })
    }

    searchPost(items, term) { // функци будет принимать два аргумента, данные (items = data) и то что ввел пользователь (term)
        if (term.length === 0){ // проверяем если пользователь ввел что то или нетБ если нет то вернем даннные (data)
            return items;
        }
        

        return items.filter( (item) => { // возврашаем элемнты и фильтруем их 
            return item.label.indexOf(term) > -1 ; // filter возврашает нам новый массивб и в каждом элементе массива убдем находить свойство 
            // label  внутри которго будем находить то что ввел пользоватль, Метод indexOf( searchOf) 
            // возвращает индекс первого вхождения указанного значения в строковый объект String, на котором он был вызван
            //(searchOf) Строка, представляющая искомое значение. если знчение не найдено он возворшает -1 
            
        });
    }
    filterPost(items, filter) {
        if ( filter === 'like'){// если филт будет по лайкам то: 
            return items.filter(item => item.like)// фильтируем элементы и берем те элементы у которых свойство like  будет равно true 
            // перебираем каждый элмент массив и сравниваем свойство like  если будет true берем все элемнты с этом значением и строим массив 
        }else { //  а если наш филтер будет что то другое в ншем случае юудет фильтр all то: 
            return items ; // будем возврашать все элементы 

        }
    }
    

    onUpdateSearch (term) { // простая функция которая будет обнавлять наш state 
        this.setState({term});

    }
    onFilterSelect(filter){
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state; // полчаем все переменные из нашего state 
        const liked = data.filter( item => item.like).length;
        const allPosts = data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter); // здесь создаем переменную ы которой будт записан новый массив с функции searchPost
        // с филтреом будем показывать только фильтировнные элементы  изменим const visiblePosts = this.searchPost(data, term); но то что показано
        // функция filterPosts принимает два аргумента, перый это массив данных который будет наша функция которая возврашает данные с панель поиска
        // второй аргумент будет тот фильтрировный элемент 
        return (
            <AppBlock>
                <AppHeader
                liked={liked}
                allPosts={allPosts} />
                <div className="search-panel d-flex">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}
                        />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList 
                suca = { visiblePosts} // теперь мы не будем брать все данныеБ а именно те которые хотим отобразить на странице 
                onDelete ={this.deleteItem} 
                onToggleImportant={this.onToggleImportant}
                onToggleLike={this.onToggleLike} />
                <PostAddForm 
                onAdd ={this.addItem} />
            </AppBlock>
        )
    }
}

