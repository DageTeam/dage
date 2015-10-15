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
  addUserToState: function(data){
    this.props.callbacks._addUserToState(data);
  },
  resetPassword: function(){
    // console.log('this is password name', this.props.userInfo.name);
    // console.log('component-manageUser_resetPassword',this.props.userInfo.name)
    this.props.callbacks._userPasswordReset(this.props.userInfo.username);
  },
  render: function() {
    // console.log('THIS IS THE USERSTATE', this.props.userInfo)
    var _this = this;
    var selectRowProp = {
      mode: 'checkbox',  //checkbox for multi select, radio for single select.
      clickToSelect: true,   //click row will trigger a selection on that row.
      bgColor: 'rgb(238, 193, 213)',
      onSelect: function(data) {
        // console.log('onSelect', data);
        _this.addUserToState(data);
      },

    };
    return (
      <div className='container'>
      <button className='btn btn-primary' type='submit' style={{backgroundColor: '#6e2568', width: '10%', 
      float: 'right'}} onClick={this.resetPassword} >Reset PW</button>
      <br />
        <BootstrapTable data={this.props.userArray} hover={true} insertRow={true}
         selectRow={selectRowProp} search={true}>
          
          <TableHeaderColumn dataField="username" isKey={true} dataAlign="right" dataSort={true}>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField="title" dataSort={true}>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField="email" dataAlign="center">Product Price</TableHeaderColumn>
          <TableHeaderColumn dataField="department" dataAlign="center">Product Price</TableHeaderColumn>
          <TableHeaderColumn dataField="managerID" dataAlign="center">Product Price</TableHeaderColumn>
          <TableHeaderColumn dataField="active" dataAlign="center">Product Price</TableHeaderColumn>
        </BootstrapTable>
        
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

