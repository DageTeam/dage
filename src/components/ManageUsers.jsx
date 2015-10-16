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
    var _this = this;

    var insertRowCallback = {
      afterInsertRow: function(data){
        console.log('data', data);
        _this.addingUser(data);
      },
    };
    var selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: 'rgb(238, 193, 213)',
      onSelect: function(data) {
        _this.addUserToState(data);
      },
    };
    return (
      <div className='container'>
      <button className='btn btn-primary' type='submit' style={{backgroundColor: '#6e2568',
      float: 'right', marginLeft: '5px'}} onClick={this.resetPassword}>Reset PW</button>
      <button className='btn btn-primary' type='submit' style={{backgroundColor: '#6e2568',
      float: 'right'}} onClick={this.toggleUser} >Enable/Disable</button>
      <br />
        <BootstrapTable data={this.props.userArray} hover={true} insertRow={true}
         selectRow={selectRowProp} search={true} options={insertRowCallback} style={{marginTop: '0'}}>
          <TableHeaderColumn dataField="username" width="10%" dataAlign="left" isKey={true} dataSort={true}>Username</TableHeaderColumn>
          <TableHeaderColumn dataField="title" width="10%" dataAlign="left" dataSort={true}>Title</TableHeaderColumn>
          <TableHeaderColumn dataField="email" width="20%" dataAlign="left">Email</TableHeaderColumn>
          <TableHeaderColumn dataField="department" width="20%" dataAlign="left">Dept</TableHeaderColumn>
          <TableHeaderColumn dataField="managerID" dataAlign="left" hidden>ManagerID</TableHeaderColumn>
          <TableHeaderColumn dataField="active" width="10%" dataAlign="left">Enabled</TableHeaderColumn>
          <TableHeaderColumn dataField="permissionGroup" width="10" dataAlign="left">PermGroup</TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataAlign="left" hidden>Name</TableHeaderColumn>
        </BootstrapTable>

      </div>
      );
  },


  // styles:{
  //   table:{
  //     'marginTop':'0',
  //     'position':'relative',
  //     'width':'75%',
  //   },
  //   rows:{
  //     'borderBottom':'3px solid purple',
  //     'marginBottom':'15px',
  //   },
  //   tbody>tr:nth-child(even) {
  //       background-color: #fff
  //   }
  // },
});

module.exports = ManageUsers;

