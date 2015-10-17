var React = require('react');

var Select = require('react-select');

var FlagDisplay = React.createClass({
  ManageFlag: function(flags) {
    var removeFlag;
    var checkFlag = {};
    var flagsArr = flags.split(',');
    for (var i = 0; i < this.props.options.length; i++) {
      if (flagsArr.indexOf(this.props.options[i].value.toString()) === -1) {
        checkFlag[this.props.options[i].value] = false;
      }else {
        checkFlag[this.props.options[i].value] = true;
      }
    }

    for (var key in checkFlag) {
      if (checkFlag[key] === false) {
        removeFlag = key;
      }
    }

    if (removeFlag) {
      this.props.callbacks._filterRemoveFlagKeyword(removeFlag);
    } else {
      var newFlag = flags.split(',');
      newFlag = newFlag[newFlag.length - 1];
      this.props.callbacks._filterAddFlagKeyword(newFlag);
    }
  },

  propTypes:{
    // allowCreate: React.propTypes.bool,
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    options: React.PropTypes.array,
  },
  render: function() {
    return (
      <div className = 'col-xs-6'>
        <h3>Selected Flags</h3>
        <h6>To Enter A New KeyWord, Start Typing and Hit Enter</h6>
        <Select
          allowCreate={this.props.allowCreate} //passed down from parent Component. set allowCreate to true.(example didn't have '=true') eg. 'allowcreate'
          value={this.props.options}//passed down from parent Component (Customize). Need to be in array of objects eg. [{label:'chocolate', value:'chocolate'}, ...]
          multi //test if this is needed
          placeholder='Add keywords here'
          options={this.props.options} //won't need. Test.
          onChange={this.ManageFlag} />
      </div>
    )
  },
})

module.exports = FlagDisplay;
