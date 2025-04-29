import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from './constants/articleProps';
import { RadioGroup } from './ui/radio-group';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Select } from './ui/select';
import { Separator } from './ui/separator';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleSettings, setArticleSettings] = useState(defaultArticleState);
	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleChange =
		(key: keyof typeof defaultArticleState) => (newOption: OptionType) => {
			setArticleSettings((prev) => ({
				...prev,
				[key]: newOption,
			}));
		};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setArticleSettings(defaultArticleState);
	};

	const handleSubmit = () => {
		setArticleState(articleSettings);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onReset={handleReset} onSubmit={handleSubmit}>
				{
					<>
						<Select
							selected={articleSettings.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={handleChange('fontFamilyOption')}
						/>
						<RadioGroup
							name={''}
							options={fontSizeOptions}
							selected={articleSettings.fontSizeOption}
							title={'Размер шрифта'}
							onChange={handleChange('fontSizeOption')}
						/>
						<Select
							selected={articleSettings.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={handleChange('fontColor')}
						/>
						<Separator />
						<Select
							selected={articleSettings.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={handleChange('backgroundColor')}
						/>
						<Select
							selected={articleSettings.contentWidth}
							options={contentWidthArr}
							title='Ширина контента'
							onChange={handleChange('contentWidth')}
						/>
					</>
				}
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
