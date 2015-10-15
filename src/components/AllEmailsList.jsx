var React = require('react');
var GeneralEmail = require('components/GeneralEmail.jsx');

var AllEmailsList = React.createClass({

  // componentWillMount() {
  //   this.props.callbacks._allEmailArrayFetch();
  // },

  render: function(){
    console.log('inside all emails list');
    var allEmailsRows = [];
    var emailList = this.props.emails.allEmailsArray;
    console.log('after allEmailsArray', this.props.emails);
    for (var i = emailList.length-1; i >=0; i--) {
      var email = emailList[i];
      allEmailsRows.push(
        <GeneralEmail
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

    return (<div style={this.styles.allEmailListBox}> { allEmailsRows } </div> );
  },
  styles:{
    allEmailListBox:{
      'marginLeft': '5%',
      'width': '90%',
      'height': '600px',
      'overflow': 'scroll',
      'border': '3px solid purple'
    }
  }
});

module.exports = AllEmailsList;
