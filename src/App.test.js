// Testing if when I click enter, the todo Item as a checkbox appears

import React from 'react';
import { render, fireEvent,within, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render a form with a text input and a submit button', () => {
    render(<App />)
    const input = screen.getByTestId("todoinput");
    const submit = screen.getByTestId("todosubmit");
    expect(input).toBeInTheDocument();
    expect(submit).toBeInTheDocument();


  });

  it('should add a to-do item to the to-do list when the form is submitted', () => {
    render(<App />)
    const input = screen.getByTestId("todoinput");
    const submit = screen.getByTestId("todosubmit");
    const listTodo = screen.getByTestId("todoitems");
    fireEvent.change(input, {target:{value: "submitted to do"}});
    fireEvent.submit(submit);
    const itemsAfterSubmit = within(listTodo).getAllByRole("listitem");
    const lengthAfterSubmit = itemsAfterSubmit.length;
    expect(lengthAfterSubmit).toBe(1)
  });

  it('should move a to-do item to the done list when the checkbox is checked', () => {
    render(<App />)
    const input = screen.getByTestId("todoinput");
    const submit = screen.getByTestId("todosubmit");
    const listTodo = screen.getByTestId("todoitems");
    fireEvent.change(input, {target:{value: "submitted to do"}});
    fireEvent.submit(submit);
    const itemsAfterSubmit = within(listTodo).getAllByRole("listitem");
    const lengthAfterSubmit = itemsAfterSubmit.length;
    const item = screen.getByText("submitted to do");
    const listItem = item.closest("listitem");
    const checkbox = within(within(listTodo).getAllByRole("listitem")[0]).getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);
    const done = screen.getByTestId("doneitems");
    const doneAfterSubmit = within(done).getAllByRole("listitem");
    const donelength = doneAfterSubmit.length;
    expect(donelength).toBe(1)
  });
});

