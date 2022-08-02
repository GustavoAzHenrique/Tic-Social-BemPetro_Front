import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const CardHomeRevisor2 = () => {
  return (
    <div>
      <style type="text/css">
        {`
    .card{
      display: flex;
      align-items: center;
      justify-content: center;
      position: "relative"
      height: 20%
      border-radius: 50%;
      
     
    }
    .card-title {
      display: flex;
      position: "relative"
      align-items: center;
      justify-content: center;
      font-weight: bold;
      
    }
    .card-subtitle-um {
      font-weight: bold;
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      color: #51B5C5;
      font-size: 120%;
      border: 50px;
    }
    .card-subtitle-dois {
      font-weight: bold;
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      left: 10%;
      top: 10%;
    }
    .btn-dois {
      background-color: #EFEFEF;
      border-color: #51B5C5;
      
    }
    .card-body  {
      justify-content: center;
      border-radius: 50%;
      position: relative;
      align-items: center;
      
    }
    .card-img  {
      height: 20vh
      display: flex;
      position: "relative"
      align-items: center;
      justify-content: center;
  
    
    }
    .botoes {
      display: flex;
      position: relative;
      flexDirection: row;
      gap: 1.5vw;
  
    
    }
    .botoesdef {
      display: flex;
      alignItems: center;
      justifyContent: center;
      flexDirection: column;
    width: 30%;
    }
    .aprovado {
      width: 30%;
      height: 30%;;
      border-width: 30px; 
border-style: solid; 
border-color:  blue;
    }


    
    `}
      </style>

      <Card
        className=""
        style={{
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Body
          className=""
          style={{
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                border: "10rem",
              }}
            >
              <Card.Title style={{ display: "flex", marginBottom: "10%" }}>
                Card Title
              </Card.Title>
            </div>
            <Card.Img
              variant="top"
              src="https://marcas-logos.net/wp-content/uploads/2020/10/Bradesco-logo-500x281.png"
            />
            <div
              clasName="aprovado"
              style={{
                position: "relative",
                alignItems: "center",
                marginBottom: "5%",
                marginTop: "10%",
                justifyContent: "center",
                left: "1%",
                border: "10px",
              }}
            >
              <Card.Subtitle className="card-subtitle-um">
                Pendente
              </Card.Subtitle>
            </div>

            <div className="botoes">
              
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "20%",
                  position: "relative",
                  left: "39%",
                }}
              >
                <Button
                  className="btn-dois"
                  style={{
                    width: "4.5vw",
                    height: "9vh",
                    borderRadius: "100%",
                    position: "relative",
                    left: "0.6vw",
                  }}
                  variant="btn color #EFEFEF; "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-file-earmark-text"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                  </svg>
                </Button>
                <Card.Subtitle className="card-subtitle-dois">
                  INFO
                </Card.Subtitle>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
