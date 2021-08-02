import React from 'react';
import Layout from './components/layout'
import Products from './screens/products'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer, { updateLocalStore } from './reducers';

const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://pangaea-interviews.now.sh/api/graphql' }),
    cache: new InMemoryCache()
})

const store = createStore(reducer)

store.subscribe(() => {
    updateLocalStore(store.getState())
})

function App() {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Layout>
                    <Products />
                </Layout>
            </Provider>
        </ApolloProvider>
    );
}

export default App;
