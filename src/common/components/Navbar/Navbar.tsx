import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { logout } from '../../../common/utils/authentication/adminSlice'

const Navbar = () => {
    const navigate = useNavigate()
    const { userInfo } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    // Logout handler
    const logoutHandler = () => {
        dispatch(logout())
        navigate('/admin/login')
    }

    return (
        <div className='bg-white shadow-md'>
            <div className='flex h-14 md:h-20 items-center justify-between px-4 md:px-8'>
                <div className='flex item-center gap-2'>
                    {/* Logo */}
                    <img className='h-12 w-10 md:h-20 md:w-16' src="/logo.png" alt="TagZy Logo" />
                    <span className='invisible md:visible font-serif font-bold text-lg md:text-4xl py-2 md:py-4 text-lightGreen tracking-widest'>TagZy</span>
                </div>
                {(userInfo || localStorage.getItem('userId')) ? (
                    <div>
                        <button
                            type='button'
                            className='text-white bg-lightGreen hover:bg-darkGreen w-full font-medium rounded-lg text-md px-5 py-2.5 me-2 my-2 tracking-wide'
                            onClick={logoutHandler}
                        >
                            Logout
                        </button>
                    </div>
                ): (
                    <div className='flex item-center gap-2 mb-2'>
                        <button onClick={() => navigate('/privacyPolicy')} className='text-sm md:text-xl text-lightGreen tracking-ligth md:tracking-wide pr-2 font-serif'>About</button>
                        <button onClick={() => navigate('/privacyPolicy')} className='text-sm md:text-xl text-lightGreen tracking-ligth md:tracking-wide font-serif'>Contact Us</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar