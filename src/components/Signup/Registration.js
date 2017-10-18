import React, { Component } from 'react';
import $ from 'jquery';

class RegisterForm extends Component {

   constructor(props) {
     super(props);
     this.state = {
        fname: '',
        lname: '',
        email: '',
        password: '',
        passwordConfirm: '',
        mobile: '',
        fireRedirect: false
     }

     this.onSignup = this.onSignup.bind(this);
     this.valueChnage = this.valueChange.bind(this);
   }
   valueChange = (ev) => {
      this.setState({
         [ev.target.name]: ev.target.value
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
         this.refs.container.error('Password do not match','Password Mismatch', { timeOut: 3000});
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

   render (){
      return (
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
      );
   }
}

export default RegisterForm;
