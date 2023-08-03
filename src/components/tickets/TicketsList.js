import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { completeTicket, deleteSingleTicket, getServiceTickets } from "../../data/serviceTicketsData";
import { Link } from "react-router-dom";

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getServiceTickets().then(setTickets);
  }, []);

  const deleteThisTicket = (id) => {
    deleteSingleTicket(id).then(getServiceTickets().then(setTickets));
    console.warn('deleted ticket');
  };

  const completeThisTicket = (id) => {
    completeTicket(id).then(getServiceTickets().then(setTickets));
    console.warn("completed");
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Description</th>
          <th>Emergency?</th>
          <th>Date Completed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={`ticket-${t.id}`}>
            <th scope="row">{t.id}</th>
            <td>{t.description}</td>
            <td>{t.emergency ? "yes" : "no"}</td>
            <td>{t.dateCompleted?.split("T")[0] || "Incomplete"}</td>
            <td>
              <Link to={`${t.id}`}>Details</Link>
            </td>
            <td><button onClick={() => deleteThisTicket(t.id)}>Delete</button></td>
            {t.customerId && !t.dateCompleted
            ? (
              <td>
                <button onClick={() => completeThisTicket(t.id)}>Complete Order</button>
              </td>
            )
            : ""
            }
            {console.warn(t)}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
