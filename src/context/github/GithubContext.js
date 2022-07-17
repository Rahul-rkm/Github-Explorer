import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        isLoading: false
    }
    const [state, dispatch] = useReducer(githubReducer, initialState)

    // search users
    const searchUsers = async (text) => {
        setLoading();
        const params = new URLSearchParams({ q: text });
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`,);
        // {
        //     headers: {
        //         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        //         Authurization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        //         // "access-control-allow-origin": "*",
        //         // 'Access-Control-Allow-Methods': '*',
        //     }
        // });
        const { items } = await response.json();
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }
    // Get single user
    const getUser = async (login) => {
        setLoading();

        const response = await fetch(`${GITHUB_URL}/users/${login}`,);
        // {
        //     headers: {
        //         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        //         Authurization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        //         // "access-control-allow-origin": "*",
        //         // 'Access-Control-Allow-Methods': '*',
        //     }
        // });

        if (response.status === 404) {
            window.location = '/notfound'
        }
        else {
            const data = await response.json();
            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }
    }

    // Get user's repos
    const getUserRepos = async (login) => {
        setLoading();
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 20
        })
        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,);
        // {
        //     headers: {
        //         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        //         Authurization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        //         // "access-control-allow-origin": "*",
        //         // 'Access-Control-Allow-Methods': '*',
        //     }
        // });
        const data = await response.json();
        dispatch({
            type: 'GET_REPOS',
            payload: data,
        })
    }

    const clearUsers = () => {
        dispatch({ type: 'CLEAR_USERS' });
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    return <GithubContext.Provider value={{ users: state.users, user: state.user, repos: state.repos, isLoading: state.isLoading, fetchUsers: searchUsers, getUser, clearUsers, getUserRepos }} >
        {children}
    </GithubContext.Provider>
}

export default GithubContext;