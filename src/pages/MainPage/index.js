import NavBar from './../../components/NavBar/index.js'
import MemberPage from '../MemberPage/index.js'
import SummaryPage from '../SummaryPage/index.js'
import ExpensesListPage from '../ExpensesListPage/index.js'
import { useSelector } from 'react-redux'
import './index.css'
const Main = () => {
  const activingNavbar = useSelector((state) => state.activeNavbar.activingNavbar)
  return (
    <div>
      <div className='navbar-box'>
        <NavBar />
      </div>
      <div className='content-box'>
        {
          activingNavbar === 'member' ? <MemberPage />
            : activingNavbar === 'expensesList' ? <ExpensesListPage />
              : activingNavbar === 'summary' ? <SummaryPage />
                : <div> 404 not found!</div>
        }
      </div>
    </div>
  )
}
export default Main