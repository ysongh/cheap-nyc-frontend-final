import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { getUser } from '../../actions/authActions';
import { editUser } from '../../actions/userActions';

class UserProfile extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            image: null,
            imageName: 'Choose file',
            err: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitImage = this.onSubmitImage.bind(this);
    }
    
    componentDidMount(){
        const userId = this.props.match.params.id;
        
        this.props.getUser(userId);
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
        
        if(nextProps.auth.userData){
            const { userData } = nextProps.auth;
            
            userData.name = userData.name ? userData.name : '';
            
            this.setState({
                name: userData.name
            });
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    fileSelectedHandler = e => {
        if(e.target.files[0]){
            this.setState({ image: e.target.files[0] });
            this.setState({ imageName: e.target.files[0].name });
        }
    }
    
    onSubmit(e){
        e.preventDefault();
        const userId = this.props.match.params.id;
        
        const newData = {
             name: this.state.name
        };
        
        this.props.editUser(userId, newData, this.props.history);
    }
    
    onSubmitImage(e){
        e.preventDefault();
       
        console.log("Change image", this.state.image);
    }
    render(){
        const { err } = this.state;
        
        return(
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Edit Profile</h1>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="text">Your Name</label>
                        <input
                            type="text"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': err.name
                            })}
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                        {err.name && (<div className="invalid-feedback">{err.name}</div>)}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" value="Update Inforamtion"/>
                  </form>
                  
                  <hr />
                  <hr />
                  
                  <form onSubmit={this.onSubmitImage}>
                    <label htmlFor="text">Upload an image</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"></span>
                        </div>
                        <div className="custom-file">
                            <input 
                                type="file"
                                className="custom-file-input"
                                id="inputGroupFile01"
                                onChange={this.fileSelectedHandler}/>
                            <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.imageName}</label>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" value="Change Image"/>
                  </form>
                </div>
              </div>
            </div>    
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { getUser, editUser })(UserProfile);
