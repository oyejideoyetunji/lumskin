import React from 'react';
import Layout from './components/layout'
import Products from './screens/products'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { setStoreData } from './store';
import { ICart, IPersonalizationDetails, StoreKey } from './lib/types';
import reducer from './reducers';

const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://pangaea-interviews.now.sh/api/graphql' }),
    cache: new InMemoryCache()
})

const store = createStore(reducer)

store.subscribe(() => {
    const { cart, currency, personalDetails } = store.getState()

    setStoreData<ICart>(StoreKey.CART, cart)
    setStoreData<string>(StoreKey.CURRENCY, currency)
    setStoreData<IPersonalizationDetails[]>(
        StoreKey.PERSONAL_DETAILS, personalDetails
    )
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
