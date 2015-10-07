var React = require('react')

var Login = React.createClass({
  
  render: function() {
    return (
        <form name="loginform" action="" method="post" role="form" _lpchecked="1">
            <div id="checkforcookies"></div>
            <div className="panel panel-default signup">
              <div className="modal__inner">
                 
                  
                  
                    <ul className="form-fields">
                        <li>
                            <input className="input--text" type="email" name="username" id="email" placeholder="Email" required="" 
                            style={{cursor: 'auto', 'background-image': 
                            'url(data:image/pngbase64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QsPDhss3LcOZQAAAU5JREFUOMvdkzFLA0EQhd/bO7iIYmklaCUopLAQA6KNaawt9BeIgnUwLHPJRchfEBR7CyGWgiDY2SlIQBT/gDaCoGDudiy8SLwkBiwz1c7y+GZ25i0wnFEqlSZFZKGdi8iiiOR7aU32QkR2c7ncPcljAARAkgckb8IwrGf1fg/oJ8lRAHkR2VDVmOQ8AKjqY1bMHgCGYXhFchnAg6omJGcBXEZRtNoXYK2dMsaMt1qtD9/3p40x5yS9tHICYF1Vn0mOxXH8Uq/Xb389wff9PQDbQRB0t/QNOiPZ1h4B2MoO0fxnYz8dOOcOVbWhqq8kJzzPa3RAXZIkawCenHMjJN/+GiIqlcoFgKKq3pEMAMwAuCa5VK1W3SAfbAIopum+cy5KzwXn3M5AI6XVYlVt1mq1U8/zTlS1CeC9j2+6o1wuz1lrVzpWXLDWTg3pz/0CQnd2Jos49xUAAAAASUVORK5CYII=)' 
                            ,'background-attachment': 'scroll', 'background-position': '100% 50%', 'background-repeat': 'no-repeat'}} />
                        </li>
                        <li>
                            <input className="input--text" type="password" name="password" id="password" placeholder="Password" autocomplete="off" style={{cursor: 'auto', 'background-image': 'url(data:image/pngbase64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QsPDhss3LcOZQAAAU5JREFUOMvdkzFLA0EQhd/bO7iIYmklaCUopLAQA6KNaawt9BeIgnUwLHPJRchfEBR7CyGWgiDY2SlIQBT/gDaCoGDudiy8SLwkBiwz1c7y+GZ25i0wnFEqlSZFZKGdi8iiiOR7aU32QkR2c7ncPcljAARAkgckb8IwrGf1fg/oJ8lRAHkR2VDVmOQ8AKjqY1bMHgCGYXhFchnAg6omJGcBXEZRtNoXYK2dMsaMt1qtD9/3p40x5yS9tHICYF1Vn0mOxXH8Uq/Xb389wff9PQDbQRB0t/QNOiPZ1h4B2MoO0fxnYz8dOOcOVbWhqq8kJzzPa3RAXZIkawCenHMjJN/+GiIqlcoFgKKq3pEMAMwAuCa5VK1W3SAfbAIopum+cy5KzwXn3M5AI6XVYlVt1mq1U8/zTlS1CeC9j2+6o1wuz1lrVzpWXLDWTg3pz/0CQnd2Jos49xUAAAAASUVORK5CYII=)', 'background-attachment': scroll, 'background-position': '100% 50%', 'background-repeat': 'no-repeat'}} />
                        </li>
                        <li>
                            <div id="factorAuthWidget" style={{display: 'none'}}>
                                <input type="text" name="authenticationSecurityCode" className="input--text" placeholder="Security Code" />
                            </div>
                        </li>
                        <li>
                            <button className="btn btn-primary btn-block" type="submit" name="submit">Log In</button>
                        </li>
                        <li className="noFactorAuthWidget">
                            <small className="signup__forgotpw text-center block"><a href="#" className="forgotPassword">Forgot your password?</a></small>
                        </li>
                        <li className="factorAuthWidget" style={{display: 'none'}}>
                            <small className="signup__forgotpw"><a id="lockedOut" href="#" data-toggle="modal" data-target="#lockedOutModal">Need a security code?</a></small>
                            <small className="signup__forgotpw pull-right"><a href="#" className="forgotPassword">Forgot your password?</a></small>
                        </li>
                    </ul>
                    <p className="orgMessage" style={{display:'none', color: 'red'}}>There is more than one organization with your user name and password. Please select the Organization to login: </p>
                    <p className="orgList"></p>
                    
                    <div id="authenticationMessage">   </div>
                    <h5><a id="setupFactorAuth" style={{display: 'none'}} href="#" onclick="startFactorAuth('fromLogin')">Setup Two Factor Authentication</a></h5>
                    <div className="signup__footer text-center">
                        <strong>Dont have a Dage account? <a href="WAITING_ON_ANTHONY">Sign Up here</a>.</strong>
                    </div>
                </div> 
            </div>
            <input type="hidden" name="returnurl" value="/login/loginredirect.jsp" />
            <input type="hidden" name="orgname" />
        </form>
      )
  }
})

module.exports = Login;
