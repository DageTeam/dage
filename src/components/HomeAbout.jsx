var React = require('react');

var HomeAbout = React.createClass({

  render: function() {
    return (
      <section className="bg-primary" id="about">
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 col-lg-offset-2 text-center">
                      <h2 className="section-heading">We've got what you need!</h2>
                      <hr className="light" />
                      <p className="text-faded">Start Bootstrap has everything you need to get your new website up and running in no time! All of the templates and themes on Start Bootstrap are open source, free to download, and easy to use. No strings attached!</p>
                      <a href="#" className="btn btn-default btn-xl">Get Started!</a>
                  </div>
              </div>
          </div>
      </section>
      );
    }

});

module.exports = HomeAbout;