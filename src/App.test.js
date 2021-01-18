import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from './App';
import Search from './components/Search/Search';
import RepoList from './components/RepoList/RepoList';

test('searching for "htmlstuff" results in the displayal of one card', () => {
  render(<App />);
  const search = render(<Search />);
  const repoList = render(<RepoList />);
  const searchInput = search.getByTestId('search-input');
  fireEvent.change(searchInput, { target: { value: 'htmlstuff' } });
  repoList.getByTestId('card');
});

test('searching for "s" results in the displayal of two cards', () => {
  render(<App />);
  const search = render(<Search />);
  const repoList = render(<RepoList />);
  const searchInput = search.getByTestId('search-input');
  fireEvent.change(searchInput, { target: { value: 's' } });
  expect(repoList.getAllByLabelText('card')).toHaveLength(2);
});