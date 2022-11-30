import React from 'react'; 
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'; 
import Eventst from './student/Eventst.js'
import Joinst from './student/Joinst.js'
import Button from "react-bootstrap/Button";

export default class Dbst extends React.Component
{
    constructor()
    {
        super();
        this.state={
            redirect:"NO"
        }
        this.logout=this.logout.bind(this);
    }
    logout=function()
    {
        this.setState({redirect:"YES"});
    }
    render()
    {
        if (this.state.redirect==="YES") 
        {
            return <Redirect to='/' />
        }
        return(
        <Router>
        <div>
            <h1>Student dashboard</h1> 
            <h4>
                <table class="tablecenter">
                    <tbody>
                        <tr>
                            <td>Name </td><td>: <span style={{color: "red"}}>{window.glvarname.stname}</span></td>
                        </tr>
                        <tr>
                            <td>Id </td><td>: <span style={{color: "red"}}>{window.glvarname.stid}</span></td>
                        </tr>
                    </tbody>
                </table>
            </h4>
            <div className="center3"><Button className="buttonright" onClick={this.logout}>Logout</Button></div> <br />
            <div class="linkcenter">
                <Link to="/Dbst">Events</Link> &nbsp;
                <Link to="/Joinst">Join groups</Link> 
            </div>
            <Switch> 
              <Route exact path='/Dbst' component={Eventst}></Route> 
              <Route exact path='/Joinst' component={Joinst}></Route> 
            </Switch> 
            <br />
        </div>
        </Router>
        );
    }
}