import { Link } from 'react-router-dom';

const Guide = () => {
    return (
        <main className='App'>
            <header>
                <Link to="/" className='home-link'>
                    <div className='header-titles'>
                        <h1> Dragon Campaign </h1>
                        <p> Only you can save these amazing creatures</p>
                    </div>
                </Link>
            </header>

            <div className='score-board-container'>
                <h3>How to play</h3>

                <div>
                    <span className="help">
                        Click as many dragons as you can within 15 seconds!
                    </span>
                </div>
            </div>
        </main>
    )
}

export default Guide;