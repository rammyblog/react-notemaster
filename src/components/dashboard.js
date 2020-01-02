import React, {Fragment} from 'react';
import './Dashboard.css';
import SidebarComponent from '../sidebar/sidebar';
import EditorComponent from '../editor/editor';
import {connect} from 'react-redux';
import axios from 'axios';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import styles from './dashboardStyles';
import { withStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import * as actions from '../store/actions/auth';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from 'react-router-dom';


class DashboardComponent extends React.Component{

  constructor(){
    super()
    this.state ={
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
      open: false,
      user : null
    }
  }

  getNotesFromDb = () => {
    axios.get('https://notemaster.herokuapp.com/api/notes/').then(
      res =>  this.setState({
        notes: res.data
      })  
    ).catch(err => {
      console.log(err);
      
    })
  }

  static getDerivedStateFromProps(newProps, state) {
    newProps.onTryAutoSignup(newProps.username || localStorage.getItem('user'));
    const token = newProps.token ||localStorage.getItem('token');
    

  

    if (token) {
      axios.defaults.headers ={
        "Content-Type": "application/json",
        Authorization: "Token " + token
      } 
      
    }


    
    return null;
  
  }


  componentDidMount(){
    this.props.onTryAutoSignup(this.props.username);
    console.log(this.state.selectedNote);
    
    this.setState({
      user : localStorage.getItem('user') || this.props.username
    })
    const sessionTimeout =  localStorage.getItem('token') && localStorage.getItem('expirationDate');

    if(!sessionTimeout){
      this.props.history.push('/login/')
  
    }else{
      this.getNotesFromDb()

    }


  
  }

  selectNote = (note, index) => this.setState({
    selectedNoteIndex: index,
    selectedNote: note
})


noteUpdate = (id, noteObj) =>{

  axios.put(`https://notemaster.herokuapp.com/api/notes/${id}/`, {
    title: noteObj.title,
    body:noteObj.body
  });

  this.getNotesFromDb();
  
}

newNote = async(title) => {
  const note = {
    title: title,
    body: ''
  }

  const newFromDB = await axios.post(`https://notemaster.herokuapp.com/api/notes/`, {
    title: note.title,
    body: note.body
  });
  const newID= newFromDB.data.id;


  await this.setState({
    notes: [...this.state.notes, note]
  })

  const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0])
  this.setState({
    selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex
  })

  this.getNotesFromDb()


}

deleteNote = async (note) => {
  const noteIndex = this.state.notes.indexOf(note);
  await this.setState({
    notes: this.state.notes.filter(_note => _note !== note)
  })
  if(this.state.selectedNoteIndex === noteIndex){
    this.setState({
      selectedNoteIndex: null,
      selectedNote: null
    })
  }else {
    this.state.notes.length > 1 ?
    this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex -1)
    : this.setState({
      selectedNoteIndex: null,
      selectedNote: null
    })
  }

  axios.delete(`https://notemaster.herokuapp.com/api/notes/${note.id}/`)
}

  

  render() {

    const token = localStorage.getItem('token');
    const {classes} = this.props

    const handleDrawerOpen = () => {
        this.setState({
          open: true});
      };

      const handleDrawerClose = () => {
        this.setState({
          open: false});
      
      };



    return(

      <Fragment>
     {

      this.props.token || token ?

      <div className={classes.root}>
     
      <CssBaseline />
      
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: this.state.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, this.state.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Notemaster 
          </Typography>

          <Tooltip title="Log out">
            <ExitToAppIcon className='log-out-icon' onClick={this.props.logout}/>
         </Tooltip>
         
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={this.state.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {classes.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
      
      
        <SidebarComponent 
        selectedNoteIndex={this.state.selectedNoteIndex} 
        notes={this.state.notes}
        deleteNote={this.deleteNote}
        selectNote={this.selectNote}
        newNote={this.newNote} />
        </Drawer>
        

        <main
           className={clsx(classes.content, {
             [classes.contentShift]: this.state.open,
           })}
         >
           <div className={classes.drawerHeader} />
         {
           this.state.selectedNote ?

           <EditorComponent selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex} 
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}/>
            :
            <Fragment>
            <div className={classes.paper}>
              <Typography className='welcome_Header' >
                Welcome to Notemaster <span className='capitalize'>{this.state.user}</span>
                
              </Typography>

              <Typography className='welcome'>
                Notemaster is a web app used to store important notes. <br/>
                Just like Google Keep
              </Typography>

              <Typography className='welcome'>
              Click on the Hamburger Icon on top left to continue
              </Typography>

          </div>
          </Fragment>
         }

</main> 
        </div>
      :
      this.props.history.push('/login/')


      }
      </Fragment>
    
    )
  } 

}


const mapStateToProps = state => {

  return {
    token: state.token,
    username: state.username
  }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(actions.logout()),
    onTryAutoSignup : (username) => dispatch(actions.authCheckState(username))
  
})





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardComponent)));
