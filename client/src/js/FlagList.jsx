var React = require('react');

var Select = require('react-select');

function AddChange() {
  console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
  //insert the newly added flag as param for CB so that redux code can connect with DB to insert it. 
  this.props./*CBNewFlag*/(Array.prototype.slice.apply(arguments[arguments.length-1]))//double check to see if param === last added object values.PLAY WITH IT.
}

var SelectedValuesField = React.createClass({
  propTypes:{
          allowCreate: React.propTypes.bool, 
          hint: React.PropTypes.string, 
          label: React.PropTypes.string, 
          options: React.PropTypes.array,
  },
  render: function(){
    return(
      <div className = 'col-xs-5'> 
        <h3 className = 'col-xs-3'>Selected Flags</h3>
        <h6 className = 'col-xs-3'>Enter a keyword not in the list, then hit enter</h6>
        <Select
          allowCreate={this.props.allowCreate} //passed down from parent Component. set allowCreate to true.(example didn't have '=true') eg. 'allowcreate'
          value={this.props.options}//passed down from parent Component (Customize). Need to be in array of objects eg. [{label:'chocolate', value:'chocolate'}, ...]
          multi //test if this is needed
          placeholder="Add keywords here"
          options={this.props.options} //won't need. Test.
          onChange={AddChange} />
      </div>
    )
  }
})