import React from 'react'; 
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../home.css';


export default class Home extends React.Component
{
    constructor() {
        super();
        this.state = {
            current:"login",
            error:"error"
        };
        this.loginclicked=this.loginclicked.bind(this);
        this.signclicked=this.signclicked.bind(this);
    }
    loginclicked=function ()
    {
        this.setState({current:"login"});
    }
    signclicked=function()
    {
        this.setState({current:"sign"});
    }
        render() {
            return (
                <div className="container1">
                    <h1>Student Task Manager</h1>
                    <div className="centeralign" class="center">
                        {/* <Button onClick={this.loginclicked}>login</Button> */}
                        {/* <Button onClick={this.signclicked}>signup</Button> */}
                        <h4 className="login">LOGIN</h4>
                        <div><Login/></div>
                    </div>
                </div>
            );
        }
}

class Login extends React.Component
{
    constructor()
    {
        super();
        this.state={
            type:"student",
            id:"",
            password:"",
            error:"",
            response:"",
            redirect:""
        }
        this.submitform=this.submitform.bind(this);
        this.handle=this.handle.bind(this);
        this.handle1=this.handle1.bind(this);
        this.handle2=this.handle2.bind(this);
    }
    submitform=function()
    {
        if(this.state.type==="student")
        {
            axios.get(`http://localhost:5000/loginst?id=${this.state.id}&password=${this.state.password}`)
            .then(res=>{
                this.setState({response:res.data})
                console.log(this.state.response); 
                if(this.state.response.length>=1)
                {
                    window.glvarname=this.state.response[0];
                    this.setState({error:"correct",redirect:"YES"});
                }
                else
                {
                    this.setState({error:"Username or password incorrect",redirect:"NO"});
                }
            });
        }
        else if(this.state.type==="teacher")
        {
            axios.get(`http://localhost:5000/logins?id=${this.state.id}&password=${this.state.password}`)
            .then(res=>{
                this.setState({response:res.data});
                console.log(this.state.response);
                if(this.state.response.length===0)
                {
                    this.setState({error:"Username or password incorrect"});
                    console.log("error");
                }
                else
                {
                    window.glvarname=this.state.response[0];
                    this.setState({error:"correct",redirect:"YES1"})
                }
            });   
        }
    }    
    handle=function(e)
    {
        this.setState({id:e.target.value});
    }    
    handle1=function(e)
    {
        this.setState({password:e.target.value});
    }    
    handle2=function(e)
    {
        this.setState({type:e.target.value});
    }    
    render()
    {
        if(this.state.redirect==="YES1"&&window.glvarname.sid==="admin")
        {
            return <Redirect to='/Admin'/>
        }
        else if (this.state.redirect==="YES") 
        {
            return <Redirect to='/Dbst' />
        }
        else if(this.state.redirect==="YES1")
        {
            return <Redirect to='/Dbs' />
        }
        return(<div>
             <Form.Group>
                <Form.Label>Select</Form.Label>
                <Form.Control as="select" name="designation" id="type" onChange={this.handle2}>
                    <option value="student">Student</option>
                    <option value="teacher">Staff</option>
                </Form.Control><br />
             </Form.Group>
            <Form.Group>
                <Form.Label>User id</Form.Label>
                <Form.Control type="text"  onChange={this.handle}/><br />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={this.handle1}/><br />
            </Form.Group>
            <Button onClick={this.submitform}>Submit</Button>
            <div style={{color: "red"}}> {this.state.error}</div>
        </div>)
    }
}