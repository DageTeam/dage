var React = require('react');
var FlaggedContext = require('components/FlaggedContext')

var FlaggedEmail = React.createClass({

  showAllFlags: function(){
    // this.props./*CBFuncShowFlags*/('all');
  },
  showCompleteEmail: function(){
    // this.props./*CBFuncShowCompleteEmail*/('complete');
  },
  showOneFlag: function() {
    // this.props./*CBFuncShowOnee*/('one');
  },

  render: function(){
    var contentRows = [];
    /*FLAGGEDCONTEXT props from email array from state tree*/
    var contentList = this.props.flags;
    var displayLength = contentList.length;
    if (this.props.focusLevel === 'one') {
      displayLength = 1;
    }
    for (var i = 0; i < displayLength; i++) {
      var content = contentList[i];
      contentRows.push(
          <FlaggedContext
            type={ content.type }
            context={ content.context }/>
        )
    }

    if (this.props.focusLevel !== 'complete'){
      return(
        <div className='jumbotron'>
          <div className='container'>

            <div className='col-xs-10'>
              <p>To: {this.props.sender} From: {this.props.recipient} Date: {this.props.sendTime}</p>
            </div>
            <div className='col-xs-10'>
              <p> Flagged content:
              { contentRows } </p>
            </div>
            <span className='input-group-btn'>
              <button id='showAllFlags' onClick={this.showAllFlags} className='btn btn-success-outline'>Show All Flags</button>
              <button id='showCompleteEmail' onClick={this.showCompleteEmail} className='btn btn-primary-outline'>Show Complete Email</button>
            </span>
          </div>
        </div>
      )
    } else if (this.props.focusLevel === 'complete') {
      return (
          //TODO: fill in the complete email render
          <div className='jumbotron'>
            <div className='container'>

              <div className='col-xs-10'>
                <p>To: {this.props.sender} From: {this.props.recipient} Date: {this.props.sendTime}</p>
              </div>
              <div className='col-xs-10'>
                <p> Email Message:
                {this.props.body}</p>
              </div>
              <span className='input-group-btn'>
                <button id='showOneFlag' onClick={showOneFlag} className='btn btn-primary-outline'>Collapse</button>
              </span>
            </div>
          </div>
        )
    }
  }
});

module.exports = FlaggedEmail;