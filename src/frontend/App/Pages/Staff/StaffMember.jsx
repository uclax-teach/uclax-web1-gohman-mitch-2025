import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// components
import Inset from "@Layout/Inset";
import BackLink from "@Core/components/Link/BackLink";

// styles
const StaffMemberStyled = styled.div`
    img {
        display: block;
        max-width: 300px;
    }
`;

const StaffMember = () => {
    const [member, setMember] = useState({});
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

    console.log({ member });

    const { name, src } = member;

    return (
        <Inset>
            <StaffMemberStyled>
                <h1>Staff Member Bio</h1>
                <BackLink href="/staff">Back to All Staff Members</BackLink>
                <img src={src} alt={name} />
                <h2>{name}</h2>
            </StaffMemberStyled>
        </Inset>
    );
};

export default StaffMember;
