var React = require('react');
var Select = require('react-select');

var FilterList = React.createClass({
  propTypes: {
    label: React.PropTypes.string
  },
  options: [
    {value: 'First Filter', label: 'FIRST FILTER'},
    {value: 'Second Filter', label: 'Second FILTER'},
    {value: 'Third Filter', label: 'Third FILTER'},
    {value: 'Fourth Filter', label: 'Fourth FILTER'},
    {value: 'Fifth Filter', label: 'Fifth FILTER'},
  ],
  addFilter : function() {
    console.log(arguments[1][0], arguments[1][0].value, arguments[1][0].label);
    // this.props./*CBNewFilter*/(Array.prototype.slice.apply(arguments));
  },
  selectFilter : function(filterId) {
    // let filterId = arguments[1][0].value;
    this.props.callbacks._filterTypeSelect(filterId);
    this.props.callbacks._filterArrayFetch();
  },
  render: function() {
    return (
      <div className='col-xs-5'>
        <h3 className='col-xs-5'>Filter List</h3>
        <Select
          allowCreate
          placeholder='Select or add your filter'
          options= {this.props.options}
          onChange= {this.selectFilter} />
      </div>
      )
  }
});


module.exports = FilterList;
