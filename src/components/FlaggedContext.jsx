var React = require('react');

var FlaggedContext = React.createClass({


  render: function(){
   return (
    <div className='col-xs-10'>
      <p>Type: {this.props.type}</p>
      <p>Context: {this.props.context}</p>
    </div>
    );
  }
});

module.exports = FlaggedContext;