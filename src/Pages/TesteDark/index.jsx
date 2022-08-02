import React from "react";
export const TesteDark = () => {
    const chk = document.getElementById('chk');

    chk.addEventListener('change', () => {
        document.body.classList.toggle('dark');
    });
    
    return (
      <>
        <div>
        <style type="text/css">
        {`
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
	box-sizing: border-box;
}

body {
	background-color: #fafafa;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	margin: 0;
	transition: background 0.2s linear;
}

body.dark {
	background: #292C35;
}

.checkbox {
	opacity: 0;
	position: absolute;
}

.label {
	background-color: #111;
	border-radius: 50px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px;
	position: relative;
	height: 26px;
	width: 50px;
	transform: scale(1.5);
}

.label .ball {
	background-color: #fff;
	border-radius: 50%;
	position: absolute;
	top: 2px;
	left: 2px;
	height: 22px;
	width: 22px;
	transform: translateX(0px);
	transition: transform 0.2s linear;
}

.checkbox:checked + .label .ball {
	transform: translateX(24px);
}


.fa-moon {
	color: #f1c40f;
}

.fa-sun {
	color: #f39c12;
}

    
    `}
      </style>
      <div>
	<input type="checkbox" class="checkbox" id="chk" />
	<label class="label" for="chk">
		<i class="fas fa-moon"></i>
		<i class="fas fa-sun"></i>
		<div class="ball"></div>
	</label>
    </div>
</div>


      </>
    );
  };
  