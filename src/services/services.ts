import api from "./api";

interface Ticket {
  name: string;
  birthdate: string;
  cpf: string;
}

export async function handleCreateTicketService(ticket: Ticket) {
  try{
    const response = await api.post('/ticket', ticket)
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function handleGetTicketsService(ticketID: string) {
  try {
    const response = await api.get(`/ticket/${ticketID}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}