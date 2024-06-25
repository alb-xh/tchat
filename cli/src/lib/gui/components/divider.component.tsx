import React from 'react';
import { Box, Text } from 'ink';
import stringWidth from 'string-width';

// Helpers
const getSideDividerWidth = (width: number, titleWidth: number): number => (width - titleWidth) / 2;
const getNumberOfCharsPerWidth = (char: string, width: number): number => width / stringWidth(char);

const PAD = ' ';

type Props = {
  title?: string,
	width?: number,
	padding?: number,
	titlePadding?: number,
	titleColor?: string,
	dividerChar?: string,
	dividerColor?: string
};

const DEFAULT_PROPS = {
  title: null,
	width: 50,
	padding: 1,
	titlePadding: 1,
	titleColor: 'white',
	dividerChar: '─',
	dividerColor: 'grey'
};

// Divider
export const Divider = (props: Props) => {
  const {
    title,
    width,
    padding,
    titlePadding,
    titleColor,
    dividerChar,
    dividerColor,
  } = { ...DEFAULT_PROPS, ...(props ?? {}) };


	const titleString = title ?
		`${PAD.repeat(titlePadding) + title + PAD.repeat(titlePadding)}` :
		'';
	const titleWidth = stringWidth(titleString);

	const dividerWidth = getSideDividerWidth(width, titleWidth);
	const numberOfCharsPerSide = getNumberOfCharsPerWidth(
		dividerChar,
		dividerWidth
	);
	const dividerSideString = dividerChar.repeat(numberOfCharsPerSide);

	const paddingString = PAD.repeat(padding);

	return (
		<Box flexDirection="row">
			<Text>
				{paddingString}
				<Text color={dividerColor}>{dividerSideString}</Text>
				<Text color={titleColor}>{titleString}</Text>
				<Text color={dividerColor}>{dividerSideString}</Text>
				{paddingString}
			</Text>
		</Box>
	);
};