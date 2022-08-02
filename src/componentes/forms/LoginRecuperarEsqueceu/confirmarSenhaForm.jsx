import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export const ConfirmarSenhaInput = () => {

    const [dados, setDados] = useState({
        novaSenha: "",
        senha: "",
    });

    return (
        <>

            <div className="embrulho-input mt-3" style={{
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
                    type="senha"
                    placeholder="Senha"
                    value={dados.senha}
                    onChange={(e) => [setDados({ ...dados, senha: e.target.value })]}
                />

            </div>

            <div className="embrulho-input mt-1" style={{
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
                       
                        borderRadius: "3.06px",
                        backgroundColor: "#fff",

                    }}
                    type="senha"
                    placeholder="Repita a nova senha"
                    value={dados.novaSenha}
                    onChange={(e) => [setDados({ ...dados, novaSenha: e.target.value })]}
                />

            </div>


        </>
    )

}