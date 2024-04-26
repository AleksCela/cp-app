import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "../store/userReducer";

const Navbar = ({ isAuthenticated }) => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<nav className='p-[16px] h-[100px]'>
			<div className='container mx-auto flex justify-between items-center '>
				<Link to='/' className='flex items-center'>
					<div className='mr-4'>
						<img
							src='https://static.wixstatic.com/media/2e2a49_b36f04ed78674e1d820af355d5aa768d~mv2.png/v1/fill/w_80,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2e2a49_b36f04ed78674e1d820af355d5aa768d~mv2.png'
							alt='Logo'
							className='w-20 h-auto'
						/>
					</div>
					<div>
						<p className='font-semibold text-lg'>
							Sistemi i Menaxhimit te Studenteve
						</p>
						<p className='text-sm text-orange-500'>High School</p>
					</div>
				</Link>
				<ul className='flex space-x-4'>
					{isAuthenticated ? (
						<>
							<li>
								<div
									onClick={handleLogout}
									className='flex gap-1 cursor-pointer'
								>
									<p>Dil</p>
									<LogoutIcon />
								</div>
							</li>
						</>
					) : (
						<>
							<li>
								<Link
									to='/'
									className='text-gray-700 hover:text-gray-500'
								>
									Indetifikohu
								</Link>
							</li>
							<li>
								<Link
									to='/register'
									className='text-gray-700 hover:text-gray-500'
								>
									Regjistrohu
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
};

export default Navbar;
