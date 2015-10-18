var React = require('react');

var Login = React.createClass({
  handleFormSubmit: function(event) {
    event.preventDefault();

    this.props.callbacks._submitLogin({
      username: this.refs.username.value,
      password: this.refs.password.value,
    });

  },

  // created username and password components. Added some inline styling
  render: function() {
    return (
      <div style={{marginLeft:'60px'}}>
         
                                                                                                                                                                <form onSubmit={this.handleFormSubmit}>
       <ul className='form-fields'>
         <li>
           <input htmlFor='username' type='username' id='username' defaultValue='' ref='username'
           placeholder='Username' style={{cursor: 'auto'}}  className='input--text'/>
         </li>
         <li>
           <input className='input--text' type='password' id='password' placeholder='Password' ref='password' />
         </li>
         <li>
           <button className='btn btn-primary' type='submit' style={{backgroundColor: '#6e2568', width: '50%'}}>Log In</button>
         </li>
       </ul>
     </form>
    </div>
      );
  },
});

module.exports = Login;
