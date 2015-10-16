var React = require('react');
var ReactDOM = require('react-dom')
var BarChart = require("react-chartjs").Bar;
var DoughnutChart = require('react-chartjs').Doughnut
var FixedDataTable = require('fixed-data-table'); 

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;


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

    var rows = [
      ['sara.shackleton@enron.com',525],
      ['richard.b.sanders@enron.com' ,494],
      ['tana.jones@enron.com',  225],
      ['steven.j.kean@enron.com', 225],
      ['susan.mara@enron.com',  135],
      ['susan.scott@enron.com', 118],
      ['richard.shapiro@enron.com', 98],      
      ['webmaster@cera.com',  89],
      ['taylor@enron.com',  73],
      ['showard@agsk.com' , 57],
      ['showard@milbank.com', 52],
      ['sarah.novosel@enron.com', 47],
      ['sally.beck@enron.com' , 47],
      ['technology.enron@enron.com' , 45],
      ['rosalee.fleming@enron.com' ,42],
      ['rod.hayslett@enron.com'  ,41],    
      ['raislerk@sullcrom.com' ,38],
      ['sheila.glover@enron.com' ,37],
      ['tori.kuykendall@enron.com' ,31],
      ['scott.neal@enron.com' , 31],
      ['smarra@isda.org', 30],
      ['shelley.corman@enron.com' , 30],
      ['ray.alvarez@enron.com' ,30],
      ['rcarroll@bracepatt.com' , 29],
      ['stephanie.sever@enron.com' ,27],
      ['rick.buy@enron.com ', 27],
      ['venturewire@venturewire.com' ,26],
      ['sarah.palmer@enron.com', 26],
      ['seabron.adamson@frontier-economics.com',  25],
      ['trnews@tr.com', 23],
      ['t..hodge@enron.com',  23],
      ['schwabalerts.marketupdates@schwab.com', 23],
      ['tim.belden@enron.com ', 22],
      ['sladana-anna.kulic@enron.com',  22],
      ['w..cantrell@enron.com ',21],
      ['travis.mccullough@enron.com', 21],
      ['steve.c.hall@enron.com'  ,21],
      ['stacey.w.white@enron.com' , 21],
      ['robin.rodrigue@enron.com'  ,21],
      ['stephanie.panus@enron.com' ,20],
      ['stanley.horton@enron.com' , 20],
      ['sheri.a.righi@accenture.com', 20],
      ['vkaminski@aol.com' ,19],
      ['spatti@ensr.com' ,19],
      ['ruth.concannon@enron.com',  19],
      ['rob.walls@enron.com' ,19],
      ['wsmith@wordsmith.org',  18],
      ['teresa.bushman@enron.com',  18],
      ['stephanie.miller@enron.com',  18],
      ['sharonda.stephens@enron.com', 17],
      ['rob.gay@enron.com' ,17]
    ];

    var rowGetter = function (rowIndex) {
      return rows[rowIndex];
    };

    var doughnutDataEthics =[
          {
              value: 64,
              color:"#4169E1",
              highlight: "#4169E1",
              label: "unethical"
          },
          {
              value: 14683,
              color: "#7A67EE",
              highlight: "#7A67EE",
              label: "confidential"
          },
          {
              value: 11300,
              color: "#9400D3",
              highlight: "#9400D3",
              label: "delete"
          },          
          {
              value: 2324,
              color: "#8968CD",
              highlight: "#8968CD",
              label: "secret"
          },
          {
              value: 2077,
              color: "#7A378B",
              highlight: "#7A378B",
              label: "eliminate"
          },
          {
              value: 1453,
              color: "#68228B",
              highlight: "#68228B",
              label: "hide"
          },
          {
              value: 1453,
              color: "#0000EE",
              highlight: "#0000EE",
              label: "hide"
          },
          {
              value: 1195,
              color: "#7B68EE",
              highlight: "#7B68EE",
              label: "sensitive"
          },
          {
              value: 667,
              color: "#46BFBD",
              highlight: "#5AD3D1",
              label: "illegal"
          },
          {
              value: 0,
              color:"#F7464A",
              highlight: "#FF5A5E",
              label: "noncompliant"
          },
          {
              value: 636,
              color: "#7D26CD",
              highlight: "#7D26CD",
              label: "unlawful"
          },
          {
              value: 659,
              color: "#FDB45C",
              highlight: "#FFC870",
              label: "manipulation"
          },
          {
              value: 266,
              color: "#8A2BE2",
              highlight: "#8A2BE2",
              label: "scandal"
          },          
          {
              value: 201,
              color: "#46BFBD",
              highlight: "#5AD3D1",
              label: "get rid of"
          },
          {
              value: 166,
              color: "#F8F8FF",
              highlight: "#F8F8FF",
              label: "shred"
          }

      ];

      var doughnutDataCompetitors =[
          {
              value: 64,
              color:"#097054",
              highlight: "#FF5A5E",
              label: "Dynergy"
          },
          {
              value: 1453,
              color: "#FFDE00",
              highlight: "#FFDE00",
              label: "Reliant Energy"
          },
          {
              value: 667,
              color: "#FF9900",
              highlight: "#FF9900",
              label: "Williams"
          },
          {
              value: 166,
              color: "#6599FF",
              highlight: "#6599FF",
              label: "El Paso"
          }
      ];

      var doughnutDataFilters = [
        {
              value: 1195,
              color: "#46BFBD",
              highlight: "#5AD3D1",
              label: "ethics"
          },
          {
              value: 1683,
              color: "#B0171F",
              highlight: "#5AD3D1",
              label: "competitors"
          },          
          {
              value: 2324,
              color: "#FFAEB9",
              highlight: "#FFAEB9",
              label: "general inappropriate"
          },
          {
              value: 3520,
              color:"#8B5F65",
              highlight: "#8B5F65",
              label: "sexual harrassment"
          },
          {
              value: 3636,
              color: "#FFF0F5",
              highlight: "#FFF0F5",
              label: "racism"
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
          <div style={{'marginTop':'8%','marginLeft':'5%', 'width':'65%', 'float':'left'}}>
          <h2>You Have <a onClick = {this.navigateAlert} className='alertNum'>{emailNum}</a> New Alerts Right Now</h2>
          <div style={{'marginTop': '3%', 'marginLeft':'7%', float:'left'}}>
            <h3 style={{'marginBottom':'2%','textAlign':'left'}}>Flagged Emails by month</h3>
            <BarChart data={barData} options={barOptions} width={'920px'} height={'200px'} redraw={true} style={{'marginLeft':'2%'}}/>
          </div>
          <div style={{'marginTop': '3%', 'marginLeft':'7%', float:'left'}}>
            <h3>Ethics Filter (by keywords)</h3>
            <DoughnutChart data={doughnutDataEthics} options ={doughnutOptions} width={'200px'} height = {'200px'} redraw = {true} style={{'marginLeft':'20px','paddingTop':'20px'}}/>
          </div>
          <div style={{'marginTop': '3%', 'marginLeft':'5%', float:'left'}}>
            <h3>Competitors Filter (by keywords)</h3>
            <DoughnutChart data={doughnutDataCompetitors} options ={doughnutOptions} width={'200px'} height = {'200px'} redraw = {true} style={{'marginLeft':'20px','paddingTop':'20px'}}/>
          </div>
          <div style={{'marginTop': '3%', 'marginLeft':'5%', float:'left'}}>
            <h3>Flags by Filters (this year)</h3>
            <DoughnutChart data={doughnutDataEthics} options ={doughnutOptions} width={'200px'} height = {'200px'} redraw = {true} style={{'marginLeft':'20px','paddingTop':'20px'}}/>
          </div>
        </div>
           <div style={{'marginTop':'8%','marginRight':'2%', float:'right'}}>
                <h3>Most flagged users</h3>
                <Table
                  rowHeight={50}
                  rowGetter={rowGetter}
                  rowsCount={rows.length}
                  width={300}
                  height={650}
                  headerHeight={30}>
                  <Column
                    label="user email"
                    width={240}
                    dataKey={0}
                  />
                  <Column
                    label="# flagged"
                    width={60}
                    dataKey={1}
                  />
                </Table>
          </div>
      </div>
      
    )
  }
});

module.exports = Dashboard;
