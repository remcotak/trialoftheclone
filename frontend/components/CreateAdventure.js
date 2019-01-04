import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import { ALL_ADVENTURES_QUERY } from './AdventuresList';
import Form from './styles/Form';
import Error from './ErrorMessage';
import Button from '../components/styles/Button';

const CREATE_ADVENTURE_MUTATION = gql`
  mutation CREATE_ADVENTURE_MUTATION($title: String!, $act: Int, $page: Int) {
    createAdventure(title: $title, act: $act, page: $page) {
      id
      title
      act
      page
      isAlive
      createdAt
      updatedAt
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

  // Manually update the cache on the client,
  // matching the server
  update = (cache, payload) => {
    // Read the cache
    const data = cache.readQuery({ query: ALL_ADVENTURES_QUERY });
    // Put the new adventure in the adventures array
    cache.writeQuery({
      query: ALL_ADVENTURES_QUERY,
      data: { adventures: [payload.data.createAdventure, ...data.adventures] }
    });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_ADVENTURE_MUTATION}
        variables={this.state}
        update={this.update}
      >
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
