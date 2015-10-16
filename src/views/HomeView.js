import React       from 'react';
import { connect } from 'react-redux';
import HomeNav from 'components/HomeNav';
import HomeHeader from 'components/HomeHeader';
import HomeAbout from 'components/HomeAbout';
import HomeService from 'components/HomeService';
import HomeContact from 'components/HomeContact';

// We define mapStateToProps where we'd normally use the @connect
// decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter : state.counter
});

export class HomeView extends React.Component {
  static propTypes = {
    dispatch : React.PropTypes.func,
    counter  : React.PropTypes.number
  }

  constructor () {
    super();
  }

  // normally you'd import an action creator, but I don't want to create
  // a file that you're just going to delete anyways!
  _increment () {
    this.props.dispatch({ type : 'COUNTER_INCREMENT' });
  }

  render () {
    return (
      <div>
        <HomeNav />
        <HomeHeader />
        <HomeAbout />
        <HomeService />
        <HomeContact />
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeView);
