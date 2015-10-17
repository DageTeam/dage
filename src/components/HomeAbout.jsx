var React = require('react');


//112.5B emails sent per day. source: http://www.radicati.com/wp/wp-content/uploads/2015/02/Email-Statistics-Report-2015-2019-Executive-Summary.pdf
var HomeAbout = React.createClass({

  render: function() {
    return (
      <section className="bg-primary" id="about">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 text-center">
                      <h2 className="section-heading" style={{fontWeight:'700',fontSize:'40px'}}>We've got what you need!</h2>
                      <p className="text-faded" style={{fontSize:'28px', fontWeight:'400'}}>An estimated 112 billion corporate emails were sent out everyday in 2015. Each email has the potential to leak corporate secrets, confidential client information, or PR-damaging content. With no way to intelligently and efficiently monitor these messages, companies cannot proactively reduce their risk of damaging emails being leaked out.</p>
                      <p className="text-faded" style={{fontSize:'28px', fontWeight:'400'}}>Däge actively and silently monitors outbound emails from your email server, searching for hazardous emails that match a customizable criteria. Proprietary algorithms intelligently identify hazardous content with a 99% accuracy. Review flagged emails individually or in bulk to evaluate the appropriate course of action.</p>
                      <hr />
                      <a href="/mainview" className="btn btn-default btn-xl">Login Here!</a>
                  </div>
              </div>
          </div>
      </section>
      );
    }

});

module.exports = HomeAbout;
