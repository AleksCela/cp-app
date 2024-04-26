import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Checkbox,
} from "@mui/material";

const CourseTable = ({ student, handleCheckboxChange }) => {
	const headers = ["Lenda", "Subscribe", "Data", "Info te tjera"];
	return (
		<TableContainer>
			<Table className='w-full mb-4'>
				<TableHead className='bg-green-200'>
					<TableRow>
						{headers?.map((header, index) => (
							<TableCell key={index} className='text-white'>
								{header}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{student?.courses?.map((course, index) => (
						<TableRow key={index}>
							<TableCell>{course.name}</TableCell>
							<TableCell>
								<Checkbox
									checked={!!course.subscribed}
									onChange={() => handleCheckboxChange(index)}
								/>
							</TableCell>
							<TableCell>{course.subscribeDate}</TableCell>
							<TableCell>{course.otherInfo}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default CourseTable;
