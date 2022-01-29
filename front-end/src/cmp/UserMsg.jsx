import React from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CloseIcon from '@mui/icons-material/Close';
import { setMsg } from '../store/user.action';
import { connect } from "react-redux"
import { useEffect } from "react"


function _UserMsg({ msg, setMsg }) {
  var timeoutId
  useEffect(() => {
    if (!msg) return;
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      setMsg('');
    }, 2500)
    console.log('msg:', msg);

    return () => {
      clearTimeout(timeoutId)
    }
  }, [msg])

  if (!msg) {
    clearTimeout(timeoutId)
    return <span></span>
  }

  const msgType = msg.type || ''
  console.log('msg:', msg);

    // if (!this.state.msg) return <span></span>
    // const msgClass = this.state.msg.type || ''
    return (
      // <section className={'user-msg ' + msgClass}>
      //   <button onClick={() => {
      //     this.setState({ msg: null })
      //   }}>x</button>
      //   {this.state.msg.txt}
      // </section>
      // <div className="msg-screen">
      //   <section className={'modal-msg new-order '}>
      //     <button className="close-modal"><CloseIcon /></button>
      //     <header className="msg-header">
      //       <h1 className="msg-title">Received new order!</h1>
      //     </header>
      //     <h2 className="msg-txt">
      //       noam shir hired your services
      //   </h2>
      //     <div className="lower-text flex">
      //       <h5>Time to make some dimes...</h5>
      //       <div className="dime-signs flex"> <MonetizationOnIcon className="dime-sign" /><MonetizationOnIcon className="dime-sign" /><MonetizationOnIcon className="dime-sign" /></div>
      //     </div>
      //     <button className="btn">View Order</button>
      //   </section>
      // </div>
      // <div className="msg-screen">
      //   <section className={'modal-msg order-rejected'}>
      //     <button className="close-modal"><CloseIcon /></button>
      //     <header className="msg-header">
      //       <h1 className="msg-title">Order was rejected</h1>
      //     </header>
      //     <h2 className="msg-txt">
      //       The seller rejected your order
      //   </h2>
      //     <div className="lower-text flex">
      //       <h5>Dont worry! we have many other gigs for you</h5>
      //     </div>
      //     <button className="btn">Explore Gigs</button>
      //   </section>
      // </div>
      <div className="msg-screen">
        <section className={'modal-msg order-approved'}>
          <button className="close-modal"><CloseIcon /></button>
          <header className="msg-header">
            <h1 className="msg-title">Order approved</h1>
          </header>
          <h2 className="msg-txt">
            The seller approved your order
       </h2>
          <div className="lower-text flex">
            <h5>Dont worry! we have many other gigs for you</h5>
          </div>
          <button className="btn">Explore Gigs</button>
        </section>
      </div>
    )
    }

function mapStateToProps(state) {
  return {
    msg: state.userModule.msg
  }
}

const mapDispatchToProps = {
  setMsg
};


export const UserMsg = connect(mapStateToProps, mapDispatchToProps)(_UserMsg)
