var React = require('react');

var HomeNav = React.createClass({


  render: function() {
    return (
    <div>
      <nav id="mainNav" className="navbar navbar-default navbar-fixed-top affix">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <a className="page-scroll" href="#about">About</a>
                    </li>
                    <li>
                        <a className="page-scroll" href="#services">Services</a>
                    </li>
                    <li>
                         <a className="navbar-brand page-scroll" href="mainview" style={{paddingLeft:'20px'}}>DÄGE Login</a>
                    </li>
                </ul>
            </div>
        </div>
      </nav>
      </div>
    );
  }

});

module.exports = HomeNav;