import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';







export default function Details({match}) {

  const [weatherReport, setweatherReport] = useState([]);
  
  const Id=match.params.id;
  const classes = useStyles();
  


  
  useEffect(() => { //fetching data on basis of id
    
    const fetchData=async()=>{

  try{
   const fetched_Data= await axios.get(`https://www.metaweather.com/api/location/${Id}`);
   setweatherReport(fetched_Data.data.consolidated_weather);
   console.log(fetched_Data.data)
  
  }catch(err){
  console.log(err)
}
    }
    
    fetchData();

  }, [])

 
return (
      
      <div style={{display:'flex',marginTop:20}}>
        {
          weatherReport.map((data,key)=>{
            return(
              <Card key={key} className={classes.root}>
        <CardActionArea >
        <Typography gutterBottom variant="h6" component="h2">
         {moment(data.applicable_date).format("dddd, MMMM Do YYYY")} 
            </Typography>
          <CardMedia
            style={{height:200,width:200}}
            image={`https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg`}
            title="Contemplative Reptile"
            
          />
          <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
              Temperature: {data.the_temp.toFixed(1)}
            </Typography>
            
            <Typography variant="body2" color="textSecondary" component="p">
            {data.weather_state_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
             Min:{data.min_temp.toFixed(1)}||Max:{data.max_temp.toFixed(1)} 
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
            )
          })
        }
      </div>
    );
  }
  
  const useStyles = makeStyles({
    root: {
      marginRight:5,
      border:2,
      borderStyle:'solid'
    },
    media: {
      height: 450,
    },
  });
  