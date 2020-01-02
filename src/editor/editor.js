import React from 'react';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './editor.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EditorComponent extends React.Component{

    constructor(){
        super();
        this.state = {
            text: '',
            title: '',
            id: ''
        };
    }
    
    updateBody = async (value) =>{

        await this.setState({
            text:value
        });
        this.update();
    }

    update = debounce(() => {
            this.props.noteUpdate(this.state.id, {
                title: this.state.title,
                body: this.state.text
            })
            toast.success('Saved!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false
                });

            
        
    }, 1500);

    
    updateTitle= async(txt) =>{
        await this.setState({
            title:txt
        });

        this.update();
    }
    

    componentDidMount(){
        this.setState({
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id
        })
    }
    

    componentDidUpdate(){
        if(this.props.selectedNote.id !== this.state.id){
            this.setState({
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id: this.props.selectedNote.id
            });
        }
    }
    render() {

        const  { classes } = this.props;
        return (
            <div>
                <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input className={classes.titleInput}
                placeholder='Note title'
                value={this.state.title ? this.state.title : ''}
                onChange={(e) => this.updateTitle(e.target.value)}></input>
                <ToastContainer />
                <CKEditor
                    editor={ ClassicEditor }
                    data={this.state.text}
            
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.updateBody(data)
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />

                
          
            </div>
        )
    }
    
}

export default withStyles(styles)(EditorComponent)
