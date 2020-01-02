import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import  SidebarItemComponent  from '../sidebarItem/sidebarItem';
import './Sidebar.css';

class SidebarComponent extends Component {
    constructor(){
        super();

        this.state = {
            addingNote: false,
            title: null
        };
    }
    newNoteBtnClick = () => {
        console.log('New Note ');
        this.setState({
            title: null,
            addingNote : !this.state.addingNote
        })
        
    }   

    updateTitle = (txt) =>{
        this.setState({
            title:txt
        })
        
    }

    newNote = () => {
      
        this.props.newNote(this.state.title);
        this.setState({
            title: null,
            addingNote: false
        })
        
    }

    selectNote = (note, index) => {
        this.props.selectNote(note, index)        
    }

    deleteNote = (notes) => {
        this.props.deleteNote(notes)
        
    }
    render() {
        const { notes, classes, selectedNoteIndex } = this.props;
        if (notes) {

            return (
                <div className={`${classes.sidebarContainer} ${'test'}`} >
                    <Button
                    onClick={this.newNoteBtnClick}
                    className={classes.newNoteBtn}>
                       {
                           this.state.addingNote ? 'Cancel' : 'New Note'
                       } 
                    </Button>
    
                    {
                        this.state.addingNote ? 
                        <div>
                            <input 
                            type='text'
                            className={classes.newNoteInput}
                            placeholder='Enter Note title'
                            onKeyUp={(e) => this.updateTitle(e.target.value)}>
                
                            </input>
                            <Button 
                                className={classes.newNoteSubmitBtn}
                                onClick={this.newNote}>Submit Note</Button>
                        </div> : null
                    }
    
                    <List>
                        {
                         notes.map((_note, _index) => {
                             return(
                                 <div key={_index}>
                                     <SidebarItemComponent 
                                        _note={_note}
                                        _index={_index}
                                        selectedNoteIndex={selectedNoteIndex}
                                        selectNote = {this.selectNote}
                                        deleteNote = {this.deleteNote}
                                        >
                                     </SidebarItemComponent>
                                     <Divider></Divider>
                                 </div>
                             )
                         })   
                        }
                    </List>
                </div>
            )
            
        }else{
            return(
                <div>Add a note!</div>
            )
        }
       
    }
}


export default withStyles(styles)(SidebarComponent)