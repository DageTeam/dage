var React = require('react');

var mainView = React.createClass({

  getInitialState: function(){
    return {
    };
  },

  render: function(){
    return (
      <div>
        Hello Dage
      </div>
    )
  },
  styles: {
  }
})

var element = React.createElement(mainView);
React.render(element, document.querySelector('.container'));
