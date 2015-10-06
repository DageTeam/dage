var React = require('react');
var FlaggedEmail = require('components/FlaggedEmail.jsx');

var FlaggedEmailList = React.createClass({

  render: function(){
    if(!_emailArrayFetch){
      return (<img src="../loadingGif.gif">)
    }
    var emailRows = [];
    // var emailList = /*EMAILARRAY props from state tree*/;
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
          flags = {email.flags}
          body = {email.body}
          focusLevel = {email.focusLevel}
          callbacks = {this.props.callbacks}
          // /*CBFuncShowFlags*/={this.props.CBFunc}
          // /*CBFuncShowCompleteEmail*/={this.props.CBFunc}
          />
      )
    }

    return (<div> { emailRows } </div> );
  }
});

module.exports = FlaggedEmailList;
