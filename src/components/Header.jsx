var React = require('react');

var Header = React.createClass({

  render: function(){
    return (
      <header className="site-header promote-layer" style={this.styles.header}>
        <div className="mobile-nav">
          <a href="#" className="mobile-nav__toggle">
            <span className="mobile-nav__glyph">Menu</span>
          </a>
        </div>
          <a style={this.styles.banner} className="dage-logo" href="/">Dage
            <span className="text--is-hidden">Dage</span>
          </a>
      </header>
      );
  },
  styles:{
    banner:{
      'text-align':'center',
      'color':'#fff',
      'font-size':'30px',
      'font':'Avenir sans-serif',
      'padding':'auto'
    },
    header:{
      'top':'0',
      'background-color':'rgb(40,32,40)'
    }
  }
});

module.exports = Header;
