var React = require('react');
var Griddle = require('griddle-react');
var ReactBsTable = require("react-bootstrap-table");
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var ManageUsers = React.createClass({
  products: [
    {
        id: 1,
        name: "Product1",
        price: 120
    },{
        id: 2,
        name: "Product2",
        price: 80
    },{
        id: 3,
        name: "Product3",
        price: 207
    },{
        id: 4,
        name: "Product4",
        price: 100
    },{
        id: 5,
        name: "Product5",
        price: 150
    },{
        id: 6,
        name: "Product1",
        price: 160
    }
  ],
  selectRowProp: {
    mode: "checkbox",  //checkbox for multi select, radio for single select.
    clickToSelect: true,   //click row will trigger a selection on that row.
    bgColor: "rgb(238, 193, 213)"   //selected row background color
  },
  addUser: function(){
    var modal = document.getElementById('myModal');
    $('#myModal').modal();
  },
  render: function() {
    return (
      <div className='container'>
        <Griddle results={this.props.userArray} showSettings={true} className={this.styles.table}
           useFixedLayout={false} showFilter={true} showSettings={true} useGriddleStyles={false} 
           columns={['username',
                     'title',
                     'email',
                     'department',
                     'managerID',
                     'active'
                     ]} 
           noDataMessage={'No data could be found.'}/>
      </div>
      );
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

module.exports = ManageUsers;

