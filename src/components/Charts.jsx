var React = require('react');
var DoughnutChart = require('react-chartjs').Doughnut;
var LineChart = require('react-chartjs').Line;

var Charts = React.createClass({
    doughnutdata :[
        {
            value: 300,
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Suggested Filter"
        },
        {
            value: 50,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Anthony's Filter"
        },
        {
            value: 100,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "GT's Filter"
        }
    ],
    doughnutoptions : {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : true,

        //String - The colour of each segment stroke
        segmentStrokeColor : "#fff",

        //Number - The width of each segment stroke
        segmentStrokeWidth : 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout : 50, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps : 100,

        //String - Animation easing effect
        animationEasing : "easeOutBounce",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale : false,
        
        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

    },
    linedata: {
    labels: ['Feb 10',"Feb 9", "Feb 8", "Feb 7", "Feb 6", "Feb 5", "Feb 4", "Feb 3", 'Feb 2', 'Feb 1'],
    datasets: [
        {
            label: "Flagged Emails/day",
            fillColor: "rgb(220,220,220)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(60,30,40,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "rgba(70,30,40)",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [40,80,45,70,112,80,60,80,90,65]
        }
      ]
    },
    lineoptions:{

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: false,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: false,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    },
    render: function(){
      return (
       <div className='box'>
        <LineChart data ={this.linedata} options={this.lineoptions} style = {this.styles.line} />
        <DoughnutChart data = {this.doughnutdata} options={this.doughnutoptions} style = {this.styles.doughnut} />
       </div>
      )
    },
    styles:{
      box:{
        'top':'15%'
      },
      doughnut:{
        'top':'45%',
        'left':'30%',
        'height':'30%',
        'width':'60%',
      },
      line:{
        'height':'5%',
        'width':'40%',
        'left':'10%'
      }
    }
});

module.exports = Charts;