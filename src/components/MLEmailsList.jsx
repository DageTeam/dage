var React = require('react');
var MLEmail = require('components/MLEmail.jsx');

var MLEmailsList = React.createClass({

  // componentWillMount() {
  //   this.props.callbacks._allEmailArrayFetch();
  // },

  render: function() {
    var MLEmailsRows = [];
    var emailList = this.props.emails.MLEmailsArray;
    for (var i = emailList.length - 1; i >= 0; i--) {
      var email = emailList[i];
      MLEmailsRows.push(
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
          n_classification = {this.props.n_classification}
          p_classification = {this.props.p_classification}
          callbacks = {this.props.callbacks}/>
      );
    }

    return (<div style={this.styles.MLEmailsListBox}> { MLEmailsRows } </div>);
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
