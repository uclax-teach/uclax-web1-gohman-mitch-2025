import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// api
import axios from "@Core/axios";

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
            const resp = await axios.get(`/staff/${staffId}`);
            setMember(resp.data);
        };
        fetch();
    }, [staffId]);

    if (!member) return <Preloader />;

    const { name, src, yearStarted, accolades, bio } = member;

    const crumbs = [
        { id: 1, href: "/staff", text: "All Staff" },
        { id: 2, text: "Staff Member" },
    ];

    return (
        <main>
            <Inset>
                <StaffMemberStyled>
                    <Meta pageTitle={`${name} :: Staff`} />
                    <h1>Staff Member</h1>
                    <Breadcrumbs crumbs={crumbs} />
                    <img src={src} alt={name} />
                    <h2>{name}</h2>

                    <h3>Year Started: {yearStarted}</h3>

                    <h3>Accolades</h3>

                    <ul>
                        {accolades.map((accolade, idx) => {
                            return <li key={idx}>{accolade}</li>;
                        })}
                    </ul>

                    <div dangerouslySetInnerHTML={{ __html: bio }} />
                </StaffMemberStyled>
            </Inset>
        </main>
    );
};

export default StaffMember;
