// import { Button, Menu, Modal, Tooltip } from 'antd';
// import { ClickParam } from 'antd/lib/menu';
// import i18next from 'i18next';
// import React, { Component } from 'react';
// import { Flex } from '../flex';
// import { ShortcutHelp } from '../help';
// import Icon from '../icon/Icon';

// interface IProps {
// 	onChangeEditor: (param: ClickParam) => void;
// 	currentEditor: string;
// }

// class Title extends Component<IProps> {
// 	state = {
// 		visible: false,
// 	};

// 	componentDidMount() {
// 		if (globalThis) {
// 			(globalThis.adsbygoogle = globalThis.adsbygoogle || []).push({});
// 		}
// 	}

// 	handlers = {
// 		goGithub: () => {
// 			window.open('https://github.com/salgum1114/react-design-editor');
// 		},
// 		goDocs: () => {
// 			window.open('https://salgum1114.github.io/react-design-editor/docs');
// 		},
// 		showHelp: () => {
// 			this.setState({
// 				visible: true,
// 			});
// 		},
// 	};

// 	render() {
// 		const { visible } = this.state;
// 		return (
// 			<Flex
// 				style={{ background: 'linear-gradient(141deg,#23303e,#404040 51%,#23303e 75%)' }}
// 				flexWrap="wrap"
// 				flex="1"
// 				alignItems="center"
// 			>
// 				<Flex style={{ marginLeft: 10 }} flex="0 1 auto">
// 					<span style={{ color: '#fff', fontSize: 24, fontWeight: 500 }}>LogoLab</span>
// 				</Flex>
// 				<Flex style={{ marginLeft: 88 }}>
// 					<Menu
// 						mode="horizontal"
// 						theme="dark"
// 						style={{ background: 'transparent', fontSize: '16px' }}
// 						onClick={this.props.onChangeEditor}
// 						selectedKeys={[this.props.currentEditor]}
// 					>
// 						<Menu.Item key="community" style={{ color: '#fff' }}>
// 							Community
// 						</Menu.Item>
// 						<Menu.Item key="pricing" style={{ color: '#fff' }}>
// 							Pricing
// 						</Menu.Item>
// 						<Menu.Item key="imagemap" style={{ color: '#fff' }}>
// 							{i18next.t('imagemap.imagemap')}
// 						</Menu.Item>
// 						{/* <Menu.Item key="flow" style={{ color: '#fff' }}>{i18n.t('flow.flow')}</Menu.Item> */}
// 						{/* <Menu.Item key="hexgrid" style={{ color: '#fff' }}>
// 							{i18next.t('hexgrid.hexgrid')}
// 						</Menu.Item>
// 						<Menu.Item key="fiber" style={{ color: '#fff' }}>
// 							{i18next.t('fiber.fiber')}
// 						</Menu.Item> */}
// 					</Menu>
// 				</Flex>
// 				<Flex flex="1" justifyContent="flex-end">
// 					<ins
// 						className="adsbygoogle"
// 						style={{ display: 'inline-block', width: 600, height: 60 }}
// 						data-ad-client="ca-pub-8569372752842198"
// 						data-ad-slot="5790685139"
// 					/>
// 				</Flex>
// 				<Flex style={{ marginRight: 8 }} flex="0 1 auto">
// 					<span style={{ color: '#fff', fontSize: 24, fontWeight: 500 }}>LogoLab</span>
// 				</Flex>
// 				<Modal
// 					visible={visible}
// 					onCancel={() => this.setState({ visible: false })}
// 					closable={true}
// 					footer={null}
// 					width="50%"
// 				>
// 					<ShortcutHelp />
// 				</Modal>
// 			</Flex>
// 		);
// 	}
// }

// export default Title;

import React, { useState, useEffect, useContext } from 'react';
import { Menu, Modal } from 'antd';
import i18next from 'i18next';
import { Flex } from '../flex';
import { ShortcutHelp } from '../help';
import { signInWithGooglePopup, signOutUser } from '../../logoLab-Codes/utilities/firebase/firebase.js';
import { UserContext } from '../../logoLab-Codes/utilities/context/user.context.jsx';

const Title = ({ onChangeEditor, currentEditor }) => {
	const [visible, setVisible] = useState(false);

	const goGithub = () => {
		window.open('https://github.com/salgum1114/react-design-editor');
	};

	const goDocs = () => {
		window.open('https://salgum1114.github.io/react-design-editor/docs');
	};

	const showHelp = () => {
		setVisible(true);
	};

	useEffect(() => {
		if (globalThis) {
			(globalThis.adsbygoogle = globalThis.adsbygoogle || []).push({});
		}
	}, []);

	const { currentUser } = useContext(UserContext);

	const logGoogleUser = async () => {
		try {
			console.log('Login proceeding...');
			const response = await signInWithGooglePopup();
			console.log('User signed in:', response.user);
		} catch (error) {
			console.error('Error signing in with Google:', error);
		}
	};

	const logOutUser = async () => {
		try {
			await signOutUser();
			console.log('User signed out');
			// window.location.href = '/'; // Navigate after logout
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};

	return (
		<Flex
			style={{ background: 'linear-gradient(141deg,#23303e,#404040 51%,#23303e 75%)' }}
			flexWrap="wrap"
			flex="1"
			alignItems="center"
		>
			<Flex style={{ marginLeft: 10 }} flex="0 1 auto">
				<span style={{ color: '#fff', fontSize: 24, fontWeight: 500 }}>LogoLab</span>
			</Flex>
			<Flex style={{ marginLeft: 88 }}>
				<Menu
					mode="horizontal"
					theme="dark"
					style={{ background: 'transparent', fontSize: '16px' }}
					onClick={onChangeEditor}
					selectedKeys={[currentEditor]}
				>
					<Menu.Item key="home" style={{ color: '#fff' }}>
						LogoLab
					</Menu.Item>
					<Menu.Item key="pricing" style={{ color: '#fff' }}>
						Pricing
					</Menu.Item>
					<Menu.Item key="community" style={{ color: '#fff' }}>
						Community
					</Menu.Item>
					{currentUser && (
						<Menu.Item key="imagemap" style={{ color: '#fff' }}>
							{i18next.t('imagemap.imagemap')}
						</Menu.Item>
					)}
				</Menu>
			</Flex>
			<Flex flex="1" justifyContent="flex-end">
				<ins
					className="adsbygoogle"
					style={{ display: 'inline-block', width: 600, height: 60 }}
					data-ad-client="ca-pub-8569372752842198"
					data-ad-slot="5790685139"
				/>
			</Flex>
			<Flex style={{ marginRight: 8 }} flex="0 1 auto">
				{currentUser ? (
					<>
						<span style={{ color: '#fff', fontSize: 24, fontWeight: 500 }} onClick={logOutUser}>
							Logout
						</span>
					</>
				) : (
					<span style={{ color: '#fff', fontSize: 24, fontWeight: 500 }} onClick={logGoogleUser}>
						Login
					</span>
				)}
			</Flex>
			<Modal visible={visible} onCancel={() => setVisible(false)} closable={true} footer={null} width="50%">
				<ShortcutHelp />
			</Modal>
		</Flex>
	);
};

export default Title;
