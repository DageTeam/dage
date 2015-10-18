var React = require('react');

var Footer = React.createClass({
  // created a footer component with some css applied to it
  render: function() {
    return (
      <div className='site-footer page-wrapper'>
        <footer className='main-container'>
            <div className='g--half g--last'>
              <ul className='footer__links'>
                <li className='copyright' style={{'textAlign':'center', 'marginLeft':'50%', 'width':'100%', 'marginTop':'100%'}}>©2015 Dage. All Rights Reserved.</li>
              </ul>
            </div>
        </footer>
       </div>
      );
  },
});

module.exports = Footer;
