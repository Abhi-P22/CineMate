import React, { useContext } from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { IoLogoClosedCaptioning } from "react-icons/io";
import { SiAwesomelists } from "react-icons/si";
import { IoMdCloseCircle } from "react-icons/io";
import { BsFillSearchHeartFill } from "react-icons/bs";
import {Link} from 'react-router-dom'
import { GlobalState } from '../../GlobalState';
import axios from 'axios';

const Headers = () => {
    const state=useContext(GlobalState)
    // console.log(state);
    const[isLogged,SetIsLogged]=state.UserApi.isLogged
    const[isAdmin,SetIsAdmin]=state.UserApi.isAdmin
    const[cart,setCart]=state.UserApi.cart

    const adminRouter=()=>{
        return(
            <>
            <li><Link to='/addfilm'>Add New Film</Link></li>
            <li><Link to='/category'>Genres</Link> </li>
            </>
        )
    }
    
    const loggedRouter=()=>{
        return(
            <>
            <li><Link to='/history'>History</Link></li>
            <li><Link to='/' onClick={logoutUser}>Logout</Link> </li>
            </>
        )
    }

    const logoutUser=async()=>{
        await axios.get('/user/logout')
        localStorage.clear()
        SetIsAdmin(false)
        SetIsLogged(false)
    }
  return (
    <header>
        <div className='menu'>
            <MdOutlineMenu size={30}/>
        </div>
        <div className='logo'>
            <h1>
                <Link to='/'>{isAdmin ? 'Hi Boss':'CineMate'}</Link>
                <IoLogoClosedCaptioning />
            </h1>
        </div>
        <ul>
            <li><Link to='/'>{isAdmin?'Stock':'Movies'}</Link></li>
            {isAdmin&&adminRouter()}{
                isLogged ? loggedRouter() : <li><Link to='/login'>Login or Register</Link></li>
            }
            <li><IoMdCloseCircle size={30} className='menu'/></li>
        </ul>
        <div className='menu'>
            <BsFillSearchHeartFill size={30}/>
        </div>

            {isAdmin ? '':<div className='wishlist'>
            <span>{cart.length}</span>
            <Link to='/wishlist' ><SiAwesomelists size={30}/></Link>
            </div>
            }
        
    </header>
  )
}

export default Headers
