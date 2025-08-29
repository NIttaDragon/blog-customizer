import { CSSProperties, useState } from 'react';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from './index.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleArticleParamsChange = (newParams: Partial<ArticleStateType>) => {
		setArticleState((prevState) => ({ ...prevState, ...newParams }));
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={handleArticleParamsChange} />
			<Article />
		</main>
	);
};
