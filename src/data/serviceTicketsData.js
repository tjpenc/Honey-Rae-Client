const _apiUrl = "/servicetickets";

export const getServiceTickets = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

//export a function here that gets a ticket by id
export const getSingleServiceTicket = (id) => {
  return fetch(`/servicetickets/${id}`).then((r) => r.json());
};

export const deleteSingleTicket = (id) => {
  return fetch(`/servicetickets/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(r => r.json);
};
