import React from 'react';
import axios from 'axios';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Redirect } from 'react-router-dom'; 

export default class Joins extends React.Component
{
    constructor()
    {
        super();
        this.state={
            data:[],
            edate:"",
            edit:"NO",
            edit1:""
        }
        var date = new Date();
        this.state.edate=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        this.removeclick=this.removeclick.bind(this);
        this.refreshafterclick=this.refreshafterclick.bind(this);
        this.setedit=this.setedit.bind(this);
        this.home=this.home.bind(this);
    }
    home=function(e)
    {
      this.setState({edit:"NO"});
      this.refreshafterclick();
    }
    setedit=function(e)
    {
      this.setState({edit1:e.target.value,edit:"YES"});
    }
    removeclick(e)
    {
        axios.get(`http://localhost:5000/events?id=${e.target.value}&type=delete`)
            .then(res=>{
                this.setState({data:[]})
                this.refreshafterclick();
                console.log(this.state.data); 
            });
    }
    refreshafterclick()
    {
        axios.get(`http://localhost:5000/events?id=${window.glvarname.sid}&type=load`)
            .then(res=>{
                this.setState({data:res.data})
                console.log(this.state.data); 
            });
    }
    componentDidMount()
    {
        axios.get(`http://localhost:5000/events?id=${window.glvarname.sid}&type=load`)
            .then(res=>{
                this.setState({data:res.data})
                console.log(this.state.data); 
            });
    }
    render()
    {
        if(this.state.edit==="YES")
        {
          return(
            <Joins1 id={this.state.edit1} action={this.home}/>
          )
        }
        return(
            <div className="center2">
                <h6>Today</h6>
                <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Description</th>
                    <th>To</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.filter(person=>this.state.edate===person.edate).map((person, i) => 
                  {
                    return(<tr key={i}>
                        <td >{person.ename} </td>
                        <td >{person.edate}</td>
                        <td >{person.start} </td>
                        <td >{person.end} </td>
                        <td >{person.description} </td>
                        <td >{person.gname} </td>
                        <td><button onClick={this.setedit} value={person.eventid}>Edit</button></td>
                        <td><button onClick={this.removeclick} value={person.eventid}>Remove</button></td>
                    </tr>)
                  })}
                </tbody>
                </Table>
                <h6>Upcoming</h6>
                <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Description</th>
                    <th>To</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.filter(person=>this.state.edate< person.edate).map((person, i) => 
                  {
                    return(<tr key={i}>
                        <td >{person.ename} </td>
                        <td >{person.edate}</td>
                        <td >{person.start} </td>
                        <td >{person.end} </td>
                        <td >{person.description} </td>
                        <td >{person.gname} </td>
                        <td><button onClick={this.setedit} value={person.eventid}>Edit</button></td>
                        <td><button onClick={this.removeclick} value={person.eventid}>Remove</button></td>
                    </tr>)
                  })}
                </tbody>
                </Table>
                <h6>Finished</h6>
                <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Description</th>
                    <th>To</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.filter(person=>this.state.edate>person.edate).map((person, i) => 
                  {
                    return(<tr key={i}>
                        <td >{person.ename} </td>
                        <td >{person.edate}</td>
                        <td >{person.start} </td>
                        <td >{person.end} </td>
                        <td >{person.description} </td>
                        <td >{person.gname} </td>
                    </tr>)
                  })}
                </tbody>
                </Table>
            </div>
        )
    }
}


class Joins1 extends React.Component
{
    constructor()
    {
        super();
        var date = new Date();
        var datestring=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        this.state={
            response1:[],
            response2:[],
            selected:"NO",
            ename:"",
            edate:"2020-12-21",
            defaultdate:"",
            mindate:"",
            start:"",
            end:"",
            desc:"",
            gname:"",
            inputvalue:"",
            gid:"",
            redirect:"NO"
        }
        console.log(this.state.edate);
        this.state.defaultdate=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        this.state.mindate=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        this.state.edate=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        this.namechange=this.namechange.bind(this);
        this.schange=this.schange.bind(this);
        this.echange=this.echange.bind(this);
        this.descchange=this.descchange.bind(this);
        this.changebutton=this.changebutton.bind(this);
        this.inputval=this.inputval.bind(this);
        this.clickadd=this.clickadd.bind(this);
        this.submitform=this.submitform.bind(this);
        this.datechange=this.datechange.bind(this);
    }
    submitform()
    {
        axios.post(`http://localhost:5000/update`,{
            eventid:this.props.id,
            ename:this.state.ename,
            start:this.state.start,
            end:this.state.end,
            desc:this.state.desc,
            gid:this.state.gid,
            from1:window.glvarname.sid,
            edate:this.state.edate
        })
        .then(res=>{
            this.setState({response2:res.data})
            if(res.data.affectedRows===0)
                this.setState({redirect:"NO"});
            else 
                this.setState({redirect:"YES"});
            this.props.action();
            console.log(this.state.response2); 
        });
    }
    datechange(e)
    {
        this.setState({edate:e.target.value})
        console.log(this.state.edate);
    }
    namechange(e)
    {
        this.setState({ename:e.target.value})
    }
    schange(e)
    {
        this.setState({start:e.target.value})
        
    }
    echange(e)
    {
        this.setState({end:e.target.value})
        
    }
    descchange(e)
    {
        this.setState({desc:e.target.value})
    }
    changebutton()
    {
        this.setState({selected:"NO",inputvalue:""})
    }
    inputval(e)
    {
        this.setState({inputvalue:e.target.value})
    }
    clickadd(e)
    {
        var temp;
        temp=this.state.response1.find(person=>{
            return person.gid===e.target.value;
        })
        this.setState({gid:e.target.value,gname:temp.gname,selected:"YES"})
    }
    componentDidMount()
    {
        axios.get(`http://localhost:5000/joins?id=${window.glvarname.sid}&type=load`)
        .then(res=>{
            this.setState({response1:res.data})
            console.log(this.state.response1); 
        });
    }
    render()
    {
        return(
            <div class="center">
                <Form.Group>
                    <Form.Label>Event name</Form.Label>
                    <Form.Control name="ename" onChange={this.namechange} value={this.state.ename} required/><br />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control name="edate" onChange={this.datechange} value={this.state.edate} defaultValue="2020-12-21" min={this.state.mindate} type="date" required/><br />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Start</Form.Label>
                    <Form.Control name="start " onChange={this.schange} value={this.state.start} type="time" required/><br />
                </Form.Group>
                <Form.Group>
                    <Form.Label>End</Form.Label>
                    <Form.Control name="end" onChange={this.echange} value={this.state.end} type="time" required/><br />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="desc"onChange={this.descchange} value={this.state.desc}  required/>
                </Form.Group>
                    {this.state.selected==="YES"?(<div>To {this.state.gname} <br /><Button variant="light" onClick={this.changebutton}>Change</Button><br /><Button variant="light" onClick={this.submitform}>Submit</Button></div>):(<div>To <Form.Control name="inputvalue" onChange={this.inputval}/></div>)}
                {this.state.selected==="NO"?(
                <table>
                    <tbody>
                        {this.state.response1.filter(person=>{
                            return person.gname.toLowerCase().includes(this.state.inputvalue.toLowerCase())
                        })
                        .map((person, i) => 
                        {
                            return(<tr key={i}>
                                <td >{person.gname}</td><td> <Button variant="light" onClick={this.clickadd} value={person.gid}>Add</Button></td>
                            </tr>)
                        })}
                    </tbody>
                </table>
                ):(<div></div>)}
                <Button onClick={this.props.action}>Back</Button>
            </div>
        )
    }
}