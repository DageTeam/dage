var React = require('react');

var FlaggedContext = React.createClass({


  render: function(){
   return (
    <div className='col-xs-10'>
      <p>Flagged Keyword: {this.props.flaggedKeyword}</p>
      <p>Context: {this.props.context}</p>
    </div>
    );
  }
});

module.exports = FlaggedContext;
