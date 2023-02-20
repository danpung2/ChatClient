import {useState} from "react";
import axios from "axios";
import {JOIN} from "../common/constants/api.const";
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {LOGIN_PATH, ROOT_PATH} from "../common/constants/path.const";
import {useDispatch} from "react-redux";
import {userActions} from "../redux/slice/userSlice";

function Join(){
    const navigate = useNavigate();

    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeNickname = (e: any) => {
        e.preventDefault();
        setNickname(e.target.value);
    }

    const onChangeEmail = (e: any) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const onChangePassword = (e: any) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const onSubmitJoin = (e:any) => {
        e.preventDefault();
        join().then((res) => {
            alert("회원가입에 성공하였습니다. 로그인을 해주세요.");
            navigate(LOGIN_PATH);
        }).catch((err) => {
            alert("회원가입에 실패하였습니다.");
            window.location.reload();
        })
    }

    const join = async () => {
        return await axios.post(JOIN, {nickname, email, password});
    }

    return (
        <>
            <Row>
                <Col xs={1} md={3}></Col>
                <Col md="12" lg="6">
                    <Card body style={{marginTop: "1rem", borderRadius: "10px"}}>
                        <CardHeader>
                            <h3 className="title d-inline">회원가입</h3>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={onSubmitJoin}>
                                <Row>
                                    <FormGroup>
                                        <Col className="pe-md-1" md="6">
                                            <label>
                                                Nickname
                                            </label>
                                            <Input placeholder="example" type="text"
                                                   onChange={onChangeNickname}/>
                                        </Col>
                                    </FormGroup>
                                </Row>
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
                                <Button className="btn btn-primary" type="submit">회원가입</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={1} md={3}></Col>
            </Row>
        </>
    )
}

export default Join;