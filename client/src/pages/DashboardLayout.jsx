import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from "../assets/wrappers/Dashboard"
import { BigSidebar, Navbar, SmallSidebar } from "../components"
import { createContext, useState, useContext } from "react"
import { checkDefaultTheme } from "../App"
import customFetch from '../utils/customFetch';
import toast from 'react-hot-toast';

export const loader = async () => {
  try {
    const {data} = await customFetch.get('/users/current-user')
    return data
  } catch (error) {
    return redirect('/')
  }
}

const DashboardContext = createContext()

const DashboardLayout = () => {
  const {user} = useLoaderData()
  const navigate = useNavigate()

  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('dark-theme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/')
    await customFetch.get('/auth/logout')
    toast.success('Logout successful')
  }

  return (
    <DashboardContext.Provider 
      value={{user, 
        showSidebar, 
        isDarkTheme, 
        toggleDarkTheme, 
        toggleSidebar, 
        logoutUser
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet context={{ user }} />  
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout