import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import axios from "axios";
import styled from "styled-components";

const LoginContainer = styled.div`
    margin: 0 auto;
    width: 50%;
`;

function LoginForm() {
    const [username, setUsername] = useState("admin1");
    const [password, setPassword] = useState("adminpassword1");
    // const { login, isPending } = useLogin();

    async function handleSubmit(event) {
        event.preventDefault();
        if (!username || !password) return;

        const result = await axios.post("http://localhost:3000/login", {
            username,
            password,
        });
        console.log("🚀 ~ handleSubmit ~ result:", result);
        if (result.status === 200) {
            sessionStorage.setItem("token", result.data.token);
            window.location.href = "/";
        }
    }

    return (
        <LoginContainer>
            <Form onSubmit={handleSubmit}>
                <FormRowVertical label="Username">
                    <Input
                        type="text"
                        id="username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormRowVertical>
                <FormRowVertical label="Password">
                    <Input
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormRowVertical>
                <FormRowVertical>
                    <Button size="large">Login</Button>
                </FormRowVertical>
            </Form>
        </LoginContainer>
    );
}

export default LoginForm;
