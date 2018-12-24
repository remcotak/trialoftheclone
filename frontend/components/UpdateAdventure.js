import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import Form from './styles/Form';
import Button from './styles/Button';
import Error from './ErrorMessage';

const SINGLE_ADVENTURE_QUERY = gql`
  query SINGLE_ADVENTURE_QUERY($id: ID!) {
    adventure(where: { id: $id }) {
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

const UPDATE_ADVENTURE_MUTATION = gql`
  mutation UPDATE_ADVENTURE_MUTATION(
    $id: ID!
    $title: String
    $act: Int
    $page: Int
  ) {
    updateAdventure(id: $id, title: $title, act: $act, page: $page) {
      id
      title
      act
      page
    }
  }
`;

class UpdateAdventure extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val
    });
  };

  handleSubmit = async (e, updateAdventure) => {
    // Stop submitting the form
    e.preventDefault();
    // Call the mutation
    const res = await updateAdventure({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
  };

  render() {
    return (
      <Query query={SINGLE_ADVENTURE_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.adventure) return <p>Sorry, no adventure found 😢</p>;
          // if (error) return <p>Error: {error.message}</p>;

          return (
            <Mutation
              mutation={UPDATE_ADVENTURE_MUTATION}
              variables={this.state}
            >
              {(updateAdventure, { error, loading }) => (
                <Form onSubmit={e => this.handleSubmit(e, updateAdventure)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="title"
                        defaultValue={data.adventure.title}
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
                        defaultValue={data.adventure.act}
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
                        defaultValue={data.adventure.page}
                        onChange={this.handleChange}
                      />
                    </label>
                    <Button type="submit">
                      Sav{loading ? 'ing' : 'e'} adventure! 💾
                    </Button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateAdventure;
export { SINGLE_ADVENTURE_QUERY, UPDATE_ADVENTURE_MUTATION };
