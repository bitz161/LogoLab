import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';
import enUS from 'antd/lib/locale-provider/en_US';
import App from './App';
import { register } from './serviceWorker';
import i18next from 'i18next';
import { i18nClient } from './i18n';

import { UserProvider } from './logoLab-Codes/utilities/context/user.context.jsx';
import { LogoProvider } from './logoLab-Codes/utilities/context/logos.context.jsx';
import { CommunityProvider } from './logoLab-Codes/utilities/context/community.context.jsx';

const antResources = {
	ko: koKR,
	'ko-KR': koKR,
	en: enUS,
	'en-US': enUS,
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const render = Component => {
	const rootElement = document.getElementById('root');
	ReactDom.render(
		<AppContainer>
			<LocaleProvider locale={antResources[i18next.language]}>
				<UserProvider>
					<CommunityProvider>
						<LogoProvider>
							<Component />
						</LogoProvider>
					</CommunityProvider>
				</UserProvider>
			</LocaleProvider>
		</AppContainer>,
		rootElement,
	);
};

i18nClient();

render(App);

register();
// TODO: Check later for the serviceWorker

if (module.hot) {
	module.hot.accept('./App', () => {
		render(App);
	});
}
