var React = require('react');

var FlaggedContext = React.createClass({


  render: function(){
  var context = this.props.context;
   return (
    <div>
      <table style={this.styles.table}>
          <tr>
            <th>Flagged Keyword</th>
            <th>Context</th>
          </tr>
          <tr>
            <td>{this.props.flaggedKeyword}</td>
            <td>{context}</td>
          </tr>
      </table>
    </div>
    );
  },

  styles:{
    table:{
      'margin-top':'0',
      'table-layout':'fixed'
    }
  }
});

module.exports = FlaggedContext;
