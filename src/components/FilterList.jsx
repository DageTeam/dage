let React = require('react');
let Select = require('react-select');

let FilterList = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
  },

  selectFilter: function(filterId) {
    // let filterId = arguments[1][0].value;
    //add filter if filterId is a string. Maybe warn the users to pick a string for new filters.
    if (typeof filterId !== 'number') {
      this.props.callbacks._filterTypeAdd(filterId, this.props.userSession.username);
      this.props.callbacks._filterArrayFetch();
    }

    this.props.callbacks._filterTypeSelect(filterId);
    this.props.callbacks._filterArrayFetch();
  },

  render: function() {
    let [ currentFilter ] = this.props.options.filterOptions.filter(filterObj => {
      return filterObj.value === this.props.options.filterTypeSelected;
    }).map(filterObj => {
      return filterObj.label;
    })

    return (
      <div className='col-xs-6'>
        <h3>Filter List</h3>
        <h6>Select a Filter or To Add a New Filter, Start Typing Then Hit Enter </h6>
        <Select
          allowCreate
          placeholder={ currentFilter }
          options= {this.props.options.filterOptions}
          onChange= {this.selectFilter} />
                                                                                                                                                                                                </div>
      )
  },
});

module.exports = FilterList;
