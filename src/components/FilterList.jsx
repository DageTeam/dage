var React = require('react');
var Select = require('react-select');

var FilterList = React.createClass({
  propTypes: {
    label: React.PropTypes.string
  },
  addFilter : function() {
    console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
    // this.props./*CBNewFilter*/(Array.prototype.slice.apply(arguments));
  },
  render: function() {
    return (
      <div className='col-xs-5'>
        <h3 className='col-xs-5'>Filter List</h3>
        <Select
          allowCreate
          placeholder='Select or add your filter'
          options= {this.props.options}
          onChange= {this.addFilter} />
      </div>
      )
  }
});


module.exports = FilterList;
