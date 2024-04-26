import {
	TextField,
	Button,
	FormControl,
	Typography,
	FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/userReducer";
import { useState } from "react";

const schema = yup.object().shape({
	NID: yup.string().required("NID eshte i kerkuar"),
	password: yup.string().required("Fjalekalimi eshte i kerkuar"),
});

const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loginError, setLoginError] = useState(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				"http://localhost:3000/signin",
				data,
			);
			const userData = response.data;
			dispatch(login(userData));
			navigate("/students");
		} catch (error) {
			const errorMessage =
				error.response.data.error || "Something went wrong";
			setLoginError(errorMessage);
		}
	};

	return (
		<div className='flex flex-col lg:flex-row h-full pt-3'>
			<div className='lg:w-1/2 flex justify-center items-center p-8'>
				<div className='max-w-md w-full'>
					<h4 className='text-left mb-8 text-2xl'>
						Plotesoni te dhenat e meposhtme per t&apos;u
						identifikuar ne sistemin e menaxhimit te studenteve:
					</h4>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormControl
							fullWidth
							variant='outlined'
							size='small'
							error={!!errors.NID}
						>
							<Typography>NID student</Typography>
							<TextField
								size='small'
								id='nid'
								{...register("NID")}
							/>
							<FormHelperText>
								{errors.NID?.message}
							</FormHelperText>
						</FormControl>
						<FormControl
							fullWidth
							variant='outlined'
							size='small'
							error={!!errors.password}
						>
							<Typography>Fjalekalimi</Typography>
							<TextField
								id='fjalekalimi'
								type='password'
								size='small'
								{...register("password")}
							/>
							<FormHelperText sx={{ color: "red" }}>
								{errors.password?.message || loginError}
							</FormHelperText>
						</FormControl>
						<div className='flex justify-between items-center mt-4'>
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
								Indetifikohu
							</Button>
							<div>
								Nuk jeni i regjistruar?
								<Link to='/register' className='underline'>
									Regjistrohu tani
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
			<img
				className='object-cover object-center lg:w-1/2 h-full rounded-tl-2xl'
				src='https://static.wixstatic.com/media/da73d02f0c124d16bc6f4ad456ce9b5f.jpg/v1/fill/w_832,h_852,fp_0.49_0.48,q_85,usm_0.66_1.00_0.01,enc_auto/da73d02f0c124d16bc6f4ad456ce9b5f.jpg'
				alt='Students Taking Exams'
			/>
		</div>
	);
};

export default LoginPage;
