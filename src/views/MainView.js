import React       from 'react';
import { connect } from 'react-redux';
import FlaggedEmailList from 'components/FlaggedEmailList';
import Header from 'components/Header';
import SideNav from 'components/SideNav';
import Footer from 'components/Footer';
import ScriptLoader from 'components/ScriptLoader';
import MainContainer from 'components/MainContainer';

// import {
//   emailArrayFetch,
//   emailArrayFetchSuccess,
//   emailArrayFetchError,
//   emailShowOneFlag,
//   emailShowAllFlags,
//   emailShowComplete,
// } from 'actions/actions';

// We define mapStateToProps where we'd normally use the @connect
// decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  state: state,
});
export class MainView extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,

    // emails : React.PropTypes.object,
  }

  constructor() {
    super();
  }

  // normally you'd import an action creator, but I don't want to create
  // a file that you're just going to delete anyways!

  render() {
    let callbacks = {};
    return (
      <div>
        <Header />
        <MainContainer />
        <SideNav />
        <Footer />
        <ScriptLoader />
        <div className='page-overlay'></div>
        <div
          state={ this.props.state }
          callbacks={ callbacks }
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(MainView);
