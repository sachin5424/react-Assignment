import logo from './logo.svg';
import './App.css';
import {Author} from './component/_index';
import Layout from './component/layout';
import {PrivateRoutes,AuthRoutes} from './routes';

function App() {
  return (
    <>
    {sessionStorage.getItem('token') == null? <AuthRoutes/>:<PrivateRoutes/> }
    </>
  );
}

export default App;
