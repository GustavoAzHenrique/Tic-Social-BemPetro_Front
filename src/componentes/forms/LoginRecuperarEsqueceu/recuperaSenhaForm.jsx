import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export const RecuperarSenhaInput = ({dados, setDados}) => {

    return (
        <>
            <div className="embrulho-input" style={{
                width: "100%",
                position: "relative",
                padding: "5px",
                right: "0.45vw",
            }}>
                <input className="input"
                    style={{
                        position: "relative",
                        fontSize: "15px",
                        lineHeight: "1.2",
                        border: "none",
                        display: "block",
                        width: "100%",
                        height: "45px",
                        padding: "5px",
                        
                        borderRadius: "3.06px",
                        backgroundColor: "#fff",
                    }}
                    type="email"
                    placeholder="Email"
                    value={dados.email}
                    onChange={(e) => [setDados({ ...dados, email: e.target.value })]} />

            </div>

        </>
    )

}