import { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	Paper,
	Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmationModal from "../components/ConfirmationModal";

const Students = () => {
	const [openModal, setOpenModal] = useState(false);
	const [selectedStudentId, setSelectedStudentId] = useState(null);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPages, setTotalPages] = useState(1);
	const [students, setStudents] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchStudents();
	}, [page, pageSize]);

	const fetchStudents = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3000/students?page=${page}&pageSize=${pageSize}`,
			);
			const { students, totalPages } = response.data;
			setStudents(students);
			setTotalPages(totalPages);
		} catch (error) {
			console.error("Error fetching students:", error);
		}
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage + 1);
	};

	const handleChangeRowsPerPage = (event) => {
		setPageSize(parseInt(event.target.value, 10));
		setPage(1);
	};
	const handleOpenModal = (studentId) => {
		setOpenModal(true);
		setSelectedStudentId(studentId);
	};

	const handleCloseModal = () => {
		setSelectedStudentId(null);
		setOpenModal(false);
	};

	const handleDelete = async () => {
		try {
			await axios.delete(
				`http://localhost:3000/students/${selectedStudentId}`,
			);
			setStudents((prevStudents) =>
				prevStudents.filter(
					(student) => student.id !== selectedStudentId,
				),
			);
		} catch (error) {
			console.error("Error deleting student:", error);
		} finally {
			setOpenModal(false);
		}
	};

	const tableHeaders = [
		"NID Studenti",
		"Emer Studenti",
		"Mbiemer Studenti",
		"Numri i lendeve te bera subscribe",
		"Modifiko",
		"Fshi",
	];

	return (
		<div className='flex flex-col justify-center items-center h-full'>
			<TableContainer
				sx={{
					"@media (min-width: 1024px)": {
						width: "70%",
					},
				}}
				component={Paper}
			>
				<Table>
					<TableHead>
						<TableRow>
							{tableHeaders.map((header, index) => (
								<TableCell key={index}>{header}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{students?.map((student) => (
							<TableRow key={student.id}>
								<TableCell>{student.NID}</TableCell>
								<TableCell>{student.name}</TableCell>
								<TableCell>{student.surname}</TableCell>
								<TableCell>
									{
										student.courses.filter(
											(course) => course.subscribed,
										).length
									}
								</TableCell>
								<TableCell>
									<Button
										startIcon={<EditIcon />}
										onClick={() =>
											navigate(
												`/student-details/${student.NID}`,
											)
										}
									>
										Modifiko
									</Button>
								</TableCell>
								<TableCell>
									<Button
										startIcon={<DeleteIcon />}
										onClick={() =>
											handleOpenModal(student.id)
										}
									>
										Fshi
									</Button>
									<ConfirmationModal
										open={openModal}
										onClose={handleCloseModal}
										onConfirm={handleDelete}
										message='Jeni I sigurt qe doni te fshini rekordin?!'
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10]}
				component='div'
				count={totalPages * pageSize}
				rowsPerPage={pageSize}
				page={page - 1}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	);
};

export default Students;
