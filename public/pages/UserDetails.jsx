import { userService } from "../services/user.service.js"
import { bugService } from "../services/bug.service.js"

import { BugList } from '../cmps/BugList.jsx'

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function UserDetails() {

    const [userData, setUserData] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
    }, [params.userId])

    // function loadUser() {
    //     userService.get(params.userId)
    //         .then(setUser)
    //         .catch(err => {
    //             console.log('err:', err)
    //             navigate('/')
    //         })
    // }


     function loadUser() {
        userService.get(params.userId)
            .then(setUserData)
            .catch(err => {
                console.log('err:', err)
                navigate('/')
            })
    }

    function onBack() {
        navigate('/')
    }


    if (!userData) return <div>Loading...</div>
    return (
        <section className="user-details">
            <h1>User {userData.user.fullname}</h1>
            <pre>
                {JSON.stringify(userData.user, null, 2)}
            </pre>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Enim rem accusantium, itaque ut voluptates quo? Vitae animi
                maiores nisi, assumenda molestias odit provident quaerat accusamus,
                reprehenderit impedit, possimus est ad.</p>
                < BugList bugs={userData.bugs} user={userData.user} />
            <button onClick={onBack} >Back</button>
        </section>
    )
}