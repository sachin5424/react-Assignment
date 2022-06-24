import React,{useEffect,useState} from 'react';
import {_httpGetResponse,_httpPostRequest,_httpDeleteRequest} from '../../_http/api.master.service';
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
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-date-picker';
import {Link} from 'react-router-dom'
export default function AuthorTable() {
    const [open, setOpen] = React.useState(false);
    const [value, onChange] = useState(new Date());
    const [data,setData] =  useState([]);
    const [form,setForm] = useState({})
    const [formError,setFormError] = useState({})
    const handleClickOpen = () => {
        // form({})
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    console.log(form);
    };

    const InputHandle= (e)=>{
        setForm({
            ...form,
            [e.target.id]:e.target.value
        })
    }
    
    const getData = ()=>{
        _httpGetResponse(api_url.author.all_list).then((response)=>{
            setData([...response.data])
        })
    }

    const saveForm = ()=>{
        setFormError({})
        form['dateOfBirth']=moment(value).format('YYYY/MM/DD')
        console.log(form);
        _httpPostRequest(api_url.author.all_list,form).then((response)=>{
            getData()
            setForm({})
            setOpen(false);
        }).catch((error)=>{
            setFormError(error)
            console.log(formError,'?????????????');
        })
    }
   
    
    useEffect(()=>{
        getData()
    },[])
  return (
    <>
      <Button  onClick={handleClickOpen}>
        Add Author
      </Button>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sno</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Date Of Birth</TableCell>
            <TableCell align="right">related Book</TableCell>
            <TableCell align="right">Delete</TableCell>
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
              

              <TableCell align="right">
              <Link  to={row._id}>
              <IconButton aria-label="delete">
                 
                 <PreviewIcon />
             </IconButton>
                   </Link>
             
              </TableCell>

              <TableCell align="right">
                {sessionStorage.getItem('userId')==row.userId ?
                 <IconButton onClick={async()=>{
                    console.log(api_url.author.delete+row._id);
                   await _httpDeleteRequest(api_url.author.delete+row._id)
                   getData()
                 }} aria-label="delete">
                 <DeleteIcon />
             </IconButton>
                :  <IconButton disabled={true} aria-label="delete">
                <DeleteIcon />
            </IconButton>}
             
              </TableCell>
            

        
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
     <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add Author"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
        
          <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '55ch' },
      }}
      noValidate
      autoComplete="off"
    >
     
      <div>
        <TextField
            id="name"
            value={form?.name}
            label="Author Name"
            onChange={InputHandle}
            helperText={formError?.name}
           variant="standard"
        />
        <TextField
          id="age"
          onChange={InputHandle}
          label="Age"
          value={form.age}
          helperText={formError?.age}
          variant="standard"
        />
      </div>
      <div>
      <DatePicker  onChange={onChange} value={value} />
      <p>
        {formError?.dateOfBirth}
      </p>
    </div>
    </Box>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={saveForm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
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
