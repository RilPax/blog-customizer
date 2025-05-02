import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { FormEvent, useRef, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { useClickOutside } from './hooks/useClickOutside';

type ArticleParamsFormProps = {
	onChange: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [articleSettingsState, setArticleSettingsState] =
		useState(defaultArticleState);

	const containerRef = useRef<HTMLElement | null>(null);

	useClickOutside(containerRef, () => setIsFormOpen(false), isFormOpen);

	const handleClick = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleReset = () => {
		setArticleSettingsState(defaultArticleState);
		onChange(defaultArticleState);
	};

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		onChange(articleSettingsState);
	};

	const handleChange =
		(key: keyof typeof defaultArticleState) => (newOption: OptionType) => {
			setArticleSettingsState((prev) => ({
				...prev,
				[key]: newOption,
			}));
		};

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => {
					handleClick();
				}}
			/>
			<aside
				ref={containerRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form className={styles.form} onSubmit={(evt) => handleSubmit(evt)}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={articleSettingsState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name={''}
						options={fontSizeOptions}
						selected={articleSettingsState.fontSizeOption}
						title={'Размер шрифта'}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						selected={articleSettingsState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={articleSettingsState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						selected={articleSettingsState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
