import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const { dispatch } = useAuthContext()
    const handleSignUp = async (e) => {
        e.preventDefault()
        const payload = {email, name, password}
        const response = await fetch('http://localhost:3500/signup', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json()
        if(response.ok){
            setEmail("")
            setName("")
            setPassword("")
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'login', payload: json})
        }
    }
    return (
        <div>
            <form>
                <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handleSignUp}>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp