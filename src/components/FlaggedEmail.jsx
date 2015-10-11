var React = require('react');
var FlaggedContext = require('components/FlaggedContext');

var FlaggedEmail = React.createClass({

  showAllFlags: function() {
    // this.props./*CBFuncShowFlags*/('all');
    this.props.callbacks._emailShowAllFlags(this.props.emailId);
  },

  showCompleteEmail: function() {
    // this.props./*CBFuncShowCompleteEmail*/('complete');
    this.props.callbacks._emailShowComplete(this.props.emailId);
  },

  showOneFlag: function() {
    // this.props./*CBFuncShowOnee*/('one');
    this.props.callbacks._emailShowOneFlag(this.props.emailId);
  },

  render: function() {
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
            context={ content.context }
            callbacks={ this.props.callbacks }/>
        )
    }

    if (this.props.focusLevel == 'one') {
      return (
        <div>
          <div className='container' style={this.styles.rows}>
          <div style={{'float':'left', 'width':'25%'}}>
            <div className='heading' style={{'vertical-align':'middle'}}><span style={{'font-weight':'bolder'}}>To</span>: {this.props.recipient}</div>
            <div className='heading' style={{'vertical-align':'middle'}}><span style={{'font-weight':'bolder'}}>From</span>: {this.props.sender}</div>
            <div className='heading' style={{'vertical-align':'middle'}}><span style={{'font-weight':'bolder'}}>Date</span>: {this.props.sendTime}</div>
          </div>
          <small><span onClick={ this.showCompleteEmail } className='glyphicon glyphicon-plus' style={{'float':'right','word-spacing':'-10px','cursor':'pointer'}}>Full Email</span></small>
          <small><span onClick={ this.showAllFlags } className='glyphicon glyphicon-chevron-down' style={{'float':'right','word-spacing':'-10px','margin-right':'10px','cursor':'pointer'}}>All Flags</span></small>
          <div style={{'float':'right', width:'70%'}}>
            {contentRows}
          </div>

          </div>
        </div>
      )
    } else if (this.props.focusLevel == 'allFlags') {
      return (
        <div>
          <div className='container' style={this.styles.rows}>
          <div style={{'float':'left', 'width':'25%'}}>
            <div className='heading' style={{'vertical-align':'middle'}}><span style={{'font-weight':'bolder'}}>To</span>: {this.props.recipient}</div>
            <div className='heading' style={{'vertical-align':'middle'}}><span style={{'font-weight':'bolder'}}>From</span>: {this.props.sender}</div>
            <div className='heading' style={{'vertical-align':'middle'}}><span style={{'font-weight':'bolder'}}>Date</span>: {this.props.sendTime}</div>
          </div>
          <small><span onClick={ this.showCompleteEmail } className='glyphicon glyphicon-plus' style={{'float':'right','word-spacing':'-10px','cursor':'pointer'}}>Full Email</span></small>
          <small><span onClick={ this.showOneFlag } className='glyphicon glyphicon-chevron-up' style={{'float':'right','word-spacing':'-10px','margin-right':'10px','cursor':'pointer'}}>Minimize</span></small>
          <div style={{'float':'right', width:'70%'}}>
            {contentRows}
          </div>

          </div>
        </div>
      )
    } else if (this.props.focusLevel === 'complete') {
      return (
        <div>
          <div className='container' style={this.styles.rows}>
            <div style={{'float':'left', 'width':'25%'}}>
              <div className='heading' style={{'vertical-align':'middle'}}>To: {this.props.recipient}</div>
              <div className='heading' style={{'vertical-align':'middle'}}>From: {this.props.sender}</div>
              <div className='heading' style={{'vertical-align':'middle'}}>Date: {this.props.sendTime}</div>
            </div>
            <small><span onClick={ this.showCompleteEmail } className='glyphicon glyphicon-plus' style={{'float':'right','word-spacing':'-10px'}}>Full Email</span></small>
            <small><span onClick={ this.showAllFlags } className='glyphicon glyphicon-chevron-up' style={{'float':'right','word-spacing':'-10px','margin-right':'10px'}}>All Flags</span></small>
            <small><span onClick={ this.showOneFlag } className='glyphicon glyphicon-chevron-up' style={{'float':'right','word-spacing':'-10px','margin-right':'10px'}}>Minimize</span></small>
              <table style={{width:'100%', 'margin-top':'1%'}}>
                  <tr>
                    <th>Email Body</th>
                  </tr>
                  <tr>
                    <td>{this.props.body}</td>
                  </tr>
              </table>
            <div style={{'float':'right', width:'70%'}}>
              {contentRows}
            </div>
            <div style={{float:'left'}}>
            </div>
          </div>
        </div>
      )
    }
  },

  styles:{
    table:{
      'margin-top':'0',
      'position':'relative',
      'width':'75%',
    },
    rows:{
      'border-bottom':'3px solid purple',
      'margin-bottom':'15px',
    },
  },
});

module.exports = FlaggedEmail;
