var React = require('react');
var FlaggedContext = require('components/FlaggedContext');

var GeneralEmail = React.createClass({

  showCompleteEmail: function() {
    // this.props./*CBFuncShowCompleteEmail*/('complete');
    this.props.callbacks._MLEmailsShowComplete(this.props.emailId);
  },

  showOneFlag: function() {
    // this.props./*CBFuncShowOnee*/('one');
    this.props.callbacks._MLEmailsShowOneFlag(this.props.emailId);
  },

  markIsFlag: function() {
    //TODO: insert function
  },

  markIsNotFlag: function() {
    this.props.callbacks._unflagEmail(this.props.emailId);
  },

  markAsRead: function(){
    this.props.callbacks._emailMarkRead(this.props.emailId);
  },

  render: function() {
    var MLcode = 0;

    if (this.props.n_classification === 'innappropriate'){
      MLcode ++
    }
    if (JSON.stringify(this.props.p_classification) === JSON.stringify('P_inappropriate\r')){
      MLcode ++
    }

    const fullEmailButton = this.props.body.length > 110 ? <small><span onClick={ this.showCompleteEmail } className='glyphicon glyphicon-plus' style={{'float':'right','wordSpacing':'-10px','cursor':'pointer'}}>See Full Email</span></small> : <div/>;
    // const allFlagsButton = <small><span onClick={ this.showAllFlags } className='glyphicon glyphicon-chevron-down' style={{'float':'right','wordSpacing':'-10px','marginRight':'10px','cursor':'pointer'}}>Show all { this.props.flags.length } flags</span></small>;
    const collapseButton = <small><span onClick={ this.showOneFlag } className='glyphicon glyphicon-chevron-up' style={{'float':'right','wordSpacing':'-10px','marginRight':'10px','cursor':'pointer'}}>Minimize</span></small>;
    const markYesButton = <span onClick={ this.markIsFlag } style={{'float':'right','wordSpacing':'-10px','marginRight':'10px','cursor':'pointer'}}> Yes, flag this email</span>;
    const markNoButton = <span onClick={ this.markIsNotFlag } style={{'float':'left','color':'green','marginRight':'10px','cursor':'pointer'}}>Unflag </span>;
    const markReadButton = <span onClick={ this.markAsRead} id='markRead' style={{'float':'left','color':'#ea6314','marginRight':'10px','cursor':'pointer'}}>Mark Read</span>;

    const MLTag = MLcode === 2 ? <span style={{'float':'left','color':'red','marginRight':'10px','fontWeight':'bold'}}>High confidence </span> :
      <span style={{'float':'left','color':'orange','marginRight':'10px','fontWeight':'bold'}}>Low confidence </span>

    const oneFLButtonsBlock = <div>{ fullEmailButton } </div>;
    const fullEmailButtonsBlock = <div> { collapseButton } </div>;
    const emailMessage = this.props.body.length > 110 ? <td>{ this.props.body.slice(0,110) }[...]</td> : <td>{ this.props.body } </td>;

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
            <div className='container' style={{'marginBottom':'1%'}}>
              <table style={{width:'100%', 'marginTop':'1%'}}>
                  <tr>
                    <th>{ MLcode } Email Body</th>
                  </tr>
                  <tr>
                    { emailMessage }
                  </tr>
              </table>
            </div>
            <div className='container' >
              { MLTag }
              {markNoButton}
              {oneFLButtonsBlock}
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
            <div className='container' style={{'marginTop':'1%', 'marginBottom':'1%'}}>
              <table style={{width:'100%', 'marginTop':'1%'}}>
                  <tr>
                    <th>Email Body</th>
                  </tr>
                  <tr>

                    <td>{ this.props.body }</td>
                  </tr>
              </table>
            </div>
            <div className='container'>
              {markNoButton}
              {fullEmailButtonsBlock}
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
