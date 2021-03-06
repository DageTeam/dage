var React = require('react');
var FlaggedContext = require('components/FlaggedContext');

var GeneralEmail = React.createClass({

  showAllFlags: function() {
    // this.props./*CBFuncShowFlags*/('all');
    this.props.callbacks._allEmailsShowAllFlags(this.props.emailId);
  },

  showCompleteEmail: function() {
    // this.props./*CBFuncShowCompleteEmail*/('complete');
    this.props.callbacks._allEmailsShowComplete(this.props.emailId);
  },

  showOneFlag: function() {
    // this.props./*CBFuncShowOnee*/('one');
    this.props.callbacks._allEmailsShowOneFlag(this.props.emailId);
  },

  markIsFlag: function() {
    //TODO: insert function
  },

  markIsNotFlag: function() {
    this.props.callbacks._unflagEmail(this.props.emailId);
  },

  markAsRead: function() {
    this.props.callbacks._emailMarkRead(this.props.emailId);
  },

  render: function() {
    var contentRows = [];
    var contentList = this.props.flags;
    var flagsArray = [];
    for (var i = 0; i < contentList.length; i++) {
      flagsArray.push(contentList[i].flaggedKeyword);
    };

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
    const allFlagsButton = <small><span onClick={ this.showAllFlags } className='glyphicon glyphicon-chevron-down' style={{'float':'right','wordSpacing':'-10px','marginRight':'10px','cursor':'pointer'}}>Show all { this.props.flags.length } flags</span></small>;
    const collapseButton = <small><span onClick={ this.showOneFlag } className='glyphicon glyphicon-chevron-up' style={{'float':'right','wordSpacing':'-10px','marginRight':'10px','cursor':'pointer'}}>Minimize</span></small>;
    const markYesButton = <span onClick={ this.markIsFlag } style={{'float':'right','wordSpacing':'-10px','marginRight':'10px','cursor':'pointer'}}> Yes, flag this email</span>;
    const markNoButton = <span onClick={ this.markIsNotFlag } style={{'float':'left','color':'green','marginRight':'10px','cursor':'pointer'}}>Unflag </span>;
    const markReadButton = <span onClick={ this.markAsRead} id='markRead' style={{'float':'left','color':'#ea6314','marginRight':'10px','cursor':'pointer'}}>Mark Read</span>;

    const oneFLButtonsBlock = (userPermissionGroup === 'admin') ?
        <div>{ fullEmailButton } { allFlagsButton } </div> :
        <div>{ allFlagsButton } </div>;
    const allFLButtonsBlock = (userPermissionGroup === 'admin') ?
        <div>{ fullEmailButton } { collapseButton } </div> :
        <div>{ collapseButton } </div>;
    const fullEmailButtonsBlock = <div> { collapseButton } </div>;

    if (this.props.focusLevel == 'one') {
      return (
        <div style={{'width':'100%'}}>
          <div className='container' style={this.styles.rows}>
            <div className='container' >
              <div className='heading' style={{'verticalAlign':'middle', 'float':'left'}}><span style={{'fontWeight':'500'}}>From</span>: {this.props.sender}</div>
              <div className='heading' style={{'verticalAlign':'middle', 'float':'right'}}><span style={{'fontWeight':'500'}}>Subject</span>: {this.props.subject}</div>
            </div> 
                                                                                                                                                                                                                                                                                                                                                                                                <div className='container' > 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                <div className='heading' style={{'verticalAlign':'middle', 'float':'left'}}><span style={{'fontWeight':'500'}}>To</span>: {this.props.recipient}</div>
              <div className='heading' style={{'verticalAlign':'middle', 'float':'right'}}><span style={{'fontWeight':'500'}}>Date</span>: {this.props.sendTime}</div>
            </div>
            <div className='container' > 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                {markNoButton}
              {oneFLButtonsBlock}
            </div>
          </div>
        </div>
      )
    } else if (this.props.focusLevel == 'allFlags') {
      return (

        <div style={{'width':'100%',}}>
          <div className='container' style={this.styles.rows}>
            <div className='container' >
              <div className='heading' style={{'verticalAlign':'middle', 'float':'left'}}><span style={{'fontWeight':'500'}}>From</span>: {this.props.sender}</div>
              <div className='heading' style={{'verticalAlign':'middle', 'float':'right'}}><span style={{'fontWeight':'500'}}>Subject</span>: {this.props.subject}</div>
            </div> 
                                                                                                                                                                                                                                                                                                                                                                                                <div className='container' > 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                <div className='heading' style={{'verticalAlign':'middle', 'float':'left'}}><span style={{'fontWeight':'500'}}>To</span>: {this.props.recipient}</div>
              <div className='heading' style={{'verticalAlign':'middle', 'float':'right'}}><span style={{'fontWeight':'500'}}>Date</span>: {this.props.sendTime}</div>

            </div>
            <div className='container' > 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                {markNoButton}
              {allFLButtonsBlock}
            </div>
            <div className='container' style={{'marginTop':'1%', 'marginBottom':'1%'}}>
              {contentRows}
            </div>
            
                                                                                                                                                                                                                                                                                                                                </div>
        </div>
      )
    } else if (this.props.focusLevel === 'complete') {
      return (
        <div style={{'width':'100%'}}>
          <div className='container' style={this.styles.rows}>
            <div className='container' >
              <div className='heading' style={{'verticalAlign':'middle', 'float':'left'}}><span style={{'fontWeight':'500'}}>From</span>: {this.props.sender}</div>
              <div className='heading' style={{'verticalAlign':'middle', 'float':'right'}}><span style={{'fontWeight':'500'}}>Subject</span>: {this.props.subject}</div>
            </div> 
                                                                                                                                                                                                                                                                                                                                                                                                <div className='container' > 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                <div className='heading' style={{'verticalAlign':'middle', 'float':'left'}}><span style={{'fontWeight':'500'}}>To</span>: {this.props.recipient}</div>
              <div className='heading' style={{'verticalAlign':'middle', 'float':'right'}}><span style={{'fontWeight':'500'}}>Date</span>: {this.props.sendTime}</div>

            </div>
            <div className='container' > 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                {markNoButton}
              {fullEmailButtonsBlock}
            </div>
            <div className='container' style={{'marginTop':'1%', 'marginBottom':'1%'}}>
              {contentRows}
              <table style={{width:'100%', 'marginTop':'1%'}}>
                  <tr>
                    <th>Email Body</th>
                  </tr>
                  <tr>

                    <td>{ this.props.callbacks._flagHighlightRender(this.props.body, flagsArray) }</td>
                  </tr>
              </table>
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
      'marginBottom':'10px',
      'marginTop':'5px',
    },
  },
});

module.exports = GeneralEmail;
