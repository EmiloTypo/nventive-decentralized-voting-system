import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Candidates.css";
import empireIcon from "../images/empire.jpg";
import republicIcon from "../images/republic.png";
import "antd/dist/antd.css";
import { Popconfirm, message } from "antd";
import { url } from "../globalUrl";
import { Spin } from "antd";

export const partyIcons = {
  empire: empireIcon,
  republic: republicIcon,
};

export const partyNames = {
  empire: "Galactic Empire",
  republic: "New Republic",
};

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);

  let history = useHistory();

  useEffect(() => {
    fetch(url + "/results", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        setCandidates(result);
      });
  }, []);

  function confirm(can_id) {
    let id = localStorage.getItem("id");
    let cid = can_id + 1;

    const data = {
      voterID: parseInt(id),
      candidateID: cid,
    };
    console.log("data", data);

    fetch(url + "/vote", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("response", response);
        if (response["status"] === 201 || response["status"] === 200) {
          history.replace("/Voted");
          return response.json();
        } else {
          message.error("Already Voted!");
        }
      })
      .then((result) => {
        console.log("result", result);
      });
  }

  function cancel(e) {
    console.log(e);
    message.error("Cancelled by User");
  }

  return (
    <>
      <div className="candidates__ctr">
        <div className="candidates__header">
          <h1>Candidate List</h1>
        </div>
        <div className="candidates__body">
          <div className="candidates__cards">
            <div className="candidates__card__head">
              <div className="row_3">
                <h4>Logo</h4>
              </div>
              <div className="row_3">
                <h4>Candidate number</h4>
              </div>
              <div className="row_3">
                <h4>Candidate name</h4>
              </div>
              <div
                className="row_3"
                style={{ justifyContent: "flex-end" }}
              ></div>
            </div>
            {candidates.length === 0 ? (
              <div className="spinner">
                <Spin size="large" />
              </div>
            ) : (
              <>
                {candidates.map((result, index) => (
                  <div className="candidates__card" key={index}>
                    <div className="row_3">
                      <img
                        className="party__icon"
                        src={partyIcons[result?.[2]]}
                        alt="logo"
                      ></img>
                    </div>

                    <div className="row_3">
                      <h5>{result?.[1]}</h5>
                    </div>
                    <div className="row_3">
                      <h5>{partyNames[result?.[2]]}</h5>
                    </div>
                    <div
                      className="row_3"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <Popconfirm
                        title="Are you sure to vote this candidate?"
                        onConfirm={() => confirm(index)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                      >
                        <button className="btn btn-primary">VOTE</button>
                      </Popconfirm>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
