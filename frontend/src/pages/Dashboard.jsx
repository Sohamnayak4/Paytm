import React from 'react'
import AppBar from '../components/AppBar.jsx'
import Balance from '../components/Balance.jsx'
import Users from '../components/Users.jsx'

export default function Dashboard() {
  return (
    <div>
        <AppBar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
  )
}
