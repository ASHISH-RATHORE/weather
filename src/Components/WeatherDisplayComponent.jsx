import React, { Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';




export default function WeatherDisplayComponent({res}) {

    if(!res){
        return '';
    }
    
  const classes = useStyles();
  

  


  return (
   <div className={classes.title}>
    
    {res.map((data,key={key})=>{
            return(
                <div className={classes.root} key={key}><Link style={{fontSize:25,textDecoration:"none",color:'black'}} to={`/Details/${data.woeid}`}>{data.title}</Link></div>
            )
        })
    }
   </div>
  );
}


const useStyles = makeStyles({
    root: {
        
        height:35,
        width:320,
        margin:10,
        textAlign:'center'
        ,borderWidth:1
        ,borderRadius:25,
        borderBlockColor:'black'
        ,borderBlockStyle:'solid'
    },
    title: {
        display:'flex',flex:1,flexWrap:'wrap',justifyContent:'center'
    },
    pos: {
      marginBottom: 12,
    },
  });