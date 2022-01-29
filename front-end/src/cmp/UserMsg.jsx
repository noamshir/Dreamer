import React from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { setMsg } from '../store/user.action';
import { connect } from "react-redux"
import { useEffect } from "react"
import { NavLink } from 'react-router-dom';

function _UserMsg({ notification, setMsg }) {
  var timeoutId
  useEffect(() => {
    if (!notification) return;
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      setMsg('');
    }, 555555000)
    console.log('msg:', notification);

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
        <div className="lower-text">
          <h5>{msg.subHeader}</h5>
          {(notification.type === "new-order") && <div className="dime-signs flex"> <MonetizationOnIcon className="dime-sign" /><MonetizationOnIcon className="dime-sign" /><MonetizationOnIcon className="dime-sign" /></div>}
          {(notification.type === "active") && <CheckCircleIcon className="check-icon" />}
          {(notification.type === "rejected") && <CancelIcon className="rejected-icon" />}
        </div>
        {(notification.type === "new-order") && <NavLink className="clean-list modal-link" to={`/dashboard/${notification.sender._id}`}> <button onClick={() => setMsg('')} className="btn">View Order</button> </NavLink>}
        {(notification.type !== "new-order") && <NavLink className="clean-list modal-link" to="/explore"><button onClick={() => setMsg('')} className="btn">Explore Gigs</button></NavLink>}
      </section>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    notification: state.userModule.msg
  }
}

const mapDispatchToProps = {
  setMsg
};


export const UserMsg = connect(mapStateToProps, mapDispatchToProps)(_UserMsg)
