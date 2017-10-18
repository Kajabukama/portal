import React, { Component } from 'react';
import { Redirect } from 'react-router';

// component
import './Signup.css';
import $ from 'jquery';

// toaster react component
const ReactToastr = require("react-toastr2");
const { ToastContainer } = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);



class Signup extends Component {

   constructor(props) {
     super(props);
     this.state = {
         users: [],
         fname: '',
         lname: '',
         email: '',
         password: '',
         passwordConfirm: '',
         mobile: '',
     }

     this.onSignup = this.onSignup.bind(this);
     this.valueChange = this.valueChange.bind(this);
   }

   valueChange = (ev) => {
      this.setState({
         [ev.target.name]: ev.target.value
      })
   }
   
   componentDidMount(){
    let uri = 'http://localhost/api/users/read.php';
    $.ajax({
       url: uri,
       dataType:'json',
       cache: false,
       success: function(data){
          this.setState({
             users: data
          })
          console.log(this.state.users);
       }.bind(this)
    })
 } 

   onSignup = (ev) => {
      this.setState({
         fireRedirect: true
      });

      if(this.state.fname ===''){
         this.refs.container.error('Firstname must not be empty','Invalid Input', { timeOut: 3000});
      } else if(this.state.lname ===''){
         this.refs.container.error('Lastname must not be empty','Invalid Input', { timeOut: 3000});
      }else if(this.state.email ==='') {
         this.refs.container.error('Email must not be empty','Invalid Input', { timeOut: 3000});
      } else if(this.state.password ===''){
         this.refs.container.error('Password must not be empty','Invalid Input', { timeOut: 3000});
      } else if(this.state.password !== this.state.passwordConfirm){
         this.refs.container.error('Passwords do not match','Password Mismatch', { timeOut: 3000});
      } else {
         console.log(this.state);
         this.createAccount();
      }
      ev.preventDefault();
   }

   createAccount(){
      $.ajax({
         url: 'http://localhost/api/users/create.php',
         type: 'POST',
         contentType : 'application/json',
         data: JSON.stringify(this.state),
         success: function(data){
            this.refs.container.success(data.message,data.status, { timeOut: 3000});
            console.log(data)
            this.setState({
               fname: '',
               lname: '',
               email: '',
               password: '',
               passwordConfirm: '',
               mobile: '',
            })
         }.bind(this),
         error: function(xhr, resp, text){
            console.log(text)
            this.refs.container.error("Sorry, account could not be established","Error", { timeOut: 3000});
         }.bind(this)

      })
   }



   render(){

      return(
         <div>
            <ToastContainer ref="container" toastMessageFactory={ToastMessageFactory} className="toast-bottom-right"/>
            <div className="middle-box text-center loginscreen animated fadeInUp">
                <div>
                    <div className="logo-container">
                        <img src={require('../../assets/img/logo.png')} alt=""/>
                    </div>
                    <h3>Haif Portal</h3>
                    <p>Haif Company and Project Management Portal. All System users must log onto the Portal to perform relevant tasks on the system.</p>

                    <form className="m-t" onSubmit={this.onSignup}>
                        <div className="form-group">
                            <input
                              name="fname"
                              type="text"
                              className="form-control"
                              placeholder="Firstname"
                              autoComplete="off"
                              value={this.state.fname}
                              onChange={this.valueChange}/>
                        </div>
                        <div className="form-group">
                            <input
                              name="lname"
                              type="text"
                              className="form-control"
                              autoComplete="off"
                              placeholder="Lastname"
                              value={this.state.lname}
                              onChange={this.valueChange}/>
                        </div>
                        <div className="form-group">
                            <input
                              name="email"
                              type="email"
                              className="form-control"
                              autoComplete="off"
                              placeholder="Email address"
                              value={this.state.email}
                              onChange={this.valueChange}/>
                        </div>
                        <div className="form-group">
                            <input
                              name="password"
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              autoComplete="off"
                              value={this.state.password}
                              onChange={this.valueChange}/>
                        </div>
                        <div className="form-group">
                            <input
                              name="passwordConfirm"
                              type="password"
                              className="form-control"
                              placeholder="Password Confirmation"
                              autoComplete="off"
                              value={this.state.passwordConfirm}
                              onChange={this.valueChange}/>
                        </div>
                        <div className="form-group">
                            <input
                              name="mobile"
                              type="text"
                              className="form-control"
                              placeholder="Mobile number"
                              autoComplete="off"
                              value={this.state.mobile}
                              onChange={this.valueChange}/>
                        </div>

                        <button
                           type="submit"
                           className="btn btn-primary block full-width m-b btn-lg">Create an account</button>
                    </form>

                    <p className="m-t"><small>Haif Project Management System &copy; 2014</small> </p>
                </div>
            </div>
         </div>
      );
   }
}

export default Signup;
