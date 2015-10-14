var React = require('react');
var FlaggedEmail = require('components/FlaggedEmail.jsx');

var FlaggedEmailList = React.createClass({

  render: function(){
    var emailRows = [];
    var emailList = this.props.state.emailsArray;
    for (var i = 0; i < emailList.length; i++) {
      var email = emailList[i];
      emailRows.push(
        <FlaggedEmail
          key = {email.id}
          emailId = {email.id}
          sender = {email.sender}
          recipient = {email.recipient}
          sendTime = {email.sendTime}
          subject = {email.subject}
          flags = {email.flags}
          body = {email.body}
          focusLevel = {email.focusLevel}
          userSession = {this.props.userSession}
          callbacks = {this.props.callbacks}/>
      )
    }

    return (<div style={this.styles.emailListBox}> { emailRows } </div> );
  },
  styles:{
    emailListBox:{
      'marginLeft': '5%',
      'width': '90%',
      'height': '600px',
      'overflow': 'scroll',
      'border': '3px solid purple'
    }
  }
});

module.exports = FlaggedEmailList;
