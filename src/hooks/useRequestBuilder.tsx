import {useContext, ReactNode} from 'react';
import rootContext from "../context/root/rootContext";
import {useFetch} from 'use-http';
import {Loader} from '../animations/loader/Loader';

type requestConfig = {
    loader?: ReactNode,
    payload?: object | [],
    method: 'get' | 'post' | 'del',
    endpoint: string,
    useLoader?: boolean
    loaderTimeout?: number;
    loaderTitle?: string;
};

export const useRequestBuilder = () => {
    const rootState = useContext(rootContext);
    const {get, post, del, response} = useFetch();

    const requestBuilder = async ({
                                   loader = <Loader/>,
                                   payload,
                                   method,
                                   endpoint,
                                   useLoader = true,
                                   loaderTimeout = 2000,
                                   loaderTitle = ''
                               }: requestConfig) => {
        if (!useLoader) {
            rootState?.setLoading(false);
        } else {
            rootState?.setLoading(true);
            rootState?.setLoader(loader);
            rootState?.setLoaderTitle(loaderTitle);
        }

        if (method === 'get' && payload) {
            throw new Error('Cannot use payload with "get" method');
        }

        switch (method) {
            case 'get':
                await get(endpoint);
                break;
            case 'post':
                await post(endpoint, payload);
                break;
            case 'del':
                await del(endpoint, payload);
                break;
        };

        if (response.data) {
            setTimeout(() => {
                rootState?.setLoading(false);
                rootState?.setLoaderTitle('');
            }, loaderTimeout);
        }

        return response;
    };

    return requestBuilder;
};

export default useRequestBuilder;