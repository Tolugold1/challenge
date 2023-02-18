import React, { useState } from 'react';
import { Card, CardBody, Button, Container, Form, FormGroup, Input } from "reactstrap";
import './postschedule.styles.scss'


function PostSchedule() {

    const [ challengeValue, setChallengeValue ] = useState({reponame: ""})
    const [ day_num, setDay_num ] = useState()
    console.log(day_num)
    const handleSubmit = () => {
        const bearer = "Bearer " + localStorage.getItem("token")
        const obj = {
            day_number: day_num,
            reponame: challengeValue.reponame
        }

        fetch("https://localhost:3443/upload", {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        })
        .then(resp => {
            resp.json()
        })
    }
    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setChallengeValue(prev => { 
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <Container className='postSchedule'>
            <div className='post_form'>
                <div className='process'>
                    <p className='procedure'>Follow the following process to schedule challenge:</p>
                    <ol>
                        <li>Create a github repository you will use for the challenge period.</li>
                        <li>Make the repository public.</li>
                        <li>After step 1 and 2, fill in the below form by entering the number of days the project should last</li>
                        <li>and copy the repo name you created and paste it into the <em>Github repo name</em> below.</li>
                        <li>After executing the above steps, click the submit button to submit the form.</li>
                    </ol>
                </div>
                <Card className='post_card_form'>
                    <CardBody className='post_card_body'>
                        <Form onSubmit={handleSubmit} >
                            <FormGroup className="card_form_group">
                                <Input type="number" placeholder="Number of challenge days" className="input-input" name="challengeDays" onChange={(event) => setDay_num(event.target.value)} />
                            </FormGroup>
                            <FormGroup className="card_form_group">
                                <Input type="text" placeholder="Github repo name" className="input-input" name="reponame" onChange={handleChange} />
                            </FormGroup>
                            <Button type="submit" value="submit" className="form_submit_btn">Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </Container>
    )
}

export default PostSchedule