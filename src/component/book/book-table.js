import React,{useEffect,useState} from 'react';
import {_httpGetResponse,_httpPostRequest,_httpDeleteRequest} from '../../_http/api.master.service';
import {api_url} from '../../_http/apiUrl'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FormHelperText from '@mui/material/FormHelperText';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Link} from 'react-router-dom'
export default function BookTable() {
    const [open, setOpen] = React.useState(false);
    const [published,setPublished] = React.useState([]);
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
    const getPublished = ()=>{
        _httpGetResponse(api_url.author.all_list).then((response)=>{
            setPublished([...response.data])
        })
    }
    const getData = ()=>{
        _httpGetResponse(api_url.book.all_list).then((response)=>{
            setData([...response.data])
        })
    }

    const saveForm = ()=>{
        setFormError({})
        console.log(form);
        _httpPostRequest(api_url.book.save_book,form).then((response)=>{
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
        getPublished()
    },[])
  return (
    <>
      <Button  onClick={handleClickOpen}>
        Add Book
      </Button>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sno</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Price</TableCell>
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
              <TableCell align="right">
                <Link to={'/author/'+row.published}>
                {row.author_name}
                </Link>
             
                </TableCell>
              <TableCell align="right"> Rs:{row.price}</TableCell>
              

            

              <TableCell align="right">
              {sessionStorage.getItem('userId')==row.userId ?
                 <IconButton  onClick={async()=>{
                    console.log(api_url.author.delete+row._id);
                   await _httpDeleteRequest(api_url.book.delete+row._id)
                   getData()
                 }}  aria-label="delete">
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
            label="Name"
            onChange={InputHandle}
            helperText={formError?.name}
           variant="standard"
        />
       
        <FormControl  style={{ width: '90%',margin:10}}>
        <InputLabel id="price">Author</InputLabel>
        <Select
         
          id="published"
          value={form.published}
          label="Author"
          onChange={(e)=>{
            setForm({...form,['published']:e.target.value})
          }}
        >
            {published?.map((item)=>{
        return <MenuItem value={item._id}>{item.name}</MenuItem>
            })}
          
          {/* <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
        <FormHelperText>{formError?.published}</FormHelperText>
      </FormControl>
      <TextField
          id="price"
          onChange={InputHandle}
          label="Price"
          value={form.price}
          helperText={formError?.price}
          variant="standard"
        />
      </div>
    
    </Box>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveForm} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  )
}
