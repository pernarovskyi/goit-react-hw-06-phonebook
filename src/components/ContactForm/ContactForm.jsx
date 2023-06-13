import { useState } from 'react';
import { InnerWrapper, Form, Label, Input, Button } from './ContactForm.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ContactForm({ onSubmit, onContactExist }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const contactExist = onContactExist({ name, number });

    if (contactExist) {
      notifyContactExist();
      resetForm();
      return;
    } else {
      onSubmit({ name, number });
      resetForm();
    }
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const notifyContactExist = () => toast('Contact aleady exist');
  return (
    <InnerWrapper>
      <Form onSubmit={handleSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
          />
        </Label>

        <Label>
          Number
          <Input
            type="text"
            name="number"
            onChange={handleInputChange}
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>

        <Button type="submit">Add contact</Button>
      </Form>
      <ToastContainer />
    </InnerWrapper>
  );
}
