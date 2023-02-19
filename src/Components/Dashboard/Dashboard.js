import React, {useState, useEffect } from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import { PieData } from "./pie";
import { AiFillQuestionCircle } from "react-icons/ai";
import DChart from "./pieChart";
import  { BarData } from "./Bar";
import BarChart from "./BarChart";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { RiMessage2Fill } from "react-icons/ri";
import { TfiSharethisAlt } from "react-icons/tfi"
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md"
import "./Dashboard.styles.scss";


const DashboardPage = () => {
    const [ followersNumber, setFollowersNumber ] = useState("");
    const [ reposNumber, setReposNumber ] = useState("");
    const [ dailyCommit, setDailyCommit ] = useState([]);
    const [ weeklyCommit, setWeeklyCommit ] = useState([]);
    const [ reposNames, setRepoNames ] = useState([]);
    const [ commitsPerRepo, setCommitPerRepo ] = useState([]);
    useEffect(() => {
        const getUserGithubDetails = () => {
            const githubname = localStorage.getItem("userGitHubAcct")
            const bearer = "Bearer " + localStorage.getItem("token")
            fetch(`https://coral-fish-vest.cyclic.app/github/${githubname}`, {
                headers: {
                    "Content-Type": "application",
                    "Authorization": bearer
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                setFollowersNumber(resp.followers);
                setReposNumber(resp.public_repos)
            })
        };
    
        const repository = () => {
            console.log("resp")
            const githubname = localStorage.getItem("userGitHubAcct")
            const bearer = "Bearer " + localStorage.getItem("token")
            fetch(`https://coral-fish-vest.cyclic.app/repo/${githubname}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp)
                setRepoNames(resp);
                for (let i = 0; i <= resp.length - 1; i++) {
                    getNumberOfCommitPerRepo(resp[i].name)
                }
            })
        }
        let number = []
        const getNumberOfCommitPerRepo = (reponame) => {
            const githubname = localStorage.getItem("userGitHubAcct")
            fetch(`https://api.github.com/repos/${githubname}/${reponame}/commits`)
            .then(resp => resp.json())
            .then(resp => {
                setCommitPerRepo(resp.length)
                number.push({l: resp.length})
            })
        }
        setDailyCommit(number)
        getUserGithubDetails();
        repository();
        getDailyCommitStat();
    }, [])

    console.log("reposNames", reposNames)

    console.log("dailyCommit", dailyCommit)

    const getDailyCommitStat = () => {
        const githubname = localStorage.getItem("userGitHubAcct")
        const repoName = "challenge" /// the repo name to use, still gonna work on this
        const bearer = "Bearer " + localStorage.getItem("token")
        fetch(`https://coral-fish-vest.cyclic.app/github/${githubname}/${repoName}`, {
            headers: {
                "Content-Type": "application",
                "Authorization": bearer
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            setWeeklyCommit(resp)
        })
    };

    const [ pieData, setPieData ] = useState({
        labels: PieData.map((data) => data.label),
        datasets: [{
            label: "statistics",
            data: PieData.map((data) => data.data),
            backgroundColor: ["#FFC152", "#8BBFFD"],
            borderWidth: 10,
            borderColor: "#F0F0F0",
            hoverOffset: 0,
            radius: '70%',
            cutout: '75%'
        }]
    });

    const barData = {
        labels: reposNames.map((data) => data.name),
        datasets: [{
            label: "commits",
            data: dailyCommit.map((data) => data.l),
            backgroundColor: BarData.map(data => data.bg),
            barThickness: 12,
            borderRadius: 10
        }/* ,
        {
            label: "comments",
            data: dailyCommit.map((data) => data.l),
            backgroundColor: BarData1.map(data => data.bg),
            barThickness: 12,
            borderRadius: 10
        },
        {
            label: "shares",
            data: dailyCommit.map((data) => data.l),
            backgroundColor: BarData2.map(data => data.bg),
            barThickness: 12,
            borderRadius: 10
        } */]
    };

    return(
        <Container className="Dashboard">
            <Row>
                {/* fisrt colume for the number and chart*/}
                <Col lg="8" md="12" sm="12" className="col1">
                    <Row>
                        <Col lg="4" md="12" sm="12" className="user_numbers">
                            <Card className="card-card">
                                <CardBody className="body_B">
                                    <div className="head">
                                        <h5 className="head_text">Weekly Commit</h5>
                                        <AiFillQuestionCircle style={{color: "#CCCCCC", width: "30px", height: "30px"}}/>
                                    </div>
                                    <p className="stat">{ weeklyCommit }</p>
                                    <p className="graph"><BiTrendingUp  className="icon_bg"/> + 50,3% <span style={{color: "#CCCCCC"}}>vs last week</span></p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="4" md="12" sm="12" className="user_numbers">
                            <Card className="card-card">
                                <CardBody className="body_B">
                                    <div className="head">
                                        <h5  className="head_text">Followers</h5>
                                        <AiFillQuestionCircle style={{color: "#CCCCCC", width: "30px", height: "30px"}}/>
                                    </div>
                                    <p className="stat">{followersNumber}</p>
                                    <p className="graph"><BiTrendingUp  className="icon_bg"/> + 50,3% <span style={{color: "#CCCCCC"}}>vs last week</span></p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="4" md="12" sm="12" className="user_numbers">
                            <Card className="card-card">
                                <CardBody className="body_B">
                                    <div className="head">
                                        <h5  className="head_text">Repository</h5>
                                        <AiFillQuestionCircle style={{color: "#CCCCCC", width: "30px", height: "30px"}}/>
                                    </div>
                                    <p className="stat">{reposNumber}</p>
                                    <p className="graph1"><BiTrendingDown  className="icon_bg1"/> + 50,3% <span style={{color: "#CCCCCC"}}>vs last week</span></p>
                                </CardBody>
                            </Card>                             
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="12" md="12" sm="12">
                            <Card className="main_stat_card">
                                <CardBody>
                                    <p className="main_stat_heading">GitHub Statistics</p>
                                    <Row className="subheading">
                                        <Col className="avg_like">
                                            <div className="avg_like_icon"><BsFillSuitHeartFill className="like_icon"/></div>
                                            <div className="num">7.006 <span>+ 10,3 %</span>
                                                <p className="avg_text">number of commits</p>
                                            </div>
                                        </Col>
                                        <Col className="avg_like" >
                                            <div className="avg_comment_icon"><RiMessage2Fill className="comment_icon"/></div>
                                            <div className="comment_num">7.006 <span>+ 10,3 %</span>
                                                <p className="avg_comment">Avg comments this week</p>
                                            </div>
                                        </Col>
                                        <Col className="avg_like">
                                            <div className="avg_share_icon"><TfiSharethisAlt className="share_icon"/></div>
                                            <div className="share_num">7.006 <span>+ 10,3 %</span>
                                                <p className="avg_share">Avg share this week</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="barChrt">
                                        <BarChart data={barData} />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                {/* pie chart column */}
                <Col lg="4" md="12" sm="12" className="col2">
                    <Row>
                        <Col sm="12" md="12" lg="12">
                            <Card className="card-card1">
                                <CardBody className="body1">
                                    <div>
                                        <p className="stat_text">GitHub Statistics</p>
                                        <div className="pie-pie">
                                            <DChart data={pieData} />
                                        </div>
                                        <div className="chart_stat">
                                            <p className="chart_text">2,9 M </p>
                                            <div className="d-flex align-items-center chart_text1"><BiTrendingUp  className="icon_bg1" style={{width: "20px", height:"20px"}}/><span className="stat_stat">+ 300K</span></div>
                                        </div>
                                        <div className="male_stat">
                                            <p className="male-text">
                                                40 % <br /> <span style={{fontSize: '15px'}}>Male</span>
                                            </p>
                                        </div>
                                        <div className="stat_type">
                                            <div className="d-flex">
                                                <div className="male">
                                                    <div className="male_color"></div><p className="male_text">Male</p>
                                                </div>
                                                <div className="male">
                                                    <div className="female_color"></div> <p className="male_text">Female</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="btm_text" style={{color: "#CCCCCC"}}>Last 30 days <MdKeyboardArrowDown /> </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="12" lg="12">
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default DashboardPage;