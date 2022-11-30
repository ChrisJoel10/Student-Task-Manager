var express = require("express");

var cors = require("cors");

var mysql = require('mysql');

var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "games",
  database: "studenttask"
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(cookieParser());

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/loginst',(req,res)=>{
  if(req.query.action=="insert")
  {
    if(req.query.type=="student")
    {
      con.query(`insert into student values("${req.query.id}","${req.query.name}","${req.query.password}")`,function(err,result){
        if(err) throw err;
        res.send(result);
      });
    }
    else if(req.query.type=="staff")
    {
      con.query(`insert into staff values("${req.query.id}","${req.query.name}","${req.query.password}")`,function(err,result){
        if(err) throw err;
        res.send(result);
      });
    }
  }
  else 
  {
    con.query(`SELECT * FROM student where stid="${req.query.id}" and stpassword="${req.query.password}"`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
  }
});

app.get('/logins',(req,res)=>{
    con.query(`SELECT * FROM staff where sid="${req.query.id}" and spassword="${req.query.password}"`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
  });
});

app.get('/eventst',(req,res)=>{
    con.query(`select e.ename,e.edate, e.start,e.end,e.description, g.gname, s.sname from event e, staff s, groupdetails g, studentgroup sg where e.to1=sg.gid AND sg.stid="${req.query.id}" AND sg.gid=g.gid AND e.from1=s.sid union Select e.ename, e.edate, e.start,
    e.end,e.description,"ME"as gname, s.sname from event e, staff s where
    e.to1="${req.query.id}" AND e.from1= s.sid ORDER BY EDATE,END, START ASC`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/joinst',(req,res)=>{
  if(req.query.user=="staff")
  {
    if(req.query.type=="joined")
    {
        con.query(`select a.gid, a.gname from groupdetails a, staffgroup b where a.gid=b.gid and b.sid="${req.query.id}" order by gid;`, function (err, result, fields) {
          if (err) throw err;
          res.send(result);
      });
    }
    else if(req.query.type=="notjoined")
    {
      con.query(`select * from groupdetails where gid not in (select gid from staffgroup where sid = "${req.query.id}") order by gid;`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    }
  }
  else
  {
    if(req.query.type=="joined")
    {
        con.query(`select a.gid, a.gname from groupdetails a, studentgroup b where a.gid=b.gid and b.stid="${req.query.id}" order by gid;`, function (err, result, fields) {
          if (err) throw err;
          res.send(result);
      });
    }
    else if(req.query.type=="notjoined")
    {
      con.query(`select * from groupdetails where gid not in (select gid from studentgroup where stid = "${req.query.id}") order by gid;`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    }
  }
});

app.get("/updatejoinst",(req,res)=>{
  if(req.query.user=="staff")
  {
    if(req.query.type=="add")
    {
      con.query(`insert into staffgroup values("${req.query.gid}","${req.query.id}")`, function (err, result) {
        if (err) throw err;
        res.send("added");
      });
    }
    else if(req.query.type=="remove")
    {
      con.query(`delete from staffgroup where gid="${req.query.gid}"and sid="${req.query.id}"`, function (err, result) {
        if (err) throw err;
        res.send("removed");
      });
    }
  }
  else
  {
    if(req.query.type=="add")
    {
      con.query(`insert into studentgroup values("${req.query.gid}","${req.query.id}")`, function (err, result) {
        if (err) throw err;
        res.send("added");
      });
    }
    else if(req.query.type=="remove")
    {
      con.query(`delete from studentgroup where gid="${req.query.gid}"and stid="${req.query.id}"`, function (err, result) {
        if (err) throw err;
        res.send("removed");
      });
    }
  }
  
});

app.get('/events',(req,res)=>{
  if(req.query.type=="load")
  {
    con.query(`select e.eventid,e.ename,e.edate, e.start,e.end,e.description,e.to1, g.gname from event e, staff s, groupdetails g where e.to1=g.gid AND e.from1="${req.query.id}" union Select e.eventid,e.ename, e.edate,e.start,
    e.end,e.description, e.to1, st.stname  from event e, student st where
    e.to1=st.stid AND e.from1= "${req.query.id}" ORDER BY EDATE, END, START ASC`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
  }
  else if(req.query.type=="delete")
  {
    con.query(`delete from event where eventid=${req.query.id}`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
  }
});

app.get('/joins',(req,res)=>{
  if(req.query.type=="load")
  {
    con.query(`select g.gid,g.gname from groupdetails g, staffgroup sg where sg.sid="${req.query.id}" and sg.gid=g.gid union select stid, stname from student where stid in ( select distinct stid from studentgroup where gid in (select gid from staffgroup where sid="${req.query.id}")) ORDER BY gid`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
  }
});

app.post('/joins',(req,res)=>{
  con.query(`insert into event(ename,start,end,description,to1,from1,edate) values("${req.body.ename}","${req.body.start}","${req.body.end}","${req.body.desc}","${req.body.gid}","${req.body.from1}","${req.body.edate}")`,function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/",function(req,res){
    res.send("hello world");
}
);

app.post('/admin',(req,res)=>{
  if(req.body.action=="user1")
  {
    if(req.body.type=="student")
    {
        con.query(`select stid from student where stid="${req.body.id}"`,function(err,result,fields){
          if(err) throw err;
          if(result.length==1)
          {
            res.send({affectedRows:0})
          }
          else
          {
            con.query(`insert into student values("${req.body.id}","${req.body.name}","${req.body.password}")`,function (err, result, fields) {
              if (err) throw err;
              res.send(result);
            });
          }
        });
    }
    else if(req.body.type=="staff")
    {
      con.query(`select sid from staff where sid="${req.body.id}"`,function(err,result,fields){
        if(err) throw err;
        if(result.length==1)
        {
          res.send({affectedRows:0})
        }
        else
        {
          con.query(`insert into staff values("${req.body.id}","${req.body.name}","${req.body.password}")`,function (err, result, fields) {
            if (err) throw err;
            res.send(result);
          });
        }
      });
    }
  }
  else if(req.body.action=="group1")
  {
    con.query(`select gid from groupdetails where gid="${req.body.gid}"`,function(err,result,fields){
      if(err) throw err;
      if(result.length==1)
      {
        res.send({affectedRows:0})
      }
      else
      {
        con.query(`insert into groupdetails values("${req.body.gid}","${req.body.gname}")`,function (err, result, fields) {
          if (err) throw err;
          res.send(result);
        });
      }
    });
  }
  else if(req.body.action=="user2")
  {
    con.query(`select ${req.body.type1==="student"?"stid":"sid"} from ${req.body.type1} where ${req.body.type1==="student"?"stid":"sid"}="${req.body.id1}"`,function(err,result,fields){
      if(err) throw err;
      if(result.length==0)
      {
        res.send({affectedRows:0})
      }
      else
      {
        con.query(`delete from ${req.body.type1} where ${req.body.type1==="student"?"stid":"sid"}="${req.body.id1}"`,function (err, result, fields) {
          if (err) throw err;
          res.send(result);
        });
      }
    });
  }
  else if(req.body.action=="group2")
  {
    con.query(`select gid from groupdetails where gid="${req.body.gid1}"`,function(err,result,fields){
      if(err) throw err;
      if(result.length==0)
      {
        res.send({affectedRows:0})
      }
      else
      {
        con.query(`delete from groupdetails where gid="${req.body.gid1}"`,function (err, result, fields) {
          if (err) throw err;
          res.send(result);
        });
      }
    });
  }
});
app.post('/update',(req,res)=>{
  con.query(`update event set ename="${req.body.ename}",start="${req.body.start}",end="${req.body.end}",description="${req.body.desc}",to1="${req.body.gid}",from1="${req.body.from1}",edate="${req.body.edate}" where eventid="${req.body.eventid}"`,function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});


app.listen(5000);
