/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Row, Card, CardBody, Form, FormGroup, InputGroup, Input, FormText } from "reactstrap";
import "./sign.styles.scss";
import { Control, LocalForm } from "react-redux-form";
import { GiSlumberingSanctuary } from "react-icons/gi";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Login_user } from "../../redux/ActionCreator";
import Loading from "../Loading";

const SignIn = () => {
    const dispatch = useDispatch();
    const [statedType, setstatedType] = useState(false);
    const [ load, setLoad ] = useState(false)
    const [ details, setDetails ] = useState({username: "", password: ""})
    const type = statedType ? 'text' : 'password';
    
    const handleSubmit = (values) => {
        setLoad(true)
        dispatch(Login_user(values.username, values.password))
        console.log(values)
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
                            <LocalForm onSubmit={(values) => handleSubmit(values)}>
                                <FormGroup className="card_form_group">
                                    <Control.text model=".username" placeholder="Enter your username" className="input-input" name="username" required />
                                </FormGroup>
                                <FormGroup className="card_form_group1">
                                    <InputGroup className="i_group" >
                                        <Control.text model=".password" type={type} placeholder="password" className="input-input" name='password' required />
                                        <AiFillEye className="eye" onClick={() => setstatedType(prev => !prev)}/>
                                    </InputGroup>
                                </FormGroup>
                                <div><FormText><a href="#" className="f_password">Forgot password?</a></FormText></div>
                                <div className="sub_btn">
                                    <Button type="submit" value="submit" className="form_submit_btn">Submit</Button>
                                    <div className="loading">
                                        {load ? <Loading /> : null}
                                    </div>
                                </div>
                            </LocalForm>{/* 
                            <div className={check ? "errMess" : "hideit"}>{respo}</div> */}
                           {/*  <div className="line">
                                <hr style={{width:"50%", marginRight: "4px"}}/> or <hr style={{width:"50%", marginLeft: "4px"}}/>
                            </div> */}
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