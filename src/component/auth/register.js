import React from "react";

import {
  
  _httpPostRequest,
} from "../../_http/api.master.service";

import {
  
    api_url,
  } from "../../_http/apiUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navigate,Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = React.useState({password:""});
  const notify = (e) => toast(e);
  const [formError, setFormError] = React.useState({});
  let navigate = useNavigate();
  const handling = (e) => {
    const newstate = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(newstate);
  };

  // console.log({form});
  return (
    <>
    <div class="container" style={{ marginTop:230 }}>
        <div class="row center justify-content-md-center">
            <div class="col-md-6 text-center">
                <h1>Register</h1>
                <form class="form-inline">
                    <div class="form-group">
                        <label for=""></label>
                        <input type="text" class="form-control "  
              id="login"
              name="email"
              value={form.email}
              onChange={handling}
              placeholder="Email" aria-describedby="helpId"/>
                        <small id="helpId" class="text-danger">
                            {formError?.email}
                        </small>
                    </div>
                    <div class="form-group">
                        <label for=""></label>
                        <input type="text" 
                         id="password"
                         name="password"
                         onChange={handling}
                         value={form.password}
                         placeholder="password"
                        class="form-control" aria-describedby="helpId"/>
                        <small id="helpId" class="text-danger">
                            {formError?.password}
                        </small>
                    </div>

                    <div class="form-group">
                        <label for=""></label>
                        <input type="text" 
                         id="confirmPassword"
                         name="confirmPassword"
                         onChange={handling}
                         value={form.confirmPassword}
                         placeholder="confim password"
                        class="form-control" aria-describedby="helpId"/>
                        <small id="helpId" class="text-danger">
                            {formError?.confirmPassword}
                        </small>
                    </div>
                    <br/>
                    <div class="form-group">
                        <input
              type="submit"
              onClick={(e) => {
                setFormError({})
                e.preventDefault();
                _httpPostRequest(api_url.auth.register, form)
                  .then((data) => {
                    navigate("/login")
                  })
                  .catch((error) => {
                    console.log(error,"/...");
                    setFormError(error)
                    notify(error?.email);
                    notify(error?.password);
                  });
              }}
              className="fadeIn fourth"
              defaultValue="Log In"
            />
                    </div>
                </form>
                <p>
                    <Link to={'/login'}> Login</Link>
                 </p>
            </div>
        </div>
    </div>
     
    </>
  );
}
