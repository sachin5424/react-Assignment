import React,{useEffect,useState} from 'react';
import {_httpGetResponse,_httpPostRequest} from '../../_http/api.master.service';
import {api_url} from '../../_http/apiUrl'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {useParams} from 'react-router-dom'
export default function PreViewTable() {
    const [data,setData] =  useState([]);
    const {id} = useParams()
    const getData = ()=>{
        _httpGetResponse(api_url.author.details+id).then((response)=>{
            setData([...response.data])
        })
    }
    
    useEffect(()=>{
        getData()
    },[])
  return (
    <>
    <div className="container">
        <div className="row">
   
            <div className="col-md-12">
             <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sno</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Date Of Birth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,id) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {id+1}
              </TableCell>
              <TableCell align="right">{row.name+id}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{moment(row.dateOfBirth).format('YYYY-MM-DD')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
         </Table>
            </TableContainer>
            </div>

              <br/>
             <h1>Books</h1>
              {data[0]?.books?.map((item)=>{
                return   <div className="col-md-4 mt-5">
                
                <Card sx={{ maxWidth: 345 }}>
                
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rs:{item?.price}
                  </Typography>
                </CardContent>
               
              </Card>
              </div>
               })}
           
        </div>
    </div>
    
    </>
  )
}



// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function BasicTable() {
//   return (
   
//   );
// }
