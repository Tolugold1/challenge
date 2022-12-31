import React from "react"
import SideNav from "../Sidebar/SideNav";
import Nav from "../Navbar/Navbar";
import { BiSearch } from "react-icons/bi"
import { Container, Row, Col, Card, Button, CardImg, Form, FormGroup, InputGroup, Input} from "reactstrap";
import "./challenge.styles.scss"

const ChallengePage = () => {
    return(
        <div className="challengeComponent">
            <div className="sidebar"><SideNav /></div>
            <Container className="cha_container">
                <div className="challenge_body">
                    <Nav />
                </div>
                <p className="h1">Challenge your peers</p>
                <Row className="challenge_row">
                    <Col sm="12" md="12" lg="8" className="challenge_col1">
                        <Card>
                            <CardImg className="challenge_img img-fluid" src={require("./img.jpeg")} alt="challenge image" />
                        </Card>
                    </Col>
                    <Col sm="12" md="12" lg="4" className="challenge_col2">
                        <p className="heading1">Do you know the person you want to send request to? search for the person in the search bar below</p>
                        <div className="challenge_form">
                            <Form>
                                <FormGroup>
                                    <InputGroup className="search_bar">
                                        <BiSearch />
                                        <Input type="text" placeholder="Search..." className="input-input"></Input>
                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </div>
                        <p className="heading1">Or <br/> search at random by clicking the button below.</p>
                        <div className="btnDiv"><Button className="search_btn">Search at random</Button></div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ChallengePage;