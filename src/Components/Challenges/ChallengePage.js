import React, { useState } from "react"
import SideNav from "../Sidebar/SideNav";
import Nav from "../Navbar/Navbar";
import { Buffer } from "buffer";
import { IoMdNotifications } from "react-icons/io"
import { BiSearch } from "react-icons/bi"
import { Container, Row, Col, Card, CardTitle, CardBody, Button, CardImg, Form, FormGroup, InputGroup, Input} from "reactstrap";
import "./challenge.styles.scss"

const ChallengePage = () => {
    const [ fn, setFullname ] = useState({n: ""});
    const [ peerProfilePics, setPeerProfilePics ] = useState([]);
    const [ c, setC ] = useState(false);
    const [ peerId, setPeerId ] = useState("")
    const [ errorMess, setErrorMess ] = useState("");
    const [ e, setE ] = useState(false);

    const getAPeer = () => {
        const bearer = "Bearer " + localStorage.getItem("token")
        fetch(`https://localhost:3443/users/${fn.n}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        })
        .then((resp) => resp.json())
        .then((resp) => {
            console.log(resp.status);
            if (resp.success === true) {
                setE(false);
                setPeerId(resp.status[0]._id)
                userDetails(resp.status[0]._id)
            } else {
                setE(true);
                setErrorMess(resp.status)
            }
        })
        .catch(err => console.log(err));
    }

    const userDetails = (p) => {
        fetch(`https://localhost:3443/upload/${p}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((resp) => resp.json())
        .then((resp) => {
            if (resp.success === true) {
                setC(!c);
            }
            console.log(resp.status);
            setPeerProfilePics(resp.status)
        }, (err) => console.log(err)).catch(err => console.log(err));
    }

    const sendRequest = () => {
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`https://localhost:3443/request/${peerId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        })
        .then((resp) => resp.json())
        .then(resp => console.log(resp)).catch(err => console.log(err));
    }
    return(
        <div className="challengeComponent">
            <div className="sidebar"><SideNav /></div>
            <Container className="cha_container">
                <div className="challenge_body">
                    <Nav />
                </div>
                <div className="ch">
                    <p className="h1">Challenge your peers</p>
                    <div className="alarm d-block d-md-block d-lg-none ">
                        <div className="noti_count">{localStorage.getItem("number_of_notification")}</div>
                        <IoMdNotifications className="notify"/>
                    </div>
                </div>
                <Row className="challenge_row">
                    <Col sm="12" md="12" lg="5" className="challenge_col1" >
                        {c ? <div>
                                {
                                    peerProfilePics.map((data, key) => {
                                        return(
                                            <Card className="peer_card" key={key}>
                                                <CardBody className="peer_card_body">
                                                    <div style={{marginRight: "10px"}}>
                                                        <CardImg src={`data: ${data.pics.contentType};base64,${Buffer.from(data.pics.data.data).toString("base64")}`} alt="user profile picture" className="peer_card_img img-fluid" />
                                                    </div>
                                                   <div>
                                                        <CardTitle className="ptitle">Name: {fn.n}</CardTitle>
                                                        <p className="peer_card_description">My name is {fn.n} and am a programmer. I specializes in frontend web technologies. My github account user name is {data.githubname}. Follow me so we can work together on future projects.</p>
                                                        <div className="peer_card_btn">
                                                            <Button className="send_request" onClick={() => sendRequest()}>challenge</Button>
                                                        </div>
                                                   </div>
                                                </CardBody>
                                            </Card>
                                            
                                        )
                                    })
                                } </div>
                            
                            : 
                                <Card style={{border: "0px"}}>
                                    <CardImg className="challenge_img img-fluid" src={require("./img.jpeg")} alt="challenge image" />
                                </Card>
                        }
                    </Col>{/* 
                    <Col sm="12" md="12" lg="4"></Col> */}
                    <Col sm="12" md="12" lg="6" className="challenge_col2">
                        <div><p className="heading1">Do you know the person you want to send request to? search for the person in the search bar below</p>
                        <div className="challenge_form">
                            <Form>
                                <FormGroup>
                                    <InputGroup className="search_bar">
                                        <BiSearch />
                                        <Input type="text" placeholder="Search..." className="input-input" 
                                        onKeyDown={(event) => {if (event.key === 'Enter'){event.preventDefault();
                                            getAPeer();}}} onChange={(event) => 
                                            setFullname((prev) => {return {...prev, n: event.target.value }})}>
                                        </Input>
                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </div>
                        <div className={e ? "reveal" : "dontReveal"}>{errorMess}</div>
                        <p className="heading1">Or <br/> search at random by clicking the button below.</p>
                        <div className="btnDiv"><Button className="search_btn">Search at random</Button></div></div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ChallengePage;