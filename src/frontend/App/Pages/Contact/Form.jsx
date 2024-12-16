import { useState } from "react";
import CoreForm from "@Core/components/Form/Form";
import Input from "@Core/components/Form/Input/Input";
import TextArea from "@Core/components/Form/Input/TextArea";
import Button from "@Core/components/Form/Button/index";

// component
const Form = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userMessage, setUserMessage] = useState("");

    const userNameOnChange = (e) => {
        setUserName(e.target.value);
    };
    const userEmailOnChange = (e) => {
        setUserEmail(e.target.value);
    };
    const userMessageOnChange = (e) => {
        setUserMessage(e.target.value);
    };

    const onSubmit = async () => {
        console.log("Submitted form");
    };

    return (
        <CoreForm onSubmit={onSubmit}>
            <Input
                id="userName"
                labelText="Name"
                onChange={userNameOnChange}
                value={userName}
            />
            <Input
                id="userEmail"
                labelText="Email"
                inputType="email"
                onChange={userEmailOnChange}
                value={userEmail}
            />
            <TextArea
                id="userMessage"
                labelText="Message"
                onChange={userMessageOnChange}
                value={userMessage}
            />
            <Button type="submit">Send</Button>
        </CoreForm>
    );
};

export default Form;
