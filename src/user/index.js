import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {userListState } from '../store/userState'

function User () {
    const [userId, setUserId] = useState('')
    const userList = useRecoilValue(userListState)
    const  setUserList= useSetRecoilState(userListState)




    useEffect(() => {
        const requestUser = async () => {
            try {
                const res =await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
                const {data} = res
                console.log(data)
                setUserList(data)
            }catch(e) {
                console.log(e)
            }
        }
        requestUser()
    },[userId])




    return(
        <div>
            <input type={'text'} value={userId} onChange={(e)=>{setUserId(e.target.value)}}/>
             <div>
                 {userList.length >= 1 ? userList.map((user) =>
                      (<li> {user.username}</li>)
                 ) : (<li> {userList.username}</li>) }
             </div>
        </div>
    )




}

export default User