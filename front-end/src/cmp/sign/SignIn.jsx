import { connect } from 'react-redux';
import { useState } from 'react'
import { signIn } from '../../store/user.action.js';
import { toggleSignInModal, toggleJoinModal } from "../../store/scss.action"
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service';

function _SignIn({ toggleSignInModal, signIn, toggleJoinModal }) {

    const [user, setUser] = useState({ username: "", password: "" });

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const ans = await signIn(user);
        if (ans) {
            showSuccessMsg(`user ${ans.username} signed in`);
        }
        else {
            showErrorMsg('failed to login...')
        }
        toggleSignInModal(false);
    }

    const handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        setUser({ ...user, [field]: value });
    }

    const onJoin = () => {
        toggleSignInModal(false);
        toggleJoinModal(true);
    }

    return (
        <section className="sign-modal">
            <div className="modal-content">
                <header >
                    <h1 className="modal-title">Sign in to dimerr</h1>
                </header>
                <form action="" className="sign-form" onSubmit={handleSubmit}>
                    <div className="form-input-div">
                        <input required type="text" name="username" placeholder="Choose a Username" onChange={handleChange} className="user-input" />
                    </div>
                    <div className="form-input-div">
                        <input required type="password" name="password" placeholder="Choose a Password" onChange={handleChange} className="user-input" />
                    </div>
                    <button className="continue-btn" type="submit">Continue</button>
                </form>
            </div>
            <footer>
                <div className="sign-in-footer flex">
                    <p>No member yet?</p>
                    <button onClick={() => { onJoin() }}>Join now</button>
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
    signIn,
    toggleSignInModal,
    toggleJoinModal
}

export const SignIn = connect(mapStateToProps, mapDispatchToProps)(_SignIn)