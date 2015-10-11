var React = require('react');

var Footer = React.createClass({

  render: function() {
    return (
      <div className='site-footer page-wrapper'>
        <footer className='main-container'>
            <div className='g--half g--last'>
              <ul className='footer__links'>
                <li className='copyright' style={{"text-align":"center", "margin-left":"50%", "width":"100%", 'margin-top':'100%'}}>©2015 Dage. All Rights Reserved.</li>
              </ul>
            </div>
        </footer>
       </div>
      );
  },
});

module.exports = Footer;
