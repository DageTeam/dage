let React = require('react');
let MLEmail = require('components/MLEmail.jsx');

let MLEmailsList = React.createClass({

  // componentWillMount() {
  //   this.props.callbacks._allEmailArrayFetch();
  // },

  render: function() {
    let MLEmailsRows = [];
    let emailList = this.props.emails.MLEmailsArray;
    for (let i = emailList.length - 1; i >= 0; i--) {
      let email = emailList[i];
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
          n_classification = {email.n_classification}
          p_classification = {email.p_classification}
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
