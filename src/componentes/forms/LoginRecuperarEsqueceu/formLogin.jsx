import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export const LoginInput = (props) => {
    return (
        <>
            <div className="embrulho-input" style={{
                width: "100%",
                position: "relative",
                padding: "5px",
            }}>
                <input className="input"
                style={{
                    fontSize: "15px",
                    lineHeight: "1.2",
                    border: "none",
                    display: "block",
                    width: "100%",
                    height: "52px",
                    padding: "5px",
                    borderRadius: "3.06px",
                    backgroundColor: "#fff",
                }}
                    type="email"
                    placeholder="Email"
                    value={props.dados.email}
                    onChange={(e) => [props.setDados({ ...props.dados, email: e.target.value })]} />

            </div>

            <div className="embrulho-input mt-2" style={{
                width: "100%",
                position: "relative",
                padding: "5px",
                
            }}>
                <input className="input"
                    style={{
                        fontSize: "15px",
                        lineHeight: "1.2",
                        border: "none",
                        display: "block",
                        width: "100%",
                        height: "52px",
                        padding: "5px",
                        borderRadius: "3.06px",
                        backgroundColor: "#fff",
                        
                    }}
                    type="password"

                    placeholder="Senha"
                    value={props.dados.senha}
                    onChange={(e) => [props.setDados({ ...props.dados, senha: e.target.value })]}
                />

            </div>

        </>
    )

}