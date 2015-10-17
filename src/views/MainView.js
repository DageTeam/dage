import React       from 'react';
import { connect } from 'react-redux';
import FlaggedEmailList from 'components/FlaggedEmailList';
import Header from 'components/Header';
import SideNav from 'components/SideNav';
import Footer from 'components/Footer';
import ScriptLoader from 'components/ScriptLoader';
import FilterList from 'components/FilterList';
import FlagList from 'components/FlagList';
import AllEmailsList from 'components/AllEmailsList';
import MLEmailsList from 'components/MLEmailsList';
import ManageUsers from 'components/ManageUsers';
import Dashboard from 'components/Dashboard';
import Login from 'components/Login';

import {
  emailArrayFetch,

  // emailArrayFetchSuccess,
  // emailArrayFetchError,
  allEmailArrayFetch,

  // allEmailArrayFetchSuccess,
  // allEmailArrayFetchError,
  MLEmailArrayFetch,

  // MLEmailArrayFetchSuccess,
  // MLEmailArrayFetchError,
  clearAllEmailCache,
  emailShowOneFlag,
  emailShowAllFlags,
  emailShowComplete,
  allEmailsShowOneFlag,
  allEmailsShowAllFlags,
  allEmailsShowComplete,
  unflagEmail,
  emailMarkRead,
} from 'actions/emails';

import {
  filterArrayFetch,
  filterTypeSelect,
  filterTypeAdd,
  filterAddFlagKeyword,
  filterRemoveFlagKeyword,
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
} from 'actions/userSession';

import {
  userAdd,
  userToggleActive,
  userPasswordReset,
  userArrayRequest,
  addUserToState
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
  manageUsers: state.manageUsers,
  state: state,
});
export class MainView extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    emails: React.PropTypes.object,
    filters: React.PropTypes.object,
    userSession: React.PropTypes.object,
    manageUsers: React.PropTypes.object,
  }

  constructor(props) {
    super();
    props.dispatch(applicationLoaded());
    this.callbacks = {
      _navigationRouteSelect: route => {
        this.props.dispatch(navigationRouteSelect(route));
      },

      _emailArrayFetch: param => {
        this.props.dispatch(emailArrayFetch(param));
      },

      _userArrayFetch: param => {
        this.props.dispatch(userArrayFetch(param));
      },

      _allEmailArrayFetch: () => {
        this.props.dispatch(allEmailArrayFetch());
      },

      _clearAllEmailCache: () => {
        this.props.dispatch(clearAllEmailCache());
      },

      _emailShowOneFlag: emailId => {
        this.props.dispatch(emailShowOneFlag(emailId));
      },

      _emailShowAllFlags: emailId => {
        this.props.dispatch(emailShowAllFlags(emailId));
      },

      _emailShowComplete: emailId => {
        this.props.dispatch(emailShowComplete(emailId));
      },

      _allEmailsShowOneFlag: emailId => {
        this.props.dispatch(allEmailsShowOneFlag(emailId));
      },

      _allEmailsShowAllFlags: emailId => {
        this.props.dispatch(allEmailsShowAllFlags(emailId));
      },

      _allEmailsShowComplete: emailId => {
        this.props.dispatch(allEmailsShowComplete(emailId));
      },

      _unflagEmail: emailId => {
        this.props.dispatch(unflagEmail(emailId));
      },

      _emailMarkRead: emailId => {
        this.props.dispatch(emailMarkRead(emailId));
      },

      _filterArrayFetch: () => {
        this.props.dispatch(filterArrayFetch());
      },

      _filterTypeSelect: filterId => {
        this.props.dispatch(filterTypeSelect(filterId));
      },

      _filterTypeAdd: (filterId, username) => {
        this.props.dispatch(filterTypeAdd(filterId, username));
      },

      _filterAddFlagKeyword: (keyword) => {
        this.props.dispatch(filterAddFlagKeyword(this.props.state.userSession.username, this.props.state.filters.filterTypeSelected, keyword));
      },

      _filterRemoveFlagKeyword: (keyword) => {
        this.props.dispatch(filterRemoveFlagKeyword(this.props.state.userSession.username, this.props.state.filters.filterTypeSelected, keyword));
      },

      _flagHighlightRender: (inputText, keywordArray) => {
        // function flatMap(array, fn) {
        //   var result = [];
        //   for (var i = 0; i < array.length; i++) {
        //     var mapping = fn(array[i]);
        //     result = result.concat(mapping);
        //   }

        //   return result;
        // }

        // var flagRE = new RegExp(keyword, 'g', 'i');
        // var result = flatMap(inputText.split(flagRE), function(part) {
        //   return [part, <span style={{color: '#ea6314', fontWeight:'bold'}}>{keyword}</span>];
        // });

        var result = [inputText];
        for (var i = 0; i < keywordArray.length; i++) {
          var flaggedWord = keywordArray[i];
          var flaggedRE = new RegExp(flaggedWord, 'g', 'i');
          for (var j = 0; j < result.length; j++) {
            if (typeof result[j] === 'string') {
              var tempArray = result[j].split(flaggedRE);
              result.splice(j, 1);
              var tempArray2 = [];
              for (var l = 0; l < tempArray.length; l++) {
                tempArray2.push(tempArray[l], <span style={{color: '#ea6314', fontWeight:'bold'}}>{flaggedWord}</span>);
              }

              tempArray2.pop();
              for (var k = 0; k < tempArray2.length; k++) {
                result.splice(j, 0, tempArray2[k]);
                j++;
              }
            }
          }
        }

        return result;

      },

      _submitLogin: data => {
        this.props.dispatch(submitLogin(data));
      },

      _deleteToken: () => {
        this.props.dispatch(deleteToken());
      },

      _userPasswordReset: username => {
        this.props.dispatch(userPasswordReset(username));
      },
      _addUserToState: data => {
        this.props.dispatch(addUserToState(data));
      },
      _userToggleActive: (username, active) => {
        this.props.dispatch(userToggleActive(username, active));
      },
      _userAdd: data => {
        this.props.dispatch(userAdd(data));
      },
      _userArrayRequest: () => {
        this.props.dispatch(userArrayRequest());
      },

    };
  }

  componentDidMount() {
    this.props.dispatch(userArrayRequest());
    this.props.dispatch(emailArrayFetch());
    this.props.dispatch(MLEmailArrayFetch());
    this.props.dispatch(filterArrayFetch());
    this.props.dispatch(navigationRouteSelect('dashboard'));
  }

  componentWillMount() {
    console.log('THIS IS CURRENT PAGE', this.props.navigation.currentPage);
    if (this.props.navigation.currentPage === 'allEmails') {
      console.log('allEmails');
    }
  }

  // normally you'd import an action creator, but I don't want to create
  // a file that you're just going to delete anyways!

  flaggedEmailsViewRender() {
    if (this.props.emails.isFetchingEmail && this.props.emails.emailsArray.length === 0) {
      this.loadingViewRender();
    } else {
      return (
        <div>
          <h1 style={{paddingTop:'60px', textAlign:'center'}}>You Have {this.props.emails.emailsArray.length} New Alerts</h1>
          <FlaggedEmailList
            state={ this.props.emails }
            callbacks={ this.callbacks }
            userSession={ this.props.userSession }
          />
        </div>
      );
    }
  }

  allEmailsViewRender() {
    if (this.props.emails.isFetchingAllEmails) {
      this.loadingViewRender();
    } else {

      return (
        <div>
          <h1 style={{paddingTop:'60px', textAlign:'center'}}>All emails</h1>
          <AllEmailsList
            emails={ this.props.emails }
            callbacks={ this.callbacks }
            userSession={ this.props.userSession }
          />
        </div>

      );
    }
  }

  MLEmailsViewRender() {
    if (this.props.emails.isFetchingMLEmails) {
      this.loadingViewRender();
    } else {

      return (
        <div>
          <h1 style={{paddingTop:'60px', textAlign:'center'}}>DägeWatch: Machine Learning-flagged emails</h1>
          <MLEmailsList
            emails={ this.props.emails }
            callbacks={ this.callbacks }
            userSession={ this.props.userSession }
          />
        </div>

      );
    }
  }

  customizeFiltersViewRender() {
    if (this.props.state.filters.isFetchingFilters || this.props.state.filters.isPostingFlag) {
      return (
        <div className='container text-center'>
          <h1 style={{paddingTop:'60px', textAlign:'center'}}>Dage Customize Filters</h1>
          <FilterList
            options={ this.props.filters }
            user={this.props.userSession.username}
            callbacks={ this.callbacks }
            filters={this.props.state.filters} />
          <FlagList
            options={ this.props.filters.flagOptionsCurrent }
            callbacks={ this.callbacks }
            allowCreate
            filters={this.props.state.filters} />
          <img src='http://i1109.photobucket.com/albums/h427/SnowflakeGD/infinite-1.gif' style={{position:'absolute', top:'40%', left:'37%', 'z-index':'1'}} />
        </div>
      );
    }else {
      return (
        <div className='container text-center'>
                  <h1 style={{paddingTop:'60px', textAlign:'center'}}>Dage Customize Filters</h1>
                  <FilterList
            options={ this.props.filters }
            userSession={this.props.userSession}
            callbacks={ this.callbacks } />
                  <FlagList
            options={ this.props.filters.flagOptionsCurrent }
            callbacks={ this.callbacks }
            allowCreate
            filters={this.props.state.filters} />
              </div>
      );
    }
  }

  dashboardViewRender() {
    return (
      <Dashboard emails={this.props.emails}
                 callbacks = {this.callbacks} />
    );
  }

  loadingViewRender() {
    if (this.props.userSession) {
      return (
        <div style={{position:'absolute', top:'40%', left:'37%', 'z-index':'1'}}>loading...
          <img src='http://i1109.photobucket.com/albums/h427/SnowflakeGD/infinite-1.gif' style={{position:'absolute', top:'40%', left:'37%', 'z-index':'1'}} />
        </div>);
    }
  }

  manageUserRender() {
    return (
      <div>
        <h1 style={{paddingTop: '60px', textAlign: 'center'}}>User Accounts</h1>
        <ManageUsers userInfo={this.props.manageUsers.userState} callbacks={this.callbacks } userArray={this.props.manageUsers.userArray} />
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
      loading: this.loadingViewRender(),
      allEmails: this.allEmailsViewRender(),
      MLEmails: this.MLEmailsViewRender(),
    };

    // this.props.dispatch(applicationLoaded())
    if (!this.props.userSession.authenticated) {
      if (this.props.emails.isFetchingEmail) {
        console.log('loading');
        return this.loadingViewRender();
      } else {
        console.log('login');
        return (
          <div>
          <Header />
            <div style={{marginTop:'20%', marginLeft:'30%'}}>
              <Login callbacks={ this.callbacks }/>
              <Footer />
              <ScriptLoader />
            </div>
          </div>
          );
      };
    } else {
      return (
        <div>
          <Header callbacks={ this.callbacks }/>
          { mainComponent[this.props.navigation.currentPage] }
          <SideNav callbacks={ this.callbacks } userSession={ this.props.userSession } numEmails= {this.props.emails.emailsArray.length}/>
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
