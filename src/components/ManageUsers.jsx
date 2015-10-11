var React = require('react');
var Griddle = require('griddle-react');

var ManageUsers = React.createClass({
  fakeData:  [
    {
      'Username': 'Mayer Leonard',
      'Full Name': 'Kapowsin',
      'Email': 'Hawaii',
      'Title': 7,
    },
    {
      'Username': 'Mayefsdr Leonard',
      'Full Name': 'Kapowsisdfn',
      'Email': 'California  ',
      'Title': 7,
    },{
      'Username': 'Mayer Leosdfdsfnard',
      'Full Name': 'Kapowsin',
      'Email': 'New Jersey',
      'Title': 7,
    },{
      'Username': 'Mayer Leonard',
      'Full Name': 'Kapowsin',
      'Email': 'Florida',
      'Title': 7,
    },
  ],

  exampleMetadata: [
    {
        'columnName': 'name',
        'order': 9,
        'locked': false,
        'visible': true,
        'displayName': 'Employee Name',
      },
      {
        'columnName': 'city',
        'order': 8,
        'locked': false,
        'visible': true,
      },
      {
        'columnName': 'state',
        'order': 7,
        'locked': false,
        'visible': true,
      },
      {
        'columnName': 'country',
        'order': 6,
        'locked': false,
        'visible': true,
      },
      {
        'columnName': 'company',
        'order': 5,
        'locked': false,
        'visible': true,
      },
      {
        'columnName': 'favoriteNumber',
        'order':  4,
        'locked': false,
        'visible': true,
        'displayName': 'Favorite Number',
      },
  ],

  render: function() {
    console.log(this.props.state.emailsArray);
    return (
      <div className='container'>
        <Griddle results={this.props.state.emailsArray} columnMetadata={this.exampleMetadata}
        showFilter={true} showSettings={true}  className={this.styles.table}
        columns={['sender','recipient','focusLevel']} noDataMessage={'No data could be found.'}/>
      </div>
      );
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

module.exports = ManageUsers;

