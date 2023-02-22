import React, { useState } from "react";
import { Button, Col, Row, Card, CardBody, Form, FormGroup, InputGroup, Input, FormText } from "reactstrap";
import "./sign.styles.scss";
import { GiSlumberingSanctuary } from "react-icons/gi";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { Link } from "react-router-dom";

const SignIn = () => {
    const [statedType, setstatedType] = useState(false);
    const [ value, setValue ] = useState({username:"", password:""});
    const [ respo, setRespo ] = useState("")
    const [ check, setCheck ] = useState(false)
    const type = statedType ? 'text' : 'password';

/*     const githubLogin =  async () => {
        fetch("https://coral-fish-vest.cyclic.app/users/auth/github/login", {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((resp) => { 
            console.log(resp); resp.json() })
        .then((resp) => {
            console.log(resp);
            if (resp.success) {
                localStorage.setItem('token', resp.token);
            }
            setRespo({user: resp.success, error: null});
        }).catch(err => {
        setRespo({user: false, error: err})})
    } */
    
    const postUserDetails = () => {
        const v = {
            username: value.username,
            password: value.password
        }
        fetch("https://localhost:3443/users/signin", {
            method: 'POST',
            body: JSON.stringify(v),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then((resp) => {
            console.log(resp)
            if (resp.success === true) {
                localStorage.setItem("token", resp.token);
                localStorage.setItem("myId", resp.userId)
                validateProfileInfo(resp.userId);
            } else {
                setRespo(resp.err.name + ': ' + resp.err.message)
                setCheck(!check)
            }
        }).catch(err => {
            setRespo(false)
        })
    }

    const validateProfileInfo = (p) => {
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`https://localhost:3443/upload/${p}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        })
        .then((resp) => resp.json())
        .then((resp) => {
            if (resp.success === true) { // authenticate and search if user has filled in the details form, if user details found, redirect to dashboard else redirect to details form page.
                setRespo(true);
                localStorage.setItem("userGitHubAcct", resp.status[0].githubname)
                window.location.assign("http://localhost:3001/dashboard")
            } else {
                window.location.assign("http://localhost:3001/details")
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        postUserDetails();
    }
    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setValue(prev => { 
            return{
                ...prev,
                [name]: value
            }
        })
    }

    return(
        <div className="Sign_up">
            <Row className="sign_row">
                <Col className="sign_col1" sm="12" md="6" lg="6">
                    <div className="col1_inner">
                        <div className="d-flex align-items-center name_heading" style={{'width': '25em'}}>
                            <GiSlumberingSanctuary className="ic_icon"/>
                            <h2 className="name">IChallenge</h2>
                        </div>
                        <div className="welcome_back">
                            <h2>Welcome back <br /> to IChallenge</h2>
                        </div>
                        <div className="text">
                            <p className="paragraph">
                                Stop wasting time with frustrating platforms.<br /> Build beautiful courses & contents with ease. Get started<br /> in minutes with our unique & simple authoring tool. 
                            </p>
                        </div>
                    </div>
                </Col>
                <Col className="sign_col2"  sm="12" md="6" lg="6">
                    <Card className="sign_form">
                        <CardBody className="sign_card_body">
                            <h2>Sign In</h2>
                            <p>Don't have an account? <Link to="/signUp" className="signup_link"> sign up</Link></p>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup className="card_form_group">
                                    <Input type="text" placeholder="Enter your username" className="input-input" name="username" onChange={handleChange} required />
                                </FormGroup>
                                <FormGroup className="card_form_group1">
                                    <InputGroup className="i_group" >
                                        <Input type={type} placeholder="password" className="input-input" onChange={handleChange} name='password' required />
                                        <AiFillEye className="eye" onClick={() => setstatedType(prev => !prev)}/>
                                    </InputGroup>
                                </FormGroup>
                                <div><FormText><a href="" className="f_password">Forgot password?</a></FormText></div>
                                <Button type="submit" value="submit" className="form_submit_btn">Submit</Button>
                            </Form>
                            <div className={check ? "errMess" : "hideit"}>{respo}</div>
                            <div className="line">
                                <hr style={{width:"50%", marginRight: "4px"}}/> or <hr style={{width:"50%", marginLeft: "4px"}}/>
                            </div>
                            <div className="auth-btn" /* onClick={githubLogin} */>
                                <Button className="git"><AiFillGithub  style={{width: "30px", height: "30px"}} /> Continue with GitHub</Button>
                            </div>
                            <hr />
                            <div className="c_write">
                                <p>Protected by recaptcha and subject to the  <span className="c_color">Fenkai Privacy Policy</span> and <span className="c_color">Terms of Service</span>.</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default SignIn