import React from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { eventBusService } from '../services/event-bus.service'
import CloseIcon from '@mui/icons-material/Close';


export class UserMsg extends React.Component {

  removeEvent;

  state = {
    msg: null
  }

  componentDidMount() {
    // Here we listen to the event that we emited, its important to remove the listener 
    this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
      this.setState({ msg })
      setTimeout(() => {
        this.setState({ msg: null })
      }, 2500)
    })
  }

  componentWillUnmount() {
    this.removeEvent()
  }

  render() {
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
}
