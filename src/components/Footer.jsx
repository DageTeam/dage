var React = require('react');

var Footer = React.createClass({

  render: function() {
    return (
      <div className='site-footer page-wrapper'>
        <footer className='main-container'>
          <div className='footer clear'>
            <div className='g--half'>
              <ul className='footer__nav'>
                <li className='site-nav--products'><a href='/products'>Products</a></li><li className='site-nav--platform'><a href='/platform'>Platform</a></li><li className='site-nav--company'><a href='/company'>Company</a></li><li className='site-nav--contact'><a href='/contact'>Contact</a></li>
              </ul>
            </div>
            <div className='g--half g--last'>
              <ul className='footer__links'>
                <li><a href='/legal?mcg=legal'>Legal</a></li>
                <li><a href='/legal?mcg=terms'>Terms</a></li>
                <li><a href='/legal?mcg=privacy'>Privacy</a></li>
                <li className='copyright'>©2015 Dage. All Rights Reserved.</li>
                <div>
                </div>
              </ul>
            </div>
          </div>
        </footer>
       </div>
      );
  },
});

module.exports = Footer;
