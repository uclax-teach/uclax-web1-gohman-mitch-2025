import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// components
import Meta from "@Core/components/Meta";
import Inset from "@Layout/Inset";
import Breadcrumbs from "@Core/components/Link/Breadcrumbs";
import Preloader from "@Core/components/Preloader";

// styles
const StaffMemberStyled = styled.div`
    img {
        display: block;
        max-width: 300px;
    }
`;

const StaffMember = () => {
    const [member, setMember] = useState();
    const { staffId } = useParams();

    useEffect(() => {
        const fetch = async () => {
            const resp = await axios.get(
                `${import.meta.env.VITE_API_URL}/staff/${staffId}`
            );
            setMember(resp.data);
        };
        fetch();
    }, [staffId]);

    if (!member) return <Preloader />;

    const { name, src } = member;

    const crumbs = [
        { id: 1, href: "/staff", text: "All Staff" },
        { id: 2, text: "Staff Member" },
    ];

    return (
        <Inset>
            <StaffMemberStyled>
                <Meta pageTitle={`${name} :: Staff`} />
                <h1>Staff Member</h1>
                <Breadcrumbs crumbs={crumbs} />
                <img src={src} alt={name} />
                <h2>{name}</h2>
            </StaffMemberStyled>
        </Inset>
    );
};

export default StaffMember;
