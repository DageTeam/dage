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
  toggleUser: function(){
    console.log('toggleuser',this.props.userInfo)
    this.props.callbacks._userToggleActive(this.props.userInfo.username, this.props.userInfo.active);
  },
  addingUser: function(data) {
    this.props.callbacks._userAdd(data);
  },
  render: function() {
    // console.log('THIS IS THE USERSTATE', this.props.userInfo)
    var _this = this;
    
    var insertRowCallback = {
      afterInsertRow: function(data){
        console.log('data', data);
        _this.addingUser(data);
      },
    };
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
      float: 'right'}} onClick={this.resetPassword} style={{marginLeft: '5%'}}>Reset PW</button>
      <button className='btn btn-primary' type='submit' style={{backgroundColor: '#6e2568', width: '10%', 
      float: 'right'}} onClick={this.toggleUser} >Enable/Disable</button>
      <br />
        <BootstrapTable data={this.props.userArray} hover={true} insertRow={true}
         selectRow={selectRowProp} search={true} options={insertRowCallback}>
          
          <TableHeaderColumn dataField="username" isKey={true} dataSort={true}>Username</TableHeaderColumn>
          <TableHeaderColumn dataField="title" dataSort={true}>Title</TableHeaderColumn>
          <TableHeaderColumn dataField="email" dataAlign="center">Email</TableHeaderColumn>
          <TableHeaderColumn dataField="department" dataAlign="center">Dept</TableHeaderColumn>
          <TableHeaderColumn dataField="managerID" dataAlign="center">ManagerID</TableHeaderColumn>
          <TableHeaderColumn dataField="active" dataAlign="center">Enabled</TableHeaderColumn>
          <TableHeaderColumn dataField="permissionGroup" dataAlign="center">PermGroup</TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataAlign="center">Name</TableHeaderColumn>
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

