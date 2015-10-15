var React = require('react');
var ReactDOM = require('react-dom')
var BarChart = require("react-chartjs").Bar;
var DoughnutChart = require('react-chartjs').Doughnut


var Dashboard = React.createClass({

  navigateAlert: function(){
    this.props.callbacks._navigationRouteSelect('alerts');
  },

  render: function(){
    var emailNum = this.props.emails.emailsArray.length;
    var barData = {
      labels: ["January", "February", "March", "April", "May", "June", "July",'August','September','October','November','December'],
      datasets: [
        {
            label: "My First dataset",
            fillColor: "#F5EBFF",
            strokeColor: "#6B24B2",
            highlightFill: "#EBD6FF",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40, 50, 34, 60, 80, 90]
        }
      ]
    };

    var barOptions = {
        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero : true,
        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,
        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",
        //Number - Width of the grid lines
        scaleGridLineWidth : 2,
        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: false,
        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
        //Boolean - If there is a stroke on each bar
        barShowStroke : true,
        //Number - Pixel width of the bar stroke
        barStrokeWidth : 2
        };

    var doughnutData =[
          {
              value: 300,
              color:"#F7464A",
              highlight: "#FF5A5E",
              label: "Red"
          },
          {
              value: 50,
              color: "#46BFBD",
              highlight: "#5AD3D1",
              label: "Green"
          },
          {
              value: 100,
              color: "#FDB45C",
              highlight: "#FFC870",
              label: "Yellow"
          }
      ];

    var doughnutOptions = {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke : true,

      //String - The colour of each segment stroke
      segmentStrokeColor : "#fff",

      //Number - The width of each segment stroke
      segmentStrokeWidth : 2,

      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout : 70, // This is 0 for Pie charts

      //Number - Amount of animation steps
      animationSteps : 100,

      //String - Animation easing effect
      animationEasing : "easeOutBounce",

      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate : true,

      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale : true,
    };

    return(
      <div>
        <div style={{'marginTop':'8%','marginLeft':'15%', 'width':'75%'}}>
          <h2>You Have <a onClick = {this.navigateAlert} className='alertNum'>{emailNum}</a> New Alerts Right Now</h2>
          <h3 style={{'marginBottom':'2%','textAlign':'left'}}>Flagged Emails by month</h3>
          <BarChart data={barData} options={barOptions} width={'1000px'} height={'200px'} redraw={true} style={{'marginLeft':'2%'}}/>
          <div style={{'marginTop': '3%', 'marginLeft':'7%', float:'left'}}>
          <h3>Flags by Filters (this week)</h3>
          <DoughnutChart data={doughnutData} options ={doughnutOptions} width={'150px'} height = {'150px'} redraw = {true} style={{'marginLeft':'20px'}}/>
          </div>
          <div style={{'marginTop': '3%', 'marginLeft':'5%', float:'left'}}>
          <h3>Flags by Filters (this month)</h3>
          <DoughnutChart data={doughnutData} options ={doughnutOptions} width={'150px'} height = {'150px'} redraw = {true} style={{'marginLeft':'20px'}}/>
          </div>
          <div style={{'marginTop': '3%', 'marginLeft':'5%', float:'left'}}>
          <h3>Flags by Filters (this year)</h3>
          <DoughnutChart data={doughnutData} options ={doughnutOptions} width={'150px'} height = {'150px'} redraw = {true} style={{'marginLeft':'20px'}}/>
          </div>
        </div>
      </div>
      
    )
  }
});

module.exports = Dashboard;
