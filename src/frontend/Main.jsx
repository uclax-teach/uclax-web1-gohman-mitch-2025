import { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        const fetchStaff = async () => {
            const resp = await axios.get(
                `${import.meta.env.VITE_API_URL}/staff`
            );
            setStaff(resp.data);
        };

        fetchStaff();
    }, []);

    console.log({ staff });

    return <div>My React Application</div>;
};

export default Main;
