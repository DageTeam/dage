var React = require('react');
var MLEmail = require('components/MLEmail.jsx');

var MLEmailsList = React.createClass({

  // componentWillMount() {
  //   this.props.callbacks._allEmailArrayFetch();
  // },

  render: function() {
    var allEmailsRows = [];
    var emailList = this.props.emails.allEmailsArray;
    for (var i = emailList.length - 1; i >= 0; i--) {
      var email = emailList[i];
      allEmailsRows.push(
        <MLEmail
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
      );
    }

    return (<div style={this.styles.MLEmailsListBox}> { allEmailsRows } </div>);
  },

  styles:{
    MLEmailsListBox:{
      marginLeft: '5%',
      width: '90%',
      height: '600px',
      overflow: 'scroll',
      border: '3px solid purple',
    },
  },
});

module.exports = MLEmailsList;
