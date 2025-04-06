"use client";

import { useEffect, useState } from "react";

export function getUser() {
    const [user, setUser] = useState("");

    useEffect(() => {
        const getUser = JSON.parse(localStorage.getItem("user"))
        setUser(getUser)
    }, [setUser])

    return user
}

export function getToken() {
    const [token, setToken] = useState("");

    useEffect(() => {
        const getToken = localStorage.getItem("token")
        setToken(getToken)
    }, [setToken])

    return token
}