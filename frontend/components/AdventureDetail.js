import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import Form from './styles/Form';
import Button from './styles/Button';
import Error from './ErrorMessage';
import Weapons from './Weapons';

const SINGLE_ADVENTURE_QUERY = gql`
  query SINGLE_ADVENTURE_QUERY($id: ID!) {
    adventure(where: { id: $id }) {
      id
      title
      act
      page
      healthPoints
      maxHealthPoints
      charisma
      fighting
      wits
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
    $healthPoints: Int
    $maxHealthPoints: Int
    $charisma: Int
    $fighting: Int
    $wits: Int
  ) {
    updateAdventure(
      id: $id
      title: $title
      act: $act
      page: $page
      healthPoints: $healthPoints
      maxHealthPoints: $maxHealthPoints
      charisma: $charisma
      fighting: $fighting
      wits: $wits
    ) {
      id
      title
      act
      page
      healthPoints
      maxHealthPoints
      charisma
      fighting
      wits
    }
  }
`;

class AdventureDetail extends Component {
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
    await updateAdventure({
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
          if (error) return <p>Error: {error.message}</p>;

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
                        required
                      />
                    </label>
                    <div className="form__row">
                      <label htmlFor="act">
                        Act
                        <input
                          type="number"
                          name="act"
                          id="act"
                          placeholder="act"
                          defaultValue={data.adventure.act}
                          onChange={this.handleChange}
                          required
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
                          required
                        />
                      </label>
                    </div>
                    <h2>Stats</h2>
                    <div className="form__row">
                      <label htmlFor="healthPoints">
                        Health points
                        <input
                          type="number"
                          name="healthPoints"
                          id="healthPoints"
                          placeholder="healthPoints"
                          defaultValue={data.adventure.healthPoints}
                          onChange={this.handleChange}
                          required
                        />
                      </label>
                      <label htmlFor="maxHealthPoints">
                        Max health points
                        <input
                          type="number"
                          name="maxHealthPoints"
                          id="maxHealthPoints"
                          placeholder="maxHealthPoints"
                          defaultValue={data.adventure.maxHealthPoints}
                          onChange={this.handleChange}
                          required
                        />
                      </label>
                    </div>
                    <div className="form__row">
                      <label htmlFor="charisma">
                        Charisma
                        <input
                          type="number"
                          name="charisma"
                          id="charisma"
                          placeholder="charisma"
                          defaultValue={data.adventure.charisma}
                          onChange={this.handleChange}
                          required
                        />
                      </label>
                      <label htmlFor="fighting">
                        Fighting
                        <input
                          type="number"
                          name="fighting"
                          id="fighting"
                          placeholder="fighting"
                          defaultValue={data.adventure.fighting}
                          onChange={this.handleChange}
                          required
                        />
                      </label>
                      <label htmlFor="wits">
                        Wits
                        <input
                          type="number"
                          name="wits"
                          id="wits"
                          placeholder="wits"
                          defaultValue={data.adventure.wits}
                          onChange={this.handleChange}
                          required
                        />
                      </label>
                    </div>
                    <Weapons data={data} handleChange={this.handleChange} />
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

export default AdventureDetail;
export { SINGLE_ADVENTURE_QUERY, UPDATE_ADVENTURE_MUTATION };
