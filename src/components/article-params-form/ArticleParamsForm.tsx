import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { useState, useEffect, useRef } from 'react';

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
} from 'src/constants/articleProps';

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
	const [isOpen, setOpen] = useState(false);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		fontSizeOptions[0]
	);
	const [selectedFontType, setSelectedFontType] = useState<OptionType>(
		fontFamilyOptions[0]
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		fontColors[0]
	);
	const [selectedBgColor, setSelectedBgColor] = useState<OptionType>(
		backgroundColors[0]
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		contentWidthArr[0]
	);

	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setOpen(false);
				console.log('close');
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const openFunction = () => {
		setOpen(!isOpen);
	};

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
				isOpen={isOpen}
				onClick={() => {
					openFunction();
				}}
			/>
			<aside
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
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
								setSelectedFontSize(fontSizeOptions[0]);
								setSelectedFontType(fontFamilyOptions[0]);
								setSelectedFontColor(fontColors[0]);
								setSelectedBgColor(backgroundColors[0]);
								setSelectedContentWidth(contentWidthArr[0]);
								onChange({
									fontFamilyOption: fontFamilyOptions[0],
									fontSizeOption: fontSizeOptions[0],
									fontColor: fontColors[0],
									backgroundColor: backgroundColors[0],
									contentWidth: contentWidthArr[0],
								});
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
