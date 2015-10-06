var React = require('react');

var Header = React.createClass({

  render: function(){
    return (
      <header className="site-header promote-layer">
        <div className="mobile-nav">
          <a href="#" className="mobile-nav__toggle">
            <span className="mobile-nav__glyph">Menu</span>
          </a>
        </div>
        <div className="logo">
          <a className="dage-logo" href="/">Dage
            <span className="text--is-hidden">Dage</span>
          </a>
        </div>
        <a className="global-cta--button">
          <span className="hide--small">Get Started</span><span className="hide--medium">Go</span>
        </a>
      </header>
      );
  }
});

module.exports = Header;
