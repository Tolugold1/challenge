import React, { useState, useEffect } from "react";

export default function CardData(){
    const [data, setData] = useState(
        []
    );


    useEffect(() => {
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch("https://localhost:3443/upload", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        })
        .then((r) => r.json())
        .then((r) => {
            console.log(r)
            setData(r.status)
        })

    }, [])
    return data;
} 