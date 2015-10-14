var React = require('react');

var HomeService = React.createClass({

  render: function() {
    return (
      <div>
          <section id="services">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading">At Your Service</h2>
                        <hr className="primary" />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="service-box">
                            <i className="fa fa-4x fa-cogs wow bounceIn text-primary"></i>
                            <h3>Machine Learning</h3>
                            <p className="text-muted">Let our Machine Learning Algorithm flag abnormalities</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="service-box">
                            <i className="fa fa-4x fa-paper-plane wow bounceIn text-primary" data-wow-delay=".1s"></i>
                            <h3>Monitors All Outgoing Emails</h3>
                            <p className="text-muted">Don't ever worry about compromising outgoing emails!</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="service-box">
                            <i className="fa fa-4x fa-tachometer wow bounceIn text-primary" data-wow-delay=".2s"></i>
                            <h3>Easy UI</h3>
                            <p className="text-muted">Easy to use dashboard to tell you everything you need to know at a glance.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="service-box">
                            <i className="fa fa-4x fa-heart wow bounceIn text-primary" data-wow-delay=".3s"></i>
                            <h3>Made with Love</h3>
                            <p className="text-muted">We'll worry about your emails so you don't have to!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>
    );
  }

});

module.exports = HomeService;