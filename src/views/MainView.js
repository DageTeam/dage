import React       from 'react';
import { connect } from 'react-redux';
import FlaggedEmailList from 'components/FlaggedEmailList';
import Header from 'components/Header';
import SideNav from 'components/SideNav';
import Footer from 'components/Footer';
import ScriptLoader from 'components/ScriptLoader';
import FilterList from 'components/FilterList';
import FlagList from 'components/FlagList';
import ManageUsers from 'components/ManageUsers';
import Dashboard from 'components/Dashboard';
import Login from 'components/Login';

import {
  emailArrayFetch,
  emailArrayFetchSuccess,
  emailArrayFetchError,
  emailShowOneFlag,
  emailShowAllFlags,
  emailShowComplete,
} from 'actions/emails';

import {
  filterArrayFetch,
  filterTypeSelect,
  filterTypeAdd,
  filterAddFlagKeyword,
} from 'actions/filters';

import {
  navigationRouteSelect,
} from 'actions/navigation';

import {
  applicationLoaded,
  submitLogin,
  loginFailed,
  userFetchSuccess,
  userFetchError,
  deleteToken,
  deleteTokenError,
} from 'actions/userSession';

import {
  userAdd,
  userArrayRequest
} from 'actions/manageUsers'

// We define mapStateToProps where we'd normally use the @connect
// decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  emails: state.emails,
  filters: state.filters,
  navigation: state.navigation,
  userSession: state.userSession,
  state: state,
  manageUsers: state.manageUsers,
});
export class MainView extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    emails: React.PropTypes.object,
    filters: React.PropTypes.object,
    userSession: React.PropTypes.object,
    manageUsers: React.PropTypes.object
  }

  constructor(props) {
    super();
    console.log('this is props,', props);
    props.dispatch(applicationLoaded());
    this.callbacks = {
      _navigationRouteSelect: route => {
        this.props.dispatch(navigationRouteSelect(route));
      },

      _emailArrayFetch: param => {
        this.props.dispatch(emailArrayFetch(param));
      },

      _userArrayFetch : param => {
        this.props.dispatch(userArrayFetch(param));
      },

      _emailShowOneFlag : emailId => {
        this.props.dispatch(emailShowOneFlag(emailId));
      },

      _emailShowAllFlags: emailId => {
        this.props.dispatch(emailShowAllFlags(emailId));
      },

      _emailShowComplete: emailId => {
        this.props.dispatch(emailShowComplete(emailId));
      },

      _filterArrayFetch: () => {
        this.props.dispatch(filterArrayFetch());
      },

      _filterTypeSelect: filterId => {
        this.props.dispatch(filterTypeSelect(filterId));
      },
      _filterTypeAdd: (filterId, username) => {
        this.props.dispatch(filterTypeAdd(filterId,username));
      },
      _filterAddFlagKeyword: (keyword) => {
        this.props.dispatch(filterAddFlagKeyword(this.props.state.userSession.username, this.props.state.filters.filterTypeSelected,keyword));
      },
      _flagHighlightRender: (inputText, keyword) => {
        function flatMap(array, fn) {
          var result = [];
          for (var i = 0; i < array.length; i++) {
            var mapping = fn(array[i]);
            result = result.concat(mapping);
          }

          return result;
        }

        var flagRE = new RegExp(keyword, 'g', 'i');
        var result = flatMap(inputText.split(flagRE), function(part) {
          return [part, <span style={{color: 'red'}}>{keyword}</span>];
        });

        result.pop();
        return (result);
      },

      _submitLogin: data => {
        this.props.dispatch(submitLogin(data));
      },
    };
  }

  componentDidMount() {
    this.props.dispatch(userArrayRequest())
    this.props.dispatch(emailArrayFetch());
    this.props.dispatch(filterArrayFetch());
  }

  // normally you'd import an action creator, but I don't want to create
  // a file that you're just going to delete anyways!

  flaggedEmailsViewRender() {
    return (
      <div>
        <h1 style={{'padding-top':'60px', 'text-align':'center'}}>You Have New Alerts</h1>
        <FlaggedEmailList
          state={ this.props.emails }
          callbacks={ this.callbacks }
        />
      </div>
    );
  }


  customizeFiltersViewRender() {
    return (
      <div className='container text-center'>
        <h1 style={{'padding-top':'60px', 'text-align':'center'}}>Dage Customize Filters</h1>
        <FilterList
          options={ this.props.filters }
          user={this.props.userSession.username}
          callbacks={ this.callbacks } />
        <FlagList
          options={ this.props.filters.flagOptionsCurrent }
          callbacks={ this.callbacks }
          allowCreate  />
      </div>
    );
  }

  dashboardViewRender() {
    return (
      <Dashboard />
    );
  }

  manageUserRender() {
    return (
      <div>
        <h1 style={{'padding-top': '60px', 'text-align': 'center'}}>User Accounts</h1>
        <ManageUsers state={this.props.emails} />
      </div>
    );
  }

  render() {
    let callbacks = {};
    let mainComponent = {
      alerts: this.flaggedEmailsViewRender(),
      customize: this.customizeFiltersViewRender(),
      dashboard: this.dashboardViewRender(),
      manageUser: this.manageUserRender(),
    };

    // this.props.dispatch(applicationLoaded())
    if (!this.props.userSession.authenticated) {
      console.log('this is state,', this.props);
      return (
        <div>
          <Login callbacks={ this.callbacks }/>
        </div>
        );
    } else {
      return (
        <div>
          <Header />
          { mainComponent[this.props.navigation.currentPage] }
          <SideNav callbacks={ this.callbacks } userSession={ this.props.userSession }/>
          <Footer />
          <ScriptLoader />
          <div
            state={ this.props.state }
            callbacks={ callbacks }
          />
        </div>
      );
    }

  }
}

export default connect(mapStateToProps)(MainView);
