var React = require('react');

var Login = React.createClass({

  handleFormSubmit: function(event) {
    event.preventDefault();

    this.props.callbacks._submitLogin({
      username: this.refs.username.value,
      password: this.refs.password.value,
    });

  },

  render: function() {
    return (
        <form onSubmit={this.handleFormSubmit}>
                <label htmlFor='username'>Username</label>
                <input type='username' id='username' defaultValue='' ref='username' />

                <label htmlFor='password'>Password</label>
                <input type='password' id='password' ref='password' />

                <input type='submit' style={{textAlign: 'right'}}  />
              </form>
      );
  },
});

module.exports = Login;
