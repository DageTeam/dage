import React       from 'react';
import { connect } from 'react-redux';
import FlaggedEmailList from 'components/FlaggedEmailList';
import {
  emailArrayFetch,
  emailArrayFetchSuccess,
  emailArrayFetchError,
  emailShowOneFlag,
  emailShowAllFlags,
  emailShowComplete,
} from 'actions/emails';

// We define mapStateToProps where we'd normally use the @connect
// decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  emails : state.emails,
});
export class DashboardView extends React.Component {
  static propTypes = {
    dispatch : React.PropTypes.func,
    emails : React.PropTypes.object,
  }

  constructor () {
    super();
    this.tempEmails =
    {
      emailsArray:
      [
        {
          id: 'emailId',
          sender: 'emailSender',
          recipient: 'emailRecipient',
          subject: 'subjectString',
          body: 'bodyString',
          sendTime: 1000,
          focusLevel: '',
          flags :
          [
            {
              type: 'flagTypeString1',
              context: 'contextString1',
            },
            {
              type: 'flagTypeString2',
              context: 'contextString2',
            },
          ],
        }
      ]
    };
  }

  // normally you'd import an action creator, but I don't want to create
  // a file that you're just going to delete anyways!
  _increment () {
    this.props.dispatch({ type : 'COUNTER_INCREMENT' });
  }

  componentDidMount () {
    this.props.dispatch(emailArrayFetch())
  }

  fetch () {
    this.props.dispatch(emailArrayFetch())
  }

  render () {
    let callbacks = {
      _emailArrayFetch : param => {
        this.props.dispatch(emailArrayFetch(param))
      },
      _emailArrayFetchSuccess : param => {
        this.props.dispatch(emailArrayFetchSuccess(param))
      },
      _emailArrayFetchError : param => {
        this.props.dispatch(emailArrayFetchError(param))
      },
      _emailShowOneFlag : emailId => {
        this.props.dispatch(emailShowOneFlag(emailId));
      },
      _emailShowAllFlags : emailId => {
        this.props.dispatch(emailShowAllFlags(emailId));
      },
      _emailShowComplete : emailId => {
        this.props.dispatch(emailShowComplete(emailId));
      },
    }
    return (
      <div className='container text-center'>
        <h1 onClick={ this.fetch.bind(this) }>Dage Dashboard</h1>
        <FlaggedEmailList
          state={ this.props.emails }
          callbacks={ callbacks }
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(DashboardView);
