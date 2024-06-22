// // import { Link } from 'react-router-dom';
// // import "./buttons.styles.scss";

// const Button = ({ buttonContent, onClick }) => {
// 	return (
// 		<button
// 			onClick={onClick}
// 			className={
// 				buttonContent === 'Discover'
// 					? 'button-28 buttonDiscover'
// 					: buttonContent === 'Subscribe'
// 					? 'button-28 buttonSubscribe'
// 					: 'button-28 buttonLogin'
// 			}
// 		>
// 			{/* {buttonContent === 'Discover' ? <Link to="/home">{buttonContent}</Link> : buttonContent} */}
// 		</button>
// 	);
// };

// export default Button;

import React, { Component } from 'react';
// import './buttons.styles.scss';

class Button extends Component {
	render() {
		const { buttonContent, onClick } = this.props;

		return (
			<button
				onClick={onClick}
				className={
					buttonContent === 'Discover'
						? 'button-28 buttonDiscover'
						: buttonContent === 'Subscribe'
						? 'button-28 buttonSubscribe'
						: 'button-28 buttonLogin'
				}
			>
				{/* {buttonContent === 'Discover' ? <Link to="/home">{buttonContent}</Link> : buttonContent} */}
			</button>
		);
	}
}

export default Button;
