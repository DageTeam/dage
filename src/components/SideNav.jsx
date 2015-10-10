var React = require('react');

var SideNav = React.createClass({

  navigateAlertsRoute: function(){
    this.props.callbacks._navigationRouteSelect('alerts');
  },
  navigateDashboardRoute: function(){
    this.props.callbacks._navigationRouteSelect('dashboard');
  },
  navigateCustomizeRoute: function(){
    this.props.callbacks._navigationRouteSelect('customize');
  },
  navigateManageUserRoute: function(){
    this.props.callbacks._navigationRouteSelect('manageUser');
  },

  render: function() {
    return (
      <div className='page-wrapper'>
          <div className='wrap'>
            <div className='gallery js-flickity flickity-enabled is-draggable' data-flickity-options='{ &quot;cellSelector&quot;: &quot;.gallery-cell&quot;, &quot;wrapAround&quot;: true, &quot;setGallerySize&quot;: false, &quot;percentPosition&quot;: false, &quot;autoPlay&quot;: 4000 }' tabindex='0'>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                <ol className='flickity-page-dots'><li className='dot'></li><li className='dot is-selected'></li></ol><button className='flickity-prev-next-button previous' type='button'><svg viewBox='0 0 100 100'><path d='M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z' className='arrow'></path></svg></button><button className='flickity-prev-next-button next' type='button'><svg viewBox='0 0 100 100'><path d='M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z' className='arrow' transform='translate(100, 100) rotate(180) '></path></svg></button></div>
            </div>
            <nav className='site-nav' role='site-nav'>
              <div className='is-scrollable'>
                <ul className='nav'>
                  <li className='nav__item nav__item--has-child site-nav--products'><a onClick={ this.navigateAlertsRoute }>Alerts<i className='icon--products'></i></a></li>
                  <li className='nav__item site-nav--platform'><a onClick={ this.navigateDashboardRoute }>Dashboard<i className='icon--support'></i></a></li>
                  <li className='nav__item nav__item--has-child site-nav--company'><a onClick={ this.navigateCustomizeRoute }>Customize<i className='icon--company'></i></a></li>
                  <li className='nav__item site-nav--contact'><a onClick={ this.navigateManageUserRoute }>Manage User<i className='icon--contact'></i></a></li>
                </ul>
                <ul className='nav nav--social'>
                  <li className='nav__item site-nav--support'>
                    <a className='utility twitter' href='https://twitter.com/dage' target='_blank'>Twitter<i className='icon--twitter'></i></a>
                  </li>
                  <li className='nav__item site-nav--support'>
                    <a className='utility linkedin' href='https://www.linkedin.com/company/dage' target='_blank'>LinkedIn<i className='icon--linkedin'></i></a>
                  </li>
                  <li className='nav__item site-nav--support'>
                    <a className='utility facebook' href='https://www.facebook.com/dage' target='_blank'>Facebook<i className='icon--facebook'></i></a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
      );
  },
});

module.exports = SideNav;
