import React       from 'react';
import { connect } from 'react-redux';
import FlaggedEmailList from 'components/FlaggedEmailList';

// We define mapStateToProps where we'd normally use the @connect
// decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  state : state
});
export class DashboardView extends React.Component {
  static propTypes = {
    dispatch : React.PropTypes.func,
    state  : React.PropTypes.object,
  }

  constructor () {
    super();
    this.tempState =
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
                    type: 'flagTypeString',
                    context: 'contextString',
                  },
                  {
                    type: 'flagTypeString',
                    context: 'contextString',
                  },
                ],
            }
          ]
      }
  }

  // normally you'd import an action creator, but I don't want to create
  // a file that you're just going to delete anyways!
  _increment () {
    this.props.dispatch({ type : 'COUNTER_INCREMENT' });
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Dage Dashboard</h1>
        <FlaggedEmailList state={ this.tempState }>

        </FlaggedEmailList>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DashboardView);
