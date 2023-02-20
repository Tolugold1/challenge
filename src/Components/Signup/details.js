import React, { useState } from "react";
import { Button, Col, Row, Card, CardBody, Form, FormGroup, Input, } from "reactstrap";
import "./sign.styles.scss";
import { GiSlumberingSanctuary } from "react-icons/gi";

const Details = () => {
    const [ value, setValue ] = useState({fullname: "", twittername: "", githubname: "", facebookname: ""});
    const [ file, setFile ] = useState({pics: []});

    const onFileUpload = () => {
        const bearer = "Bearer " + localStorage.getItem('token');
        const formData = new FormData();

        formData.append('pics', file.pics)
        formData.append("fullname", value.fullname);
        formData.append("twittername", value.twittername);
        formData.append("githubname", value.githubname);
        formData.append("facebookname", value.facebookname); 

        fetch("https://coral-fish-vest.cyclic.app/upload", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": bearer
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp)
            if (resp.success === true) {
                window.location.assign("https://challenge-tolugold1.vercel.app/signin")
             } else {
                window.location.assign("https://challenge-tolugold1.vercel.app/details")
             }
        })
        .catch(err => console.log(err))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onFileUpload()
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
                            <h2 style={{fontSize: "1em"}}>Please fill the form below</h2>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup className="card_form_group">
                                    <Input type="text" placeholder="Twitter username" className="input-input" name="twittername" onChange={handleChange}   />
                                </FormGroup>
                                <FormGroup className="card_form_group">
                                    <Input type="text" placeholder="github username" className="input-input" name="githubname" onChange={handleChange}   />
                                </FormGroup>
                                <FormGroup className="card_form_group">
                                    <Input type="text" placeholder="facebook username" className="input-input" name="facebookname" onChange={handleChange}   />
                                </FormGroup>
                                <FormGroup className="card_form_group">
                                    <Input type="file" placeholder="Upload your passport" className="input-input" name="pics" onChange={(e) => setFile(p => {return {...p, pics: e.target.files[0]}})}  required />
                                </FormGroup>
                                <Button type="submit" value="submit" className="form_submit_btn">Submit</Button>
                            </Form>
                            <div className="line">
                                <hr style={{width:"50%", marginRight: "4px"}}/>  <hr style={{width:"50%", marginLeft: "4px"}}/>
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

export default Details;