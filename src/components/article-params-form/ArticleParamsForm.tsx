import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { FormEvent, ReactElement, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	children: ReactElement;
	onReset?: () => void;
	onSubmit?: () => void;
};

export const ArticleParamsForm = ({
	children,
	onReset,
	onSubmit,
}: ArticleParamsFormProps) => {
	const [state, setState] = useState(false);

	const handleClick = () => {
		setState(!state);
	};

	const handleReset = () => {
		onReset?.();
	};

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		onSubmit?.();
	};

	return (
		<>
			<ArrowButton
				isOpen={state}
				onClick={() => {
					handleClick();
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: state })}>
				<form className={styles.form} onSubmit={(evt) => handleSubmit(evt)}>
					{children}
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
