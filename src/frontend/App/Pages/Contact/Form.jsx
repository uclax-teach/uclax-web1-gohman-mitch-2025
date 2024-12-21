import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

// api
import axios from "@Core/axios";

// components
import Message from "./Message";
import CoreForm from "@Core/components/Form/Form";
import Input from "@Core/components/Form/Input/Input";
import TextArea from "@Core/components/Form/Input/TextArea";
import Button from "@Core/components/Form/Button/index";

// component
const Form = () => {
    // hooks
    const { executeRecaptcha } = useGoogleReCaptcha();

    // state
    const [formStatus, setFormStatus] = useState({
        isProcessing: false,
        message: { isSuccess: false, text: "" },
    });
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userMessage: "",
    });

    // functions
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const onSubmit = async () => {
        setFormStatus({ isProcessing: true, message: "" });

        // make sure recpatcha is on before we try sending data
        if (!executeRecaptcha) {
            console.error("reCAPTCHA not yet available");
            setFormStatus({
                isProcessing: true,
                message: {
                    isSuccess: false,
                    text: "Error, please contact site admin.",
                },
            });
            return;
        }

        const token = await executeRecaptcha("contact_form");

        const postData = {
            ...formData,
            token,
        };

        const resp = await axios.post("/sendmail", postData);

        if (resp?.data?.success) {
            setFormStatus({
                isProcessing: false,
                message: {
                    isSuccess: true,
                    text: "Your message has been sent successfully.",
                },
            });
        } else {
            console.error({ resp });
            setFormStatus({
                isProcessing: false,
                message: {
                    isSuccess: false,
                    text: "There was an error in sending your message. Please check the form and try again.",
                },
            });
        }
    };

    return (
        <>
            <Message formStatus={formStatus} />
            {!formStatus.message.isSuccess && (
                <CoreForm onSubmit={onSubmit}>
                    <Input
                        id="userName"
                        labelText="Name"
                        onChange={onChange}
                        value={formData.userName}
                    />
                    <Input
                        id="userEmail"
                        labelText="Email"
                        inputType="text"
                        onChange={onChange}
                        value={formData.userEmail}
                    />
                    <TextArea
                        id="userMessage"
                        labelText="Message"
                        onChange={onChange}
                        value={formData.userMessage}
                    />
                    <Button type="submit" disabled={formStatus.isProcessing}>
                        {formStatus.isProcessing ? "Submitting..." : "Submit"}
                    </Button>
                </CoreForm>
            )}
        </>
    );
};

export default Form;
