var React = require('react');

var HomeAbout = React.createClass({

  render: function() {
    return (
      <section className="bg-primary" id="about">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 text-center">
                      <h2 className="section-heading" style={{fontWeight:'700',fontSize:'40px'}}>We've got what you need!</h2>
                      <p className="text-faded" style={{fontSize:'28px', fontWeight:'400'}}>An estimated 40 million corporate emails were sent out in 2014. Each email has the potential to leak corporate secrets, confidential client information, or PR-damaging content. With no way to intelligently and efficiently monitor these messages, companies cannot proactively reduce their risk of damaging emails being leaked out.</p>
                      <p className="text-faded" style={{fontSize:'28px', fontWeight:'400'}}>Däge actively and silently monitors outbound emails from your email server, searching for hazardous emails that match a customizable criteria. Proprietary algorithms intelligently identify hazardous content with a 99% accuracy. Review flagged emails individually or in bulk to evaluate the appropriate course of action.</p>
                      <hr />
                      <a href="#" className="btn btn-default btn-xl">Get Started!</a>
                  </div>
              </div>
          </div>
      </section>
      );
    }

});

module.exports = HomeAbout;