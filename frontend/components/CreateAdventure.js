import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import Button from '../components/styles/Button';

const CREATE_ADVENTURE_MUTATION = gql`
  mutation CREATE_ADVENTURE_MUTATION($title: String!, $act: Int, $page: Int) {
    createAdventure(title: $title, act: $act, page: $page) {
      id
    }
  }
`;

class CreateAdventure extends Component {
  state = {
    title: '',
    act: 1,
    page: 1
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ADVENTURE_MUTATION} variables={this.state}>
        {(createAdventure, { error, loading }) => (
          <Form
            onSubmit={async e => {
              // Stop submitting the form
              e.preventDefault();
              // Call the mutation
              const res = await createAdventure();

              // Redirect to single page with given id
              Router.push({
                pathname: '/adventure',
                query: { id: res.data.createAdventure.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="act">
                Act
                <input
                  type="number"
                  name="act"
                  id="act"
                  placeholder="act"
                  value={this.state.act}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="page">
                Page
                <input
                  type="number"
                  name="page"
                  id="page"
                  placeholder="page"
                  value={this.state.page}
                  onChange={this.handleChange}
                />
              </label>
              <Button type="submit">Begin adventure! 🏃‍</Button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateAdventure;
export { CREATE_ADVENTURE_MUTATION };
