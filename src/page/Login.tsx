import {useState} from "react";
import axios from "axios";
import {LOGIN} from "../common/constants/api.const";
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {userActions} from "../redux/slice/userSlice";
import {ROOT_PATH} from "../common/constants/path.const";

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
        login().then((res) => {
            console.log(res);
            console.log(res.headers);
            console.log(res.data);
            // dispatch(
            //     userActions.login({
            //         isLogin: true,
            //         user: {
            //             id: res.data.userId,
            //             nickname: res.data.nickname,
            //             email: res.data.email
            //         }
            //     })
            // );
            // const accessToken = res.headers.authorization_access;
            // const refreshToken = res.headers.authorization_refresh;
            // localStorage.setItem('accessToken', accessToken);
            // localStorage.setItem('refreshToken', refreshToken);
            //
            // navigate(ROOT_PATH, { replace: true });
        }).catch((err) => {
            console.log(err);
        })
    }

    const login = async () => {
        return await axios.post(LOGIN, {email, password});
    }

    return (
        <>
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