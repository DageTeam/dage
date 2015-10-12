var React = require('react');

var Select = require('react-select');


var FlagDisplay = React.createClass({
  AddFlag: function(flags){
    var newFlag = flags.split(',');
    newFlag = newFlag[newFlag.length-1];
    this.props.callbacks._filterAddFlagKeyword(newFlag);
    this.props.callbacks._filterArrayFetch();
  },
  propTypes:{
          // allowCreate: React.propTypes.bool,
          hint: React.PropTypes.string,
          label: React.PropTypes.string,
          options: React.PropTypes.array,
  },
  render: function(){
    return(
      <div className = 'col-xs-10'>
        <h3 className = 'col-xs-5'>Selected Flags</h3>
        <h6 className = 'col-xs-5'>Enter a keyword not in the list, then hit enter</h6>
        <Select
          allowCreate={this.props.allowCreate} //passed down from parent Component. set allowCreate to true.(example didn't have '=true') eg. 'allowcreate'
          value={this.props.options}//passed down from parent Component (Customize). Need to be in array of objects eg. [{label:'chocolate', value:'chocolate'}, ...]
          multi //test if this is needed
          placeholder="Add keywords here"
          options={this.props.options} //won't need. Test.
          onChange={this.AddFlag} />
      </div>
    )
  }
})

module.exports = FlagDisplay;
