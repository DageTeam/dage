var React = require('react');

var HomeHeader = React.createClass({

  render: function() {
    return (
      <div>
      <header>
        <div className="header-content">
            <div className="header-content-inner">
                <h1>DAGE</h1>
                <hr/>
                <h3>Protecting Your Outgoing Emails</h3>
                <hr/>
                <a href="#about" className="btn btn-primary btn-xl page-scroll">Find Out More</a>
            </div>
        </div>
      </header>
      </div>
    );
  }

});

module.exports = HomeHeader;