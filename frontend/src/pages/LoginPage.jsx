import LoginForm from "../components/LoginForm/LoginForm";

export default function LoginPage({onLogin}) {

    return <div className="login-container">
        <LoginForm onLogin={onLogin}/>
    </div>
}