var React = require('react');

var HomeHeader = React.createClass({

  render: function() {
    return (
      <div>
      <header>
        <div className="header-content">
            <div className="header-content-inner">
                <h1 style={{'fontSize':'4em'}}>D<span style={{'fontSize':'.8em'}}>Ä</span>GE</h1>
                <hr/>
                <h3><span style={{'color':'#fff'}}>Intelligently monitor and protect your outbound emails</span></h3>
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