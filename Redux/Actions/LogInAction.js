export function retrieveUser(data){
  return (dispatch)=>{
    setTimeout(() => {
            dispatch({type: "RETRIEVE_USER", payload: data.info});
        }, 1);
  }
}
export function retrieveUserPhone(data){
  return (dispatch)=>{
    setTimeout(() => {
            dispatch({type: "RETRIEVE_USER_PHONE", payload: data});
        }, 1);
  }
}
export function updateUser(data){
  return (dispatch)=>{
    setTimeout(() => {
            dispatch({type: "UPDATE_USER", payload: data});
        }, 1);
  }
}
export function logOutUser(){
  return (dispatch)=>{
    setTimeout(()=>{
      dispatch({type:"LOG_OUT", payload: true});
    }, 1);
  }
}
