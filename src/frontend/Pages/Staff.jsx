import { useState, useEffect } from "react";
import axios from "axios";

const Staff = () => {
    const [staffMembers, setStaffMembers] = useState([]);

    useEffect(() => {
        const fetchStaff = async () => {
            const resp = await axios.get(
                `${import.meta.env.VITE_API_URL}/staff`
            );
            setStaffMembers(resp.data);
        };

        fetchStaff();
    }, []);

    console.log({ staffMembers });

    return (
        <div>
            <h1>Staff</h1>
            {staffMembers.map((staffMember) => {
                return (
                    <img
                        key={staffMember.id}
                        src={staffMember.src}
                        alt={staffMember.name}
                    />
                );
            })}
        </div>
    );
};

export default Staff;
