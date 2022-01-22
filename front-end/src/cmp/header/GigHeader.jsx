
import { connect } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { storageService } from '../../services/async-storage.service';
import { setLikedGig } from '../../store/gig.action';
function _GigHeader({ gig, user, gigs,setLikedGig }) {
  var sticky = "";
  const [isLiked, setLiked] = useState(false)
  checkIfLiked()





  async function checkIfLiked() {
    if (user) return;
    const isGuestLiked = await storageService.isLikedByGuest(gig._id)
    console.log(isGuestLiked)
    setLiked(isGuestLiked)
  }
  async function toggleLike() {
    setLikedGig(gig, user)
    setLiked(!isLiked)
  }
  var activeLike = (isLiked) ? "active" : "";
  console.log(isLiked);
  return (
    <header className={`gig-details-header ${sticky}`}>
      <div className="header-content max-width-container equal-padding flex">
        <nav className="gig-header-nav flex">
          <ul className="clean-list flex">
            <li><a className="clean-link" href="">Overview</a></li>
            <li><a className="clean-link" href="">About this gig</a></li>
            <li><a className="clean-link" href="">About the seller</a></li>
            <li><a className="clean-link" href="">Reviews</a></li>
          </ul>
        </nav>
        <div className="like-header flex">
          <button className={`like-btn-header ${activeLike}`} onClick={() => toggleLike()}><FavoriteIcon /></button>
          <span className="likes-count">12</span>
        </div>
      </div>
    </header>
  )
}

const mapsStateToprops = (state) => {
  return {
    gigs: state.gigModule.gigs,
    user: state.userModule.user
  }
}
const mapDispatchToProps = {
  setLikedGig
};

export const GigHeader = connect(mapsStateToprops, mapDispatchToProps)(_GigHeader);