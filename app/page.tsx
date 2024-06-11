"use client";

import React, { useState } from "react";

export default function Home() {
  const [childName, setChildName] = useState("");
  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");

  const handleInputChange = (event: any) => {
    setChildName(event.target.value);
  };

  const registerName = async () => {
    try {
      const response = await fetch("/api/addName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: childName }),
      });

      const res = await response.json();
      setMessage(res?.data?.message);
      setErrorClass("alert alert-success");
      if (res?.data?.code !== 1) {
        setErrorClass("alert alert-danger");
      }
    } catch (error: any) {
      setMessage(error.message);
      setErrorClass("alert alert-danger");
    }
  };

  const checkName = async () => {
    try {
      const response = await fetch("/api/checkName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: childName }),
      });

      const res = await response.json();
      setMessage(res?.data?.message);
      setMessage(res?.data?.message);
      setErrorClass("alert alert-success");
      console.log(res.data)
      if (res?.data?.code !== 1) {
        setErrorClass("alert alert-danger");
      }
    } catch (error: any) {
      setMessage(error?.message);
      setErrorClass("alert alert-danger");
    }
  };

  return (
    <main className="text-center mt-4 col-md-3 mx-auto">
      <div className="form-group row">
        <div className="col-sm-8">
          <label className="col-form-label">Your child name</label>
          {message && (
            <div className={errorClass} role="alert">
              {message}
            </div>
          )}
          <input
            type="text"
            className="form-control"
            id="childName"
            placeholder="Enter your child's name"
            value={childName}
            onChange={handleInputChange}
          />
          <div className="mt-2">
            <button
              type="button"
              className="btn btn-primary"
              id="registerButton"
              style={{ marginRight: "10px" }}
              onClick={registerName}
            >
              Register
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              id="checkButton"
              onClick={checkName}
            >
              Check
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
