import React from 'react'

const FormPage = ()=>{
    return <div>
        <form>
            <label htmlFor="loginIdentifier">Email or Username</label>
            <input type="text" placeholder='Enter your email or Username' id='loginIdentifier'/>
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter your password' id='password' />
            <br />
            <button type='submit'>Log In</button>
        </form>
    </div>
}