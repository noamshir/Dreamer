

export function BoardHeader({ switchTo, user, switchToSeller, switchToUser }) {

    return <section className="board-header">
        <div className="board-content flex max-width-container equal-padding">
            <nav className="board-nav">
                <ul className="flex clean-list">
                    <li>Dashboard</li>
                    <li>Analytics</li>
                    <li>Messeges</li>
                </ul>
            </nav>
            <div className="flex-grow-helper"></div>
            {user.sellerInfo && <button className="btn" onClick={() => {
                if (switchToSeller) switchToSeller(true);
                else if (switchToUser) switchToUser(false);
            }}>Switch to {switchTo}</button>}
        </div>
    </section>
}