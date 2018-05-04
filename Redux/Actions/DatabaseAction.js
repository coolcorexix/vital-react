export function findNearby(data){
  return (dispatch)=>{
    setTimeout(() => {
            dispatch({type: "AVAILABLE_RETRIEVE", payload: data.saviorsList});
        }, 1);
  }
}
