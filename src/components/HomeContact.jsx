var React = require('react');

var HomeContact = React.createClass({

  render: function() {
    return (
      <div>
        <section className="bg-dark">
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 text-center">
                      <p>Made Possible By: </p>
                      <h2 className="section-heading">Team Dage</h2>
                  </div>
                  
                  <div className="col-lg-4 text-center">
                      <i className="fa fa-envelope-o fa-3x wow bounceIn" data-wow-delay=".1s"></i>
                      <p><a href="mailto:your-email@your-domain.com">dageprotect@gmail.com</a></p>
                  </div>
              </div>
          </div>
        </section>
      </div>
    );
  }

});

module.exports = HomeContact;