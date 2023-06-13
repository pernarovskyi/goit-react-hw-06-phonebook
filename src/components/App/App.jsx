import { useSelector, useDispatch } from 'react-redux';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { Container, MainTitle, Title } from './App.styled';
import { getFilter } from 'redux/filter/filterSelector';
import {
  getContacts,
  getFilteredContacts,
} from 'redux/contacts/contactsSelector';
import { setFilter } from 'redux/filter/filterSlice';
import { addContact } from 'redux/contacts/contactsSlice';

export function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const filteredContacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  const formSubmitHandler = ({ name, number }) => {
    dispatch(addContact({ name, number }));
  };

  const isNewContact = newContact =>
    contacts.some(contact => {
      return contact.name.toLowerCase() === newContact.name.toLowerCase();
    });

  const handleFilterChange = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm onSubmit={formSubmitHandler} onContactExist={isNewContact} />
      <Title>Contacts</Title>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} />
    </Container>
  );
}
