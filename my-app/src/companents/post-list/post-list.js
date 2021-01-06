import React from 'react';
import PostListItem from '../post-list-item';
import './post-list.css';
import { ListGroup } from 'reactstrap';
const PostList = ({suca, onDelete, onToggleImportant, onToggleLike}) =>{

    const elements = suca.map((item) => {
        return (
            <li key ={item.id} className="list-group-item">
                <PostListItem 
                label= {item.label} 
                important = {item.important}
                like = {item.like} 
                onDelete = { () => onDelete(item.id)} 
                onToggleImportant={ () => onToggleImportant(item.id)}
                onToggleLike = { () => onToggleLike(item.id)} />
            </li>
        )
    });
    return (
        <ListGroup className=" app-list ">
           {elements}
        </ListGroup>
    )
}

export default PostList;