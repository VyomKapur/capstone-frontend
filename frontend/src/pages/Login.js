import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

const Login = () => {
    const { dispatch } = useAuthContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async(e) =>{
        e.preventDefault()
        const payload = {email, password}
        const response = await fetch("http://localhost:3500/login", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json()
        if(response.ok){
            setEmail("")
            setPassword("") 
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'login', payload: json})
        }
    }
    return (
        <div>
        <form>
            <input placeholder="Email" type="email" onChange={e => setEmail(e.target.value)} value={email}/>
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} value={password}/>
            <button onClick={handleLogin}>Login</button>
        </form>
        </div>
    )
}

export default Login;