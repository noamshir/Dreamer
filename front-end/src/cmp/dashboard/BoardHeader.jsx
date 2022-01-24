

export function BoardHeader() {
    return <section className="board-header">
        <div className="board-content flex">
            <nav>
                <ul className="flex">
                    <li>Dashboard</li>
                    <li>Analytics</li>
                    <li>Messeges</li>
                </ul>
            </nav>
            <button className="btn">Switch to</button>
        </div>
    </section>
}