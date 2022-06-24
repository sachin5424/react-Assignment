import axiosBaseUrl from "axios";
import Swal from "sweetalert2";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import {baseUrl} from './apiUrl'



const getError = (error) => {

  if (error?.response?.status == 422) {
    console.log("error================================================================");

    Swal.fire("Error!", `${error?.response.data.message}`, "error");
    var newData = {};
    console.log(error?.response?.data?.erorr,"debugger");
    error?.response?.data?.errors?.map((x) => {
        console.log(x);
      newData[x?.param] = x?.msg;
    });
    console.log({newData});
    return newData;
  }
  if (error?.response?.status == 400) {
    // console.log(,"?>?");
    Swal.fire("Error!", `${error?.response.data.message}`, "error");
  }
};

const _httpPostRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    axiosBaseUrl
      .post(baseUrl + url, data,{
        headers: {
            Authorization: sessionStorage.getItem('token') //the token is a variable which holds the token
          }
      })
      .then((data) => {
        Swal.fire("successfully!", "success create your item.", "success");
        resolve(data.data);
      })
      .catch((error) => {
        console.log(error.response.data, "////");
        const err = getError(error);
        reject(err);
      });
  });
};

const _httpGetResponse = (url) => {
  // alert("ok")
  return new Promise((resolve, reject) => {
    axiosBaseUrl
      .get(baseUrl + url,{   headers: {
        Authorization: sessionStorage.getItem('token') //the token is a variable which holds the token
      }})
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => {
        const err = getError(error);
        reject(err);
      });
  });
};

const _httpDeleteRequest = (url, id) => {
  return new Promise((resolve, reject) => {
    axiosBaseUrl
      .delete(baseUrl + url ,{   headers: {
        Authorization: sessionStorage.getItem('token') //the token is a variable which holds the token
      }})
      .then((data) => {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        resolve(data.data);
      })
      .catch((error) => {
        const err = getError(error);
        reject(err);
      });
  });
};

const _httpPutRequest = (url, id, data) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be change!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosBaseUrl
          .put(baseUrl + url + "/" + id, data,{   headers: {
            Authorization: sessionStorage.getItem('token') //the token is a variable which holds the token
          }})
          .then((data) => {
            Swal.fire("Update!", `${data.data.message}`, "success");
            resolve(data.data);
          })
          .catch((error) => {
            var err;
            if (error?.response?.status == 422) {
              err = getError(error);
            }
            Swal.fire("Error!", `${error.message}`, "error");
            reject(err);
          });
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  });
};



export {
  _httpPostRequest,
  _httpGetResponse,
  _httpDeleteRequest,
  _httpPutRequest,
};