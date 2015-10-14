var React = require('react');

var Header = React.createClass({

  render: function(){
    return (
      <div>
      <header className="site-header promote-layer" style={this.styles.header}>
        <div className="mobile-nav">
          <a href="#" className="mobile-nav__toggle">
            <span className="mobile-nav__glyph">Menu</span>
          </a>
        </div>
          <a style={this.styles.banner} className="dage-logo" href="/"> DÄGE
            <span className="text--is-hidden">Dage</span>
          </a>
      </header>
      </div>
      );
  },
  styles:{
    banner:{
      'textAlign':'center',
      'color':'#ea6314',
      'fontSize':'30px',
      'font':'Avenir sans-serif',
      'padding':'auto',
      'marginTop':'20px',
    },
    header:{
      'top':'0',
      'backgroundColor':'#fff'
    }
  }
});

module.exports = Header;
