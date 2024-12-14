import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// components
import Inset from "@Layout/Inset";

// styles
const StaffMemberStyled = styled.div``;

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

    return (
        <Inset>
            <StaffMemberStyled>
                <h1>Staff: {member.name}</h1>
            </StaffMemberStyled>
        </Inset>
    );
};

export default StaffMember;
