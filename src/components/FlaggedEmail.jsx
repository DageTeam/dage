var React = require('react');
var FlaggedContext = require('components/FlaggedContext')

var FlaggedEmail = React.createClass({

  showAllFlags: function(){
    // this.props./*CBFuncShowFlags*/('all');
    this.props.callbacks._emailShowAllFlags(this.props.emailId)
  },
  showCompleteEmail: function(){
    // this.props./*CBFuncShowCompleteEmail*/('complete');
    this.props.callbacks._emailShowComplete(this.props.emailId)
  },
  showOneFlag: function() {
    // this.props./*CBFuncShowOnee*/('one');
    this.props.callbacks._emailShowOneFlag(this.props.emailId)
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
            flaggedKeyword={ content.flaggedKeyword }
            context={ content.context }/>
        )
    }

    if (this.props.focusLevel !== 'complete'){
      return(
        <div>
          <div className='container' style={this.styles.rows}>
          <div style={{'float':'left', 'width':'25%'}}>
            <div className="heading" style={{'vertical-align':'middle'}}>To: {this.props.recipient}</div>
            <div className="heading" style={{'vertical-align':'middle'}}>From: {this.props.sender}</div>
            <div className="heading" style={{'vertical-align':'middle'}}>Date: {this.props.sendTime}</div>
          </div>
          <small><span onClick={ this.showCompleteEmail } className="glyphicon glyphicon-plus" style={{'float':'right','word-spacing':'-10px'}}>Full Email</span></small>
          <small><span onClick={ this.showAllFlags } className="glyphicon glyphicon-menu-down" style={{'float':'right','word-spacing':'-10px','margin-right':'10px'}}>All Flags</span></small>
          <div style={{'float':'right', width:'70%'}}>
            {contentRows}
          </div>

          </div>
        </div>
      )
    } else if (this.props.focusLevel === 'complete') {
      return (
          //TODO: fill in the complete email render
          <div >
              <table style={this.styles.table}>
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Sender</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.props.recipient}</td>
                  <td>{this.props.sender}</td>
                  <td>{this.props.sendTime}</td>
                </tr>
              </tbody>

            </table>
            <span className='input-group-btn' style={{'float':'left'}}>
                <button id='showOneFlag' onClick={this.showOneFlag} className='btn btn-primary-outline'>Collapse</button>
            </span>
            <table style={this.styles.table}>
              <thead>
                <tr>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.props.body}</td>
                </tr>
              </tbody>
            </table>

          </div>
        )
    }
  },

  styles:{
    table:{
      'margin-top':'0',
      'position':'relative',
      'width':'75%'
    },
    rows:{
      'border-bottom':'3px solid purple',
      'margin-bottom':'15px'
    }
  }
});

module.exports = FlaggedEmail;
