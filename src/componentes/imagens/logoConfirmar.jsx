import React from 'react'
import logo from "../../img/bemPetroLogo.png";

export default function LogoConfirmar() {
  return (
    <span className="formato-titulo-login" >
                            <img style={{
                                width: "90%",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingBottom: "10%",
                                paddingLeft: "10%"
                            }}
                                src={logo} />
                        </span>
  )
}
