import React from "react";

import { GigPreview } from "./GigPreview";


export function GigList({ gigs, onGoToDetails }) {
    if (!gigs) return <React.Fragment></React.Fragment>

    return (
        <React.Fragment>
            {!gigs.length ?
                <div className="no-gigs-modal">
                    No Services Found For Your Search
                </div>
                :
                <section className='gig-list'>
                    {gigs.map(gig => <GigPreview key={gig._id} gig={gig} onGoToDetails={onGoToDetails} />)}
                </section>}
        </React.Fragment>
    )
}