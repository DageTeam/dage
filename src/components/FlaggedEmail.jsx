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

  markIsFlag: function() {
    //TODO: insert function
  },

  markIsNotFlag: function() {
    console.log('sup');
    this.props.callbacks._unflagEmail(this.props.emailId);
  },

  render: function() {
    var contentRows = [];
    /*FLAGGEDCONTEXT props from email array from state tree*/
    var contentList = this.props.flags;
    var displayLength = contentList.length;
    var userPermissionGroup = this.props.userSession.permissionGroup;
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

    const fullEmailButton = <small><span onClick={ this.showCompleteEmail } className='glyphicon glyphicon-plus' style={{'float':'right','wordSpacing':'-10px','cursor':'pointer'}}>Full Email</span></small>;
    const allFlagsButton = (this.props.flags.length === 1) ? 
      <div/> : <small><span onClick={ this.showAllFlags } className='glyphicon glyphicon-chevron-down' style={{'float':'right','wordSpacing':'-10px','marginRight':'10px','cursor':'pointer'}}>Show all { this.props.flags.length } flags</span></small>;
    const collapseButton = <small><span onClick={ this.showOneFlag } className='glyphicon glyphicon-chevron-up' style={{'float':'right','wordSpacing':'-10px','marginRight':'10px','cursor':'pointer'}}>Minimize</span></small>;
    const markYesButton = <span onClick={ this.markIsFlag } style={{'float':'right','wordSpacing':'-10px','marginRight':'10px','cursor':'pointer'}}> Yes, flag this email</span>;
    const markNoButton = <span onClick={ this.markIsNotFlag } style={{'float':'left','color':'green','marginRight':'10px','cursor':'pointer'}}> Unflag this email</span>;

    const oneFLButtonsBlock = (userPermissionGroup === "admin") ? 
        <div>{ fullEmailButton } { allFlagsButton } </div> : 
        <div>{ allFlagsButton } </div>;
    const allFLButtonsBlock = (userPermissionGroup === "admin") ? 
        <div>{ fullEmailButton } { collapseButton } </div> : 
        <div>{ collapseButton } </div>;
    const fullEmailButtonsBlock = <div> { collapseButton } </div>;

    if (this.props.focusLevel == 'one') {
      return (
        <div style={{'width':'100%'}}>
          <div className='container' style={this.styles.rows}>
          <div style={{'float':'left', 'width':'25%'}}>
            <div className='heading' style={{'verticalAlign':'middle'}}><span style={{'fontWeight':'bolder'}}>To</span>: {this.props.recipient}</div>
            <div className='heading' style={{'verticalAlign':'middle'}}><span style={{'fontWeight':'bolder'}}>From</span>: {this.props.sender}</div>
            <div className='heading' style={{'verticalAlign':'middle'}}><span style={{'fontWeight':'bolder'}}>Date</span>: {this.props.sendTime}</div>
            {markNoButton}
          </div>
          { oneFLButtonsBlock }
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
            <div className='heading' style={{'verticalAlign':'middle'}}><span style={{'fontWeight':'bolder'}}>To</span>: {this.props.recipient}</div>
            <div className='heading' style={{'verticalAlign':'middle'}}><span style={{'fontWeight':'bolder'}}>From</span>: {this.props.sender}</div>
            <div className='heading' style={{'verticalAlign':'middle'}}><span style={{'fontWeight':'bolder'}}>Date</span>: {this.props.sendTime}</div>
            {markNoButton}
          </div>
          { allFLButtonsBlock }
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
              <div className='heading' style={{'verticalAlign':'middle'}}>To: {this.props.recipient}</div>
              <div className='heading' style={{'verticalAlign':'middle'}}>From: {this.props.sender}</div>
              <div className='heading' style={{'verticalAlign':'middle'}}>Date: {this.props.sendTime}</div>
              {markNoButton}
            </div>
            { fullEmailButtonsBlock }
            <table style={{width:'100%', 'marginTop':'1%'}}>
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
      'marginTop':'0',
      'position':'relative',
      'width':'75%',
    },
    rows:{
      'borderBottom':'3px solid purple',
      'marginBottom':'15px',
    },
  },
});

module.exports = FlaggedEmail;
