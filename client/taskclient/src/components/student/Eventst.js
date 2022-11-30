import React from 'react'; 
import axios from 'axios';
import Table from "react-bootstrap/Table";

export default class Eventst extends React.Component
{
    constructor()
    {
        super();
        var date = new Date();
        var datestring=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        this.state={
            data:[],
            edate:datestring
        }
    }
    componentDidMount()
    {
        axios.get(`http://localhost:5000/eventst?id=${window.glvarname.stid}`)
            .then(res=>{
                this.setState({data:res.data})
                console.log(this.state.data); 
            });
    }
    render()
    {
        return(
            <div class="center2">
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
                    <th>From</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.filter(person=>this.state.edate===person.edate).map((person, i) => 
                  {
                    return(<tr key={i}>
                        <td >{person.ename} </td>
                        <td>{person.edate}</td>
                        <td >{person.start} </td>
                        <td >{person.end} </td>
                        <td >{person.description} </td>
                        <td >{person.gname} </td>
                        <td >{person.sname} </td>
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
                    <th>From</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.filter(person=>this.state.edate<person.edate).map((person, i) => 
                  {
                    return(<tr key={i}>
                        <td >{person.ename} </td>
                        <td>{person.edate}</td>
                        <td >{person.start} </td>
                        <td >{person.end} </td>
                        <td >{person.description} </td>
                        <td >{person.gname} </td>
                        <td >{person.sname} </td>
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
                    <th>From</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.filter(person=>this.state.edate>person.edate).map((person, i) => 
                  {
                    return(<tr key={i}>
                        <td >{person.ename} </td>
                        <td>{person.edate}</td>
                        <td >{person.start} </td>
                        <td >{person.end} </td>
                        <td >{person.description} </td>
                        <td >{person.gname} </td>
                        <td >{person.sname} </td>
                    </tr>)
                  })}
                </tbody>
                </Table>
            </div>
        )
    }
}