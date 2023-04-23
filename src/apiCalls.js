const travelDataFetch = (data) => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
  .then(response => {
    if(!response.ok){
        throw new Error(response);
    }
    return response.json();
  })
    .catch(err => console.log(`Error at: ${err}`))
};

export { travelDataFetch };