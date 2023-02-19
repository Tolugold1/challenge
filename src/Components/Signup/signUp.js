import React, { useState } from "react";
import { Button, Col, Row, Card, CardBody, Form, FormGroup, InputGroup, Input, FormText } from "reactstrap";
import "./sign.styles.scss";
import { GiSlumberingSanctuary } from "react-icons/gi";

import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";

const SignUp = () => {
    const [statedType, setstatedType] = useState(false);
    const [ value, setValue ] = useState({username:"", fullname: "", email: "", password:""});
    const [ respo, setRespo ] = useState({user: "", error: ""})
    const type = statedType ? 'text' : 'password';

    const postUserDetails = async () => {
        const v = {
            username: value.username,
            fullname: value.fullname,
            email: value.email,
            password: value.password
        }
        fetch("https://coral-fish-vest.cyclic.app/users/signup", {
            method: 'POST',
            body: JSON.stringify(v),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            setRespo({user: resp.success, error: null});
        })
        .catch(err => {
        setRespo({user: false, error: err})})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        postUserDetails()
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
                <Col className="sign_col1" sm="12" md="6" lg="6" >
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
                <Col sm="12" md="6" lg="6" className="sign_col2">
                    <Card className="sign_form">
                        <CardBody className="sign_card_body">
                            {respo.user && (<Navigate to="/signin" />)}
                            <h2>Sign Up</h2>
                            <p>Do you have an account? <Link to="/signIn" className="signup_link"> sign in</Link></p>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup className="card_form_group">
                                    <Input type="text" placeholder="Fullname" className="input-input" name="fullname" onChange={handleChange} required />
                                </FormGroup>
                                <FormGroup className="card_form_group">
                                    <Input type="text" placeholder="Username" className="input-input" name="username" onChange={handleChange} required />
                                </FormGroup>
                                <FormGroup className="card_form_group">
                                    <Input type="email" placeholder="Enter your email" className="input-input" name="email" onChange={handleChange}  required />
                                </FormGroup>
                                <FormGroup className="card_form_group1">
                                    <InputGroup className="i_group">
                                        <Input type={type} placeholder="password" className="input-input" name="password" onChange={handleChange} required />
                                        <AiFillEye className="eye" onClick={() => setstatedType(!statedType)}/>
                                    </InputGroup>
                                </FormGroup>
                                <div><FormText><a href="#" className="f_password">Forgot password?</a></FormText></div>
                                <Button type="submit" value="submit" className="form_submit_btn">Submit</Button>
                            </Form>
                            <div className="line">
                                <hr style={{width:"50%", marginRight: "4px"}}/> or <hr style={{width:"50%", marginLeft: "4px"}}/>
                            </div>
                            <div className="auth-btn">
                                <Button className="git"><AiFillGithub  style={{width: "30px", height: "30px"}}/> Continue with GitHub</Button>
                            </div>
                            <hr />
                            <div className="c_write">
                                <p>Protected by recaptcha and subject to the  <span className="c_color">Fenkai Privacy Policy</span> and <span className="c_color">Terms of Service.</span></p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default SignUp;