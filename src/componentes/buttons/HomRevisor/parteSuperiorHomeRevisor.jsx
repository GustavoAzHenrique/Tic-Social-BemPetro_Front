import React, {useContext} from "react";
import { ThemeContext } from "../../../context/ThemeMode/style";

export default function ParteSuperiorHomeRevisor() {
  const { theme, ChangeTheme,btnSquare } = useContext(ThemeContext);
  return (
    <>
     <div style={{ width: "50%", textAlign: "center", justifyContent:"center" }}>
      <text
        style={{
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Perfil Revisor
      </text>
      </div>
    </>  
  );
}
