
import { connect } from 'react-redux';
import { useState } from 'react'
import { signUp } from '../../store/user.action.js';


function _SignUp({ signUp, closeModal, openSignIn }) {

    const [user, setUser] = useState({ fullname: "", username: "", password: "" });

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        await signUp(user);
        closeModal();
    }

    const handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        setUser({ ...user, [field]: value });
    }

    const onSignIn = () => {
        closeModal();
        openSignIn();
    }
    return (
        <section className="sign-modal">

            <div className="modal-content">
                <header >
                    <h1 className="modal-title">Join dimerr</h1>
                </header>
                <form action="" className="sign-form" onSubmit={handleSubmit}>
                    <div className="form-input-div">
                        <input type="text" name="fullname" placeholder="Enter your full name" onChange={handleChange} className="user-input" />
                    </div>
                    <div className="form-input-div">
                        <input type="text" name="username" placeholder="Choose a Username" onChange={handleChange} className="user-input" />
                    </div>
                    <div className="form-input-div">
                        <input type="password" name="password" placeholder="Choose a Password" onChange={handleChange} className="user-input" />
                    </div>
                    <button className="continue-btn" type="submit">Continue</button>
                    <p className="siginig-agree">By joining I agree to receive dreams from dimerr.</p>
                </form>
            </div>
            <footer>
                <div className="sign-in-footer flex">
                    <p>Already a member?</p>
                    <button onClick={() => onSignIn()}>Sign in</button>
                </div>
            </footer>

        </section>
    )
}

function mapStateToProps({ userModule }) {
    return {
        user: userModule.user
    }
}

const mapDispatchToProps = {
    signUp
}

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp)