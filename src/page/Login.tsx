import React, {useState} from "react";
import axios, {AxiosResponse} from "axios";
import {LOGIN} from "../common/constants/api.const";
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {userActions} from "../redux/slice/userSlice";
import {ROOT_PATH} from "../common/constants/path.const";
import "../style/login.css";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (e: any) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const onChangePassword = (e: any) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const onSubmitLogin = (e: any) => {
        e.preventDefault();
        login(
            {email, password})
            .then((res) => {
                const data = res.data;
                console.log(data);
                dispatch(
                    userActions.login({
                        isLogin: true,
                        user: {
                            id: data.userId,
                            nickname: data.nickname,
                            email: data.email
                        }
                    }),
                );

                const accessToken = res.headers.authorization_access;
                const refreshToken = data.refreshToken;
                localStorage.setItem('Access', accessToken);
                localStorage.setItem('Refresh', refreshToken);
                alert("로그인에 성공했습니다.");
                navigate(ROOT_PATH, {replace: true});
            }).catch((err) => {
            alert("로그인에 실패했습니다.");
            window.location.reload();
        });
    }

    const login = async (data: { email: string; password: string }) => {
        return await axios.post(LOGIN, {email, password});
    }

    return (
        <>
            <div className={"container login-container"}>
                <div className={"header login-header"}>
                    <div className={"title login-title"}>로그인</div>
                </div>
                <div className={"login-input-container"}>
                    <div className={"email-container"}>
                        <label className={"login-label email-label"}>Email</label>
                        <input className={"login-input email-input"} placeholder="example@email.com" type="email" onChange={onChangeEmail}/>
                    </div>
                    <div className={"password-container"}>
                        <label className={"login-label password-label"}>Password</label>
                        <input className={"login-input password-input"} placeholder="password" type="password" onChange={onChangePassword}/>
                    </div>
                </div>
            </div>


            <Row>
                <Col xs={1} md={3}></Col>
                <Col md="12" lg="6">
                    <Card body style={{marginTop: "1rem", borderRadius: "10px"}}>
                        <CardHeader>
                            <h3 className="title d-inline">로그인</h3>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={onSubmitLogin}>
                                <Row>
                                    <FormGroup>
                                        <Col className="pe-md-1" md="6">
                                            <label>
                                                Email
                                            </label>
                                            <Input placeholder="example@email.com" type="email"
                                                   onChange={onChangeEmail}/>
                                        </Col>
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <FormGroup>
                                        <label>
                                            Password
                                        </label>
                                        <Input placeholder="password" type="password"
                                               onChange={onChangePassword}/>
                                    </FormGroup>
                                </Row>
                                <Button className="btn btn-primary" type="submit">로그인</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={1} md={3}></Col>
            </Row>
        </>
    )
}

export default Login;