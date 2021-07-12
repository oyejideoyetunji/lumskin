import React from 'react';
import Layout from './components/layout'
import Products from './screens/products'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://pangaea-interviews.now.sh/api/graphql' }),
    cache: new InMemoryCache()
})

function App() {
    return (
        <ApolloProvider client={client}>
            <Layout>
                <Products />
            </Layout>
        </ApolloProvider>
    );
}

export default App;
