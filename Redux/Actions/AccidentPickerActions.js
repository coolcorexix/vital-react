export function chooseAccident(data){
  return (dispatch)=>{
    setTimeout(() => {
            dispatch({type: "CHOOSE_ACCIDENT", payload: data.accident});
        }, 1);
  }
}
