import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// api
import axios from "@Core/axios";

// components
import Preloader from "@Core/components/Preloader";

const StaffListStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;

    a {
        display: block;
        img {
            width: 100%;
            display: block;
        }

        text-decoration: none;

        .name-plate {
            background-color: teal;
            padding: 10px;
            height: 90px;

            h3 {
                color: white;
                font-size: 24px;
                margin: 0px 0px 10px;
                line-height: 100%;
            }
            h4 {
                color: white;
                font-size: 16px;
                margin: 0px;
                line-height: 100%;
            }
        }
    }
`;

const StaffList = () => {
    const [staffMembers, setStaffMembers] = useState([]);

    useEffect(() => {
        const fetchStaff = async () => {
            const resp = await axios.get(`/staff`);
            setStaffMembers(resp.data);
        };

        fetchStaff();
    }, []);

    if (staffMembers.length === 0) return <Preloader />;

    return (
        <StaffListStyled>
            {staffMembers.map(({ id, src, name, accolades }) => {
                const role = accolades[0];

                return (
                    <Link key={id} to={`/staff/${id}`}>
                        <img src={src} alt={name} />
                        <div className="name-plate">
                            <h3>{name}</h3>
                            <h4>{role}</h4>
                        </div>
                    </Link>
                );
            })}
        </StaffListStyled>
    );
};

export default StaffList;
