import React from 'react';
import Home from './components/Home.js'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; 
import Dbs from './components/Dbs.js'; 
import Dbst from './components/Dbst.js'; 
import Admin from './Admin.js'; 

window.glvarname=null;

export default class App extends React.Component
{
  constructor()
  {
    super();
    this.state={
      name:"",
      id:""
    }
  }
  render()
  {
    return(<Router>
      <div>
        <Route exact path='/' component={Home}></Route> 
        <Route exact path='/Dbs' component={Dbs}></Route> 
        <Route exact path='/Dbst' component={Dbst}></Route> 
        <Route exact path='/Admin' component={Admin}></Route>
      </div>
    </Router>);
    // return(<div><Home /> </div>)
  }
}

// export default class App extends React.Component
// {
//   constructor(props)
//   {
//     super(props);

//     this.state={
//       eresponse:"",
//       num:1,
//       in:""
//     };
//     this.updatenum = this.updatenum.bind(this);
//     this.updatetext = this.updatetext.bind(this);
//     this.sendrequest = this.sendrequest.bind(this);
//   }

//   sendrequest()
//   {
//     fetch("http://localhost:5000/"+this.state.in).then(res=>res.text()).then(res=>this.setState({eresponse:res}));
//   }
//   updatenum()
//   {
//     this.setState({
//       num:this.state.num+1})
//   }
//   updatetext(e)
//   {
//     this.setState({
//       in:e.target.value
//     });
//   }
//   callresponse()
//   {
//     fetch("http://localhost:5000").then(res=>res.text()).then(res=>this.setState({eresponse:res}));
//   }

//   componentWillMount()
//   {
//     this.callresponse();
//   }
  
//   render()
//   {
//     return(<div>{this.state.eresponse}<br /><button onClick={this.updatenum}>click</button><br />{this.state.num}
//     <br />
//     <input onChange={this.updatetext} />
//     <br />
//     <b>{this.state.in}</b>
//     <br />
//     <button onClick={this.sendrequest}>send</button>
//     </div>)
//   }
// }