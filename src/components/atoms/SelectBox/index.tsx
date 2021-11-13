import { useState, MouseEvent } from 'react';
import {
	MenuItem,
	Menu,
	Button,
	Stack,
	Divider,
	ButtonBase,
} from '@mui/material';
import {
	ArrowDropDownTwoTone,
	ArrowDropUpTwoTone,
	DateRangeTwoTone,
} from '@mui/icons-material';
import { SelectBoxProps } from '@components/atoms/SelectBox/interfaces';
import fancyId from '@utils/fancyId';

const SelectBox = ({
	title,
	options,
	defaultValue,
	handleDateSelect,
	selectedValue,
}: SelectBoxProps): JSX.Element => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedIndex, setSelectedIndex] = useState({
		group: 2,
		item: 2,
	});
	const isSelectBoxOpen = Boolean(anchorEl);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItemClick = (
		event: MouseEvent<HTMLElement>,
		index: { group: number; item: number },
	) => {
		setSelectedIndex(() => index);
		handleDateSelect(index);
		setAnchorEl(null);
	};

	const renderMoreButton = (handleArrowClick) =>
		isSelectBoxOpen ? (
			<ArrowDropUpTwoTone />
		) : (
			<ArrowDropDownTwoTone onClick={handleArrowClick} />
		);

	const renderDatePickersMenuItems = () => (
		<div>
			<Stack
				direction="row"
				divider={<Divider orientation="vertical" flexItem />}
				spacing={2}
			>
				<Stack direction="row" spacing={2} sx={{ marginTop: 1 }}>
					<div>
						{options[0].map((option, index) => (
							<MenuItem
								key={fancyId()}
								value={option}
								onClick={(event) =>
									handleMenuItemClick(event, { group: 0, item: index })
								}
								selected={
									index === selectedIndex.item && selectedIndex.group === 0
								}
								sx={{ fontSize: 12 }}
							>
								{option}
							</MenuItem>
						))}
					</div>
					<div>
						{options[1].map((option, index) => (
							<MenuItem
								key={fancyId()}
								value={option}
								onClick={(event) =>
									handleMenuItemClick(event, { group: 1, item: index })
								}
								selected={
									index === selectedIndex.item && selectedIndex.group === 1
								}
								sx={{ fontSize: 12 }}
							>
								{option}
							</MenuItem>
						))}
					</div>
				</Stack>
			</Stack>
			<Divider sx={{ my: 0.5 }} />
			{options[2].map((option, index) => (
				<MenuItem
					key={fancyId()}
					value={option}
					onClick={(event) =>
						handleMenuItemClick(event, { group: 2, item: index })
					}
					selected={index === selectedIndex.item && selectedIndex.group === 2}
					sx={{ fontSize: 12, color: 'primary' }}
				>
					{option}
					<ButtonBase
						sx={{
							color: 'primary',
							marginLeft: 1,
						}}
					>
						<DateRangeTwoTone color="primary" />
					</ButtonBase>
				</MenuItem>
			))}
		</div>
	);

	return (
		<div>
			<Button
				id={`select-${title}`}
				aria-controls={`select-${title}`}
				aria-haspopup="true"
				aria-expanded={isSelectBoxOpen ? 'true' : undefined}
				onClick={handleClick}
				variant="outlined"
				size="small"
			>
				{selectedValue ?? defaultValue}
				{renderMoreButton(handleClick)}
			</Button>
			<Menu
				id="select-menu"
				aria-labelledby="select-menu-button"
				anchorEl={anchorEl}
				open={isSelectBoxOpen}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				MenuListProps={{
					'aria-labelledby': `select-${title}`,
					role: 'listbox',
				}}
			>
				{renderDatePickersMenuItems()}
			</Menu>
		</div>
	);
};

export default SelectBox;
