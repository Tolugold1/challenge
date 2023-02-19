import React, { useState, useEffect } from "react"
import { Buffer } from "buffer";
import { IoMdNotifications } from "react-icons/io"
import { RiArrowRightSFill, RiArrowDownSFill } from "react-icons/ri"
import { BiSearch } from "react-icons/bi"
import { Container, Row, Col, Card, CardTitle, CardBody, Button, CardImg, Form, FormGroup, InputGroup, Input, Media } from "reactstrap";
import "./challenge.styles.scss"

const ChallengePage = () => {
    const [ fn, setFullname ] = useState({n: ""});
    const [ peerProfilePics, setPeerProfilePics ] = useState([]);
    const [ c, setC ] = useState(false);
    const [ peerId, setPeerId ] = useState("")
    const [ errorMess, setErrorMess ] = useState("");
    const [ e, setE ] = useState(false);
    const [ requestIsend, setRequestIsend ] = useState([]);
    const [ showRequest, setShowRequest ] = useState(false);
    const [ status, setStatus ] = useState([]);
    const [ noListYet, setNoListYet ] = useState("")
    const [ s, setS ] = useState(false);

    useEffect(() => {
        let s = []; 
        let stat = [];
        const notification = () => {
            const bearer = "Bearer " + localStorage.getItem("token");
            fetch("https://coral-fish-vest.cyclic.app/request", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                }
            })
            .then((resp) => resp.json())
            .then((resp) => {
                for (let i = 0; i <= resp.status.requestISend.length - 1; i++) {
                    getRequestISender(resp.status.requestISend[i]._id);
                    AcceptedRequestIsendStatus(resp.status.requestISend[i]._id);
                }
            }, (err) => console.log(err)).catch(err => console.log(err));
        };
        const getRequestISender = (id) => {
            fetch(`https://coral-fish-vest.cyclic.app/upload/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(resp => resp.json())
            .then((r) => {
                if (r.success === true) {
                    setS(true)
                    s.push(r.status[0])
                } else {
                    setS(false)
                    setNoListYet("You have not send a request to any user")
                }
            })
        };
        const AcceptedRequestIsendStatus = (id) => {
            const bearer = "Bearer " + localStorage.getItem("token");
            fetch(`https://coral-fish-vest.cyclic.app/accept/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp)
                if (resp.success === true) {
                    stat.push(resp.status)
                } else {
                    stat.push(resp.status);
                }
            })
        };
        setStatus(stat)
        setRequestIsend(s);
        notification();
    }, [])

    const getAPeer = () => {
        const bearer = "Bearer " + localStorage.getItem("token")
        fetch(`https://coral-fish-vest.cyclic.app/users/${fn.n}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        })
        .then((resp) => resp.json())
        .then((resp) => {
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
        fetch(`https://coral-fish-vest.cyclic.app/upload/${p}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((resp) => resp.json())
        .then((resp) => {
            if (resp.success === true) {
                setC(!c);
            }
            setPeerProfilePics(resp.status)
        }, (err) => console.log(err)).catch(err => console.log(err));
    }

    const sendRequest = () => {
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`https://coral-fish-vest.cyclic.app/request/${peerId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        })
        .then((resp) => resp.json())
        .then(resp => console.log(resp)).catch(err => console.log(err));
    }
    const func = () => { //  toggle the display of the list of request you send
        setShowRequest(!showRequest)
    }

    return(
        <Container className="challengeComponent">
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
                                                        <Button className="send_request" onClick={() => {alert("Request sent"); sendRequest(); setC(!c);}}>challenge</Button>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        
                                    )
                                })
                            } </div>
                        
                        : 
                        <Card className="default_card" style={{border: "0px"}}>
                            <CardImg className="challenge_img img-fluid" src={require("./img.jpeg")} alt="challenge image" />
                            <CardBody>
                                <div className="req_list_heading">
                                    <p style={{color: "#363b64", fontWeight: "600"}}>List of Request You Send </p> 
                                    <Button className="listOfreq" onClick={() => {func()}}>
                                        {showRequest ? < RiArrowDownSFill/> : <RiArrowRightSFill/> }
                                    </Button>
                                </div>
                                { showRequest ?
                                    
                                    <ul className="req_list">
                                        {s ? 
                                        <div>{
                                        requestIsend.map((data, key) => {
                                            return (
                                                <li className="lst"  key={key}>
                                                    <div className="reqSent">
                                                        <Media className="reqSentMedia">
                                                            <Media left middle className="sender_img">
                                                                <Media object src={`data:${data.pics.contentType};base64,${Buffer.from(data.pics.data.data).toString('base64')}`} alt="image of the individual I send request to" className="avatar"/>
                                                            </Media>
                                                            <Media body className="m_body">
                                                                <div className="req_txt">
                                                                    <p className="req_user_gitname">{data.githubname}<span className="github">@gitHub</span>
                                                                    </p>
                                                                </div>
                                                            </Media>
                                                        </Media>
                                                        
                                                        <div className="status_div">
                                                            {status.map((stat, key) => {
                                                                return (
                                                                    <div>{data.userId === stat.id ? <h3 className="status">{stat.stat}</h3> : null }</div>
                                                                )})}
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                        } </div> : <div>{noListYet}</div>
                                        }</ul>
                                    :
                                    <div>Click the button above to see the list</div>
                                }
                            </CardBody>
                        </Card>
                    }
                </Col>
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
    )
}

export default ChallengePage;