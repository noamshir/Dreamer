import { connect } from 'react-redux';
import { useState } from 'react'
import { signIn } from '../../store/user.action.js';

function _SignIn({ closeModal, signIn }) {

    const [user, setUser] = useState({ username: "", password: "" });

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        await signIn(user);
        closeModal();
    }

    const handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        setUser({ ...user, [field]: value });
    }

    return (
        <section className="sign-modal">
            <div className="modal-content">
                <header >
                    <h1 className="modal-title">Sign in to Dreamer</h1>
                </header>
                <form action="" className="sign-form" onSubmit={handleSubmit}>
                    <div className="form-input-div">
                        <input type="text" name="username" placeholder="Choose a Username" onChange={handleChange} className="user-input" />
                    </div>
                    <div className="form-input-div">
                        <input type="text" name="password" placeholder="Choose a Password" onChange={handleChange} className="user-input" />
                    </div>
                    <button className="continue-btn" type="submit">Continue</button>
                </form>
            </div>
            <footer>
                <div className="sign-in-footer flex">
                    <p>No member yet?</p>
                    <button>Join now</button>
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
    signIn
}

export const SignIn = connect(mapStateToProps, mapDispatchToProps)(_SignIn)