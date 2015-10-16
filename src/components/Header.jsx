var React = require('react');

var Header = React.createClass({

  logout: function (){
    this.props.callbacks._deleteToken();
  },

  render: function(){
    if(!this.props.callbacks){
      return (
        <div>
          <header className="site-header promote-layer" style={this.styles.header}>
              <a style={this.styles.banner} className="dage-logo" href="/"> DÄGE
              </a>
          </header>
        </div>
      )
    }else{
    return (
      <div>
      <header className="site-header promote-layer" style={this.styles.header}>
          <a style={this.styles.logout} className="dage-logout" onClick={this.logout}> DÄGE LOGOUT
          </a>
          <a style={this.styles.banner} className="dage-logo" href="/"> DÄGE
          </a>
      </header>
      </div>
      );
    }
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
    },
    logout: {
      'color':'#ea6314',
      'fontSize':'15px',
      'float': 'right', 
      'marginTop': '17px',
      'marginRight': '20px',
    }
  }
});

module.exports = Header;
