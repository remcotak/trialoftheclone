import React, { Component } from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import {
  SearchStyles,
  SearchResults,
  SearchResult
} from '../components/styles/Search';

const SEARCH_ADVENTURES_QUERY = gql`
  query SEARCH_ADVENTURES_QUERY($searchTerm: String!) {
    adventures(where: { title_contains: $searchTerm }) {
      id
      title
    }
  }
`;

class AdventureSearch extends Component {
  state = {
    loading: false,
    isDirty: false,
    adventures: []
  };

  handleChange = debounce(async (e, client) => {
    // turn loading on
    this.setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_ADVENTURES_QUERY,
      variables: { searchTerm: e.target.value }
    });
    this.setState({
      adventures: res.data.adventures,
      loading: false,
      isDirty: true
    });
  }, 350);

  adventureToRoute = adventure => {
    Router.push({
      pathname: '/adventure',
      query: {
        id: adventure.id
      }
    });
  };

  render() {
    resetIdCounter();
    return (
      <SearchStyles loading={this.state.loading ? true : false}>
        <Downshift
          onChange={this.adventureToRoute}
          itemToString={adventure =>
            adventure === null ? '' : adventure.title
          }
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex
          }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: '🔍 Search for an adventure',
                      id: 'search',
                      onChange: e => {
                        e.persist();
                        this.handleChange(e, client);
                      }
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && this.state.isDirty && (
                <SearchResults>
                  {this.state.adventures.map((adventure, index) => {
                    return (
                      <SearchResult
                        {...getItemProps({ item: adventure })}
                        key={adventure.id}
                        highlighted={index === highlightedIndex}
                      >
                        {adventure.title}
                      </SearchResult>
                    );
                  })}
                  {!this.state.adventures.length && !this.state.loading && (
                    <SearchResult>
                      No results found for {inputValue}
                    </SearchResult>
                  )}
                </SearchResults>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default AdventureSearch;
