// components
import Meta from "@Core/components/Meta";
import StaffList from "./StaffList";
import Inset from "@Layout/Inset";

const Staff = () => {
    return (
        <main>
            <Inset>
                <Meta pageTitle="Staff" />
                <h1>Staff</h1>
                <StaffList />
            </Inset>
        </main>
    );
};

export default Staff;
