var model = [
	{
		txt: 'Break text on every next word',
		font: 'italic 800 36px Arial, sans-serif',
		textAlign: 'center',
		lineBreak: 'word',
		lineHeight: "160%"
	},
	{
		txt: 'Center text block horizontally and vertically',
		font: 'bold 35px Arial, sans-serif',
		textAlign: 'center',
		verticalAlign: 'middle'
	},
	{
		txt: 'Resize text automatically to fill its padded container. Given "font" and "lineHeight" properties are ignored',
		textAlign: 'center',
		verticalAlign: 'middle',
		sizeToFill: true,
		paddingX: 10,
		paddingY: 30
	},
	{
		txt: 'Justify text lines takes effect only with "auto" break line. Single word lines are skipped',
		font: 'bold 40px Arial, sans-serif',
		paddingX: 20,
		paddingY: 20,
		verticalAlign: 'middle',
		textAlign: 'center',
		justifyLines: true
	},
	{
		txt: 'Apply text stroke is based on context settings',
		font: 'bold 40px Arial, sans-serif',
		textAlign: 'right',
		paddingX: 25,
		strokeText: true,
		lineHeight: '60px'
	},
	{
		txt: 'Use\n new line character "\\n"\n to break lines\nwhere needed',
		font: 'bold 30px Arial, sans-serif',
		verticalAlign: 'bottom',
		allowNewLine: true,
		lineHeight: '200%'
	}
];