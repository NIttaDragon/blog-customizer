import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { useState, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import { useClose } from 'src/hooks/useClose';

interface ArticleParamsFormProps {
	onChange: (
		newParams: Partial<{
			fontFamilyOption: OptionType;
			fontSizeOption: OptionType;
			fontColor: OptionType;
			contentWidth: OptionType;
			backgroundColor: OptionType;
		}>
	) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	onChange,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontType, setSelectedFontType] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [selectedBgColor, setSelectedBgColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const formRef = useRef<HTMLFormElement>(null);

	const togleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	//спасибо большое, за пример
	useClose({
		isOpen: isMenuOpen,
		onClose: togleMenu,
		rootRef: formRef,
	});

	const handleRadioChange = (option: OptionType) => {
		setSelectedFontSize(option);
	};

	const handleSelectFontTypeChange = (option: OptionType) => {
		setSelectedFontType(option);
	};

	const handleSelectFontColorChange = (option: OptionType) => {
		setSelectedFontColor(option);
	};

	const handleSelectBgColorChange = (option: OptionType) => {
		setSelectedBgColor(option);
	};

	const handleSelectContentWidthChange = (option: OptionType) => {
		setSelectedContentWidth(option);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		onChange({
			fontFamilyOption: selectedFontType,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBgColor,
			contentWidth: selectedContentWidth,
		});
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					togleMenu();
				}}
			/>
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}
				ref={formRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as={'p'} size={31} weight={800}>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						title='ШРИФТ'
						options={fontFamilyOptions}
						selected={selectedFontType}
						onChange={handleSelectFontTypeChange}></Select>
					<RadioGroup
						title='РАЗМЕР ШРИФТА'
						name='font'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={handleRadioChange}
					/>
					<Select
						title='ЦВЕТ ШРИФТА'
						options={fontColors}
						selected={selectedFontColor}
						onChange={handleSelectFontColorChange}></Select>
					<Separator />
					<Select
						title='ЦВЕТ ФОНА'
						options={backgroundColors}
						selected={selectedBgColor}
						onChange={handleSelectBgColorChange}></Select>
					<Select
						title='ШИРИНА КОНТЕНТА'
						options={contentWidthArr}
						selected={selectedContentWidth}
						onChange={handleSelectContentWidthChange}></Select>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setSelectedFontSize(defaultArticleState.fontSizeOption);
								setSelectedFontType(defaultArticleState.fontFamilyOption);
								setSelectedFontColor(defaultArticleState.fontColor);
								setSelectedBgColor(defaultArticleState.backgroundColor);
								setSelectedContentWidth(defaultArticleState.contentWidth);
								onChange(defaultArticleState);
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
