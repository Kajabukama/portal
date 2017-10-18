import React, { Component } from 'react';

import $ from 'jquery';

// toaster react component
const ReactToastr = require("react-toastr2");
const { ToastContainer } = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


class Signin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }

  }

  valueChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  onSignin = (eve) => {
    eve.preventDefault();
    if (this.state.email === '' && this.state.password === '') {
      this.refs.container.error('Sorry you must fill all field', 'Invalid Input', { timeOut: 3000 });    
    } else {
      console.log(this.state)
      this.refs.container.info(JSON.stringify(this.state), 'Information', { timeOut: 3000 });      
    }
    
    
  }
   render (){
      return (
        <div>
          <ToastContainer ref="container" toastMessageFactory={ToastMessageFactory} className="toast-bottom-left"/>
          <div className="middle-box text-center loginscreen animated fadeInUp">
           <div className="logo-container">
              <img src={require('../../assets/img/logo.png')} alt=""/>
           </div>
            <h3>Haif Portal</h3>
            <p>Haif Company and Project Management Portal. All System users must log onto the Portal to perform relevant tasks on the system.</p>

            <form onSubmit={this.onSignin.bind(this)}>
            <div className="form-group">
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className="form-control input-lg"
                autoComplete="false"
                value={this.state.email}
                onChange={this.valueChange.bind(this)} />
            </div>

            <div className="form-group">
              <input
                name="password"
                type="password"
                placeholder="Your Password"
                className="form-control input-lg"
                autoComplete="false"
                value={this.state.password}
                onChange={this.valueChange.bind(this)} />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block btn-lg">Authenticate</button>             
            </div>
            </form>
         </div>
        </div>
      );
   }
}

export default Signin;
