import React from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { setMsg } from '../store/user.action';
import { connect } from "react-redux"
import { useEffect } from "react"
import { NavLink } from 'react-router-dom';

function _UserMsg({ notification, setMsg, user }) {
  var timeoutId
  useEffect(() => {
    if (!notification) return;
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      setMsg('');
    }, 3000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [notification])

  if (!notification) {
    clearTimeout(timeoutId)
    return <span></span>
  }

  const msgClass = notification.type || ''
  var { msg } = notification;
  return (
    <div className="msg-screen">
      <section className={`modal-msg ${msgClass}`}>
        <button className="close-modal" onClick={() => setMsg('')}><CloseIcon /></button>
        <header className="msg-header">
          <h1 className="msg-title">{msg.title}</h1>
        </header>
        <h2 className="msg-txt">
          {msg.content}
        </h2>
        {(notification.type === "new-order") && <NavLink className="clean-list modal-link" to={`/dashboard/${notification.sender._id}`}> <button onClick={() => setMsg('')} className="btn">View Order</button> </NavLink>}
        {(notification.type !== "new-order" && notification.type !== "review-added") && <NavLink className="clean-list modal-link" to="/explore"><button onClick={() => setMsg('')} className="btn">Explore Gigs</button></NavLink>}
        {(notification.type === "review-added") && <NavLink className="clean-list modal-link" to={`/profile/${user._id}`}><button onClick={() => setMsg('')} className="btn">My Reviews</button></NavLink>}
      </section>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    notification: state.userModule.msg,
    user: state.userModule.user
  }
}

const mapDispatchToProps = {
  setMsg
};


export const UserMsg = connect(mapStateToProps, mapDispatchToProps)(_UserMsg)
