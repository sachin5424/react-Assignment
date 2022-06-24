import {
    BrowserRouter as Router,
    Link,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
  import React from "react";
  import Layout from './component/layout';
  import {Author,Book,AuthorPreview,Login,Register} from './component/_index'


  
  export const PrivateRoutes=()=> {
    return (
    <Router>
         <Routes>
           <Route exact path="/" element={<Layout />}>
            <Route  path="author" element={<Author/>}/>
            <Route  path="author/:id" element={<AuthorPreview/>}/>
            <Route  path="book" element={<Book/>}/>
            <Route path='*' element={<Author />} />
          </Route>
      </Routes>
    </Router>
    )
  }
  


  export const AuthRoutes=()=> {
    return (
    <Router>
         <Routes>
           <Route exact path="/" element={<Login />}>
          
         
          </Route>
          <Route  path="/register" element={<Register />}/>
          <Route path='*' element={<Login />} />
      </Routes>
    </Router>
    )
  }
  