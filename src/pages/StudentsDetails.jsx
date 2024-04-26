import { useEffect, useState } from "react";
import { TextField, Typography, Button, Grid } from "@mui/material";
import CourseTable from "../components/CourseTable";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const StudentDetails = () => {
	const { NID } = useParams();
	const [student, setStudent] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchStudent = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/students/${NID}`,
				);
				setStudent(response.data);
			} catch (error) {
				console.error("Error fetching student:", error);
			}
		};

		fetchStudent();
	}, [NID]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setStudent((prevStudent) => ({
			...prevStudent,
			[name]: value,
		}));
	};

	const handleCheckboxChange = (index) => {
		const updatedCourses = [...student.courses];
		updatedCourses[index].subscribed = !updatedCourses[index].subscribed;
		updatedCourses[index].subscribeDate = updatedCourses[index].subscribed
			? new Date().toISOString().split("T")[0]
			: null;
		setStudent((prevStudent) => ({
			...prevStudent,
			courses: updatedCourses,
		}));
	};

	const handleSaveChanges = async () => {
		console.log(student);
		if (!isPasswordValid(student.password)) {
			console.error("Password is not valid");
			return;
		}

		if (!isGradeValid(student.grade)) {
			console.error("Grade is not valid");
			return;
		}

		try {
			await axios.put(`http://localhost:3000/edit`, student);
			navigate("/students");
		} catch (error) {
			console.error("Error saving changes:", error);
		}
	};

	const isPasswordValid = (password) => {
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
		return passwordRegex.test(password);
	};

	const isGradeValid = (grade) => {
		if (grade === null) {
			return true;
		}
		const gradeRegex = /^(10(\.0{1,2})?|[0-9](\.\d{1,2})?)$/;
		return gradeRegex.test(grade);
	};

	if (!student) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<div className='container mx-auto w-2/3'>
			<div className='mb-4'>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Typography
								variant='subtitle1'
								component='label'
								htmlFor='nid'
								style={{ width: "120px" }}
							>
								NID Studenti
							</Typography>
							<TextField
								fullWidth
								id='nid'
								value={student.NID}
								InputProps={{ readOnly: true }}
								variant='outlined'
							/>
						</div>
					</Grid>
					<Grid item xs={12} sm={6}>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Typography
								variant='subtitle1'
								component='label'
								htmlFor='grade'
								style={{ width: "120px" }}
							>
								Nota mesatare
							</Typography>
							<TextField
								fullWidth
								id='grade'
								name='grade'
								value={student.grade}
								onChange={handleChange}
								variant='outlined'
								error={!isGradeValid(student.grade)}
								helperText={
									!isGradeValid(student.grade) &&
									"Nota duhet te jete nga 1 deri ne 10"
								}
							/>
						</div>
					</Grid>
					<Grid item xs={12} sm={6}>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Typography
								variant='subtitle1'
								component='label'
								htmlFor='name'
								style={{ width: "120px" }}
							>
								Emer
							</Typography>
							<TextField
								fullWidth
								id='name'
								name='name'
								value={student.name}
								onChange={handleChange}
								variant='outlined'
							/>
						</div>
					</Grid>
					<Grid item xs={12} sm={6}>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Typography
								variant='subtitle1'
								component='label'
								htmlFor='surname'
								style={{ width: "120px" }}
							>
								Mbiemer
							</Typography>
							<TextField
								fullWidth
								id='surname'
								name='surname'
								value={student.surname}
								onChange={handleChange}
								variant='outlined'
							/>
						</div>
					</Grid>
					<Grid item xs={12} sm={6}>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Typography
								variant='subtitle1'
								component='label'
								htmlFor='profession'
								style={{ width: "120px" }}
							>
								Profesioni i deshiruar
							</Typography>
							<TextField
								fullWidth
								id='profession'
								name='profession'
								value={student.profession}
								onChange={handleChange}
								variant='outlined'
							/>
						</div>
					</Grid>
					<Grid item xs={12} sm={6}>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Typography
								variant='subtitle1'
								component='label'
								htmlFor='password'
								style={{ width: "120px" }}
							>
								Fjalekalimi
							</Typography>
							<TextField
								fullWidth
								id='password'
								name='password'
								value={student.password}
								onChange={handleChange}
								variant='outlined'
								error={!isPasswordValid(student.password)}
								helperText={
									!isPasswordValid(student.password) &&
									"Passwordi duhet te jete te pakten 8 karaktere, te kete nje numer dhe 1 shkronje kapitale"
								}
							/>
						</div>
					</Grid>
					<Grid item xs={12}>
						<Typography
							variant='subtitle1'
							component='label'
							htmlFor='education'
							sx={{ textAlign: "center", width: "100%" }}
						>
							Te dhena te pergjithshme te shkollimit
						</Typography>
						<TextField
							fullWidth
							id='education'
							name='education'
							value={student.education}
							onChange={handleChange}
							variant='outlined'
							multiline
							rows={4}
						/>
					</Grid>
				</Grid>
			</div>

			<Typography variant='h4' className='mt-6 mb-4 text-center'>
				Tabela e lendeve
			</Typography>
			<CourseTable
				student={student}
				handleCheckboxChange={handleCheckboxChange}
			/>
			<div className='flex gap-4 items-center'>
				<Button
					variant='contained'
					color='success'
					onClick={handleSaveChanges}
				>
					Save Changes
				</Button>
				<Link to={"/students"} className='underline'>
					Anullo
				</Link>
			</div>
		</div>
	);
};

export default StudentDetails;
