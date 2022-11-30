import React from 'react'; 
import axios from 'axios';
import Table from "react-bootstrap/Table";

export default class Eventst extends React.Component
{
    constructor()
    {
        super();
        this.state={
            response1:[],
            response2:[]
        }
        this.clickadd=this.clickadd.bind(this);
        this.clickremove=this.clickremove.bind(this);
        this.refreshafterclick=this.refreshafterclick.bind(this);
    }
    refreshafterclick=function()
    {
        axios.get(`http://localhost:5000/joinst?id=${window.glvarname.stid}&type=joined`)
        .then(res=>{
            this.setState({response1:res.data})
            console.log(this.state.response1); 
        });
        axios.get(`http://localhost:5000/joinst?id=${window.glvarname.stid}&type=notjoined`)
        .then(res=>{
            this.setState({response2:res.data})
            console.log(this.state.response2); 
        });
    }
    componentDidMount()
    {
        axios.get(`http://localhost:5000/joinst?id=${window.glvarname.stid}&type=joined`)
        .then(res=>{
            this.setState({response1:res.data})
            console.log(this.state.response1); 
        });
        axios.get(`http://localhost:5000/joinst?id=${window.glvarname.stid}&type=notjoined`)
        .then(res=>{
            this.setState({response2:res.data})
            console.log(this.state.response2); 
        });
    }
    clickadd=function(e)
    {
        axios.get( `http://localhost:5000/updatejoinst?id=${window.glvarname.stid}&gid=${e.target.value}&type=add`)
        .then(res=>{
            this.setState({response2:[],response1:[]});
            console.log(this.state.response2); 
            this.refreshafterclick();
        });
        console.log(e.target.value);
    }
    clickremove=function(e)
    {
        axios.get( `http://localhost:5000/updatejoinst?id=${window.glvarname.stid}&gid=${e.target.value}&type=remove`)
        .then(res=>{
            this.setState({response2:[],response1:[]});
            console.log(this.state.response2); 
            this.refreshafterclick();
        });
        console.log(e.target.value);
    }
    
    render()
    {
        return(
            <div class="center1">
                <h4>Joined groups</h4>
                <table class="tablecenter">
                <tbody>
                  {this.state.response1.map((person, i) => 
                  {
                    return(<tr key={i}>
                        <td >{person.gname} </td><td><button onClick={this.clickremove} value={person.gid}>Remove</button></td>
                    </tr>)
                  })}
                </tbody>
                </table>
                <h4>Other groups</h4>
                <table class="tablecenter">
                <tbody>
                  {this.state.response2.map((person, i) => 
                  {
                    return(<tr key={i}>
                        <td >{person.gname}</td><td> <button onClick={this.clickadd} value={person.gid}>Add</button></td>
                    </tr>)
                  })}
                </tbody>
                </table>
            </div>
        )
    }
}