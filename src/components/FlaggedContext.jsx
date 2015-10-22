const React = require('react');

const FlaggedContext = React.createClass({

  styles:{
    table:{
      'marginTop':'0',
      'tableLayout':'fixed'
    }
  },

  render: function flaggedContextFx() {
    return (
     <div>
       <table style={this.styles.table}>
           <tr>
               <th>Flagged Keyword</th>
               <th>Context</th>
           </tr>
           <tr>
               <td style={{color: '#ea6314', fontWeight:'bold'}}>{ this.props.flaggedKeyword }</td>
               <td>{ this.props.callbacks._flagHighlightRender(this.props.context, [this.props.flaggedKeyword]) }</td>
           </tr>
       </table>
     </div>
     );
  }

});

module.exports = FlaggedContext;
