import PropTypes from 'prop-types';
import { List, Item, Button } from './ContactList.styled';
import { removeContact } from 'redux/contacts/contactsSlice';
import { useDispatch } from 'react-redux';

export const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeContact(contacts.id));
  };

  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <Item key={id}>
          <p>
            {name}: {number}
          </p>
          <Button type="submit" onClick={handleDelete}>
            Delete
          </Button>
        </Item>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
