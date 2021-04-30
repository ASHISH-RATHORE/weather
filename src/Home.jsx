import React,{useState,useEffect,}from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import WeatherDisplayComponent from './Components/WeatherDisplayComponent';
import axios from 'axios';
import {url }from './util';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Details from './Components/Details';
import BounceLoader from "react-spinners/BounceLoader";




export default function SearchBar() {


  
  const classes = useStyles();
  const [search, setsearch] = useState();
  const [output,setoutput]=useState([]);
  const [isLoading,setisLoading]=useState(false);
  const handleChange=e=>{
    setsearch(e.target.value)
   console.log(search)
  }


  const handleSubmit=async(e)=>{
   e.preventDefault();

   try{
    const data= await axios({url,method:'get'
    ,params:{query:search}});
  setoutput(data)
   }catch(err){
     console.log(err)
   }
   }

  useEffect(() => {
    setisLoading(true)
   setTimeout(()=>{
    setisLoading(false)
   },2000)
  }, []);

  return (


    <div>

      {
        isLoading? <div className="loader"><BounceLoader  size={550} /></div>: <div className={classes.root}>
        <AppBar onSubmit={handleSubmit} position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Weather App
            </Typography>
            <div>
              <form onSubmit={handleSubmit}>
              <input className={classes.searchBox} type='search' name="search"  placeholder="Search...." onChange={handleChange} />
              
              </form>
           
            </div>
          </Toolbar>
        </AppBar>
       
        <WeatherDisplayComponent res={output.data}/>
         
            
       
         <Switch>
           <Route path='/' exact component={WeatherDisplayComponent}/>
            <Route path="/Details/:id" exact component={Details} />
              </Switch>
      </div>
      }
    </div>
    // <div className={classes.root}>
    //   <AppBar onSubmit={handleSubmit} position="static">
    //     <Toolbar>
    //       <Typography className={classes.title} variant="h6" noWrap>
    //         Weather App
    //       </Typography>
    //       <div>
    //         <form onSubmit={handleSubmit}>
    //         <input className={classes.searchBox} type='search' name="search"  placeholder="Search...." onChange={handleChange} />
            
    //         </form>
         
    //       </div>
    //     </Toolbar>
    //   </AppBar>
     
    //   <WeatherDisplayComponent res={output.data}/>
       
          
     
    //    <Switch>
    //      <Route path='/' exact component={WeatherDisplayComponent}/>
    //       <Route path="/Details/:id" exact component={Details} />
    //         </Switch>
    // </div>
  );
}





// styled component

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchBox: {
    height:35,width:500
   
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
