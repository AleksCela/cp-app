import {
	Button,
	FormControl,
	Typography,
	TextField,
	FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
	NID: yup.string().required("NID Studenti eshte i kerkuar"), //dokumenti thoshte karakter...
	password: yup
		.string()
		.required("Fjalekalimi eshte i kerkuar")
		.matches(
			/^(?=.*[A-Z])(?=.*\d).{8,}$/,
			"Fjalekalimi duhet te permbaje te pakten nje germe te madhe, nje numer, dhe te jete jo me pak se 8 karaktere",
		),
	name: yup.string(),
	surname: yup.string(),
});

const RegisterPage = () => {
	const [registrationError, setRegistrationError] = useState(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		try {
			await axios.post("http://localhost:3000/register", data);
			toast.success("Regjistrimi u krye me sukses!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			reset();
		} catch (error) {
			const errorMessage =
				error.response.data.error || "Something went wrong";
			setRegistrationError(errorMessage);
		}
	};

	return (
		<div className='flex flex-col h-full pt-3 items-center'>
			<div className='lg:w-1/2 flex flex-col justify-center items-center mb-6'>
				<h4 className='text-2xl mb-4'>
					Plotesoni te dhenat e meposhtme per tu rregjistruar ne
					sistemin e menaxhimit te studenteve:
				</h4>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='flex space-x-4 items-center'>
						<div>
							<FormControl
								fullWidth
								variant='outlined'
								size='small'
								error={!!errors.NID}
							>
								<Typography>NID Studenti*</Typography>
								<TextField
									size='small'
									id='nid'
									{...register("NID")}
								/>
								<FormHelperText
									sx={{ width: "100%", color: "red" }}
								>
									{errors.NID?.message || registrationError}
								</FormHelperText>
							</FormControl>
							<FormControl
								fullWidth
								variant='outlined'
								size='small'
								error={!!errors.password}
							>
								<Typography>Fjalekalimi*</Typography>
								<TextField
									size='small'
									id='password'
									type='password'
									{...register("password")}
								/>
								<FormHelperText>
									{errors.password?.message}
								</FormHelperText>
							</FormControl>
						</div>
						<div>
							<FormControl
								fullWidth
								variant='outlined'
								size='small'
								error={!!errors.name}
							>
								<Typography>Emer Studenti</Typography>
								<TextField
									size='small'
									id='name'
									{...register("name")}
								/>
								<FormHelperText>
									{errors.name?.message}
								</FormHelperText>
							</FormControl>
							<FormControl
								fullWidth
								variant='outlined'
								size='small'
							>
								<Typography>Mbiemer Studenti</Typography>
								<TextField
									size='small'
									id='surname'
									{...register("surname")}
								/>
								<FormHelperText>
									{errors.surname?.message}
								</FormHelperText>
							</FormControl>
						</div>
						<div>
							<Button
								type='submit'
								variant='contained'
								sx={{
									backgroundColor: "black",
									color: "white",
									borderRadius: 0,
									"&:hover": {
										backgroundColor: "#161616",
									},
								}}
							>
								Regjistrohu
							</Button>
						</div>
						<div>
							<Link className='underline' to={"/"}>
								Anullo
							</Link>
						</div>
					</div>
				</form>
			</div>
			<img
				className='object-cover object-center h-full rounded-t-2xl'
				src='https://static.wixstatic.com/media/11062b_e3b7ae7a8ed7417d8a4a0c73a4c746c2~mv2.jpg/v1/fill/w_1663,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_e3b7ae7a8ed7417d8a4a0c73a4c746c2~mv2.jpg'
				alt='Students Walking in School'
			/>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
				transition:Bounce
			/>
		</div>
	);
};

export default RegisterPage;
