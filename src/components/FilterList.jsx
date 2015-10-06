var React = require('react');
var Select = require('react-select');

function addFilter() {
  console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
  this.props./*CBNewFilter*/(Array.prototype.slice.apply(arguments));
}
var FilterList = React.createClass({
  propTypes: {
    label: React.PropTypes.string
  },
  render: function(){
    return (
      <div className='col-xs-5'>
        <h3 className='col-xs-3'>Filter List</h3>
        <Select
          allowCreate
          placeholder='Select or add your filter'
          options= {this.props.options}
          onChange= {addFilter} />
      </div>
      )
  }
});


module.exports = FilterList; 