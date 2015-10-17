var React = require('react');
var Griddle = require('griddle-react');
var ReactBsTable = require("react-bootstrap-table");
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var ManageUsers = React.createClass({
  addUserToState: function(data){
    this.props.callbacks._addUserToState(data);
  },
  // function ran when reset button is clicked. Use userArrayRequest to refresh data
  resetPassword: function(){
    this.props.callbacks._userPasswordReset(this.props.userInfo.username);
    this.props.callbacks._userArrayRequest();
  },
  // function ran when enable/disable button is clicked. Use userArrayRequest to refresh
  toggleUser: function(){
    this.props.callbacks._userToggleActive(this.props.userInfo.username, this.props.userInfo.active);
    this.props.callbacks._userArrayRequest();
  },
  // function to add user after userinfo is inserted to table via new button
  addingUser: function(data) {
    this.props.callbacks._userAdd(data);
  },
  render: function() {
    var _this = this;
    // add user to db after userinfo is inserted to table via new button
    var insertRowCallback = {
      afterInsertRow: function(data){
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
});

module.exports = ManageUsers;

