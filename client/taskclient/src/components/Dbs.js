import React from 'react'; 
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'; 
import Events from './staff/Events.js'
import Joins from './staff/Joins.js'
import Addgroups from './staff/Addgroups.js'
import '../home.css';
import Button from "react-bootstrap/Button";

export default class Dbs extends React.Component
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
            <h1>Teacher dashboard</h1> 
            <h4>
                <table class="tablecenter">
                    <tbody>
                    <tr>
                        <td>Name </td><td>: <span style={{color: "red"}}>{window.glvarname.sname}</span> </td>
                    </tr>
                    <tr>
                        <td>Id </td><td>: <span style={{color: "red"}}>{window.glvarname.sid}</span> </td>
                    </tr>
                    </tbody>
                </table>
            </h4>
            <div className="center3"><Button className="buttonright" onClick={this.logout}>Logout</Button></div> <br />
            <div class="linkcenter">
                <Link to="/Dbs">Events</Link> &nbsp;
                <Link to="/Joins">Add Events</Link>&nbsp;
                <Link to="/Addgroups">Join Groups</Link>
            </div>
            <Switch>
              <Route exact path='/Dbs' component={Events}></Route> 
              <Route exact path='/Joins' component={Joins}></Route>
              <Route exact path='/Addgroups'component={Addgroups}></Route> 
            </Switch> 
            <br />
        </div>
        </Router>
        );
    }
}