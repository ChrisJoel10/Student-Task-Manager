import React from 'react'; 
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'; 
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Admin extends React.Component
{
    constructor()
    {
        super();
        this.state = {
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
                    <h1>Administrator</h1>
                    <div className="center4"><Button className="buttonright" onClick={this.logout}>Logout</Button></div> <br /><br />
                    <div class="linkcenter">
                        <Link to="/Admin">User</Link> &nbsp;
                        <Link to="/Creategroup">Group</Link> 
                    </div>
                    <Switch> 
                        <Route exact path='/Admin' component={Createuser}></Route> 
                        <Route exact path='/Creategroup' component={Creategroup}></Route> 
                    </Switch> 
                    <br />
                </div>
            </Router>
        )
    }
}

class Createuser extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            type:"student",
            type1:"student",
            id:"",
            id1:"",
            name:"",
            password:"",
            error:"",
        }
        this.handle1=this.handle1.bind(this);
        this.handle2=this.handle2.bind(this);
        this.handle3=this.handle3.bind(this);
        this.handle4=this.handle4.bind(this);
        this.handle5=this.handle5.bind(this);
        this.handle6=this.handle6.bind(this);
        this.submitform=this.submitform.bind(this);
        this.submitform1=this.submitform1.bind(this);
    }
    handle1=function(e)
    {
        this.setState({type:e.target.value});
    }
    handle2=function(e)
    {
        this.setState({id:e.target.value});
    }
    handle3=function(e)
    {
        this.setState({name:e.target.value});
    }
    handle4=function(e)
    {
        this.setState({password:e.target.value});
    }
    handle5=function(e)
    {
        this.setState({id1:e.target.value});
    }
    handle6=function(e)
    {
        this.setState({type1:e.target.value});
    }
    submitform=function()
    {
        axios.post(`http://localhost:5000/admin`,{
            type:this.state.type,
            id:this.state.id,
            name:this.state.name,
            password:this.state.password,
            action:"user1"
        })
        .then(res=>{
            if(res.data.affectedRows===1)
            {
                this.setState({error:"User added"});
            }
            else if(res.data.affectedRows===0)
            {
                this.setState({error:"User already exists"})
            }
           console.log(res.data);
        });
    }
    submitform1=function()
    {
        axios.post(`http://localhost:5000/admin`,{
            id1:this.state.id1,
            type1:this.state.type1,
            action:"user2"
        })
        .then(res=>{
            if(res.data.affectedRows===1)
            {
                this.setState({error1:"User removed"});
            }
            else if(res.data.affectedRows===0)
            {
                this.setState({error1:"User doesn't exist"})
            }
           console.log(res.data);
        });
    }
    render()
    {
        return(
            <div>
                <div class="center">
                    <div className="login" style={{color: "red"}}>Add User</div>
                    <Form.Group>
                        <Form.Label>Select</Form.Label>
                        <Form.Control as="select" name="designation" id="type" onChange={this.handle1}>
                            <option value="student">Student</option>
                            <option value="staff">Staff</option>
                        </Form.Control><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>User id</Form.Label>
                        <Form.Control name="id" onChange={this.handle2} value={this.state.id} required/><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" onChange={this.handle3} value={this.state.name} required/><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" onChange={this.handle4} value={this.state.password} type="password" required/><br />
                    </Form.Group>
                    <Button onClick={this.submitform}>Submit</Button>
                    <div style={{color: "red"}}> {this.state.error}</div>
                </div>
                <br />
                <div class="center">
                    <div className="login" style={{color: "red"}}>Remove User</div>
                    <Form.Group>
                        <Form.Label>Select</Form.Label>
                        <Form.Control as="select" name="designation1" id="type" onChange={this.handle6}>
                            <option value="student">Student</option>
                            <option value="staff">Staff</option>
                        </Form.Control><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>User id</Form.Label>
                        <Form.Control name="id1" onChange={this.handle5} value={this.state.id1} required/><br />
                    </Form.Group>
                    <Button onClick={this.submitform1}>Submit</Button>
                    <div style={{color: "red"}}> {this.state.error1}</div>
                </div>
            </div>
        )
    }
}

class Creategroup extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            gid:"",
            gid1:"",
            gname:"",
            error:"",
            error1:""
        }
        this.handle1=this.handle1.bind(this);
        this.handle2=this.handle2.bind(this);
        this.handle3=this.handle3.bind(this);
        this.submitform=this.submitform.bind(this);
        this.submitform1=this.submitform1.bind(this);
    }
    handle1=function(e)
    {
        this.setState({gid:e.target.value});
    }
    handle2=function(e)
    {
        this.setState({gname:e.target.value});
    }
    handle3=function(e)
    {
        this.setState({gid1:e.target.value});
    }
    submitform=function()
    {
        axios.post(`http://localhost:5000/admin`,{
            gid:this.state.gid,
            gname:this.state.gname,
            action:"group1"
        })
        .then(res=>{
            if(res.data.affectedRows===1)
            {
                this.setState({error:"Group added"});
            }
            else if(res.data.affectedRows===0)
            {
                this.setState({error:"Group already exists"})
            }
            console.log(res.data);
        });
    }
    submitform1=function()
    {
        axios.post(`http://localhost:5000/admin`,{
            gid1:this.state.gid1,
            action:"group2"
        })
        .then(res=>{
            if(res.data.affectedRows===1)
            {
                this.setState({error1:"Group removed"});
            }
            else if(res.data.affectedRows===0)
            {
                this.setState({error1:"Group doesn't exist"})
            }
            console.log(res.data);
        });
    }
    render()
    {
        return(
            <div>
                <div class="center">
                    <div className="login" style={{color: "red"}}>Add Group</div>
                    <Form.Group>
                        <Form.Label>Group Id</Form.Label>
                        <Form.Control name="gid" onChange={this.handle1} value={this.state.gid} required/><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control name="gname" onChange={this.handle2} value={this.state.gname} required/><br />
                    </Form.Group>
                    <Button onClick={this.submitform}>Submit</Button>
                    <div style={{color: "red"}}> {this.state.error}</div>
                </div>
                <br />
                <div class="center">
                    <div className="login" style={{color: "red"}}>Remove Group</div>
                    <Form.Group>
                        <Form.Label>Group Id</Form.Label>
                        <Form.Control name="gid1" onChange={this.handle3} value={this.state.gid1} required/><br />
                    </Form.Group>
                    <Button onClick={this.submitform1}>Submit</Button>
                    <div style={{color: "red"}}> {this.state.error1}</div>
                </div>
            </div>
        )
    }
}