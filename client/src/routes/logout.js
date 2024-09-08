import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Logout = () => {
    const { dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://scholar-ship-api.vercel.app/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include" // Ensure cookies for session management
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json(); // Ensure the response is parsed as JSON
        })
        .then((data) => {
            if (data.redirect) {
                dispatch({ type: "USER", payload: false });
                navigate(data.redirect); // Redirect to login page
            } else {
                throw new Error('Logout response was not as expected');
            }
        })
        .catch((err) => {
            console.error('Fetch error:', err);
        });
    }, [dispatch, navigate]);

    return null; // No UI for this component
};

export default Logout;
