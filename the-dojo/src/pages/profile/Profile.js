import { useState, useEffect } from 'react'

import Profile from '../../components/Profile'
import Error from '../../components/Error'

import './Profile.scss'

export default function ProfilePage({setPageTitle}) {
    useEffect(() => {
        setPageTitle('Profile')
    })

    return (
        <div className='Card'>
            <Profile></Profile>
        </div>
    )
}